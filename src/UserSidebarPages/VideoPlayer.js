import React, { useEffect, useState } from "react";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiTwotoneDislike,
} from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import "../css/videoplayer.css";
import { toast } from "react-toastify";
import { FaShare } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import axios from "axios";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [activeReplyIndex, setActiveReplyIndex] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event, parentCommentIndex = null) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    const commentToAdd = { text: newComment, replies: [] };

    if (parentCommentIndex !== null) {
      const updatedComments = [...comments];
      updatedComments[parentCommentIndex].replies.push(commentToAdd);
      setComments(updatedComments);
    } else {
      const updatedComments = [...comments, commentToAdd];
      setComments(updatedComments);
    }

    setNewComment("");
    setActiveReplyIndex(null);
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
    setIsDisliked((prev) => !prev);
  };

  const fetchData = () => {
    const data = localStorage.getItem("userid");
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    axios
      .post("/user/users/interact_with_video", data, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err.message));
  };
  const handleClickLike = () => {
    setIsLiked((prev) => !prev);
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
    objectFit:
      "cover" /* Fill the entire container while maintaining aspect ratio */,
    zIndex: 1 /* Add zIndex to ensure the video stays above other elements */,
  };

  return (
    <>
      <div style={videoPlayerStyle} className="video-container">
        <video style={videoStyle} src={videoUrl} controls />
        <div className="subtitle">
          <h2 style={{ fontFamily: "Calibri", textTransform: "capitalize" }}>
            {title}
          </h2>
          <div className="like-section">
            <div className="like-button-section">
              {isLiked ? (
                <button className="like-button" onClick={handleClickLike}>
                  <AiTwotoneLike fontSize={20} />
                  <span>Like</span>
                </button>
              ) : (
                <button className="like-button" onClick={handleClickLike}>
                  <AiOutlineLike fontSize={20} />
                  <span>Like</span>
                </button>
              )}
            </div>
            <div className="disLike-button-section">
              {isDisliked ? (
                <button className="like-button" onClick={handleClickDisLike}>
                  <AiTwotoneDislike fontSize={20} />
                  <span>Dislike</span>
                </button>
              ) : (
                <button className="like-button" onClick={handleClickDisLike}>
                  <AiOutlineDislike fontSize={20} />
                  <span>Dislike</span>
                </button>
              )}
            </div>
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
            <p>
              <BiComment fontSize={20} />
              &nbsp; Comment
            </p>
            <input
              type="text"
              className="comment-input"
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleCommentChange}
            />
            <div className="comment-buttons">
              <button className="cancel-button">Cancel</button>
              <button className="comment-button" onClick={handleCommentSubmit}>
                Comment
              </button>
            </div>
          </form>
          <div className="comments-list">
            {comments.map((comment, parentIndex) => (
              <div className="comment" key={parentIndex}>
                <p className="comment-text"> {comment.text} </p>
                {activeReplyIndex === parentIndex ? (
                  <div className="reply-input">
                    <input
                      type="text"
                      className="comment-input"
                      placeholder="Add a reply..."
                      value={newComment}
                      onChange={handleCommentChange}
                    />
                    <div className="repl-button-container">
                      <button
                        className="comment-button"
                        onClick={(event) =>
                          handleCommentSubmit(event, parentIndex)
                        }
                      >
                        Add Reply
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
                    Reply
                  </button>
                )}
                <div className="replies-list">
                  {comment.replies.map((reply, replyIndex) => (
                    <div className="reply" key={replyIndex}>
                      {reply.text}
                    </div>
                  ))}
                </div>
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
