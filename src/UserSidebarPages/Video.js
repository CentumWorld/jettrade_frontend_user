import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Video.css"; 

const Video = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getApiVideos();
  }, []);

  const getApiVideos = () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get("/user/getallvideos", config)
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  return (
    <div className="video-container">
      <h1>Video List</h1>
      {videos.length === 0 ? (
        <p>Loading videos...</p>
      ) : (
        <ul className="video-list">
          {videos.map((video) => (
            <li key={video._id} className="video-item">
              <h2>{video.title}</h2>
              {video.videoOne && (
                <div className="video-player">
                  <video controls>
                    <source src={video.videoOne} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Video;
