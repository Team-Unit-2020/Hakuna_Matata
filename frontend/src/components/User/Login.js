import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Col,
    Alert
} from "reactstrap";
import { sendPasswordResetLink, authenticateUser } from '../../services/userService';
import HomePageNav from '../Common/Navbars/HomePageNav';
import {useDispatch} from 'react-redux'
import {setUserFromId} from '../../store/user/userActions'

export default function Login() {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [showPasswordReset, setShowPasswordReset] = useState(false);
    const [passwordResetEmail, setPasswordResetEmail] = useState("");
    const [pending, setPending] = useState(false);

    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handlePasswordResetEmailChange = (event) => setPasswordResetEmail(event.target.value);

    useEffect(() => {
        document.body.classList.add("login-page");
        document.body.classList.add("sidebar-collapse");
        document.documentElement.classList.remove("nav-open");
        window.scrollTo(0, 0);
        document.body.scrollTop = 0;
        return function cleanup() {
            document.body.classList.remove("login-page");
            document.body.classList.remove("sidebar-collapse");
        };
    }, []);

    const sendPasswordReset = () => {
        setError("");
        setSuccess("");
        setPending(true);
        if (passwordResetEmail) {
            var pattEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (pattEmail.test(passwordResetEmail)) {
                var body = {
                    email: passwordResetEmail
                }
                sendPasswordResetLink(body).then(res => {
                    setSuccess(res.message);
                    setPasswordResetEmail("");
                }).catch(err => {
                    setError(err.message)
                }).finally(() => {
                    setPending(false);
                })
            } else {
                setError("Email not Valid");
                setPending(false);
            }
        } else {
            setError("Email Field cannot be empty");
            setPending(false);
        }
    }

    const login = () => {
        setPending(true);
        setError("");
        if (email && password) {
            var pattEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            if (!pattEmail.test(email)) {
                setError("Email not valid");
                setPending(false);
            } else if (!(password.length >= 8 && password.length <= 16)) {
                setError("Password need to between 8 and 16 characters");
                setPending(false);
            } else {
                setError("");
                var user = {
                    email: email,
                    password: password
                }              
                authenticateUser(user).then(res => {
                    dispatch(setUserFromId(res.id));
                    localStorage.setItem("access_token", res.access_token);
                    localStorage.setItem("user", JSON.stringify(res.user));
                    localStorage.setItem("userType", res.user.userType);
                    history.push("/");
                }).catch(err => {
                    setError(err.message);
                }).finally(() => {
                    setPending(false);
                })
            }
        } else {
            setError("Values can't be empty");
            setPending(false);
        }
    }

    return (
        <div>
            <HomePageNav />
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/login.jpg") + ")",
                    }}
                ></div>
                <div className="content">
                    <Container>
                        <Alert color="danger" isOpen={error === "" ? false : true}>
                            <Container>
                                <div className="alert-icon">
                                    <i className="now-ui-icons objects_support-17"></i>
                                </div>
                                <strong>Oh snap!</strong> {error}
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setError("")}
                                >
                                    <span aria-hidden="true">
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </span>
                                </button>
                            </Container>
                        </Alert>
                        <Alert color="success" isOpen={success === "" ? false : true}>
                            <Container>
                                <div className="alert-icon">
                                    <i className="now-ui-icons ui-2_like"></i>
                                </div>
                                {success}
                                <button
                                    type="button"
                                    className="close"
                                    onClick={() => setSuccess("")}
                                >
                                    <span aria-hidden="true">
                                        <i className="now-ui-icons ui-1_simple-remove"></i>
                                    </span>
                                </button>
                            </Container>
                        </Alert>
                        <Col className="ml-auto mr-auto" md="4">
                            {!showPasswordReset ? (
                                <Card className="card-login card-plain">
                                    <Form action="" className="form" method="">
                                        <CardHeader className="text-center">
                                            <div className="logo-container">
                                            </div>
                                        </CardHeader>
                                        <CardBody>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (firstFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons ui-1_email-85"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Email..."
                                                    type="email"
                                                    value={email}
                                                    onFocus={() => setFirstFocus(true)}
                                                    onBlur={() => setFirstFocus(false)}
                                                    onChange={handleEmailChange}
                                                ></Input>
                                            </InputGroup>
                                            <InputGroup
                                                className={
                                                    "no-border input-lg" +
                                                    (lastFocus ? " input-group-focus" : "")
                                                }
                                            >
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="now-ui-icons objects_key-25"></i>
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Password..."
                                                    type="password"
                                                    value={password}
                                                    onFocus={() => setLastFocus(true)}
                                                    onBlur={() => setLastFocus(false)}
                                                    onChange={handlePasswordChange}
                                                ></Input>
                                            </InputGroup>
                                        </CardBody>
                                        <CardFooter className="text-center">
                                            <Button
                                                block
                                                className="btn-round"
                                                color="info"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    if (!pending) {
                                                        login();
                                                    }

                                                }}
                                                size="lg"
                                            >
                                                {pending ? (<i className="now-ui-icons loader_refresh spin"></i>) : ("Login")}
                                            </Button>
                                            <div className="pull-left">
                                                <h6>
                                                    <a
                                                        className="link"
                                                        href="#pablo"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            history.push("/signup")
                                                        }}
                                                    >
                                                        Create Account
                                                </a>
                                                </h6>
                                            </div>
                                            <div className="pull-right">
                                                <h6>
                                                    <a
                                                        className="link"
                                                        href="#pablo"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setShowPasswordReset(true);
                                                        }}
                                                    >
                                                        Forgot Password?
                                                    </a>
                                                </h6>
                                            </div>
                                        </CardFooter>
                                    </Form>
                                </Card>
                            ) : (
                                    <Card className="card-login card-plain">
                                        <Form action="" className="form" method="">
                                            <CardHeader className="text-center">
                                                <div className="logo-container">
                                                </div>
                                            </CardHeader>
                                            <CardBody>
                                                <InputGroup
                                                    className={
                                                        "no-border input-lg" +
                                                        (firstFocus ? " input-group-focus" : "")
                                                    }
                                                >
                                                    <InputGroupAddon addonType="prepend">
                                                        <InputGroupText>
                                                            <i className="now-ui-icons ui-1_email-85"></i>
                                                        </InputGroupText>
                                                    </InputGroupAddon>
                                                    <Input
                                                        placeholder="Email you need to reset password..."
                                                        type="email"
                                                        value={passwordResetEmail}
                                                        onFocus={() => setFirstFocus(true)}
                                                        onBlur={() => setFirstFocus(false)}
                                                        onChange={handlePasswordResetEmailChange}
                                                    ></Input>
                                                </InputGroup>
                                            </CardBody>
                                            <CardFooter className="text-center">
                                                <Button
                                                    block
                                                    className="btn-round"
                                                    color="info"
                                                    href="#pablo"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        if (!pending) {
                                                            sendPasswordReset();
                                                        }
                                                    }}
                                                    size="lg"
                                                >
                                                    {pending ? (<i className="now-ui-icons loader_refresh spin"></i>) : ("Send Password Reset Link")}
                                                </Button>
                                                <div className="pull-left">
                                                    <h6>
                                                        <a
                                                            className="link"
                                                            href="#pablo"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                setShowPasswordReset(false);
                                                            }}
                                                        >
                                                            Login
                                                </a>
                                                    </h6>
                                                </div>
                                                <div className="pull-right">
                                                    <h6>
                                                        <a
                                                            className="link"
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}
                                                        >
                                                            Contact Customer Care
                                                    </a>
                                                    </h6>
                                                </div>
                                            </CardFooter>
                                        </Form>
                                    </Card>
                                )}

                        </Col>
                    </Container>
                </div>
            </div>
        </div>
    )
}
