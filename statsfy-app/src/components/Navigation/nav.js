import "./nav.css";
import React, { useEffect, useState } from "react";
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
  ModalHeader,
} from "reactstrap";
import { createUserDb, getUser, userExist } from "../../services/api";

function Navig(props) {
  const [profile, setProfile] = useState();
  const [userGetToken, setUserGetToken] = useState(false);

  useEffect(() => {
    getUser()
      .then((data) => {
        setProfile(data);
        // console.log(data);
        props.setUser(data)

        userExist(data.email)
          .then((user) => {
            if(user == false){
              createUserDb(data.email, data.display_name).then((res) => console.log(res))
            }
          })
      })
      .catch((error) => console.log(error));
  }, [userGetToken]);

  useEffect(() => {
    const hashParams = {};
    const r = /([^&;=]+)=?([^&;]*)/g;
    const q = window.location.hash.substring(1);
    let e = r.exec(q);
    while (e) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
      e = r.exec(q);
    }
    const access_token = hashParams.access_token;
    localStorage.setItem("spotifyAuthToken", access_token);
    localStorage.getItem("spotifyAuthToken");
  }, []);

  const spotifyAuth = () => {
    setUserGetToken(true);
    var scope =
      "user-read-private user-read-email user-read-playback-position user-top-read user-read-recently-played playlist-read-private playlist-read-collaborative user-library-read user-library-modify";
    let url =
      "https://accounts.spotify.com/authorize" +
      "?response_type=token" +
      "&client_id=f92874228c914496befc0619ade6f458" +
      "&scope=" +
      encodeURIComponent(scope) +
      "&redirect_uri=" +
      encodeURIComponent("http://localhost:2000/");
    window.location = url;
  };

  return (
    <div className={"container"}>
      <div className="logoWrapper">
        <img src={"../icons8-listen-to-music.png"}></img>
        <p className="app-name">Statsfy</p>
      </div>
      {window.localStorage.getItem("spotifyAuthToken") !== undefined &&
      window.localStorage.getItem("spotifyAuthToken") !== "undefined" ? (
        <div>
          {profile && profile.images && (
            <div className="profile" onClick={() => props.setComponent(3)}>
              <img
                src={profile.images[0].url}
                alt="..."
                className="photoProfile"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="nav-item" onClick={spotifyAuth}>
          Log In
        </div>
      )}
    </div>
  );
}

export default Navig;
