import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { getUserById } from '../../services/userService';
import DashboardNav from '../Common/Navbars/DashboardNav';
import Spinner from '../Spinner';
import { Card, CardBody, CardHeader, Col, Container, Row, FormGroup, Input, InputGroupAddon, InputGroupText, Label } from 'reactstrap';

export default function Dashboard() {
    const places = ["birthday", "wedding", "tobeparties", "gettogethers"];
    const cakes = ["birthday", "wedding"];
    const vehicles = ["wedding"];
    const dresses = ["birthday", "wedding", "haloween"];
    const gifts = ["birthday", "wedding", "tobeparties", "graduations"];
    const decorations = ["birthday", "wedding", "tobeparties", "gettogethers", "familyreunions", "haloween"];
    const soundsAndLights = ["wedding", "gettogethers", "christmas", "yearend", "haloween"]

    const [eventType, setEventType] = useState("");
    const [guestCount, setGuestCount] = useState(0);
    const [needOfCake, setNeedOfCake] = useState(true);
    const [vehicleType, setVehicleType] = useState("");
    const [showMeDresses, setShowMeDresses] = useState(true);
    const [showMeGifts, setShowMeGifts] = useState(true);
    const [showMeDecoration, setShowMeDecoration] = useState(true);
    const [location, setLocation] = useState("");
    const [user, setUser ] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var id = JSON.parse(localStorage.getItem("user")).id;
        getUserById(id)
        .then((u) => {
            setUser(u.user);
        }).finally(() => {
            setLoading(false);
        })
    },[])

    const handlePartyTypeChange = (event) => {
        setEventType(event.target.value);
    }
    const handleGuestCountChange = (event) => {
        setGuestCount(event.target.value);
    }
    const handleNeedOfCake = (event) => {
        setNeedOfCake(!needOfCake);
    }
    const handleVehicleTypeChange = (event) => {
        setVehicleType(event.target.value);
    }
    const handleShowMeDresses = (event) => {
        setShowMeDresses(!showMeDresses);
    }
    const handleShowMeGifts = (event) => {
        setShowMeDresses(!setShowMeGifts);
    }
    const handleShowMeDecorations = (event) => {
        setShowMeDecoration(!showMeDecoration);
    }

    if(loading){
        return(
            <Spinner/>
        )
    }else{
        return (
            <div>
                <DashboardNav user={user}/> 
                <div className="page-header clear-filter" filter-color="blue">
                    <div
                        className="page-header-image"
                        style={{
                            // backgroundImage: "url(" + require("../../assets/img/dashboard.jpg") + ")",
                        }}
                    ></div>
    
                    <Container>
                        <Row>
                            <Col md="4">
                                <Card style={{ color: "black" }}>
                                    <CardHeader>
                                        <h4>Search based on Your Event</h4>
                                    </CardHeader>
                                    <CardBody style={{ textAlign: "left"}}>
                                        <h6>Select Your Event type:</h6>
                                        <select className="form-control" value={eventType} onChange={handlePartyTypeChange}>
                                            <option value="">Select...</option>
                                            <option value="birthday">Birthday Party</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="tobeparties">To Be Party</option>
                                            <option value="gettogethers">Get together Party</option>
                                            <option value="graduations">Graduation Party</option>
                                            <option value="anniversary">Anniversary Party</option>
                                            <option value="yearend">Year end Party</option>
                                            <option value="teaparty">Tea Party</option>
                                            <option value="christmas">Christmas Party</option>
                                            <option value="haloween">Haloween Party</option>
                                            <option value="welcome">Welcome Party</option>
                                            <option value="cocktail">Cocktail Party</option>
                                            <option value="all">Other - All Options</option>
                                        </select>
                                        <hr />
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Location</label>
                                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleGuestCountChange} value={guestCount} />
                                            <small id="emailHelp" class="form-text text-muted">Add approximate number of guests.</small>
                                        </div>
                                        <br />
                                        <div class="form-group">
                                            <label for="exampleInputEmail1">Number of Guests</label>
                                            <input type="number" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleGuestCountChange} value={guestCount} />
                                            <small id="emailHelp" class="form-text text-muted">Add approximate number of guests.</small>
                                        </div>
                                        <br />
                                        {cakes.filter(x => x == eventType).length > 0 && (
                                            <>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input defaultChecked type="checkbox" checked={needOfCake} onChange={handleNeedOfCake} />
                                                        <span className="form-check-sign"></span>
                                                I need a  Cake
                                                    </Label>
    
                                                </FormGroup>
                                                <br />
                                            </>
                                        )}
                                        {dresses.filter(x => x == eventType).length > 0 && (
                                            <>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input defaultChecked type="checkbox" checked={showMeDresses} onChange={handleShowMeDresses} />
                                                        <span className="form-check-sign"></span>
                                                Show me dresses
                                                    </Label>
    
                                                </FormGroup>
                                                <br />
                                            </>
                                        )}
                                        {gifts.filter(x => x == eventType).length > 0 && (
                                            <>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input defaultChecked type="checkbox" checked={showMeGifts} onChange={handleShowMeGifts} />
                                                        <span className="form-check-sign"></span>
                                                Show me Gift Suggestions
                                                    </Label>
                                                </FormGroup>
                                                <br />
                                            </>
                                        )}
                                        {decorations.filter(x => x == eventType).length > 0 && (
                                            <>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input defaultChecked type="checkbox" checked={showMeDecoration} onChange={handleShowMeDecorations} />
                                                        <span className="form-check-sign"></span>
                                                Show me Decorations
                                                    </Label>
    
                                                </FormGroup>
                                                <br />
                                            </>
                                        )}
                                        {vehicles.filter(x => x == eventType).length > 0 && (<div class="form-group">
                                            <label for="exampleInputEmail1">Vehicle Type</label>
                                            <select className="form-control" value={vehicleType} onChange={handleVehicleTypeChange}>
                                                <option value="">Select...</option>
                                                <option value="car">Car</option>
                                                <option value="suv">SUV</option>
                                                <option value="antique">Antique Car</option>
                                                <option value="van">Van</option>
                                                <option value="bike">Motor Bike</option>
                                            </select>
                                        </div>)}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md="8">
    
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
                                        }
}
