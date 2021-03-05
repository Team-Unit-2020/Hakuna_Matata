import React, {useEffect, useState} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import logo from './img-1.jpg';
import '../../CustomStyles/custom.css';
import { addAdvertisementToFavourites } from '../../services/advertisementService';

export default function Advertisement(props) {

    const [user, setUser] = useState();
    const checkAuth = () => localStorage.getItem("access_token") ? true : false;

    let addtoFavouites = async () => {
        let addedToFavourites = await addAdvertisementToFavourites(user.id, props.ad.id);
        console.log(addedToFavourites)
    }

    useEffect(() => {
        if (checkAuth()) {
            var localUser = JSON.parse(localStorage.getItem("user"));
            setUser(localUser);
        }
    }, [checkAuth()]);

    return (
        <div>
            <Card>
                <Row>
                    <Col md={4}>
                        <img className="advertisement-card-img" width="250px" src={logo} alt="Card image cap" />
                    </Col>
                    <Col md={8}>
                        <Row>
                            <CardBody>
                                <CardTitle tag="h3">{props.ad.name}</CardTitle>
                                <CardSubtitle tag="h5" className="mb-2 text-muted">Price: Rs.{props.ad.price} | Quentity: {props.ad.availableQty}</CardSubtitle>
                                <CardText>{props.ad.description}</CardText>
                                <Button>Button</Button>
                                {checkAuth() && (
                                    <Button onClick={addtoFavouites}>Add to Favourites</Button>
                                )}
                            </CardBody>
                        </Row>
                    </Col>
                </Row>



            </Card>
        </div>
    )
}