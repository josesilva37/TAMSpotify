import React, { useState } from "react";
import "assets/css/custom.css"

export default function TrackTable(props) {

  return (
    <div className="track-table-container">
        <div className="track-image">
            <img src={"https://i.scdn.co/image/ab67616d000048517359994525d219f64872d3b1"}></img>
        </div>
        <div className="track-info">
            <p className="track-name">Cut To The Feeling</p>
            <p className="track-artist">Carly Rae Jepsen</p>
        </div>
    </div>
  );
}