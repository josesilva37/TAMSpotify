import "../assets/css/custom.css";
import React, { useEffect, useRef, useState } from "react";
// nodejs library that concatenates classes
// react plugin used to create charts
import { Bar } from "react-chartjs-2";
// import PieChart from 'react-pie-graph-chart';
import { PieChart } from "react-minimal-pie-chart";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import { Pie } from "react-chartjs-2";
import TrackTable from "../components/TrackTable/TrackTable";
import { getUserPlaylists } from "../services/api";
import { getUserTopTracks } from "../services/api";
import { getUserTopArtists } from "../services/api";

function Homepage(props) {
  const valoresPie = useRef();
  const [loaded, setLoaded] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState();
  const [labels, setLabels] = useState([]);
  const [pop, setPop] = useState([]);
  const userToken = useRef(undefined);
  const chartRef = useRef(null); //create reference hook
  const [isLogged, setIsLogged] = useState(false);
  const [chartData, setCharData] = useState();

  /////////////// USER TOKEN ////////////

  useEffect(() => {
    const token = window.localStorage.getItem("spotifyAuthToken");
    if (token.length === 9) {
      setIsLogged(false);
    } else {
      setIsLogged(true);
    }
    userToken.current = token;
  }, []);

  /////// PIE CHART DATA //////////
  useEffect(() => {
    function randomColor() {
      var x = Math.round(0xffffff * Math.random()).toString(16);
      var y = 6 - x.length;
      var z = "000000";
      var z1 = z.substring(0, y);
      var color = "#" + z1 + x;

      return color;
    }

    async function UsersPlaylist() {
      const resp = await getUserPlaylists(
        window.localStorage.getItem("spotifyAuthToken")
      );
      let data = [];
      resp.items.map((p) => {
        data.push({
          title: p.name,
          value: p.tracks.total,
          color: randomColor(),
        });
      });
      return data;
    }

    // const finished = (resp) => {
    //   valoresPie.current = resp;
    //   setLoaded(true);

    // }

    // if (userToken.current !== 'undefined') {
    // }
    UsersPlaylist().then((res) => {
      setCharData(res);
      setLoaded(true);
    });
  }, [userToken]);

  //////////// SONGS DATA ////////////

  useEffect(() => {
    async function UsersTopTracks() {
      getUserTopTracks(window.localStorage.getItem("spotifyAuthToken"), 1).then(
        (data) => {
          setTracks(data.items);
        }
      );
    }
    async function UserTopArtists() {
      const data = await getUserTopArtists(
        window.localStorage.getItem("spotifyAuthToken")
      );
      if (data !== null && data !== undefined) {
        var arrN = [];
        var arrP = [];
        data.items.map((p, i, array) => {
          arrN.push(p.name);
          arrP.push(p.popularity);
        });
        setLabels(arrN);
        setPop(arrP);
      }
      setArtists(data);
    }

    if (userToken.current !== "undefined") {
      UserTopArtists();
      UsersTopTracks();
    }
  }, [userToken]);

  const options = {
    scales: {
      xAxes: [
        {
          display: true,
          scaleLabel: {
            display: true,
          },
        },
      ],
      yAxes: [
        {
          display: true,
          ticks: {
            beginAtZero: true,
            steps: 10,
            stepValue: 5,
            max: 110,
          },
        },
      ],
    },
    responsive: true,
    plugins: {
      datalabels: {
        align: "end",
        anchor: "end",
        backgroundColor: function (context) {
          return "#0d7377";
        },
        borderRadius: 4,
        color: "white",
        formatter: function (value, a) {
          let val = a.dataIndex + 1;
          return "#" + val;
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Top Artists Popularity",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: "Popularity",
        data: labels.map((p, i) => pop[i]),
        backgroundColor: "#00c6d9",
      },
    ],
  };

  async function HandleArtists(value) {
    getUserTopArtists(value.target.value).then((data) => {
      if (data !== null && data !== undefined) {
        var arrN = [];
        var arrP = [];
        data.items.map((p, i, array) => {
          arrN.push(p.name);
          arrP.push(p.popularity);
        });
        setLabels(arrN);
        setPop(arrP);
      }
      setArtists(data);
    });
  }
  function HandleTracks(value) {
    async function UsersTopTracks() {
      getUserTopTracks(value.target.value).then((data) => {
        setTracks(data.items);
      });
    }

    if (userToken.current !== "undefined") {
      UsersTopTracks();
    }
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  return (
    <>
      {isLogged && tracks ? (
        <div className="content">
          <Row>
            {/* <Col lg="4">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Playlists</h5>
                </CardHeader>
                
                {chartData && (
                  
                  <Pie
                    data={chartData}
                    style={{ height: "100%", padding: "25px 0px" }}
                    
                  ></Pie>
                )}
              </Card>
            </Col> */}
            <Col xs="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Top 5 Tracks</CardTitle>
                  <select onChange={HandleTracks}>
                    <option value={1}>4 weeks</option>
                    <option value={2}>6 months</option>
                    <option value={3}>All time</option>
                  </select>
                </CardHeader>
                <CardBody>
                  <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>#</th>
                        <th>Track</th>
                        <th>Album</th>
                        <th className="text-center">
                          <i className="tim-icons icon-watch-time" />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tracks.map((t, i) => {
                        if (i < 5) {
                          return (
                            <tr>
                              <td>{i + 1}</td>
                              <td>
                                <TrackTable
                                  trackName={t.name}
                                  artist={t.artists[0].name}
                                  image={t.album.images[2].url}
                                ></TrackTable>
                              </td>
                              <td>{t.album.name}</td>
                              <td className="text-center">
                                {millisToMinutesAndSeconds(t.duration_ms)}
                              </td>
                            </tr>
                          );
                        }
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card-chart">
                <CardHeader>
                  <h5 className="card-category">Top Artist's</h5>
                  <select onChange={HandleArtists}>
                    <option value={1}>4 weeks</option>
                    <option selected value={2}>
                      6 months
                    </option>
                    <option value={3}>All time</option>
                  </select>
                </CardHeader>
                <CardBody>
                  <div
                    className="chart-area"
                    style={{ height: "auto", width: "100%" }}
                  >
                    {artists !== undefined && (
                      <Bar
                        plugins={[ChartDataLabels]}
                        data={data}
                        options={options}
                      />
                    )}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row></Row>
        </div>
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

export default Homepage;
