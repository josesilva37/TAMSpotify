import React, { useEffect, useState } from "react";
import "../App.css";
import {
  addSongToPlaylist,
  addUserToPlaylist,
  createPlaylist,
  createPlaylistUser,
  getAllSongsFromPlaylist,
  getPlaylistUsersDb,
  getUsersPlaylistDb,
} from "../services/api";
import { Alert, UncontrolledAlert, Table } from "reactstrap";
import TrackTable from "../components/TrackTable/TrackTable";

function Collaborative(props) {
  const [inputsHidden, setHidden] = useState(true);
  const [createOpt, setCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const [playlistDetailID, setPlayDetailID] = useState("");
  const [musicURL, setMusicUrl] = useState("");
  const [usersPlaylists, setUsersPlaylists] = useState(null);
  const [playlistDetails, setPlaylistsDetails] = useState(false);
  const [playlistDetailName, setPlayDetailName] = useState("");
  const [playlistUsers, setPlaylistUsers] = useState(null);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  useEffect(() => {
    if (playlistDetailID !== "") {
      getAllSongsFromPlaylist(playlistDetailID).then((resp) => {
        setPlaylistSongs(resp);
      });
    }
  }, [playlistDetailID]);

  useEffect(() => {
    getUsersPlaylistDb(props.user.email).then((res) => {
      setUsersPlaylists(res);
    });
  }, []);

  const handleCreateClick = () => {
    setHidden(false);
    setCreate(true);
  };

  const handleAddClick = () => {
    setHidden(false);
    setCreate(false);
  };

  const handleCreate = () => {
    setHidden(true);
    createPlaylist(playlistName).then((resp) => {
      if (resp) {
        createPlaylistUser(resp.id, props.user.email).then((r) => {
          if(r == 200){
            getUsersPlaylistDb(props.user.email).then((res) => {
              setUsersPlaylists(res);
              setPlaylistName("");
            });
          }
        });
      }
    });
  };

  const handleAdd = () => {
    setHidden(true);
    createPlaylistUser(playlistID, props.user.email).then((r) => {
      if(r == 200){
        getUsersPlaylistDb(props.user.email).then((res) => {
          setUsersPlaylists(res);
          setPlaylistName("");
        });
      }
    });
  };

  const handleNameChange = (event) => {
    setPlaylistName(event.target.value);
  };

  const handleIDChange = (event) => {
    setPlaylistID(event.target.value);
  };

  const handleURLChange = (event) => {
    setMusicUrl(event.target.value);
  };

  const addSong = () => {
    const parts = musicURL.split("/");
    const trackId = parts[parts.length - 1].split("?")[0];

    addSongToPlaylist(playlistDetailID, trackId).then((resp) => {
      if (resp === 200) {
        setSuccessAlert(true);
        getAllSongsFromPlaylist(playlistDetailID).then((resp) => {
          setPlaylistSongs(resp);
        });
      } else {
        setErrorAlert(true);
      }
    });
    // console.log(trackId, playlistDetailID)
  };

  const handleDetailClick = (id, name) => {
    setPlayDetailName(name);
    setPlaylistsDetails(true);
    setPlayDetailID(id);
    getPlaylistUsersDb(id).then((resp) => {
      setPlaylistUsers(resp);
    });
  };
  return (
    <div className="collaborativeWrapper">
      {successAlert && (
        <UncontrolledAlert color="success" fade={true}>Success</UncontrolledAlert>
      )}
      {errorAlert && (
        <UncontrolledAlert color="danger" fade={true}>Error</UncontrolledAlert>
      )}
      {!playlistDetails ? (
        <>
          <p className="title">Collaborative playlists</p>
          <div className="topWrapper">
            <p className="btnPlaylist" onClick={handleCreateClick}>
              Create playlist
            </p>
            <p className="btnPlaylist" onClick={handleAddClick}>
              Add playlist
            </p>
          </div>
          {!inputsHidden && (
            <div className="inputPlaylist">
              {createOpt ? (
                <>
                  <input
                    placeholder="Insert Playlist Name"
                    value={playlistName}
                    onChange={handleNameChange}
                  />
                  <button className="btnCreate" onClick={handleCreate}>
                    Create
                  </button>
                </>
              ) : (
                <>
                  <input
                    placeholder="Insert Playlist ID"
                    value={playlistID}
                    onChange={handleIDChange}
                  />
                  <button className="btnCreate" onClick={handleAdd}>
                    Add
                  </button>
                </>
              )}
            </div>
          )}
          <div className="playlistsWrapper">
            <p className="playlistTitle">Playlists: </p>
            {usersPlaylists &&
              usersPlaylists.map((playlist, index) => {
                return (
                  <div
                    key={index}
                    className="playlistObjectWrapper"
                    onClick={() =>
                      handleDetailClick(playlist.id, playlist.name)
                    }
                  >
                    <p># {index + 1}</p>
                    <p className="playlistName">{playlist.name}</p>
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <div>
          <p>Name: {playlistDetailName}</p>
          <div style={{display: "flex", alignItems: "center", gap: '15px'}}>
            <p>Users: </p>
            {playlistUsers &&
              playlistUsers.map((user) => {
                return <p key={user}>{user}</p>;
              })}
          </div>
          <p>Add music</p>
          <input
            placeholder="Spotify URL"
            value={musicURL}
            onChange={handleURLChange}
          ></input>
          <button onClick={() => addSong()}>Add Song</button>
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
              {playlistSongs.map((t, i) => {
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
              })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default Collaborative;
