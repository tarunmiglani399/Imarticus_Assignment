import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import "./VideoPage.css";
import VideoSidebar from "../VideoSidebar/VideoSidebar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const VideoPage = () => {
  const { chapter, section } = useParams();
  const [course, setCourse] = useState(null);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isPreviousVideoPresent, SetIsPreviousVideoPresent] = useState(false);
  const [isNextVideoPresent, SetIsNextVideoPresent] = useState(false);
  const [nextChapter, setNextChapter] = useState(null);
  const [nextSection, setNextSection] = useState(null);
  const [previousChapter, setPreviousChapter] = useState(null);
  const [previousSection, setPreviousSection] = useState(null);
  const [index, setIndex] = useState(0);
  const [totalVideos, setTotalVideos] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getCourse();
  }, [chapter, section]);

  const getCourse = async () => {
    try {
      let idx = 0;
      const response = await axios.get("/api/course");
      if (response.status === 200) {
        setCourse(response.data);
        response.data?.chapters.forEach((chap) => {
          chap?.sections.forEach((sec) => {
            ++idx;
            if (chap.chapterId === chapter && sec.sectionId === section) {
              setCurrentVideo(sec);
              setCurrentChapter(chap);
              setIndex(idx);
            }
          });
        });
        setTotalVideos(idx);
        getNextVideo(response?.data.chapters);
        getPreviousVideo(response?.data.chapters);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNextVideo = (data) => {
    const currentChapter = data.find((chap) => {
      return chap?.chapterId === chapter;
    });
    const tempSection = currentChapter?.sections.find((sec) => {
      return sec?.sectionId === (parseInt(section) + 1).toString();
    });
    if (tempSection) {
      setNextChapter(chapter);
      setNextSection((parseInt(section) + 1).toString());
      SetIsNextVideoPresent(true);
    } else {
      const tempChapter = data.find((chap) => {
        return chap?.chapterId === (parseInt(chapter) + 1).toString();
      });
      if (tempChapter) {
        setNextChapter((parseInt(chapter) + 1).toString());
        setNextSection("1");
        SetIsNextVideoPresent(true);
      } else {
        SetIsNextVideoPresent(false);
      }
    }
  };

  const getPreviousVideo = (data) => {
    const currentChapter = data.find((chap) => {
      return chap?.chapterId === chapter;
    });
    const tempSection = currentChapter?.sections.find((sec) => {
      return sec?.sectionId === (parseInt(section) - 1).toString();
    });
    if (tempSection) {
      setPreviousChapter(chapter);
      setPreviousSection((parseInt(section) - 1).toString());
      SetIsPreviousVideoPresent(true);
    } else {
      const tempChapter = data.find((chap) => {
        return chap?.chapterId === (parseInt(chapter) - 1).toString();
      });
      if (tempChapter) {
        setPreviousChapter((parseInt(chapter) - 1).toString());
        setPreviousSection(tempChapter?.sections.length.toString());
        SetIsPreviousVideoPresent(true);
      } else {
        SetIsPreviousVideoPresent(false);
      }
    }
  };

  return (
    <>
      <VideoSidebar />
      <div style={{ marginLeft: "240px" }}>
        <div className="videoTitle">{currentVideo?.sectionHeader}</div>
        <div className="videoInfo">
          <span>
            All Courses <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          </span>
          <span>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              {course?.title}
            </Link>
          </span>
          <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          <span>
            <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
              {currentChapter?.chapterHeader}
            </Link>
          </span>
          <span style={{ padding: "0 0.5rem" }}>&gt;</span>
          <span style={{ color: "rgba(0, 0, 0, 0.5)" }}>
            {currentVideo?.sectionHeader}
          </span>
        </div>
        <ReactPlayer
          url={currentVideo?.url}
          controls
          width="95%"
          height="70vh"
          style={{ margin: "2rem" }}
        />
        <div className="videoControlButtons" style={{ margin: "2rem" }}>
          <button
            className="btn btn-outline-secondary"
            disabled={!isPreviousVideoPresent}
            onClick={() =>
              navigate(`/video/${previousChapter}/${previousSection}`)
            }
          >
            Previous
          </button>
          <div>
            {index}/{totalVideos}
          </div>
          <button
            className="btn btn-outline-secondary"
            disabled={!isNextVideoPresent}
            onClick={() => navigate(`/video/${nextChapter}/${nextSection}`)}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default VideoPage;
