import React, { useState, useEffect } from 'react'
import DashboardNav from '../Common/Navbars/DashboardNav';
import HomePageNav from '../Common/Navbars/HomePageNav'
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Col,
    Badge,
    Button
} from "reactstrap";
import { getAdvertisementbyId } from '../../services/advertisementService';
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../Common/Spinner';
import Corusel from '../Common/Corusel';
import Map from '../Common/Map';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { addAdvertisementToFavourites } from '../../services/advertisementService'

const SweetAlert = withReactContent(Swal)

export default function ViewAd() {
    const [user, setUser] = useState();
    let { id } = useParams();
    const [advertisement, setAdvertisement] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const checkAuth = () => localStorage.getItem("access_token") ? true : false;
    const history = useHistory();

    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
        }
    }, [checkAuth()]);

    useEffect(() => {

        getAdvertisementbyId(id).then(ad => {
            setAdvertisement(ad.ad);
        }).finally(() => setIsLoading(false))

    }, [])

    const goToOrderPage = (id) => {
        history.push(`/order/${id}`)
    }

    const addToFavourites = () => {
        addAdvertisementToFavourites(user.id, id).
            then(result => SweetAlert
                .fire({ position: 'center', icon: 'success', title: result.message, showConfirmButton: true }))
            .catch(err => SweetAlert.fire({ position: 'center', icon: 'error', title: err.message, showConfirmButton: true }))
    }
    return (
        <div>
            {isLoading ? (<Spinner marginTop={"25vh"} />) : (
                <div>
                    {checkAuth() ? (<DashboardNav transparent={false} user={user} />) : (<HomePageNav />)}
                    <div className="page-header clear-filter" filter-color="blue">
                        <div
                            className="page-header-image"
                            style={{
                                backgroundImage: "url(" + require("../../assets/img/header.jpg") + ")",
                                backgroundRepeat: "repeat-x"
                            }}
                        ></div>
                        <Container>
                            <Row>
                                <Card style={{ color: "black" }}>

                                    <div>
                                        <CardHeader style={{ paddingTop: 10 }}>
                                            <h3>{advertisement.title}</h3>
                                        </CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col md={6} style={{ maxheight: "40vh" }}>
                                                    <Corusel images={advertisement.images} title={advertisement.title} />

                                                </Col>
                                                <Col md={6} style={{ height: "100vh" }}>
                                                    <Row style={{ padding: 25 }}>
                                                        {advertisement.body}
                                                    </Row>
                                                    <Row style={{ textAlign: "left" }}>
                                                        <Col md={12}>
                                                            <b>Phone Number: </b>{advertisement.serviceProvider.phoneNumber.map(number => (<Badge color="primary" className="mr-1">{number} </Badge>))}
                                                        </Col>
                                                        <Col md={12}>
                                                            <b>Email: </b>{advertisement.serviceProvider.email}
                                                        </Col>
                                                        <Col md={12}>
                                                            <b>Location: </b>{advertisement.location.text}
                                                        </Col>
                                                        <Col md={12}>
                                                            <b>Service Provider: </b>{advertisement.serviceProvider.name}
                                                        </Col>
                                                        <Col md={12}>
                                                            <b>Member since: </b>{advertisement.serviceProvider.memberSince}
                                                        </Col>
                                                        <hr />
                                                        <Col md={12}>
                                                            <b>Tags: </b>{advertisement.keywords.map(keyword => (<Badge color="info" className="mr-1">{keyword} </Badge>))}
                                                        </Col>
                                                        {checkAuth() && (
                                                            <Col md={12} style={{ textAlign: "center", padding: 30 }}>
                                                                <Button className="btn btn-block" color="success" onClick={() => goToOrderPage(advertisement.id)}>
                                                                    Order Service
                                                                </Button>
                                                                <Button className="btn btn-block" color="info" onClick={addToFavourites}>
                                                                    Add to Favourites
                                                                </Button>
                                                            </Col>
                                                        )}
                                                        <Col style={{ minHeight: "35vh" }}>
                                                            <hr />
                                                            <Map lan={advertisement.location.lan} lat={advertisement.location.lat} />
                                                        </Col>
                                                    </Row>

                                                </Col>
                                            </Row>
                                        </CardBody>
                                    </div>
                                </Card>
                            </Row>
                        </Container>
                    </div>
                </div>)}
        </div>
    )
}
