import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

export default function ProtectedRouter(props) {


    const Component = props.component;
    let userType = localStorage.getItem("userType") ;

   

    const checkAuth = () => localStorage.getItem("access_token") ? true : false;
    const checkRolePermission = () => (props.userType === "all" || props.userType === userType);
    return (
        <Route
            render={() => (checkAuth() && checkRolePermission()) ? (<Component />) : (<Redirect to='/login' />)}
            path={props.path}
        />
    );
}
