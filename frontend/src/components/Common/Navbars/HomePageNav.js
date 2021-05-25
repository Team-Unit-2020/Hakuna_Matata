import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
// reactstrap components
import {
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
} from "reactstrap";

export default function HomePageNav() {
    const [navbarColor, setNavbarColor] = useState("navbar-transparent");
    const [collapseOpen, setCollapseOpen] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const updateNavbarColor = () => {
            if (
                document.documentElement.scrollTop > 399 ||
                document.body.scrollTop > 399
            ) {
                setNavbarColor("");
            } else if (
                document.documentElement.scrollTop < 400 ||
                document.body.scrollTop < 400
            ) {
                setNavbarColor("navbar-transparent");
            }
        };
        window.addEventListener("scroll", updateNavbarColor);
        return function cleanup() {
            window.removeEventListener("scroll", updateNavbarColor);
        };
    });
    return (
        <div>
            {collapseOpen ? (
                <div
                    id="bodyClick"
                    onClick={() => {
                        document.documentElement.classList.toggle("nav-open");
                        setCollapseOpen(false);
                    }}
                />
            ) : null}
            <Navbar className={"fixed-top " + navbarColor} style={{marginBottom: "-20px !important"}} expand="lg" color="info">
                <Container>
                    <div className="navbar-translate">
                        <NavbarBrand
                            href="/"
                            id="navbar-brand"
                        >
                            Hakuna Matata
                        </NavbarBrand>
                    </div>
                    <Nav navbar>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push("/service-seeker/signup");
                                }}
                            >
                                <i className="now-ui-icons users_single-02"></i>
                                <p>Signup</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push("/login");
                                }}
                            >
                                <i className="now-ui-icons ui-1_lock-circle-open"></i>
                                <p>Login</p>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}
