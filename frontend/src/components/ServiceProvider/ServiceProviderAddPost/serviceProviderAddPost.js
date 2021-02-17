import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import DashboardNav from '../../Navbars/DashboardNav';
import '../../../CustomStyles/custom.css'
import ServiceProviderService from '../../../services/service-provider.service'

export default class ServiceProviderAddPost extends React.Component{
    
    constructor(props){
        super(props);
        this.onChangeProductName=this.onChangeProductName.bind(this);
        this.onChangeProductCategory=this.onChangeProductCategory.bind(this);
        this.onChangeProductDescription=this.onChangeProductDescription.bind(this);
        this.onChangeProductPrice=this.onChangeProductPrice.bind(this);
        this.onChangeProductAvailableQty=this.onChangeProductAvailableQty.bind(this);
        this.onCreateAdvertisementClick = this.onCreateAdvertisementClick.bind(this);
        var userId = JSON.parse(localStorage.getItem("user")).id;
        this.state = {
            id: null,
            userId: this.userId,
            productname: "",
            productcategory : "",
            productdescription: "",
            productprice: 0,
            productavailableqty: 0
        }
    }

    onChangeProductName(e){
        this.setState({
            productname: e.target.value
        });
    }
    onChangeProductCategory(e){
        this.setState({
            productcategory: e.target.value
        });
    }
    onChangeProductDescription(e){
        this.setState({
            productdescription: e.target.value
        });
    }
    onChangeProductPrice(e){
        this.setState({
            productprice: e.target.value
        });
    }
    onChangeProductAvailableQty(e){
        this.setState({
            productavailableqty: e.target.value
        });
    }

    onCreateAdvertisementClick(){
        var data = {
            userId: this.userId,
            productname: this.state.productname,
            productcategory : this.state.productcategory,
            productdescription: this.state.productdescription,
            productprice: this.state.productprice,
            productavailableqty: this.state.productavailableqty
        };
        ServiceProviderService.addPost(data)
        .then(res =>{
            console.log(res);
        })
        .catch(e=>{
            console.log(e);
        });
        
    }
    render(){
    return (

        <Col className="ml-auto mr-auto" md="4">
            <h2 className="welcome-msg">Add Post</h2>
            
                <Form>
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productname">Product Name</Label>
                                <Input type="text" 
                                name="productname" 
                                id="productname" 
                                required
                                placeholder="Enter Product Name"
                                value = {this.state.productname}
                                onChange = {this.onChangeProductName}
                                 />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productcategory">Catogery</Label>
                                <Input 
                                type="text" 
                                name="productcategory" 
                                id="productcategory" 
                                required
                                placeholder="Enter Product Category"
                                value = {this.state.productcategory}
                                onChange = {this.onChangeProductCategory}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <FormGroup>
                        <Label for="productdescription">Description about Product</Label>
                        <Input 
                        type="text" 
                        name="productdescription"
                        id="productdescription"
                        required 
                        placeholder="Enter a description about the product here"
                        value = {this.state.productdescription}
                        onChange = {this.onChangeProductDescription}

                         />
                    </FormGroup>
                    
                    <Row form>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productprice">Price </Label>
                                <Input 
                                type="text"
                                name="productprice"
                                id="productprice"
                                required 
                                placeholder="Enter the price"
                                value = {this.state.productprice}
                                onChange = {this.onChangeProductPrice} 
                                />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="productavailableqty">Available Quantity</Label>
                                <Input 
                                type="text" 
                                name="productavailableqty"
                                id="productavailableqty"
                                required
                                placeholder="Enter the quantity"
                                value = {this.state.productavailableqty}
                                onChange = {this.onChangeProductAvailableQty}
                                
                                />
                            </FormGroup>
                        </Col>
        
                    </Row>
                    
                    <Button onClick={(e) =>{
                        e.preventDefault();
                        this.onCreateAdvertisementClick();
                    }
                    }>Submit</Button>
                </Form>
            
        </Col>



    )
}
}

