import React, { useState, useEffect } from 'react';
import Spinner from '../Common/Spinner';
import DashboardNav from '../Common/Navbars/DashboardNav';
import { useHistory, useParams } from "react-router-dom";
import { getOrderById } from '../../services/orderService';
import {
    Button,
    Input,
    FormGroup,
    Container,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody
} from "reactstrap";
import { appSettings } from '../../appSettings';

export default function Payment(props) {

    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [order, setOrder] = useState();
    const history = useHistory();

    const [paymentRequest, setPayementRequest] = useState({
        andbox: true,
        merchant_id: appSettings.payhereMerchentId,
        return_url: `http://localhost:3000/#/payment_confirmation/${orderId}`,
        cancel_url: "http://localhost:3000/#/payment_cancelled",
        notify_url: appSettings.payhereNotifyUrl,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        country: "",
        order_id: "",
        items: "",
        currency: "LKR",
        amount: ""
    })

    const checkAuth = () => localStorage.getItem("access_token") ? true : false;


    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
            setIsLoading(false)
        }
    }, [checkAuth()]);

    useEffect(() => {
        getOrderById(orderId).then(order => {
            console.log(order);
            setOrder(order.order);
            setPayementRequest({
                ...paymentRequest,
                email: order.order.serviceSeeker.email,
                phone: order.order.serviceSeeker.phone,
                order_id: orderId,
                items: order.order.item.name,
                amount: order.order.item.amount
            })
        });
    }, [orderId])

    const sendPayment = () => {
        window.payhere.startPayment(paymentRequest);
    }

    window.payhere.onCompleted = function onCompleted(id) {
        history.push(`/orders`)
        //Note: validate the payment and show success or failure page to the customer
    };

    window.payhere.onDismissed = function onDismissed() {
        //Note: Prompt user to pay again or show an error page
        history.push(`/orders`)
    };

    window.payhere.onError = function onError(error) {
        // Note: show an error page
        history.push(`/orders`)
      };

    return (
        <div>
            {isLoading ? (<Spinner marginTop={"25vh"} />) : (
                <div>
                    <DashboardNav transparent={false} user={user} />
                    <div>
                        <Container>
                            <Row style={{ marginTop: 20 }}>
                                <Col className="ml-auto mr-auto" md="3" xl="3">

                                </Col>
                                <Col className="ml-auto mr-auto" md="6" xl="6">
                                    <Card style={{ padding: 10 }}>
                                        <CardHeader>
                                            <h3>You can do full payment or part payment</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={paymentRequest.first_name}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, first_name: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={paymentRequest.last_name}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, last_name: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="Address"
                                                    type="text"
                                                    value={paymentRequest.address}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, address: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="City"
                                                    type="text"
                                                    value={paymentRequest.city}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, city: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="Country"
                                                    type="text"
                                                    value={paymentRequest.country}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, country: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Input
                                                    defaultValue=""
                                                    placeholder="Amount"
                                                    type="number"
                                                    value={parseFloat(paymentRequest.amount)}
                                                    onChange={(e) => setPayementRequest({ ...paymentRequest, amount: e.target.value })}
                                                ></Input>
                                            </FormGroup>
                                            <FormGroup>
                                                <Button color="info" onClick={sendPayment}>Checkout</Button>
                                            </FormGroup>
                                        </CardBody>
                                    </Card>

                                </Col>
                                <Col className="ml-auto mr-auto" md="3" xl="3">

                                </Col>
                            </Row>
                        </Container>

                    </div>
                </div>)}
        </div>
    )
}
