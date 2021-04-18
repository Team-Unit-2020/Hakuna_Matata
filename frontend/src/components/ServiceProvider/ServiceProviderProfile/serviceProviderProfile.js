import React from "react";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
} from "reactstrap";
import DashboardNav from "../../Navbars/DashboardNav";
import "../../../CustomStyles/custom.css";
import ServiceProviderService from "../../../services/service-provider.service";
import Avatar from "react-avatar-edit";

export default class ServiceProviderProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeServiceProviderName = this.onChangeServiceProviderName.bind(
      this
    );
    this.onChangeServiceProviderEmail = this.onChangeServiceProviderEmail.bind(
      this
    );
    this.onChangeServiceProviderAddress = this.onChangeServiceProviderAddress.bind(
      this
    );
    this.onChangeServiceProviderMobileNumber = this.onChangeServiceProviderMobileNumber.bind(
      this
    );
    this.onChangeServiceProviderAboutMe = this.onChangeServiceProviderAboutMe.bind(
      this
    );
    this.onChangeProfilePicture = this.onChangeProfilePicture.bind(this);
    this.onCrop = this.onCrop.bind(this);
    var userId = JSON.parse(localStorage.getItem("user")).id;
    this.state = {
      src: null,
      userId: this.userId,
      serviceproviderId: null,
      serviceproviderimage: null,
      serviceprovidername: "",
      serviceprovideremail: "",
      serviceprovideraddress: "",
      serviceprovidermobilenumber: "",
      serviceprovideraboutme: "",
      profile: true,
      profileData: undefined,
      disabled: false,
    };
  }
  onChangeProfilePicture(e) {
    this.setState({
      serviceproviderimage: e.target.files[0],
    });
  }
  onChangeServiceProviderName(e) {
    this.setState({
      serviceprovidername: e.target.value,
    });
  }
  onChangeServiceProviderEmail(e) {
    this.setState({
      serviceprovideremail: e.target.value,
    });
  }
  onChangeServiceProviderAddress(e) {
    this.setState({
      serviceprovideraddress: e.target.value,
    });
  }
  onChangeServiceProviderMobileNumber(e) {
    this.setState({
      serviceprovidermobilenumber: e.target.value,
    });
  }
  onChangeServiceProviderAboutMe(e) {
    this.setState({
      serviceprovideraboutme: e.target.value,
    });
  }
  onSubmit() {
    if (this.state.profile) {
      console.log(this.state.profileData);
      var data = {
        id: this.state.profileData.id,
        profileimage: this.state.serviceproviderimage,
        name: this.state.serviceprovidername,
        email: this.state.serviceprovideremail,
        address: this.state.serviceprovideraddress,
        mobilenumber: this.state.serviceprovidermobilenumber,
        aboutme: this.state.serviceprovideraboutme,
      };

      ServiceProviderService.updateProfile(data)
        .then((res) => {
          console.log(res);
          this.setState({
            id: res.body.id,
          });
          // window.alert("Submited Sucessfully")
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      var data = {
        userId: this.state.userId,
        profileimage: this.state.serviceproviderimage,
        name: this.state.serviceprovidername,
        email: this.state.serviceprovideremail,
        address: this.state.serviceprovideraddress,
        mobilenumber: this.state.serviceprovidermobilenumber,
        aboutme: this.state.serviceprovideraboutme,
      };

      ServiceProviderService.addProfile(data)
        .then((res) => {
          console.log(res);
          this.setState({
            id: res.body.id,
          });
          // window.alert("Submited Sucessfully")
          window.location.reload();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  clearAllFields() {
    this.setState({
      serviceprovidername: "",
      serviceprovideremail: "",
      serviceprovideraddress: "",
      serviceprovidermobilenumber: "",
      serviceprovideraboutme: "",
    });
  }

  onCrop(pv) {
    this.setState({
      serviceproviderimage: pv,
    });
  }

  componentDidMount() {
    this.checkProfile(JSON.parse(localStorage.getItem("user")).id);
  }

  checkProfile(id) {
    ServiceProviderService.checkProfile(id)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.setState({
            profile: true,
            profileData: res.body[0],
            serviceprovidername: res.body[0].name,
            onChangeServiceProviderEmail: res.body[0].email,
            onChangeServiceProviderAddress: res.body[0].address,
            onChangeServiceProviderMobileNumber: res.body[0].mobilenumber,
            onChangeServiceProviderAboutMe: res.body[0].aboutme,
            disabled: true,
          });
        }

        // window.alert("Submited Sucessfully")
        // window.location.reload()
      })
      .catch((e) => {
        console.log(e);
      });
  }

  renderProfile() {
    if (this.state.profileData) {
      var profile = this.state.profileData;

      return (
        <div>
          {JSON.stringify(profile)}
          {/* Name - {profile['name']}
         address - {profile['address']}
         Name - {profile['name']}
         Name - {profile['name']} */}
        </div>
      );
    }
    return <h1>Loading</h1>;
  }

  formUpdate(e) {
    e.preventDefault();
    this.setState({
      disabled: !this.state.disabled,
    });
  }

  render() {
    return (
      <div
        style={{
          backgroundImage:
            "url(" + require("../../../assets/img/header.jpg") + ")",
          backgroundRepeat: "repeat-x",
          minHeight: 1000,
        }}
      >
        <DashboardNav />

        {/* {this.state.profile ? this.renderProfile() : */}
        <Col className="ml-auto mr-auto" md="4">
          <h1 className="welcome-msg" hidden={this.state.id != null}>
            {" "}
            Create Profile{" "}
          </h1>
          <h1 className="welcome-msg" hidden={this.state.id == null}>
            {" "}
            Update Profile{" "}
          </h1>
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

                <button onClick={this.formUpdate.bind(this)}>
                  {" "}
                  {this.state.disabled
                    ? "update profile"
                    : "Cancel update"}{" "}
                </button>

                <Col md={6}>
                  <img src={this.state.serviceproviderimage} alt="Preview" />
                </Col>
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <Label for="serviceprovidername">Name</Label>
                    <Input
                      disabled={this.state.disabled ? "disabled" : ""}
                      type="name"
                      name="serviceprovidername"
                      id="serviceprovidername"
                      required
                      placeholder="enter your name"
                      value={this.state.serviceprovidername}
                      onChange={this.onChangeServiceProviderName}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <FormGroup>
                <Label for="serviceprovideremail">Email</Label>
                <Input
                  disabled={this.state.disabled ? "disabled" : ""}
                  type="email"
                  name="serviceprovideremail"
                  id="serviceprovideremail"
                  required
                  placeholder="enter your email"
                  value={this.state.onChangeServiceProviderEmail}
                  onChange={this.onChangeServiceProviderEmail}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serviceprovideraddress">Address</Label>
                <Input
                  disabled={this.state.disabled ? "disabled" : ""}
                  type="text"
                  name="serviceprovideraddress"
                  id="serviceprovideraddress"
                  required
                  placeholder="Apartment, studio, or floor"
                  value={this.state.onChangeServiceProviderAddress}
                  onChange={this.onChangeServiceProviderAddress}
                />
              </FormGroup>
              <Row form>
                <Col md={6}>
                  <FormGroup>
                    <Label for="serviceprovidermobilenumber">
                      Mobile Number
                    </Label>
                    <Input
                      disabled={this.state.disabled ? "disabled" : ""}
                      type="text"
                      name="serviceprovidermobilenumber"
                      id="serviceprovidermobilenumber"
                      required
                      placeholder="enter your mobile number"
                      value={this.state.onChangeServiceProviderMobileNumber}
                      onChange={this.onChangeServiceProviderMobileNumber}
                    />
                  </FormGroup>
                </Col>
                <Col md={8}>
                  <FormGroup>
                    <Label for="serviceprovideraboutme">About Me</Label>
                    <Input
                      disabled={this.state.disabled ? "disabled" : ""}
                      type="text"
                      name="serviceprovideraboutme"
                      id="serviceprovideraboutme"
                      required
                      placeholder="description about you"
                      value={this.state.onChangeServiceProviderAboutMe}
                      onChange={this.onChangeServiceProviderAboutMe}
                    />
                  </FormGroup>
                </Col>
                <Col md={2}></Col>
              </Row>

              <Button
                onClick={(e) => {
                  e.preventDefault();
                  this.onSubmit();
                }}
              >
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
        {/* } */}
      </div>
    );
  }
}
