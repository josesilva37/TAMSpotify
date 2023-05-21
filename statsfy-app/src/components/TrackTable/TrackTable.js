import React, { useState } from "react";
import "../../assets/css/custom.css"

export default function TrackTable(props) {

  return (
    <div className="track-table-container">
        <div className="track-image">
            <img src={props.image}></img>
        </div>
        <div className="track-info">
            <p className="track-name">{props.trackName}</p>
            <p className="track-artist">{props.artist}</p>
        </div>
    </div>
  );
}