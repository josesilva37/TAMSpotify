import React, { Component } from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    Label,
    FormGroup,
    Input,
    Table,
    Row,
    Col,
    UncontrolledTooltip
  } from "reactstrap";

export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/callback';
class SpotifyAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticatedWithSpotify: false
            // menu: this.props.userId.menu
        };
        this.state.handleRedirect = this.handleRedirect.bind(this);
    }

    generateRandomString(length) {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    getHashParams() {
        const hashParams = {};
        const r = /([^&;=]+)=?([^&;]*)/g;
        const q = window.location.hash.substring(1);
        let e = r.exec(q);
        while (e) {
            hashParams[e[1]] = decodeURIComponent(e[2]);
            e = r.exec(q);
        }
        return hashParams;
    }

    componentDidMount() {
        //if (this.props.isAuthenticated) {
        const params = this.getHashParams();

        const access_token = params.access_token;
        const state = params.state;
        const storedState = localStorage.getItem('stateKey');
        localStorage.setItem('spotifyAuthToken', access_token);
        localStorage.getItem('spotifyAuthToken');

        if (window.localStorage.getItem('authToken')) {
            this.setState({ isAuthenticatedWithSpotify: true });
        }
        if (access_token && (state == null || state !== storedState)) {
            alert('Click "ok" to finish authentication with Spotify');
        } else {
            localStorage.removeItem('stateKey');
        }
        console.log(access_token);
        // DO STUFF WITH ACCEES TOKEN HERE
        // this.props.onConnectWithSpotify(access_token);
    }

    handleRedirect(event) {
        event.preventDefault();
        console.log('You linked your Spotify account!', 'success');

        const params = this.getHashParams();
        const access_token = params.access_token;
        console.log(access_token);

        const state = this.generateRandomString(16);
        localStorage.setItem('stateKey', state);

        // let url = 'https://accounts.spotify.com/authorize';
        // url += '?response_type=token';
        // url +=
        //   '&client_id=' + encodeURIComponent('f09fbf600009433dadce5836c57584c3');
        // url += '&scope=' + encodeURIComponent('user-top-read');
        // url += '&redirect_uri=' + encodeURIComponent('http://localhost:3000/abc');
        // url += '&state=' + encodeURIComponent(state);
        // url += '&show_dialog=true';
        var scope = 'user-read-private user-read-email';
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

    render() {
        return (<>
            <div className="content">
                <Row>
                    <Col md="8">
                        <Card>
                            <CardHeader>
                                <h5 className="title">Spotify Auth</h5>
                            </CardHeader>

                            <div className="button_container">
                                <h1 className="title is-4">
                                    <font color="#C86428">Welcome</font>
                                </h1>
                                <div className="Line" />
                                <br />
                                <button
                                    className="sp_button"
                                    onClick={(event) => this.handleRedirect(event)}
                                >
                                    <strong>LINK YOUR SPOTIFY ACCOUNT</strong>
                                </button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
        );
    }
}

export default SpotifyAuth;