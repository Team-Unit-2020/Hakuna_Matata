import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import DashboardNav from '../../Navbars/DashboardNav';
import '../../../CustomStyles/custom.css';
import ServiceProviderService from '../../../services/service-provider.service';
import Avatar from "react-avatar-edit";

export default class ServiceProviderProfile extends React.Component {
  constructor(props){
    super(props);
    this.onChangeServiceProviderName=this.onChangeServiceProviderName.bind(this);
    this.onChangeServiceProviderEmail=this.onChangeServiceProviderEmail.bind(this);
    this.onChangeServiceProviderAddress=this.onChangeServiceProviderAddress.bind(this);
    this.onChangeServiceProviderMobileNumber=this.onChangeServiceProviderMobileNumber.bind(this);
    this.onChangeServiceProviderAboutMe=this.onChangeServiceProviderAboutMe.bind(this);
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    this.onCrop = this.onCrop.bind(this);
    var userId = JSON.parse(localStorage.getItem("user")).id;
    this.state ={
      src:null,
      userId: this.userId,
      serviceproviderimage: null,
      serviceprovidername: "",
      serviceprovideremail:"",
      serviceprovideraddress:"",
      serviceprovidermobilenumber:"",
      serviceprovideraboutme:"",
    }
  }
  onChangeProfilePicture(e){
    this.setState({
      serviceproviderimage: e.target.files[0]
    });
  }
  onChangeServiceProviderName(e){
    this.setState({
      serviceprovidername: e.target.value
    });
  }
  onChangeServiceProviderEmail(e){
    this.setState({
      serviceprovideremail: e.target.value
    });
  }
  onChangeServiceProviderAddress(e){
    this.setState({
      serviceprovideraddress: e.target.value
    });
  }
  onChangeServiceProviderMobileNumber(e){
    this.setState({
      serviceprovidermobilenumber: e.target.value
    });
  }
  onChangeServiceProviderAboutMe(e){
    this.setState({
      serviceprovideraboutme:e.target.value
    });
  }
  onSubmit(){
    var data = {
      serviceproviderimage: this.state.serviceproviderimage,
      serviceprovidername: this.state.serviceprovidername,
      serviceprovideremail:this.state.serviceprovideremail,
      serviceprovideraddress:this.state.serviceprovideraddress,
      serviceprovidermobilenumber:this.state.serviceprovidermobilenumber,
      serviceprovideraboutme:this.state.serviceprovideraboutme,
    }
    var userId = JSON.parse(localStorage.getItem("user")).id;

    ServiceProviderService.updateProfile(userId,data)
    .then(res =>{
      console.log(res);
    })
    .catch(e =>{
      console.log(e);
    })
  }

  clearAllFields(){
    this.setState({
      serviceprovidername: "",
      serviceprovideremail:"",
      serviceprovideraddress:"",
      serviceprovidermobilenumber:"",
      serviceprovideraboutme:""
    })
  }
  
  onCrop(pv) {
    this.setState({
      serviceproviderimage: pv
    });
  }

  render(){
    return (
      <Col className="ml-auto mr-auto" md="4">
        <h1 className="welcome-msg">Create Profile</h1>
        <Card>
          <Form>
            <Row form>

              <Col md={6}>
                  <Avatar
                    width={200}
                    height={200}
                    onCrop={this.onCrop}
                    src={this.state.src}
                  />
              </Col>
              
        
              
              <Col md={6}>
              <img src={this.state.serviceproviderimage} alt="Preview" />
              </Col>
            </Row>
            <Row form>
              <Col>
                <FormGroup>
                  <Label for="serviceprovidername">Name</Label>
                  <Input 
                  type="name"
                  name="serviceprovidername" 
                  id="serviceprovidername" 
                  required
                  placeholder="enter your name" 
                  value = {this.state.serviceprovidername}
                  onChange = {this.onChangeServiceProviderName}
                  />
                </FormGroup>
              
              </Col> 
            </Row>
            <FormGroup>
              <Label for="serviceprovideremail">Email</Label>
              <Input 
              type="email" 
              name="serviceprovideremail"
              id="serviceprovideremail"
              required
              placeholder="enter your email"
              value = {this.state.onChangeServiceProviderEmail}
              onChange = {this.onChangeServiceProviderEmail}

                 />
            </FormGroup>
            <FormGroup>
              <Label for="serviceprovideraddress">Address</Label>
              <Input
              type="text" 
              name="serviceprovideraddress"
              id="serviceprovideraddress"
              required
              placeholder="Apartment, studio, or floor"
              value = {this.state.onChangeServiceProviderAddress}
              onChange = {this.onChangeServiceProviderAddress}

               />
            </FormGroup>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="serviceprovidermobilenumber">Mobile Number</Label>
                  <Input
                  type="text" 
                  name="serviceprovidermobilenumber"
                  id="serviceprovidermobilenumber"
                  required
                  placeholder="enter your mobile number" 
                  value = {this.state.onChangeServiceProviderMobileNumber}
                  onChange = {this.onChangeServiceProviderMobileNumber}

                     />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Label for="serviceprovideraboutme">About Me</Label>
                  <Input
                  type="text" 
                  name="serviceprovideraboutme"
                  id="serviceprovideraboutme" 
                  required
                  placeholder="description about you"
                  value = {this.state.onChangeServiceProviderAboutMe}
                  onChange = {this.onChangeServiceProviderAboutMe}
                  
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                
              </Col>
            </Row>
            
            <Button
            onClick={ (e)=>{
              e.preventDefault();
              this.onSubmit();
            }
            }
            >Submit</Button>
          </Form>
        </Card>
      </Col>
    )
  }
  
}
