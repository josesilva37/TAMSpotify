import React, { useEffect, useRef, useState } from "react";
import "assets/css/custom.css"
import { getAlbum } from "SpotifyAPI/Endpoints";
import {
  Table,
} from "reactstrap";
import TrackTable from "components/TrackTable/TrackTable";


export default function AlbunsCards(props) {
  const userToken = useRef(undefined);
  const [albumData, setAlbumData] = useState(null)

  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    userToken.current = token;
  }, [])

  useEffect(() => {

    async function GetAlbum() {
        const data = await getAlbum(userToken.current, props.id);
        setAlbumData(data); 
      }
  
      if(userToken.current !== 'undefined'){
        GetAlbum();
      }
  }, [])


  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


  return (
    
    <div className="album-detail-container">
        {albumData !== null &&
            <div>
                <div className="album-detail-info">
                    <img src={albumData.images[0].url}></img>
                    <div className="sub-info">
                        <p className="title">{albumData.name}</p>
                          <div className="bottom-info">
                            <p>{albumData.artists[0].name}</p>
                            <p>{albumData.release_date}</p>
                            <p>{albumData.total_tracks} songs</p>
                          </div>
                    </div>
                </div>
                <div className="songs">
                </div>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Title</th>
                      <th>Artists</th>
                      <th className="text-center"><i className="tim-icons icon-watch-time" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    {albumData.tracks.items.map((t, i) => {
                        return (
                          <tr>
                            <td>{t.track_number}</td>
                            <td>{t.name}</td>
                            <td>{t.artists.map((a, i) => {
                              if(i == (t.artists.length - 1)){
                                return(
                                  <span>{a.name}</span>
                                )
                              }else{
                                return(
                                  <span>{a.name + ", "}</span>
                                )
                              }
                            })}</td>
                            <td className="text-center">{millisToMinutesAndSeconds(t.duration_ms)}</td>
                          </tr>
                        )
                      }
                    )}
                  </tbody>
                </Table>
            </div>
        } 
    </div>
  );
}