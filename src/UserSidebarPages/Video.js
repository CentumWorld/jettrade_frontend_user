import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Video.css";
import Thumbnail from "./Thumbnail";
import VideoPlayer from "./VideoPlayer";
import baseUrl from "../baseUrl";
import { Spin } from "antd";
import noVideoFound from "../img/no-video.jpg";
import { BiArrowBack } from "react-icons/bi"
const apiurl = baseUrl.apiUrl;
const Video = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [videos, setVideos] = useState([]);
  const [videoLength, setVideosLength] = useState(0);
  const [spin, setSpin] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [like, setLike] = useState(0);
  const [perticularvideoId, setPerticularVideoId] = useState("");
  const [dislike, setDislike] = useState("");

  useEffect(() => {
    getApiVideos();
  }, []);

  const getApiVideos = () => {
    setSpin(true);
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .get(`${apiurl}` + "/user/users/user-fetch-all-videos", config)
      .then((response) => {
        setVideos(response.data.videos);
        setSelectedVideo(response.data.videos[0].videoOne);
        setTitle(response.data.videos[0].title);
        setLike(response.data.videos[0].likes);
        setPerticularVideoId(response.data.videos[0]._id);
        setDislike(response.data.videos[0].dislikes);
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
    const selectedVideoItem = videos.find((video) => video._id === id);

    if (selectedVideoItem) {
      const selectedVideoComments = selectedVideoItem.comments.map(
        (comment) => comment.text
      );
    }
  };

  const gotoDashboard = ()=>{
    navigate('/userdashboard/dashboard')
  }
  return (
    <>
    <div className="heading">
      <p> <BiArrowBack onClick={gotoDashboard} style={{cursor:'pointer'}}/>&nbsp;Videos</p>
    </div>
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
