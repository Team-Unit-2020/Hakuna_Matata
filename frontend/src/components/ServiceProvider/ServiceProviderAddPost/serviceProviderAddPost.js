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
                                <Label for="productname">Product Name</Label>
                                <Input type="text" name="productname" id="productname" placeholder="Enter Product Name" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productcatogery">Catogery</Label>
                                <Input type="text" name="productcatogery" id="productcatogery" placeholder="Enter Product Category" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="productdiscription">Description about Product</Label>
                        <Input type="text" name="productdiscription" id="productdiscription" placeholder="Enter a description about the product here" />
                    </FormGroup>
                    
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productprice">Price </Label>
                                <Input type="text" name="productprice" id="productprice" placeholder="Enter the price" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productavailableqty">Available Quantity</Label>
                                <Input type="text" name="productavailableqty" id="productavailableqty" placeholder="Enter the quantity" />
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
