import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  Row,
  Col,
} from "reactstrap";
import Profile from "../components/Profile/profile";
// import { getUser } from "SpotifyAPI/Endpoints";

function UserProfile(props) {
  // const [user, setUser] = useState()
  const [isLogged, setIsLogged] = useState(false);

  /////////////// USER TOKEN ////////////

  useEffect(() => {
    const token = window.localStorage.getItem("spotifyAuthToken");
    if (token.length === 9) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
  }, []);

  //   async function loadData() {
  //     if (user == undefined) {
  //       let userR = await getUser(window.localStorage.getItem('spotifyAuthToken'))
  //       setUser(userR)
  //     }
  //   }
  //   loadData()

  return (
    <>
      {isLogged ? (
        <Profile user={props.user} />
      ) : (
        <div className="content">
          <CardHeader style={{ textAlign: "center" }}>
            Inicie Sessão para ver as Estatísticas
          </CardHeader>
        </div>
      )}
    </>
  );
}

export default UserProfile;
