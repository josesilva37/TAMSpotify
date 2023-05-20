import "./profile.css"
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardText,
    Row,
    Col
  } from "reactstrap";

function Profile(props) {
  return (
    <Row style={{ display: "flex", justifyContent: "center" }}>
      <Col md="8">
        <Card>
          <CardHeader>
            <h5 className="title">Profile</h5>
          </CardHeader>
          <CardBody style={{ display: "flex", justifyContent: "center" }}>
            {props.user != undefined && (
              <Col md="4">
                <Card className="card-user">
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
                          className="photo"
                          src={props.user.images[0].url}
                        />
                        <h5 className="title">{props.user.display_name}</h5>
                      </a>
                      <p className="description">{props.user.email}</p>
                    </div>
                  </CardBody>
                  <CardBody>
                    <div className="author">
                      <p className="description">
                        {" "}
                        <span style={{ fontWeight: "bold" }}>
                          {" "}
                          User Type:
                        </span>{" "}
                        {props.user.product.charAt(0).toUpperCase()}
                        {props.user.product.slice(1)}
                      </p>
                      <br></br>
                      <p className="description">
                        <span style={{ fontWeight: "bold" }}>Followers:</span>{" "}
                        {props.user.followers.total}
                      </p>
                    </div>
                  </CardBody>
                  <CardFooter>
                    <div className="button-container">
                      <a href={props.user.external_urls.spotify}>
                        <Button className="btn-icon btn-round">
                          <img
                            src={require("../../assets/img/icons8-spotify-30.png")}
                          />
                        </Button>
                      </a>
                    </div>
                  </CardFooter>
                </Card>
              </Col>
            )}
          </CardBody>
          <CardFooter></CardFooter>
        </Card>
      </Col>
    </Row>
  );
}
export default Profile;
