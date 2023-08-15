import React from "react";
import "../css/thumbnail.css";

const Thumbnail = ({ imageUrl, onClick, title }) => {
  const thumbailStyle = {
    display: "flex",
    gap: "10px",

  }
  return (
    <div className="thumbnail" onClick={onClick}>
      <div style={thumbailStyle} className="thumbnailStyle">
        <img
          src={imageUrl}
          alt="Thumbnail"
          style={{
            width: "200px",
            height: "100px",
            borderRadius: "10px",
          }}
        />
        <p style={{color:"black"}}>{title}</p>
      </div>
    </div>
  );
};

export default Thumbnail;
