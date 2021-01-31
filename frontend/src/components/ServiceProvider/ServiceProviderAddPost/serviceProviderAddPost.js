import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import DashboardNav from '../../Navbars/DashboardNav';
import '../../../CustomStyles/custom.css'
export default function ServiceProviderAddPost() 

{
    function onCreateAdvertisementClick(){
        console.log("hello")
    }
    return (

        <Col className="ml-auto mr-auto" md="4">
            <h2 className="welcome-msg">Add Post</h2>
            
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleEmail">Product Name</Label>
                                <Input type="email" name="email" id="exampleEmail" placeholder="name placeholder" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="examplePassword">Catogery</Label>
                                <Input type="password" name="password" id="examplePassword" placeholder="email placeholder" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="exampleAddress">Discription about product</Label>
                        <Input type="text" name="address" id="exampleAddress" placeholder="1234 Main St" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="exampleAddress2">Price range</Label>
                        <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
                    </FormGroup>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="exampleCity">Available quntity</Label>
                                <Input type="text" name="city" id="exampleCity" />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label for="exampleState">State</Label>
                                <Input type="text" name="state" id="exampleState" />
                            </FormGroup>
                        </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Label for="exampleZip">Zip</Label>
                                <Input type="text" name="zip" id="exampleZip" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup check>
                        <Input type="checkbox" name="check" id="exampleCheck" />
                        <Label for="exampleCheck" check></Label>
                    </FormGroup>
                    <Button onClick={() => onCreateAdvertisementClick()}>Submit</Button>
                </Form>
            
        </Col>



    )
}
