import React, {useState, useEffect} from 'react';
import { useHistory, useParams } from "react-router-dom";
import { getOrderById } from '../../services/orderService';

export default function PaymentConfirm() {

    const { orderId } = useParams();

    useEffect(() => {
        getOrderById(orderId).then(order => console.log(order))
    }, [orderId])

    return (
        <div>
            
        </div>
    )
}
