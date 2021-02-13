import React, { Component } from 'react';
import {
    Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import AuthenticationButton from "./authentication-button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faUser } from '@fortawesome/free-solid-svg-icons';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
        };
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleLogin(event) {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value });
        event.preventDefault();

    }

    handleLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <React.Fragment>
                <Navbar dark expand="md" sticky={'top'}>
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <NavbarBrand className="mr-auto" href="/">
                            <img src="/sitar_icon-icons.com_68647.png" height="30" width="30"
                                alt="Ristorante Con Fusion" />
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar className="ml-auto">
                                <NavItem>
                                    <NavLink className="nav-link" to="" exact>
                                        <span className="fa fa-home fa-lg"></span> Home
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"></span> About Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/content/1">
                                        <span className="fa fa-list fa-lg"></span> Ustad Amir khan
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/favorites">
                                        <span className="fa fa-heart fa-lg"></span> My Favorites
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card fa-lg"></span> Contact Us
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/profile" exact>
                                        <FontAwesomeIcon icon={faUser} /> Profile
                                    </NavLink>

                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/posts" exact>
                                        <FontAwesomeIcon icon={faPencilAlt} /> Posts
                                    </NavLink>

                                </NavItem>
                            </Nav>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <AuthenticationButton />



                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
                {/* <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>AMIR KHANI KHAYAL</h1>
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sint qui commodi laudantium alias dolores eos reiciendis dolorem sed repellendus, reprehenderit odit ea. Nesciunt harum exercitationem repudiandae soluta neque cumque.</p>
                            </div>
                        </div>
                    </div>
                </Jumbotron> */}

            </React.Fragment>
        );
    }
}

export default Header;