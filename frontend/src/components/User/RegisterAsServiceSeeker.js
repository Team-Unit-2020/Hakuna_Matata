import React, { useState } from 'react'
import { Link } from "react-router-dom";
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
    Row,
    Alert,
    FormGroup,
    Label
} from "reactstrap";
import HomePageNav from '../Common/Navbars/HomePageNav';
import { validateNic, infoNic } from 'lanka-nic-2019';
import moment from 'moment'
import { signUpUser } from '../../services/userService';


export default function RegisterAsServiceSeeker() {

    const [lastFocus, setLastFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [nicFocus, setNicFocus] = useState(false);
    const [dobFocus, setDOBFocus] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [rePassFocus, setRePassFocus] = useState(false);
    

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [nic, setNIC] = useState("");
    const [dob, setDOB] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pending, setPending] = useState(false);
    

    const handleNameChange = (event) => setName(event.target.value);
    const handleEmailChange = (event) => setEmail(event.target.value);
    const handleNICChange = (event) => setNIC(event.target.value);
    const handleDOBChange = (event) => setDOB(event.target.value);
    const handlePhoneChange = (event) => setPhone(event.target.value);
    const handleAddressChange = (event) => setAddress(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);
    const handleRePasswordChange = (event) => setReEnterPassword(event.target.value);

    const registerUser = () => {

        setPending(true);
        var user = {
            name: name,
            email: email,
            nic: nic,
            dob: dob,
            phone: phone,
            address: address,
            password: password,
            userType: "user"
        }

        if (name && email && nic && phone && address && password) {
            var pattEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
            var pattMobile = new RegExp(/^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/);
            setError("");
            if (!pattEmail.test(email)) {
                setError("Email not valid");
                setPending(false);
            } else if (!pattMobile.test(phone)) {
                setError("Phone number is not valid");
                setPending(false);
            } else if (!validateNic(nic)) {
                setError("NIC number not Valid");
                setPending(false);
            }
            else if (dob !== moment(infoNic(nic).birthday).format("YYYY-MM-DD")) {
                setError("Birthday not matched with NIC");
                setPending(false);
            }
            else if (!(password.length >= 8 && password.length <= 16)) {
                setError("Password need to between 8 and 16 characters");
                setPending(false);
            }
            else if (password !== reEnterPassword) {
                setError("Password neew to be correctly re enter.");
                setPending(false);
            }
            else {
                setError("");
                signUpUser(user).then(res => {
                    clearAllFields();
                    setSuccess(res.message);
                }).catch(err => {
                    setError(err.message);
                }).finally(() => {
                    setPending(false);
                });
            }

        } else {
            setError("All fields are mandatory");
            setPending(false);
        }
    }

    const clearAllFields = () => {
        setName("");
        setEmail("");
        setPhone("");
        setNIC("");
        setDOB("");
        setAddress("");
        setPassword("");
        setReEnterPassword("")
    }

    return (
        <div>
            <HomePageNav />
            <div
                className="section"
                style={{
                    backgroundImage: "url(" + require("../../assets/img/bg8.jpg") + ")",
                    backgroundSize: "cover",
                    backgroundPosition: "top center",
                    minHeight: "700px",
                }}
            >
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
                    <Row>
                        <Card className="card-signup" data-background-color="blue">
                            <Form action="" className="form" method="">
                                <CardHeader className="text-center">
                                    <CardTitle className="title-up" tag="h3">
                                        Sign Up as Service Seeker
                                    </CardTitle>
                                </CardHeader>
                                <CardBody>

                                    <InputGroup
                                        className={
                                            "no-border" + (lastFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons text_caps-small"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Name"
                                            type="text"
                                            required
                                            value={name}
                                            onFocus={() => setLastFocus(true)}
                                            onBlur={() => setLastFocus(false)}
                                            onChange={handleNameChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (emailFocus ? " input-group-focus" : "")
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
                                            onFocus={() => setEmailFocus(true)}
                                            onBlur={() => setEmailFocus(false)}
                                            onChange={handleEmailChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (nicFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons business_badge"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="NIC..."
                                            type="text"
                                            value={nic}
                                            onFocus={() => setNicFocus(true)}
                                            onBlur={() => setNicFocus(false)}
                                            onChange={handleNICChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (dobFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-1_calendar-60"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Date of Birth..."
                                            type="date"
                                            value={dob}
                                            onFocus={() => setDOBFocus(true)}
                                            onBlur={() => setDOBFocus(false)}
                                            onChange={handleDOBChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (phoneFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-2_chat-round"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Phone..."
                                            type="number"
                                            value={phone}
                                            onFocus={() => setPhoneFocus(true)}
                                            onBlur={() => setPhoneFocus(false)}
                                            onChange={handlePhoneChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (addressFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons ui-1_send"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Address..."
                                            type="text"
                                            value={address}
                                            onFocus={() => setAddressFocus(true)}
                                            onBlur={() => setAddressFocus(false)}
                                            onChange={handleAddressChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (passFocus ? " input-group-focus" : "")
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
                                            onFocus={() => setPassFocus(true)}
                                            onBlur={() => setPassFocus(false)}
                                            onChange={handlePasswordChange}
                                        ></Input>
                                    </InputGroup>
                                    <InputGroup
                                        className={
                                            "no-border" + (rePassFocus ? " input-group-focus" : "")
                                        }
                                    >
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="now-ui-icons objects_key-25"></i>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder="Re enter Password..."
                                            type="password"
                                            value={reEnterPassword}
                                            onFocus={() => setRePassFocus(true)}
                                            onBlur={() => setRePassFocus(false)}
                                            onChange={handleRePasswordChange}
                                        ></Input>
                                    </InputGroup>
                                </CardBody>
                                <CardFooter className="text-center">
                                    {pending ? (
                                        <Button
                                            className="btn-neutral btn-round"
                                            color="info"
                                            href="#pablo"
                                            onClick={(e) => {
                                                e.preventDefault();
                                            }}
                                            size="lg"
                                        >
                                            <i className="now-ui-icons loader_refresh spin"></i>
                                        </Button>
                                    ) : (
                                            <Button
                                                className="btn-neutral btn-round"
                                                color="info"
                                                href="#pablo"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    registerUser();
                                                }}
                                                size="lg"
                                            >
                                                Get Started <i className="now-ui-icons objects_spaceship"></i>
                                            </Button>
                                        )}

                                </CardFooter>
                            </Form>
                        </Card>
                    </Row>
                    <div className="col text-center">
                        <Button
                            className="btn-round btn-white"
                            color="default"
                            to="/login"
                            outline
                            size="lg"
                            tag={Link}
                        >
                            View Login Page
            </Button>
                    </div>
                </Container>
            </div>
        </div>
    )
}
