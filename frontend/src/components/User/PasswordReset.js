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
import { validatePasswordResetLink, resetPasswordWithCode } from '../../services/userService';
import HomePageNav from '../Navbars/HomePageNav';
import { Link } from "react-router-dom";

export default function PasswordReset(props) {
    const [firstFocus, setFirstFocus] = useState(false);
    const [lastFocus, setLastFocus] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [reEnterNewPassword, setReEnterNewPassword] = useState("");
    const history = useHistory();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [pending, setPending] = useState(false);
    const [emailLinkValid, setEmailLinkValid] = useState(false);
    const [requestPending, setRequestPending] = useState(false);

    const handleNewPasswordChange = (event) => setNewPassword(event.target.value);
    const handleReEnterNewPasswordChange = (event) => setReEnterNewPassword(event.target.value);

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

    useEffect(() => {
        validatePasswordResetLink(props.match.params.code).then(res => {
            setEmailLinkValid(true);
        }).catch(err => {
            setError(err.message);
            setEmailLinkValid(false);
        }).finally(() => {
            setPending(false);
        });
    }, [])

    const resetPassowrd = () => {
        setError("");
        setSuccess("");
        setRequestPending(true);
        if(newPassword && reEnterNewPassword){
            if(newPassword.length > 8 && newPassword.length < 16){
                if(newPassword === reEnterNewPassword){
                    var body = {
                        code: props.match.params.code,
                        newPassword: newPassword
                    }

                    resetPasswordWithCode(body).then(res => {
                        setSuccess(res.message);
                        setRequestPending(false);
                        setEmailLinkValid(false);
                    }).catch(err => {
                        setSuccess(err.message);
                    }).finally(() => {
                        setRequestPending(false);
                    })
                }else{
                    setError("Password neew to be correctly re enter.");
                    setRequestPending(false);
                }
            }else{
                setError("Password need to between 8 and 16 characters");
                setRequestPending(false);
            }
        }else{
            setError("Fields cannot be empty");
            setRequestPending(false);
        }
    }


    return (
        <div>
            <HomePageNav />
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/bg1.jpg") + ")",
                    }}
                ></div>
                <div className="content">
                    {pending ? (
                        <Container style={{ marginTop: '20%' }}>
                            <div className="content-center brand">

                                <h1 className="h1-seo"><i className="now-ui-icons loader_refresh spin"></i></h1>
                                <h3>Validating Password Reset Link...</h3>
                            </div>

                        </Container>
                    ) : (
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
                                            <i className="now-ui-icons objects_support-17"></i>
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
                                {emailLinkValid ? (
                                    <Col className="ml-auto mr-auto" md="4">
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
                                                                <i className="now-ui-icons objects_key-25"></i>
                                                            </InputGroupText>
                                                        </InputGroupAddon>
                                                        <Input
                                                            placeholder="Enter New Password..."
                                                            type="password"
                                                            value={newPassword}
                                                            onFocus={() => setFirstFocus(true)}
                                                            onBlur={() => setFirstFocus(false)}
                                                            onChange={handleNewPasswordChange}
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
                                                            placeholder="Re Enter New Password..."
                                                            type="password"
                                                            value={reEnterNewPassword}
                                                            onFocus={() => setLastFocus(true)}
                                                            onBlur={() => setLastFocus(false)}
                                                            onChange={handleReEnterNewPasswordChange}
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
                                                            if(!requestPending){
                                                                resetPassowrd();
                                                            }
                                                        }}
                                                        size="lg"
                                                    >
                                                        {requestPending ? (<i className="now-ui-icons loader_refresh spin"></i>) : ("Change my Password")}
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
                                                                    history.push("/login")
                                                                }}
                                                            >
                                                                Login
                                                    </a>
                                                        </h6>
                                                    </div>
                                                </CardFooter>
                                            </Form>
                                        </Card>
                                    </Col>
                                ) : (
                                        <div className="col text-center">
                                            <Button
                                                className="btn-round btn-white"
                                                color="primary"
                                                to="/login"
                                                outline
                                                size="lg"
                                                tag={Link}
                                            >
                                                Login
                                </Button>
                                        </div>
                                    )}

                            </Container>
                        )}

                </div>
            </div>
        </div>
    )
}
