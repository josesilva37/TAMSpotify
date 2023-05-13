import React, { useState } from "react";
import "./AlbunsCards.css"

export default function AlbunsCards(props) {

  function HandleClick () {
    props.setOpen(true);
    props.setAlbumId(props.id)
  }

  return (
    <div className="album-container">
        <div className="album-image">
            <img src={props.image}></img>
        </div>
        <div className="album-info">
            <p className="album-name">{props.name}</p>
            <p className="album-artist-name">{props.artist}</p>
        </div>
        <button className="album-see-details" onClick={HandleClick}>See Details</button>
    </div>
  );
}
