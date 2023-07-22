import React from "react";

const VideoPlayer = ({ videoUrl, title }) => {
  const videoPlayerStyle = {
    position: "relative",
    overflow: "hidden",
  };

  const videoStyle = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover", /* Fill the entire container while maintaining aspect ratio */
    zIndex: 1, /* Add zIndex to ensure the video stays above other elements */
  };

  return (
    <div style={videoPlayerStyle}>
      <video style={videoStyle} src={videoUrl} controls />
      <h2 style={{backgroundColor:"white", fontFamily:"Calibri"}}>{title}</h2>
    </div>
  );
};

export default VideoPlayer;
