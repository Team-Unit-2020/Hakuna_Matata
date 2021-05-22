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
import history from "../../../_helpers/history";
import { withRouter } from "react-router-dom";


class ServiceProviderAddPost extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeProductName = this.onChangeProductName.bind(this);
    this.onChangeProductCategory = this.onChangeProductCategory.bind(this);
    this.onChangeProductDescription = this.onChangeProductDescription.bind(
      this
    );
    this.onChangeProductPrice = this.onChangeProductPrice.bind(this);
    this.onChangeProductAvailableQty = this.onChangeProductAvailableQty.bind(
      this
    );
    this.onCreateAdvertisementClick = this.onCreateAdvertisementClick.bind(
      this
    );
    var userId = JSON.parse(localStorage.getItem("user")).id;
    this.state = {
      id: null,
      userId: this.userId,
      productname: "",
      productcategory: "",
      productdescription: "",
      productprice: 0,
      productavailableqty: 0,
      keywords: "",
      images: null,
      location: null,
      isActive: true,
    };
  }

  

  componentDidMount() {
    var user = localStorage.getItem("user");
    var userObj = JSON.parse(user);
    this.setState({ userID: userObj.id });
  }

  onChangeProductName(e) {
    this.setState({
      productname: e.target.value,
    });
  }
  onChangeProductCategory(e) {
    this.setState({
      productcategory: e.target.value,
    });
  }
  onChangeProductDescription(e) {
    this.setState({
      productdescription: e.target.value,
    });
  }
  onChangeProductPrice(e) {
    this.setState({
      productprice: e.target.value,
    });
  }
  onChangeProductAvailableQty(e) {
    this.setState({
      productavailableqty: e.target.value,
    });
  }

  onChangeProductKeywords = (e) => {
    this.setState({ keywords: e.target.value });
  };

  onChangeProductActiveStatus = (e) => {
    this.setState({ isActive: e.target.value });
  };

  onChangeImages = (e) => {
    this.setState({ images: e.target.value });
  };

  onChangeProductLocation = (e) => {
    this.setState({ location: e.target.value });
  };

  clearField = () => {
    this.setState({
      productname: "",
      productcategory: "",
      productdescription: "",
      productprice: 0,
      productavailableqty: 0,
      keywords: "",
      images: "",
      location: "",
      isActive: true,
    })
  }

  onCreateAdvertisementClick() {
    var data = {
      userId: this.state.userID,
      productname: this.state.productname,
      productcategory: this.state.productcategory,
      productdescription: this.state.productdescription,
      productprice: this.state.productprice,
      productavailableqty: this.state.productavailableqty,
      keywords: this.state.keywords,
      isActive: this.state.isActive,
      images: this.state.images,
      location: this.state.location,
    };
    console.log(
      "ServiceProviderAddPost ~ onCreateAdvertisementClick ~ data",
      data
    );
    ServiceProviderService.addPost(data)
      .then((res) => {
        console.log("add service-provider : res : ", res);
        this.props.history.push("/service-provider/dashboard")
      })
      .catch((e) => {
        console.log("add service-provider : err : ", e);
        this.clearField()
        this.props.history.push("/service-provider/dashboard")

      });
  }
  render() {
    const {
      productavailableqty,
      keywords,
      images,
      location,
      isActive,
    } = this.state;
    return (
      <div
      style={{
        backgroundImage:
          "url(" + require("../../../assets/img/header.jpg") + ")",
        backgroundRepeat: "repeat-x",
        minHeight: 1000,
      }}>
        <Col className="ml-auto mr-auto" md="4">
        <h2 className="welcome-msg">Add Post</h2>

        <Form>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="productname">Product Name</Label>
                <Input
                  type="text"
                  name="productname"
                  id="productname"
                  required
                  placeholder="Enter Product Name"
                  value={this.state.productname}
                  onChange={this.onChangeProductName}
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
                  value={this.state.productcategory}
                  onChange={this.onChangeProductCategory}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="productdescription">Description about Product</Label>
            <Input
              type="textarea"
              name="productdescription"
              id="productdescription"
              required
              placeholder="Enter a description about the product here"
              value={this.state.productdescription}
              onChange={this.onChangeProductDescription}
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
                  value={this.state.productprice}
                  onChange={this.onChangeProductPrice}
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
                  value={this.state.productavailableqty}
                  onChange={this.onChangeProductAvailableQty}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="productprice">Keywords </Label>
                <Input
                  type="text"
                  name="productprice"
                  id="productprice"
                  required
                  placeholder="Enter the keywords"
                  value={keywords}
                  onChange={this.onChangeProductKeywords}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="productavailableqty">Active Status</Label>
                <Input
                  type="checkbox"
                  name="productavailableqty"
                  id="productavailableqty"
                  required
                  placeholder="Enter the quantity"
                  defaultChecked={true}
                  value={isActive}
                  onChange={this.onChangeProductActiveStatus}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <Col md={6}>
              <FormGroup>
                <Label for="productprice">Images </Label>
                <Input
                  type="text"
                  name="productprice"
                  id="productprice"
                  required
                  placeholder="Enter the images"
                  value={images}
                  onChange={this.onChangeImages}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="productavailableqty">Location</Label>
                <Input
                  type="text"
                  name="productavailableqty"
                  id="productavailableqty"
                  required
                  placeholder="Enter the location"
                  value={location}
                  onChange={this.onChangeProductLocation}
                />
              </FormGroup>
            </Col>
          </Row>

          <Button
            onClick={(e) => {
              e.preventDefault();
              this.onCreateAdvertisementClick();
            }}
          >
            Submit
          </Button>
        </Form>
      </Col>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "First name is required";
  }
  if (!values.lastName) {
    errors.lastName = "Last name is required";
  }
  if (!values.contactNumber) {
    errors.contactNumber = "Contact number is required";
  }
  if (!values.addressLine1) {
    errors.addressLine1 = "Address line 1 is required";
  }
  if (!values.city) {
    errors.city = "City is required";
  }
  if (!values.state) {
    errors.state = "State is required";
  }
  if (!values.country) {
    errors.country = "Country is required";
  }
  if (!values.zip) {
    errors.zip = "Zip code is required";
  }

  return errors;
};

// export default withRouter(
//   reduxForm({
//     form: "ServiceProviderAddPost_form",
//     validate,
//   })(connect(mapStateToProps, mapDispatchToProps)(ServiceProviderAddPost))
// );

export default withRouter(ServiceProviderAddPost);
