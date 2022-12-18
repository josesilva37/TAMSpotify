import React, { useEffect, useRef, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// react plugin used to create charts
import { Line, Bar, Pie } from "react-chartjs-2";
// import PieChart from 'react-pie-graph-chart';
import { PieChart } from "react-minimal-pie-chart";
import ChartDataLabels from 'chartjs-plugin-datalabels';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
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
import { getUserPlaylists } from "SpotifyAPI/Endpoints";
import { getUserTopTracks } from "SpotifyAPI/Endpoints";
import { getUserTopArtists } from "SpotifyAPI/Endpoints";
import Skeleton from "react-loading-skeleton";

function Dashboard(props) {
  const valoresPie = useRef();
  const [loaded, setLoaded] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [artists, setArtists] = useState()
  const [labels, setLabels] = useState([])
  const [pop, setPop] = useState([])
  const userToken = useRef(undefined);
  const chartRef = useRef(null) //create reference hook
  const [isLogged, setIsLogged] = useState(false)

  /////////////// USER TOKEN ////////////

  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    if (token.length === 9) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
    }
    userToken.current = token;
  }, [])

  /////// PIE CHART DATA //////////
  useEffect(() => {

    function randomColor() {
      var x = Math.round(0xffffff * Math.random()).toString(16);
      var y = (6 - x.length);
      var z = '000000';
      var z1 = z.substring(0, y);
      var color = '#' + z1 + x;

      return color;
    }

    async function UsersPlaylist() {
      const resp = await getUserPlaylists(userToken.current)
      let data = [];
      resp.items.map((p) => {
        data.push({ title: p.name, value: p.tracks.total, color: randomColor() });
      })
      return data;
    }

    const finished = (resp) => {
      valoresPie.current = resp;
      setLoaded(true);

    }

    if (userToken.current !== 'undefined') {
      UsersPlaylist().then(res => finished(res));
    }

  }, [userToken])



  //////////// SONGS DATA ////////////

  useEffect(() => {
    async function UsersTopTracks() {
      const data = await getUserTopTracks(userToken.current, 1);
      setTracks(data.items)
    }
    async function UserTopArtists() {
      const data = await getUserTopArtists(window.localStorage.getItem('spotifyAuthToken'));
      if (data !== null && data !== undefined) {
        var arrN = []
        var arrP = []
        data.items.map((p, i, array) => {
          arrN.push(p.name)
          arrP.push(p.popularity)
        })
        setLabels(arrN)
        setPop(arrP)
      }
      setArtists(data)
    }

    if (userToken.current !== 'undefined') {
      UserTopArtists();
      UsersTopTracks();
    }

  }, [userToken])

  const options = {
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
        }
      }],
      yAxes: [{
        display: true,
        ticks: {
          beginAtZero: true,
          steps: 10,
          stepValue: 5,
          max: 110
        }
      }]
    },
    responsive: true,
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        backgroundColor: function (context) {
          return '#0d7377';
        },
        borderRadius: 4,
        color: 'white',
        formatter: function (value, a) {
          let val = a.dataIndex + 1
          return "#" + val
        }
      },
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Artists Popularity',
      },

    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: 'Popularity',
        data: labels.map((p, i) => pop[i]),
        backgroundColor: '#00c6d9',
      },
    ],
  };


  function PieClicked(index) {
    valoresPie.current.map((p, i) => {
      if (i === index) {
        console.log(p);
      }
    })
  }

  async function HandleArtists(value) {
    const data = await getUserTopArtists(window.localStorage.getItem('spotifyAuthToken'), value.target.value);
    if (data !== null && data !== undefined) {
      var arrN = []
      var arrP = []
      data.items.map((p, i, array) => {
        arrN.push(p.name)
        arrP.push(p.popularity)
      })
      setLabels(arrN)
      setPop(arrP)
    }
    console.log(data)
    setArtists(data)
  }
  function HandleTracks(value) {
    async function UsersTopTracks() {
      const data = await getUserTopTracks(userToken.current, value.target.value);
      console.log(data);
      setTracks(data.items)
    }

    if (userToken.current !== 'undefined') {
      UsersTopTracks();
    }
  }


  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  return (
    <>
      {isLogged ? (<div className="content">
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Playlists</h5>
              </CardHeader>
              <PieChart data={valoresPie.current}
                style={{ height: '100%', padding: '25px 0px' }}
                rounded
                lineWidth={20}
                paddingAngle={18}
                animate
                onClick={(e, segmentIndex) => PieClicked(segmentIndex)}
              ></PieChart>
            </Card>
          </Col>
          <Col lg="8">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Top Artist's</h5>
                <select onChange={HandleArtists}>
                  <option value={1}>4 weeks</option>
                  <option selected value={2}>6 months</option>
                  <option value={3}>All time</option>
                </select>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: '100%' }}>
                  {artists !== undefined &&
                    <Bar
                      plugins={[ChartDataLabels]}
                      data={data}
                      options={options}
                    />
                  }
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* <Col lg="4">
            <Card className="card-chart">
            <CardHeader>
                <h5 className="card-category">Featured Artist</h5>
              </CardHeader>
              <FeaturedArtist></FeaturedArtist>
            </Card>
          </Col> */}
        <Row>
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
                      <th className="text-center"><i className="tim-icons icon-watch-time" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {tracks.map((t, i) => {
                      if (i < 5) {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td><TrackTable trackName={t.name} artist={t.artists[0].name} image={t.album.images[2].url}></TrackTable></td>
                            <td>{t.album.name}</td>
                            <td className="text-center">{millisToMinutesAndSeconds(t.duration_ms)}</td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>)
        : (<div className="content">
            <CardHeader style={{textAlign:"center"}}> Inicie Sessão para ver as Estatísticas</CardHeader>
        </div>)}

    </>
  );
}

export default Dashboard;
