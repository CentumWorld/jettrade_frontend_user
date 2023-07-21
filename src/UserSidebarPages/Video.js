import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Video.css";
import Thumbnail from "./Thumbnail";
import VideoPlayer from "./VideoPlayer";

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null); // State to track selected video URL
  //   const [selectedVideo, setSelectedVideo] = useState(videos[0].videoUrl);

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

  const handleThumbnailClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  return (
    <>
      <div className="video-framing">
        <div className="video-player-container">
          <VideoPlayer videoUrl={selectedVideo} />
        </div>
        <div className="thumbnail-list">
          {videos.map((video) => (
            <Thumbnail
              key={video.id}
              imageUrl={video.thumbnail}
              onClick={() => handleThumbnailClick(video.videoOne)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Video;
