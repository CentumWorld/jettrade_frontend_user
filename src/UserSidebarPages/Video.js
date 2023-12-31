import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/Video.css";
import Thumbnail from "./Thumbnail";
import VideoPlayer from "./VideoPlayer";
import baseUrl from "../baseUrl";
import { Spin } from "antd";
import noVideoFound from "../img/no-video.jpg";
const apiurl = baseUrl.apiUrl;
const Video = () => {
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoLength, setVideosLength] = useState(0);
  const [spin, setSpin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [like, setLike] = useState(0); // State to track selected video URL
  //   const [selectedVideo, setSelectedVideo] = useState(videos[0].videoUrl);
  const [perticularvideoId, setPerticularVideoId] = useState("");
  const [dislike, setDislike] = useState("");

  
  useEffect(() => {
    getApiVideos();
  }, []);


  const getApiVideos = () => {
    setSpin(true);
    const token = localStorage.getItem("token");
    console.log("token", token);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}`+"/user/users/user-fetch-all-videos", config)
      .then((response) => {
        setVideos(response.data.videos);
        console.log("Response -> ", response.data.videos);

        // setComments(response.data.videos);
        setVideosLength(response.data.videos.length);
        setSpin(false);
      })

      .catch((error) => console.error("Error fetching data:", error));
  };
  const handleThumbnailClick = (videoUrl, title, like, id, dislike) => {
    setSelectedVideo(videoUrl);
    setTitle(title);
    setLike(like);
    setPerticularVideoId(id);
    setDislike(dislike);

    // Find the selected video by its id from the videos array

    console.log(videos, "..............")
    const selectedVideoItem = videos.find(video => video._id === id);

    
    // Check if the selected video is found
    if (selectedVideoItem) {
      // Extract the comments for the selected video
      const selectedVideoComments = selectedVideoItem.comments.map(comment => comment.text);
      console.log("Comments for selected video:", selectedVideoComments);
    }
  };
  return (
    <>
      {!spin ? (
        <div className="video-framing">
          {videoLength > 0 ? (
            <div className="video-player-container">
              <VideoPlayer
                videoUrl={selectedVideo}
                title={title}
                liked={like}
                perticularvideoId={perticularvideoId}
                dislike={dislike}
              />
            </div>
          ) : (
            <img src={noVideoFound} className="noVideoImg" />
          )}
          <div className="thumbnail-list">
            {videos.map((video) => (
              <Thumbnail
                key={video.id}
                imageUrl={video.thumbnail}
                title={video.title}
                onClick={() =>
                  handleThumbnailClick(
                    video.videoOne,
                    video.title,
                    video.likes,
                    video._id,
                    video.dislikes
                  )
                }
              />
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </>
  );
};
export default Video;
