import "./VideoSidebar.css";
import React from "react";
import { useNavigate } from "react-router-dom";

const VideoSidebar = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="videoSidebar">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            className="btn"
            style={{
              color: "white",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
            }}
            onClick={() => window.history.back()}
          >
            {">"} Back
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoSidebar;
