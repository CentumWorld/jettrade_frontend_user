import React from 'react'

const Thumbnail = ({ imageUrl, onClick }) => {
  return (
    <div className="thumbnail" onClick={onClick}>
      <img src={imageUrl} alt="Thumbnail" style={{width:'300px', height:'200px'}} />
    </div>
  )
}

export default Thumbnail