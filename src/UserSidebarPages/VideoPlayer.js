import React, { useEffect, useState } from "react";
import {
  AiOutlineLike,
} from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { BiChevronDown, BiComment } from "react-icons/bi";
import "../css/videoplayer.css";
import { FaShare } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axios from "axios";
import baseUrl from "../baseUrl";
import { Box, CircularProgress } from "@mui/material";

const apiurl = baseUrl.apiUrl;

const VideoPlayer = ({
  videoUrl,
  title,
  liked,
  perticularvideoId,
  dislike,
}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [likeBackGroundColor, setLikeBackGroundColor] = useState(false);
  const [dislikeBackGroundColor, setDislikeBackGroundColor] = useState(false);
  const [disLikeCount, setDisLikeCount] = useState(0);
  const [replyText, setReplyText] = useState("");
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);
  const [views, setViews] = useState(0);
  const [spin, setSpin] = useState(true);

  useEffect(() => {
    setLikeCount(liked);
    setDisLikeCount(dislike);
    callApiToLikeOrNot(perticularvideoId);
    callApiToDislikeOrNot(perticularvideoId);
    fetchData(perticularvideoId);
    handleReplySubmit(activeReplyIndex);
  }, [liked, dislike]);

  useEffect(() => {
    fetchViewsData(perticularvideoId);
  }, [perticularvideoId]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const copyToClipboard = () => {
    const paragraphText = document.getElementById("linkText").textContent;

    const textArea = document.createElement("textarea");
    textArea.value = paragraphText;

    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);

    setCopied(true);
  };

  const openModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleClickDisLike = () => {
    setDislikeBackGroundColor((prev) => !prev);
    if (dislikeBackGroundColor) {
      let data = {
        videoId: perticularvideoId,
        action: "dislike",
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${apiurl}` + "/user/users/interact_with_video", data, config)
        .then((res) => {
          const updatedLikeCount = res.data.video.dislikes;
          setDisLikeCount(updatedLikeCount);
          setIsDisliked(!dislike);
        })
        .catch((err) => {
          
        });
    } else {
      let data = {
        videoId: perticularvideoId,
        action: "dislike",
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${apiurl}` + "/user/users/interact_with_video", data, config)
        .then((res) => {
          const updatedLikeCount = res.data.video.dislikes;
          setDisLikeCount(updatedLikeCount);
          setIsDisliked(!dislike);
          callApiToDislikeOrNot(perticularvideoId);
        })
        .catch((err) => {
        });
    }
  };

  const fetchData = (id) => {
    const data = {
      videoId: id,
    };

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${apiurl}` + "/user/fetch_one_video", data, config)
      .then((res) => {
        setComments(res.data.video.comments);
      })
      .catch((err) => {});
  };

  const fetchViewsData = (id) => {
    let data = {
      videoId: id,
      action: "view",
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${apiurl}` + "/user/users/interact_with_video", data, config)
      .then((res) => {
        setViews(res.data.video.views);
        setLikeCount(res.data.video.likes);
      })
      .catch((err) => {});
  };

  const handleClickLike = () => {
    setSpin(false);
    setIsLiked((prev) => !prev);
    setLikeBackGroundColor((prev) => !prev);
    if (likeBackGroundColor) {
      let data = {
        videoId: perticularvideoId,
        action: "like",
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${apiurl}` + "/user/users/interact_with_video", data, config)
        .then((res) => {
          const updatedLikeCount = res.data.video.likes;
          setLikeCount(updatedLikeCount);
          setSpin(true);
        })
        .catch((err) => {
        });
    } else {
      let data = {
        videoId: perticularvideoId,
        action: "like",
      };
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios
        .post(`${apiurl}` + "/user/users/interact_with_video", data, config)
        .then((res) => {
          const updatedLikeCount = res.data.video.likes;
          setLikeCount(updatedLikeCount);
          setIsLiked(!isLiked);
          callApiToLikeOrNot(perticularvideoId);
          setSpin(true);
        })
        .catch((err) => {
        });
    }
  };

  const callApiToLikeOrNot = (id) => {
    let data = {
      videoId: id,
      likeType: true,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${apiurl}` + "/user/fetch-user-one-video-like", data, config)
      .then((res) => {
        setLikeBackGroundColor(res.data.like.likeType);
      })
      .catch((err) => {
      });
  };

  const callApiToDislikeOrNot = (id) => {
    let data = {
      videoId: id,
      disLikeType: true,
    };
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post(`${apiurl}` + "/user/fetch-user-one-video-dislike", data, config)
      .then((res) => {
        setDislikeBackGroundColor(res.data.dislike.disLikeType);
      })
      .catch((err) => {
      });
  };

  const handleCommentSubmit = (event, parentIndex) => {
    event.preventDefault();

    if (newComment.trim() === "") return;

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const commentData = {
      videoId: perticularvideoId,
      action: "comment",
      comments: newComment,
    };

    axios
      .post(
        `${apiurl}` + "/user/users/interact_with_video",
        commentData,
        config
      )
      .then((response) => {
        setNewComment("");
        setComments(response.data.video.comments);
      })
      .catch((error) => {
      });
  };

  const handleReplySubmit = (parentIndex) => {
    const parentComment = comments[parentIndex];

    if (replyText.trim() === "") return;

    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const replyData = {
      videoId: perticularvideoId,
      action: "comment",
      replyTo: parentComment._id,
      comments: replyText,
    };

    axios
      .post(`${apiurl}` + "/user/users/interact_with_video", replyData, config)
      .then((response) => {
        const updatedComments = [...comments];
        updatedComments[parentIndex].replies.push({
          text: replyText,
        });

        setComments(updatedComments);
        setReplyText("");
        setActiveReplyIndex(null);
      })
      .catch((error) => {
      });
  };

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
    objectFit: "cover",
    zIndex: 1,
    borderRadius:"10px"
  };

  const handleCancelHandler = (event) => {
    event.preventDefault();
    setNewComment("");
  };

  return (
    <>
      <div style={videoPlayerStyle} className="video-container">
        <video style={videoStyle} src={videoUrl} controls autoPlay />
        <div className="subtitle">
          <div className="title-and-views">
            <h2>{title}</h2>
          </div>
          <div className="like-section">
            {spin ? (
              <div className="like-button-section">
                {likeBackGroundColor ? (
                  <button className="like-button" onClick={handleClickLike}>
                    <AiTwotoneLike fontSize={20} />
                    <span>{likeCount}</span>
                  </button>
                ) : (
                  <button className="like-button" onClick={handleClickLike}>
                    <AiOutlineLike fontSize={20} />
                    <span>{likeCount}</span>
                  </button>
                )}
              </div>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress size={20}/>
              </Box>
            )}

            <div>
              <button className="like-button" onClick={openModal}>
                <FaShare />
                Share
              </button>
            </div>
          </div>
        </div>
        <div className="comment-section">
          <form>
            <p className="comment-title">
              <BiComment fontSize={20} />
              Comment
            </p>
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <div className="comment-buttons">
              <button className="cancel-button" onClick={handleCancelHandler}>
                Cancel
              </button>
              <button className="comment-button" onClick={handleCommentSubmit}>
                Comment
              </button>
            </div>
          </form>
          <div className="comments-list">
            {comments.map((comment, parentIndex) => (
              <div className="comment" key={parentIndex}>
                <p
                  className="comment-text"
                  style={{ color: "black", marginBottom: "0px" }}
                >
                  <strong>{comment.userName}</strong>: {comment.text}
                </p>
                {activeReplyIndex === parentIndex ? (
                  <div className="reply-input">
                    <p className="reply-to">
                      Replying to: <strong>{comment.userName}</strong>
                    </p>

                    <input
                      type="text"
                      className="comment-input"
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={(event) => setReplyText(event.target.value)}
                    />
                    <div className="reply-button-container">
                      <button
                        className="comment-button"
                        onClick={(event) => handleReplySubmit(parentIndex)}
                      >
                        Reply
                      </button>
                      <button
                        className="cancel-button"
                        onClick={() => setActiveReplyIndex(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    className="reply-button"
                    onClick={() => setActiveReplyIndex(parentIndex)}
                  >
                    View Replies <BiChevronDown />
                  </button>
                )}

                {activeReplyIndex === parentIndex && (
                  <div className="replies-list">
                    {comment.replies.map((reply, replyIndex) => (
                      <div className="reply" key={replyIndex}>
                        <strong>{reply.userName}</strong>: {reply.text}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-box">
          <div className="modal-container">
            <div className="modal-heading">
              <p>Share</p>
              <MdClose fontSize={20} onClick={openModal} />
            </div>
            <div className="image-container">
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F1.bp.blogspot.com%2F-S8HTBQqmfcs%2FXN0ACIRD9PI%2FAAAAAAAAAlo%2FFLhccuLdMfIFLhocRjWqsr9cVGdTN_8sgCPcBGAYYCw%2Fs1600%2Ff_logo_RGB-Blue_1024.png&f=1&nofb=1&ipt=82a681f27ca96e03d5630e2468adc3a0191b6a6df6416a9b74ebc0af942acf2c&ipo=images" />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.freepngimg.com%2Fthumb%2Fwhatsapp%2F77099-whats-icons-text-symbol-computer-messaging-whatsapp.png&f=1&nofb=1&ipt=8281765f2e369395ee0fdd4026f3d2044eb94fa4d02dcf28f4485dfbf1bea59e&ipo=images" />
              <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-download.com%2Fwp-content%2Fuploads%2F2016%2F02%2FTwitter_Logo_new.png&f=1&nofb=1&ipt=02d2bbc801ec7b29c269c952514f64eb7fb1f363f0b8a7583818fe32b18c7308&ipo=images" />
            </div>
            <div className="copy-link-section">
              <div className="link-section">
                <p className="link" id="linkText">
                  https://youtube.com
                </p>
              </div>
              <button className="copy-btn" onClick={copyToClipboard}>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPlayer;
