import React, { useEffect, useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Video List</h1>
      {videos.length === 0 ? (
        <p>Loading videos...</p>
      ) : (
        <ul>
          {videos.map((video) => (
            <li key={video._id}>
              <h2>{video.title}</h2>
              {video.videoOne && (
                <video controls>
                  <source src={video.videoOne} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Video;
