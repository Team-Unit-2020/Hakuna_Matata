import React, {useState, useEffect} from 'react'
import { Container, Button, Input, InputGroup } from "reactstrap";
import DashboardNav from '../Navbars/DashboardNav';
import HomePageNav from '../Navbars/HomePageNav';

export default function Home() {

    const [user, setUser] = useState();
    const checkAuth = () => localStorage.getItem("access_token") ? true : false;
    useEffect(() => {
        if(checkAuth()){
            var localUser = JSON.parse(localStorage.getItem("user"));
            console.log("trig")
            setUser(localUser);
        }
    }, [checkAuth()]);

    

    return (
        <div>
            {checkAuth() ? (<DashboardNav user={user}/>) : (<HomePageNav />)}
            <div className="page-header clear-filter" filter-color="blue">
                <div
                    className="page-header-image"
                    style={{
                        backgroundImage: "url(" + require("../../assets/img/header.jpg") + ")",
                    }}
                ></div>
                <Container style={{ marginTop: '20%' }}>
                    <div className="content-center brand">
                        <InputGroup>
                            <Input
                                className="form-control-success form-control-lg"
                                placeholder="What do you need..."
                                type="text"
                            ></Input>
                        </InputGroup>
                        <div className="col text-center">
                            <Button
                                className="btn-round btn-white"
                                color="info"
                                size="lg"
                            >
                                <i className="now-ui-icons ui-1_zoom-bold"></i> Search
                            </Button>
                        </div>
                    </div>

                </Container>
            </div>
        </div>

    )
}
