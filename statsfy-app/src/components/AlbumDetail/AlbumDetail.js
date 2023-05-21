import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/custom.css"
import { getUserAlbum } from "../../services/api";
import {
  Button,
  Table,
} from "reactstrap";
import TrackTable from "../../components/TrackTable/TrackTable";
import { addLikedSong } from "../../services/api";
// import { checkIfLikedSong } from "SpotifyAPI/Endpoints";
import { getLikedSongs } from "../../services/api";
import { deleteLikedSong } from "../../services/api";


export default function AlbumDetail(props) {
  const userToken = useRef(undefined);
  const [albumData, setAlbumData] = useState(null)
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    userToken.current = token;
  }, [])

  useEffect(() => {

    async function GetAlbum() {
      setUpdate(false)
      let arr= []
      const albums = await getUserAlbum(userToken.current, props.id);
      const likedSongs = await getLikedSongs(userToken.current, 0)
      let offset = 50

      likedSongs.items.map((e) => {
        arr.push(e.track.id)
      })
      while(likedSongs.total > offset){
        const lk = await getLikedSongs(userToken.current, offset)
        offset = offset + 50
        lk.items.map((e) => {
          arr.push(e.track.id)
        })
      }
      albums.tracks.items.map((e) => {
        e.isLiked = false
        
        arr.map((i) => {          
          if(e.id == i){
            e.isLiked = true
          }
        })
      })

      setAlbumData(albums);
    }

    if (userToken.current !== 'undefined') {
      GetAlbum();
      console.log("entrei")
    }
  }, [update])

  async function addToLikedSongs(e) {
    if(e.isLiked){
      await deleteLikedSong(userToken.current, e.id)
    }else{
      await addLikedSong(userToken.current, e.id)
    }
    setUpdate(true)
  }
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


  return (

    <div className="album-detail-container">
      {albumData !== null &&
        <div>
          <button className="backButton" onClick={() => props.setOpen(false)}><img src={require("../../assets/img/icons8-left-arrow-24.png")}></img>Go Back</button>
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
                <th className="text-center"></th>
              </tr>
            </thead>
            <tbody>
              {albumData.tracks.items.map((t, i) => {
                return (
                  <tr>
                    <td>{t.track_number}</td>
                    <td>{t.name}</td>
                    <td>{t.artists.map((a, i) => {
                      if (i == (t.artists.length - 1)) {
                        return (
                          <span>{a.name}</span>
                        )
                      } else {
                        return (
                          <span>{a.name + ", "}</span>
                        )
                      }
                    })}</td>
                    <td className="text-center">{millisToMinutesAndSeconds(t.duration_ms)}</td>
                    <td className="text-center">{t.isLiked ? <img style={{ cursor: "pointer", width: "18px", height:"18px"}} onClick={() => addToLikedSongs(t)}  src={require("../../assets/img/icons8-loading-heart-24.png")}></img> :(<i style={{ cursor: "pointer" }} onClick={() => addToLikedSongs(t)} className="tim-icons icon-heart-2" />)}</td>
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
