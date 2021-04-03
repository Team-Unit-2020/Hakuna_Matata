import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

export default function ProtectedRouter(props) {

    
    const Component = props.component;

    const checkAuth = () => localStorage.getItem("access_token") ? true : false;

    return (
        <Route
            render={() => checkAuth() ? (<Component />) : (<Redirect to='/login' />)}
            path={props.path}
        />
    );
}
