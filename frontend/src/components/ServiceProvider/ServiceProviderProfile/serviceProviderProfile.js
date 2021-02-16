import React from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, Card } from 'reactstrap';
import DashboardNav from '../../Navbars/DashboardNav';
import '../../../CustomStyles/custom.css';

export default function ServiceProviderProfile() {

  return (
    <Col className="ml-auto mr-auto" md="4">
      <h1 className="welcome-msg">Create Profile</h1>
      <Card>
        <Form>
          <Row form>
            <Col md={10}>
              <div class="kv-avatar">
                  <div class="file-loading">
                      <input id="avatar-1" name="avatar-1" type="file" required/>
                  </div>
              </div>
              <div class="kv-avatar-hint">
                  <small>Select file</small>
              </div>
            </Col>
           
              <FormGroup>
                <Label for="examplename">Name</Label>
                <Input type="name" name="name" id="exampelname" placeholder="enter your name" />
              </FormGroup>
            
          </Row>
          <FormGroup>
            <Label for="exampleemail">Email</Label>
            <Input type="text" name="email" id="exampleAddress" placeholder="enter your email" />
          </FormGroup>
          <FormGroup>
            <Label for="exampleAddress2">Address</Label>
            <Input type="text" name="address2" id="exampleAddress2" placeholder="Apartment, studio, or floor" />
          </FormGroup>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleCity">Mobile Number</Label>
                <Input type="number" name="mobilenumber" id="examplemobilenumber" placeholder="enter your mobile number" />
              </FormGroup>
            </Col>
            <Col md={8}>
              <FormGroup>
                <Label for="exampleaboutme">About Me</Label>
                <Input type="text" name="aboutme" id="exampleaboutme" placeholder="description about you" />
              </FormGroup>
            </Col>
            <Col md={2}>
              
            </Col>
          </Row>
          
          <Button>Submit</Button>
        </Form>
      </Card>
    </Col>



  )
}
