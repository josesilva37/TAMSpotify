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
import { listLikedSongs } from "../../services/api";
import { deleteLikedSong } from "../../services/api";


export default function AlbumDetail(props) {
  const userToken = useRef(undefined);
  const [albumData, setAlbumData] = useState()
  const [update, setUpdate] = useState(false)
  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    userToken.current = token;
  }, [])

  useEffect(() => {

    async function GetAlbum() {
      setUpdate(false)
      let arr= []
      const albums = await getUserAlbum(props.id);
      console.log(albums)
      const likedSongs = await listLikedSongs()
      console.log(likedSongs)
      let offset = 50
      likedSongs.items.map((e) => {
        arr.push(e.track.id)
      })
      while(likedSongs.total > offset){
        const lk = await listLikedSongs(offset)
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
      console.log("cheguei")
      setAlbumData(albums);
    }

    if (userToken.current !== 'undefined') {
      GetAlbum();
    }
  }, [update])

  async function addToLikedSongs(e) {
    if(e.isLiked){
      await deleteLikedSong(e.id)
    }else{
      await addLikedSong(e.id)
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
      {albumData &&
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
                <th >#</th>
                <th>Title</th>
                <th>Artists</th>
                <th><i className="tim-icons icon-watch-time" />Length</th>
                <th ></th>
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
