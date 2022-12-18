
import React, { useEffect, useRef, useState } from "react";
import { CardHeader } from "reactstrap";
import AlbunsCards from "components/AlbunsCards/AlbunsCards";
import { getUserAlbums } from "SpotifyAPI/Endpoints";

function Albuns() {
  const [albums, setAlbums] = useState([]);
  const userToken = useRef(undefined);
  const [isLogged, setIsLogged] = useState(false)

  /////////////// USER TOKEN ////////////

  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    if (token.length === 9) {
      setIsLogged(false)
    } else {
      setIsLogged(true)
    } userToken.current = token;
  }, [])


  useEffect(() => {
    async function UsersAlbums() {
      const data = await getUserAlbums();
      console.log("data: ", data);
      setAlbums(data.items)
    }

    if (userToken.current !== 'undefined') {
      UsersAlbums();
    }

  }, [userToken])

  return (
    <>
      <div className="content">
        {isLogged ?
          <AlbunsCards></AlbunsCards>
          :
          <CardHeader style={{ textAlign: "center" }}> Inicie Sessão para ver as Estatísticas</CardHeader>
        }
      </div>
    </>
  );
}

export default Albuns;
