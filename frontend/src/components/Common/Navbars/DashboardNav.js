import React, { useEffect, useState } from 'react'
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
import {useHistory} from 'react-router-dom';
import { getUserById } from '../../../services/userService';

export default function DashboardNav(props) {
    const [collapseOpen, setCollapseOpen] = useState(false);
    const history = useHistory();
    const [user, setUser] = useState(null);
    console.log("🚀 ~ file: DashboardNav.js ~ line 22 ~ DashboardNav ~ user", user)

    const onClickLogout = () => {
        localStorage.clear();
        history.push("/");
    }

    useEffect(() => {
        var id = JSON.parse(localStorage.getItem("user")).id;
        getUserById(id)
        .then((u) => {
            setUser(u.user);
        });
    }, [])

    return (
        <Navbar style={{marginBottom: 0}} className={props.transparent ? "fixed-top navbar-transparent" :"bg-info"} expand="lg">
            <Container>
                <div className="navbar-translate">
                    <NavbarBrand
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push("/");
                        }}
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
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push("/dashboard")
                                }}
                            >
                                <p>Discover</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push("/profile")
                                }}
                            >
                                <p>Profile</p>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                href="#pablo"
                                onClick={(e) => {
                                    e.preventDefault();
                                    history.push("/favourites")
                                }}
                            >
                                <p>Favourites</p>
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
                                    <p>{user ? user.name: "User"}</p>
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
