import React, { useEffect, useState } from "react";
import "../App.css";
import {
  createPlaylist,
  createPlaylistUser,
  getPlaylistUsersDb,
  getUsersPlaylistDb,
} from "../services/api";

function Collaborative(props) {
  const [inputsHidden, setHidden] = useState(true);
  const [createOpt, setCreate] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [playlistID, setPlaylistID] = useState("");
  const [musicURL, setMusicUrl] = useState("");
  const [usersPlaylists, setUsersPlaylists] = useState(null);
  const [playlistDetails, setPlaylistsDetails] = useState(false);
  const [playlistDetailName, setPlayDetailName] = useState("");
  const [playlistUsers, setPlaylistUsers] = useState(null);

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
          console.log(r);
        });
      }
    });
  };

  const handleAdd = () => {
    setHidden(true);
    console.log(playlistID);
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
    const parts = musicURL.split('/');
    const trackId = parts[parts.length - 1].split('?')[0];
    console.log(trackId)

  }

  const handleDetailClick = (id, name) => {
    setPlayDetailName(name);
    setPlaylistsDetails(true);
    getPlaylistUsersDb(id).then((resp) => {
      setPlaylistUsers(resp);
    });
  };
  return (
    <div className="collaborativeWrapper">
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
          <div>
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
        </div>
      )}
    </div>
  );
}

export default Collaborative;
