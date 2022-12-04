import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// import PieChart from 'react-pie-graph-chart';
import { PieChart } from "react-minimal-pie-chart";

// reactstrap components
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

import Donut from 'react-donut';
// core components
import {
  chartExample1,
  chartExample2,
  chartExample3,
  chartExample4
} from "variables/charts.js";
import TrackTable from "components/TrackTable/TrackTable";
import FeaturedArtist from "components/FeaturedArtist/FeaturedArtist";

function Dashboard(props) {
  const [bigChartData, setbigChartData] = React.useState("data1");
  const setBgChartData = (name) => {
    setbigChartData(name);
  };


  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const valores = [
    { title: 'One', value: 10, color: '#E38627' },
    { title: 'Two', value: 15, color: '#C13C37' },
    { title: 'Three', value: 20, color: '#6A2135' },
  ]

  return (
    <>
      <div className="content">
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Playlists</h5>
              </CardHeader>
              <PieChart data={valores}
              style={{height: '200px', padding: '25px 0px'}}
              label={({ dataEntry }) => dataEntry.value}
              rounded
              lineWidth={20}
              paddingAngle={18}
              labelStyle={(index) => ({
                fill: valores[index].color,
                fontSize: '10px',
                fontFamily: 'sans-serif',
              })}
              labelPosition={60}
              ></PieChart>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Top Genres</h5>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={chartExample3.data}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Featured Artist</h5>
              </CardHeader>
              <FeaturedArtist></FeaturedArtist>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12">
          <Card>
              <CardHeader>
                <CardTitle tag="h4">Top 5 Daily Tracks</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Track</th>
                      <th>Album</th>
                      <th className="text-center"><i className="tim-icons icon-watch-time" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td><TrackTable></TrackTable></td>
                      <td>Cut To The Feeling</td>
                      <td className="text-center">{millisToMinutesAndSeconds(207959)}</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td><TrackTable></TrackTable></td>
                      <td>Cut To The Feeling</td>
                      <td className="text-center">{millisToMinutesAndSeconds(207959)}</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td><TrackTable></TrackTable></td>
                      <td>Cut To The Feeling</td>
                      <td className="text-center">{millisToMinutesAndSeconds(207959)}</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td><TrackTable></TrackTable></td>
                      <td>Cut To The Feeling</td>
                      <td className="text-center">{millisToMinutesAndSeconds(207959)}</td>
                    </tr>
                    <tr>
                      <td>1</td>
                      <td><TrackTable></TrackTable></td>
                      <td>Cut To The Feeling</td>
                      <td className="text-center">{millisToMinutesAndSeconds(207959)}</td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
