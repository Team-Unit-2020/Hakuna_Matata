import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getUserById } from '../../services/userService';
import DashboardNav from '../Navbars/DashboardNav';
import Spinner from '../Spinner';

export default function Dashboard() {

    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var id = JSON.parse(localStorage.getItem("user")).id;
        getUserById(id)
        .then((u) => {
            setUser(u.user);
        }).finally(() => {
            setLoading(false);
        })
    },[])

    return (
        <div>
            {loading ? (<Spinner/>) : (<DashboardNav user={user}/>)}
        </div>
    )
}
