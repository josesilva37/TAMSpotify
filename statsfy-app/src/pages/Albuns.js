import React, { useEffect, useRef, useState } from "react";
import AlbunsCards from "../components/AlbunsCards/AlbunsCards";

function Albuns() {
  const [albums, setAlbums] = useState([]);
  const userToken = useRef(undefined);
  const [isLogged, setIsLogged] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [albumId, setAlbumId] = useState("");

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
  //     async function UsersAlbums() {
  //       const data = await getUserAlbums(userToken.current);
  //       setAlbums(data.items)
  //     }

  //     if (userToken.current !== 'undefined') {
  //       UsersAlbums();
  //     }

  //   }, [userToken])
  //   console.log(albums)

  return (
    <>
    <p>Albuns</p>
      {/* <div className="albumWrapper">
        {albums.map((a, i) => {
          return (
            <AlbunsCards
              key={i}
              image={a.album.images[1].url}
              artist={a.album.artists[0].name}
              name={a.album.name}
              setOpen={setOpen}
              setAlbumId={setAlbumId}
              id={a.album.id}
            ></AlbunsCards>
          );
        })}
      </div> */}
      {/* <div className="content">
        {isLogged ?
          <>
            {isOpen === false ? (
              <div className="albumWrapper">
                {albums.map((a, i) => {
                  return (
                    <AlbunsCards key={i} image={a.album.images[1].url} artist={a.album.artists[0].name} name={a.album.name} setOpen={setOpen} setAlbumId={setAlbumId} id={a.album.id}></AlbunsCards>
                  )
                })}
              </div>
            )
              : (
                <div>
                  <AlbumDetail id={albumId} setOpen={setOpen}></AlbumDetail>
                </div>
              )
            }
          </>
          :
          <CardHeader style={{ textAlign: "center" }}> Inicie Sessão para ver as Estatísticas</CardHeader>
        }
      </div> */}
    </>
  );
}

export default Albuns;
