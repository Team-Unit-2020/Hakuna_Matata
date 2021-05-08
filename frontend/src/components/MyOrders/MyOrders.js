import React, { useState, useEffect } from 'react'
import Spinner from '../Common/Spinner';
import { useHistory } from 'react-router-dom';
import DashboardNav from '../Common/Navbars/DashboardNav';
import { getOrdersByUser } from '../../services/orderService';
import {
    Badge,
    Button
} from "reactstrap";

export default function MyOrders() {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState();
    const [orderList, setOrderList] = useState([]);
    const history = useHistory();

    const checkAuth = () => localStorage.getItem("access_token") ? true : false;


    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
            setIsLoading(false)
        }
    }, [checkAuth()]);

    useEffect(() => {
        if (user) {
            getOrdersByUser(user.id).then(orders => setOrderList(orders.orders));
        }


    }, [user])

    return (
        <div>
            {isLoading ? (<Spinner marginTop={"25vh"} />) : (
                <div>
                    <DashboardNav transparent={false} user={user} />
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-primary">
                                <th>Order Id</th>
                                <th>Order</th>
                                <th>Description</th>
                                <th>Accepted</th>
                                <th>Amount</th>
                                <th></th>
                            </thead>
                            <tbody>
                                {orderList.map((order) => <tr>
                                    <td>
                                        {order.id}
                                    </td>
                                    <td>
                                        {order.title}
                                    </td>
                                    <td>
                                        {order.body}
                                    </td>
                                    <td >
                                        {order.item.isAccepted ? "Yes" : "No"}
                                    </td>
                                    <td >
                                        {`Rs. ${order.item.amount}`}
                                    </td>{
                                        order.item.isAccepted && (
                                            <div>
                                                {order.item.payments.isPayed ? (<Badge color="success" className="mr-1">Payed</Badge>) : (
                                                    <div>
                                                        {order.item.payments.isAdvancedPayed && (<Badge color="info" className="mr-1">Advance</Badge>)}
                                                        <Button color="info" onClick={() => {
                                                            history.push(`/payment/${order.id}`)
                                                        }}>Pay</Button>
                                                        <Button color="danger">Cancel</Button>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    }
                                </tr>)}

                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
