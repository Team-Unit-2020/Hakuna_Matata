import React, { useState, useEffect } from 'react'
import { Container, Button } from "reactstrap";
import HomePageNav from '../Navbars/HomePageNav';
import { Link } from "react-router-dom";
import { activateUser } from '../../services/userService';

export default function Confirm(props) {

    const [pending, setPending] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        activateUser(props.match.params.code).then(res => {
            setSuccess(true);
        }).catch(err => {
            setSuccess(false);
            setError(err.message)
        }).finally(() => {
            setPending(false);
        })
    }, [])

    return (
        <div>
            <HomePageNav />
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/header.jpg") + ")",
                    }}
                ></div>
                {pending ? (
                    <Container style={{ marginTop: '20%' }}>
                        <div className="content-center brand">

                            <h1 className="h1-seo"><i className="now-ui-icons loader_refresh spin"></i></h1>
                            <h3>Activating your account...</h3>
                        </div>

                    </Container>
                ) : (
                        success ? (
                            <Container style={{ marginTop: '20%' }}>
                                <div className="content-center brand">

                                    <h1 className="h1-seo">Congratulations!</h1>
                                    <h3>Your Account Successfully Activated</h3>
                                    <h5>Continue to the Login</h5>

                                    <div className="col text-center">
                                        <Button
                                            className="btn-round btn-white"
                                            color="primary"
                                            to="/login"
                                            outline
                                            size="lg"
                                            tag={Link}
                                        >
                                            Login now!
                                </Button>
                                    </div>
                                </div>

                            </Container>
                        ) : (
                                <Container style={{ marginTop: '20%' }}>
                                    <div className="content-center brand">

                                        <h1 className="h1-seo">Oh Snap!</h1>
                                        <h3>{error}</h3>
                                        <h5>Try Again</h5>

                                        <div className="col text-center">
                                            <Button
                                                className="btn-round btn-white"
                                                color="info"
                                                to="/signup"
                                                outline
                                                size="lg"
                                                tag={Link}
                                            >
                                                Sign Up
                                            </Button>
                                        </div>
                                    </div>

                                </Container>
                            )

                    )}

            </div>
        </div>

    )
}