import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getUserById } from '../../services/userService';
import DashboardNav from '../Common/Navbars/DashboardNav';
import Spinner from '../Spinner';
import { searchByQuery } from '../../services/advertisementService'
import { Card, CardBody, CardHeader, Col, Container, Row, FormGroup, Input, InputGroupAddon, InputGroupText, Label, CardFooter, Button } from 'reactstrap';
import AdCard from '../Home/AdCard';

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
    const [needOfCake, setNeedOfCake] = useState(false);
    const [vehicleType, setVehicleType] = useState("");
    const [showMeDresses, setShowMeDresses] = useState(false);
    const [showMeGifts, setShowMeGifts] = useState(false);
    const [showMeDecoration, setShowMeDecoration] = useState(false);
    const [showSoundAndLights, setShowSoundAndLights] = useState(false);
    const [location, setLocation] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [keywords, setKeywords] = useState([]);
    const [allAds, setAllAds] = useState([]);

    useEffect(() => {
        var id = JSON.parse(localStorage.getItem("user")).id;
        getUserById(id)
            .then((u) => {
                setUser(u.user);
            }).finally(() => {
                setLoading(false);
            })
    }, [])

    const handlePartyTypeChange = (event) => {
        setKeywords([event.target.value])
        setEventType(event.target.value);
    }
    const handleGuestCountChange = (event) => {
        setGuestCount(event.target.value);
    }
    const handleNeedOfCake = (event) => {
        if (needOfCake)
            setKeywords([...keywords, "cake"])

        setNeedOfCake(!needOfCake);
    }
    const handleVehicleTypeChange = (event) => {
        setKeywords([...keywords, "vehicle", event.target.value])
        setVehicleType(event.target.value);
    }
    const handleShowMeDresses = (event) => {
        if (showMeDresses)
            setKeywords([...keywords, "dress"])
        setShowMeDresses(!showMeDresses);
    }
    const handleShowMeGifts = (event) => {
        if (setShowMeGifts)
            setKeywords([...keywords, "gift", "gifts"])
        setShowMeGifts(!setShowMeGifts);
    }
    const handleShowMeDecorations = (event) => {
        if (showMeDecoration)
            setKeywords([...keywords, "decos", "decoration"])
        setShowMeDecoration(!showMeDecoration);
    }

    const handleLightsAndMusic = (event) => {
        if (soundsAndLights)
            setKeywords([...keywords, "music", "sounds", "lights", "audio", "visual"])
        setShowSoundAndLights(!soundsAndLights);
    }

    const handleLocation = (event) => {
        setLocation(event.target.value);
    }

    const search = async () => {
        let params = {
            location: location,
            keywords: keywords ?? ""
        }

        let response = await searchByQuery(params);

        setAllAds(response.favouriteAds);
    }

    useEffect(() => {
        console.log(allAds)
    }, [allAds])

    if (loading) {
        return (
            <Spinner />
        )
    } else {
        return (
            <div style={{ maxHeight: "auto"}}>
                <DashboardNav user={user} />
                <div className="page-header clear-filter" filter-color="blue">
                    <div
                        className="page-header-image"
                        style={{
                            // backgroundImage: "url(" + require("../../assets/img/dashboard.jpg") + ")",
                        }}
                    ></div>

                    <Container >
                        <Row>
                            <Col md="4">
                                <Card style={{ color: "black" }}>
                                    <CardHeader>
                                        <h4>Search based on Your Event</h4>
                                    </CardHeader>
                                    <CardBody style={{ textAlign: "left" }}>
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
                                            <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={handleLocation} value={location} />
                                            <small id="emailHelp" class="form-text text-muted">Add your Location.</small>
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
                                                        <Input type="checkbox" checked={needOfCake} onChange={handleNeedOfCake} />
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
                                        {soundsAndLights.filter(x => x == eventType).length > 0 && (
                                            <>
                                                <FormGroup check>
                                                    <Label check>
                                                        <Input defaultChecked type="checkbox" checked={showSoundAndLights} onChange={handleLightsAndMusic} />
                                                        <span className="form-check-sign"></span>
                                            I need Sounds and Lights
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
                                    <CardFooter>
                                        <Button onClick={search} color="primary">Search</Button>
                                    </CardFooter>
                                </Card>
                            </Col>
                            <Col md="8">
                                <Container>
                                    {allAds.map((x) => (
                                        <AdCard ad={x} id={x.id} />
                                    ))}
                                </Container>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )
    }
}
