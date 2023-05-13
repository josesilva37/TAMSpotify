import React, { useEffect, useRef, useState } from "react";
// import { getLikedSongs } from "SpotifyAPI/Endpoints";
// import {
//     CardHeader,
//     Table,
//   } from "reactstrap";
// import TrackTable from "components/TrackTable/TrackTable";
// import { deleteLikedSong } from "SpotifyAPI/Endpoints";
// import moment from "moment";


function LikedSongs() {
  const [likedSongs, setLiked] = useState([]);
  const userToken = useRef(undefined);
  const [isLogged, setIsLogged] = useState(false);

  /////////////// USER TOKEN ////////////

//   useEffect(() => {
//     const token = window.localStorage.getItem('spotifyAuthToken');
//     if (token.length === 9) {
//       setIsLogged(false)
//     } else {
//       setIsLogged(true)
//     } userToken.current = token;
//   }, [])


//   useEffect(() => {
//     async function UsersLikedSongs() {
//       const data = await getLikedSongs(userToken.current, 0);
//       setLiked(data.items);
//     }

//     if (userToken.current !== 'undefined') {
//       UsersLikedSongs();
//     }

//   }, [userToken]);


//   function millisToMinutesAndSeconds(millis) {
//     var minutes = Math.floor(millis / 60000);
//     var seconds = ((millis % 60000) / 1000).toFixed(0);
//     return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
//   }


//   async function removeTrack(id){
//     const data = await deleteLikedSong(userToken.current, id);

//     const data2 = await getLikedSongs(userToken.current, 0);
    
//     setLiked(data2.items);
//   }

  return (
    <>
    <p>
        LikedSongs
    </p>
      {/* <div className="content">
        {isLogged ?
          <>
            <h1>Your liked songs</h1>
            <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>#</th>
                      <th>Track</th>
                      <th>Album</th>
                      <th className="text-center"><i className="tim-icons icon-watch-time" /></th>
                      <th>Added At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {likedSongs.map((l, i) => {
                        return (
                          <tr>
                            <td>{i + 1}</td>
                            <td><TrackTable trackName={l.track.name} artist={l.track.artists[0].name} image={l.track.album.images[2].url}></TrackTable></td>
                            <td>{l.track.album.name}</td>
                            <td className="text-center">{millisToMinutesAndSeconds(l.track.duration_ms)}</td>
                            <td>{moment(l.added_at).format("DD/MM/YY")}</td>
                            <td><img src={require("assets/img/icons8-loading-heart-24.png")} className="coracao"  onClick={() => removeTrack(l.track.id)}></img></td>
                          </tr>
                        )
                    })}
                  </tbody>
                </Table>
          </>
          :
          <CardHeader style={{ textAlign: "center" }}> Inicie Sessão para ver as Estatísticas</CardHeader>
        }
      </div> */}
    </>
  );
}

export default LikedSongs;
