import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Button,
    Input
} from "reactstrap";
import DashboardNav from '../Common/Navbars/DashboardNav';
import Spinner from '../Common/Spinner';
import { sendOrder } from '../../services/orderService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const SweetAlert = withReactContent(Swal)

export default function OrderPage(props) {
    const { orderId } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const history = useHistory();


    const checkAuth = () => localStorage.getItem("access_token") ? true : false;

    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
            setIsLoading(false)
        }
    }, [checkAuth()]);

    const orderService = () => {
        let request = {
            title: title,
            body: body,
            user: user.id,
            service: orderId
        }

        if (title && body) {
            sendOrder(request).then(res =>
                SweetAlert.fire({ position: 'center', icon: 'success', title: res.message, showConfirmButton: true }))
                .catch(err => SweetAlert.fire({ position: 'center', icon: 'error', title: err.message, showConfirmButton: true }))

            history.goBack();
        }
    }


    return (
        <div>
            {isLoading ? (<Spinner marginTop={"25vh"} />) : (
                <div>
                    <DashboardNav transparent={false} user={user} />
                    <div className="page-header clear-filter" filter-color="blue">
                        <div
                            className="page-header-image"
                            style={{
                                backgroundImage: "url(" + require("../../assets/img/header.jpg") + ")",
                                backgroundRepeat: "repeat-x"
                            }}
                        ></div>
                        <Container>
                            <Row>
                                <Card style={{ color: "black" }}>

                                    <div>
                                        <CardHeader style={{ paddingTop: 10 }}>
                                            <h3>Order Service</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <Row style={{ padding: 20 }}>
                                                <div style={{ width: "100%" }} class="form-group">
                                                    <label for="exampleInputEmail1">Subject</label>
                                                    <input
                                                        type="text"
                                                        class="form-control"
                                                        id="exampleInputEmail1"
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        aria-describedby="emailHelp" />
                                                </div>
                                                <div style={{ width: "100%" }} class="form-group">
                                                    <label for="exampleInputEmail1">Mention your Requirement</label>
                                                    <Input
                                                        style={{ height: "40vh" }}
                                                        type="textarea"
                                                        row={10}
                                                        name="text"
                                                        value={body}
                                                        onChange={(e) => setBody(e.target.value)}
                                                        id="exampleText" />
                                                </div>
                                                <Button className="btn btn-block" onClick={orderService} color="info">
                                                    Order a Service
                                                </Button>
                                            </Row>
                                        </CardBody>
                                    </div>
                                </Card>
                            </Row>
                        </Container>
                    </div>
                </div>)}
        </div>
    )
}
