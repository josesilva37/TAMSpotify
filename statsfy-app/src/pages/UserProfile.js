import React, { useEffect, useState } from "react";
// import { Redirect } from "react-router-dom";

// reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   CardFooter,
//   CardText,
//   Row,
//   Col
// } from "reactstrap";
// import { getUser } from "SpotifyAPI/Endpoints";


function UserProfile() {

  const [user, setUser] = useState()
  const [isLogged, setIsLogged] = useState(false)

  /////////////// USER TOKEN ////////////

//   useEffect(() => {
//     const token = window.localStorage.getItem('spotifyAuthToken');
//     if (token.length === 9) {
//       setIsLogged(false)
//     } else {
//       setIsLogged(true)
//     }
//   }, [])

//   async function loadData() {
//     if (user == undefined) {
//       let userR = await getUser(window.localStorage.getItem('spotifyAuthToken'))
//       setUser(userR)
//     }
//   }
//   loadData()

  return (
    <>
    <p>User Profile</p>
      {/* <div className="content">
        {isLogged ? (
          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Profile</h5>
                </CardHeader>
                <CardBody style={{ display: "flex", justifyContent: "center" }}>
                  {user != undefined && <Col md="4">
                    <Card className="card-user" >
                      <CardBody>
                        <CardText />
                        <div className="author">
                          <div className="block block-one" />
                          <div className="block block-two" />
                          <div className="block block-three" />
                          <div className="block block-four" />
                          <a href="#pablo" onClick={(e) => e.preventDefault()}>
                            <img
                              alt="..."
                              className="avatar"
                              src={user.images[0].url}
                            />
                            <h5 className="title">{user.display_name}</h5>
                          </a>
                          <p className="description">{user.email}</p>
                        </div>
                      </CardBody>
                      <CardBody>
                        <div className="author">
                          <p className="description" > <span style={{ fontWeight: "bold" }}> User Type:</span> {user.product.charAt(0).toUpperCase()}{user.product.slice(1)}</p>
                          <br></br>
                          <p className="description"><span style={{ fontWeight: "bold" }}>Followers:</span> {user.followers.total}</p>
                        </div>
                      </CardBody>
                      <CardFooter>
                        <div className="button-container">
                          <a href={user.external_urls.spotify}>
                            <Button className="btn-icon btn-round" >
                              <img src={require("assets/img/icons8-spotify-30.png")} />
                            </Button>
                          </a>
                        </div>
                      </CardFooter>
                    </Card>
                  </Col>
                  }
                </CardBody>
                <CardFooter>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        ) :
          <div className="content">

            <CardHeader style={{ textAlign: "center" }}> Inicie Sessão para ver as Estatísticas</CardHeader>

          </div>}

      </div> */}
    </>
  );
}

export default UserProfile;
