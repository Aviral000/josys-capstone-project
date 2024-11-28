import React from "react";
import ReactPlayer from "react-player";
import videoAA from "../../assets/main/video_promo.mp4";

const VideoAA: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 mt-20">
      <div className="w-full m-4 flex justify-center items-center">
        <ReactPlayer
          url={videoAA}
          controls
          width="80%"
          height="auto"
          className="rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default VideoAA;
