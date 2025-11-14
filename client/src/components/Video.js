import React from "react";
import "../css/video.css";
const Video = ({ refProp }) => {
  return (
    <div className="single_video">
      <video ref={refProp}></video>
    </div>
  );
};

export default Video;
