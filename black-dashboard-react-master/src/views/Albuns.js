
import React, { useEffect, useRef, useState } from "react";
import "assets/css/custom.css"
import AlbunsCards from "components/AlbunsCards/AlbunsCards";
import AlbumDetail from "components/AlbumDetail/AlbumDetail"
import { getUserAlbums } from "SpotifyAPI/Endpoints";

function Albuns() {
  const [albums, setAlbums] = useState([]);
  const userToken = useRef(undefined);
  const [isOpen, setOpen] = useState(false);
  const [albumId, setAlbumId] = useState('');


  useEffect(() => {
    const token = window.localStorage.getItem('spotifyAuthToken');
    userToken.current = token;
  }, [])


  useEffect(() => {
    async function UsersAlbums() {
      const data = await getUserAlbums(userToken.current);
      setAlbums(data.items)
    }

    if(userToken.current !== 'undefined'){
      UsersAlbums();
    }

  }, [userToken])

  return (
    <>
      <div className="content">
        {isOpen == false ?
          <div className="albumWrapper">
            {albums.map((a, i) => {
              return (
                <AlbunsCards key={i} image={a.album.images[1].url} artist={a.album.artists[0].name} name={a.album.name} setOpen={setOpen} setAlbumId={setAlbumId} id={a.album.id}></AlbunsCards>
              )
            })}
          </div>
        :
            <div>
              <AlbumDetail id={albumId}></AlbumDetail>
              {/* <p>{albumId}</p> */}
            </div>
        }
      </div>
    </>
  );
}

export default Albuns;
