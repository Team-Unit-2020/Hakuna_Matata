import React, { useState } from 'react'
import {
    Collapse,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container
} from "reactstrap";
import {useHistory} from 'react-router-dom'

export default function DashboardNav(props) {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const history = useHistory();

    const onClickLogout = () => {
        localStorage.clear();
        history.push("/");
    }
    return (
        <Navbar className="bg-info" expand="lg">
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                    >
                        Hakuna Matata
                  </NavbarBrand>
                    <button
                        onClick={() => {
                            document.documentElement.classList.toggle("nav-open");
                            setCollapseOpen(!collapseOpen);
                        }}
                        aria-expanded={collapseOpen}
                        className="navbar-toggler"
                        type="button"
                    >
                        <span className="navbar-toggler-bar bar1"></span>
                        <span className="navbar-toggler-bar bar2"></span>
                        <span className="navbar-toggler-bar bar3"></span>
                    </button>
                </div>
                <Collapse isOpen={collapseOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <p>Discover</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <p>Profile</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <UncontrolledDropdown nav>
                                <DropdownToggle
                                    aria-haspopup={true}
                                    caret
                                    color="default"
                                    href="http://example.com?ref=creativetim"
                                    nav
                                >
                                    <p>{props.user ? props.user.name: "User"}</p>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Action
                                </DropdownItem>
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        Another action
                          </DropdownItem>
                                    <DropdownItem
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClickLogout();
                                        }}
                                    >
                                        Logout
                          </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )
}
