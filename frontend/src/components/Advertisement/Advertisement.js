import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import logo from './img-1.jpg';
import '../../CustomStyles/custom.css'
export default function Advertisement(props) {

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
                                <CardTitle tag="h3">{props.myprop}</CardTitle>
                                <CardSubtitle tag="h5" className="mb-2 text-muted">sub title</CardSubtitle>
                                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Row>
                    </Col>
                </Row>



            </Card>
        </div>
    )
}