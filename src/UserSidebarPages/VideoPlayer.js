import React from 'react'
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }) => {
  return (
    <div className="video-player">
      <ReactPlayer url={videoUrl} controls width="80%" height="80%" />
    </div>
  )
}

export default VideoPlayer