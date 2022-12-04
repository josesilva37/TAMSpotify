import React, { useState } from "react";
import "assets/css/custom.css"

export default function FeaturedArtist(props) {

  return (
    <div className="featured-artist-container">
        <div className="artist-image">
            <img src={"https://i.scdn.co/image/ab6761610000f1784293385d324db8558179afd9"}></img>
        </div>
        <div className="artist-info">
            <div className="artist-principal">
                <p className="artist-popularity"># 94</p>
                <p className="artist-name">Drake</p>
            </div>
            <div className="artist-followers">
              <img src={require("assets/img/icons8-following-32.png")}/>
              <p>68229137</p>
            </div>
            <p className="artist-genres">canadian hip hop, canadian pop, hip hop, rap, toronto rap</p>
        </div>
    </div>
  );
}