import React from "react";
import "./Chips.css";

const Chips = () => {
  return (
    <div className="chipContainer">
      <div className="chips">
        {" "}
        <h4 className="chipText">All</h4>{" "}
      </div>
      <div className="chips">
        {" "}
        <h4 className="chipText">Music</h4>{" "}
      </div>
      <div className="chips">
        {" "}
        <h4 className="chipText">Mixes</h4>{" "}
      </div>
      <div className="chips">
        {" "}
        <h4 className="chipText">Playlists</h4>{" "}
      </div>
      <div className="chips">
        {" "}
        <h4 className="chipText">Gaming</h4>{" "}
      </div>
    </div>
  );
};

export default Chips;
