
import React, { useEffect, useRef, useState } from "react";

import AlbunsCards from "components/AlbunsCards/AlbunsCards";
import { getUserAlbums } from "SpotifyAPI/Endpoints";

function Albuns() {
  const [albums, setAlbums] = useState([]);
  const userToken = useRef(undefined);


  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    console.log(token)
    userToken.current = token;
  }, [])


  useEffect(() => {
    async function UsersAlbums() {
      const data = await getUserAlbums();
      console.log("data: ", data);
      setAlbums(data.items)
    }

    if(userToken.current !== 'undefined'){
      UsersAlbums();
    }

  }, [userToken])

  return (
    <>
      <div className="content">
        <AlbunsCards></AlbunsCards>
      </div>
    </>
  );
}

export default Albuns;
