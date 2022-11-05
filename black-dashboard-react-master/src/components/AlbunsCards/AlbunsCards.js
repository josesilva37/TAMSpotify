import React, { useState } from "react";
import "assets/css/custom.css"

export default function AlbunsCards(props) {

  return (
    <div className="album-container">
        <div className="album-image">
            <img src={"https://i.scdn.co/image/ab67616d00001e022c5b24ecfa39523a75c993c4"}></img>
        </div>
        <div className="album-info">
            <p className="album-name">Global Warming</p>
            <p className="album-artist-name">Pitbull</p>
        </div>
        <button className="album-see-details">See Details</button>
    </div>
  );
}
