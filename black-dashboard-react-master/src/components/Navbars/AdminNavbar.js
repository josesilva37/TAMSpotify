/*!

=========================================================
* Black Dashboard React v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useEffect, useState} from "react";
import { Link } from 'react-router-dom'
// nodejs library that concatenates classes
import classNames from "classnames";
import { Redirect } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader
} from "reactstrap";
import { getUser, getUserPlaylists } from "../../SpotifyAPI/Endpoints";


function AdminNavbar(props) {
  const [isAuthenticated, setIsAuthencticated] = useState(false)
  const [token, setToken] = useState()

  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");

  useEffect(() => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    setToken(hashParams.access_token)
    const access_token = hashParams.access_token
    const state = hashParams.state;
    const storedState = localStorage.getItem('stateKey');
    localStorage.setItem('spotifyAuthToken', access_token);
    localStorage.getItem('spotifyAuthToken');

    // if (window.localStorage.getItem('spotifyAuthToken')) {
    //   this.setState({ isAuthenticatedWithSpotify: true });
    // }
    if(access_token !== null && access_token !== undefined){
      setIsAuthencticated(true)
    }
  }, [isAuthenticated])

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });

  const spotifyAuth = () => {
    setIsAuthencticated(true)
    var scope = 'user-read-private user-read-email user-read-playback-position user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative user-library-read';
    let url =
      'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=d715a0d69e884da2bf8893a5948d74c6' +
      '&scope=' +
      encodeURIComponent(scope) +
      '&redirect_uri=' +
      encodeURIComponent('http://localhost:3000/admin/dashboard');
    window.location = url;

  }
  const goToProfile = async () => {
    // let user = await getUserPlaylists(window.localStorage.getItem('spotifyAuthToken'))
    // console.log(user)
    return <Redirect to="/admin/user-profile"></Redirect>
  }
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand="lg">
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </NavbarToggler>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className="ml-auto" navbar>

              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/anime3.png")} />
                  </div>
                  <b className="caret d-none d-lg-block d-xl-block" />
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                {window.localStorage.getItem('spotifyAuthToken').length === 9 ?
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item" onClick={spotifyAuth}>Log In</DropdownItem>
                    </NavLink>
                  </DropdownMenu> :
                  <DropdownMenu className="dropdown-navbar" right tag="ul">
                    <NavLink tag="li">
                      <DropdownItem className="nav-item"><Link to="/admin/user-profile" style={{color:"black"}}>Profile</Link></DropdownItem>
                    </NavLink>
                  </DropdownMenu>}

              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName="modal-search"
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder="SEARCH" type="text" />
          <button
            aria-label="Close"
            className="close"
            onClick={toggleModalSearch}
          >
            <i className="tim-icons icon-simple-remove" />
          </button>
        </ModalHeader>
      </Modal>
    </>
  );
}

export default AdminNavbar;
