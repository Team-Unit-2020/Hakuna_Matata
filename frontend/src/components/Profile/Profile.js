import React, { useState, useEffect } from 'react';
import DashboardNav from '../Common/Navbars/DashboardNav';
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from 'reactstrap';
import { getUserById } from '../../services/userService';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { updateProfile, deactivateAccount } from '../../services/userService';
import {useHistory} from 'react-router-dom';

const MySwal = withReactContent(Swal)

export default function Profile() {

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [nic, setNic] = useState("");
    const [birthday, setBirthday] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [user, setUser] = useState(null);
    const history = useHistory();

    useEffect(() => {
        var localUser = JSON.parse(localStorage.getItem("user"));
        setUser(localUser);

        getUserById(localUser.id).then(res => {
            setUserDetails(res.user)
        })
    }, [])

    const setUserDetails = (userData) => {
        setName(userData.name);
        setNic(userData.nic);
        setBirthday(userData.dob);
        setPhoneNumber(userData.phone);
        setAddress(userData.address);
        setEmail(userData.email);
    }

    const saveProfile = () => {

        var updatedUser = {
            name: name,
            nic: nic,
            phone: phoneNumber,
            address: address,
            dob: birthday
        }

        MySwal.fire({
            title: "Do you need to change your details?",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed) {
                updateProfile(updatedUser, user.id).then(res => {
                    setUserDetails(res.user);
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Profile updated!'
                    })
                }).catch((err) => {
                    MySwal.fire({
                        position: 'center',
                        icon: 'error',
                        title: 'Oops...',
                        text: err.message
                    })
                })
            }
        })
    }

    const accountDeactivation = () => {
        MySwal.fire({
            title: "Are you sure to deactivate account?",
            showCancelButton: true,
            confirmButtonText: "Yes"
        }).then(result => {
            if (result.isConfirmed)
                deactivateAccount(user.id).then(res => {
                    MySwal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Profile updated!'
                    });

                    logOut();
                }).catch((err) => MySwal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: err.message
                }))
        })
    }

    const logOut = () => {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div>
            <DashboardNav />
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/bg8.jpg") + ")",
                    }}
                ></div>
                <Container>
                    <Row>
                        <Col md="2">

                        </Col>
                        <Col md="8">
                            <Card style={{ color: "black" }}>
                                <CardHeader>
                                    <h4>Edit Profile</h4>
                                </CardHeader>
                                <hr />
                                <CardBody style={{ textAlign: "left" }}>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Email</label>
                                        <input type="email" value={email} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Name</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value={name} onChange={(e) => setName(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">NIC Number</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value={nic} onChange={(e) => setNic(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Birthday</label>
                                        <input type="date" class="form-control" id="exampleInputEmail1" value={birthday} onChange={(e) => setBirthday(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Phone Number</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputEmail1">Address</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" value={address} onChange={(e) => setAddress(e.target.value)} aria-describedby="emailHelp" />
                                    </div>
                                    <div style={{ textAlign: "center" }}>
                                        <Button size="lg" color="success" onClick={saveProfile}>
                                            Save
                                        </Button>
                                    </div>
                                    <hr />

                                    <div style={{ textAlign: "center" }}>
                                        <Button className="btn-round" size="lg" color="danger" outline type="button" onClick={accountDeactivation}>
                                            Deactivate my Account
                                        </Button>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col md="2">

                        </Col>
                    </Row>
                </Container>
            </div>
        </div>

    )
}
