import axios from "axios";
import "./CoursePage.css";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CoursePage = () => {
  const [course, setCourse] = useState(null);
  const [activeAccordions, setActiveAccordions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getCourse();
  }, []);

  const toggleAccordion = (index) => {
    if (activeAccordions.includes(index)) {
      setActiveAccordions((prev) => {
        return prev.filter((idx) => idx !== index);
      });
      return;
    }
    setActiveAccordions([...activeAccordions, index]);
  };

  const getCourse = async () => {
    try {
      const response = await axios.get("/api/course");
      if (response.status === 200) {
        setCourse(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Sidebar />
      <div
        style={{
          marginLeft: "240px",
          backgroundColor: "#f2f6f9",
          minHeight: "100vh",
          marginBottom: "3rem",
        }}
      >
        <Header title={course?.title} />
        <div style={{ margin: "0 8rem" }}>
          <div className="videoInfo">
            <span>
              All Courses <span style={{ padding: "0 0.5rem" }}>&gt;</span>
            </span>
            <span>
              <Link style={{ textDecoration: "none", color: "inherit" }} to="/">
                {course?.title}
              </Link>
            </span>
          </div>
          <div
            className="accordion__faq"
            style={{
              marginTop: "2.5rem",
              paddingTop: "1.5rem",
              backgroundColor: "white",
              borderRadius: "8px",
            }}
          >
            <div className="row">
              <div className="col-4" style={{ marginBottom: "1rem" }}>
                <img
                  src="https://cdn.eckovation.com/images/Introduction-to-Machine-Learning.png"
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                  alt="displayPic"
                />
              </div>
              <div className="col-8">
                <div style={{ fontSize: "1.5rem", fontWeight: "600" }}>
                  {course?.title}
                </div>
                <div
                  style={{
                    paddingTop: "1rem",
                    fontWeight: "500",
                    color: "#055646",
                  }}
                >
                  0% Complete
                </div>
              </div>
            </div>
            {course?.chapters.map((chapter, index) => (
              <div
                key={index}
                onClick={() => toggleAccordion(index)}
                style={{ boxShadow: "0.5px 0.5px 2px gray" }}
              >
                <div className="accordion__faq-heading">
                  <h3
                    className={activeAccordions.includes(index) ? "active" : ""}
                    style={{ fontSize: "18px", paddingTop: "8px" }}
                  >
                    {index + 1}
                    {". "}
                    {chapter.chapterHeader}
                    <br />
                    <span
                      style={{
                        color: "#828282",
                        fontWeight: "400",
                        fontSize: "14px",
                      }}
                    >
                      {chapter?.sections.length}{" "}
                      {chapter?.sections.length === 1 ? "Lecture" : "Lectures"}
                    </span>
                  </h3>
                  <div>
                    {activeAccordions.includes(index) ? (
                      <span>-</span>
                    ) : (
                      <span>+</span>
                    )}
                  </div>
                </div>
                <div>
                  <div
                    className={
                      activeAccordions.includes(index) ? "active" : "inactive"
                    }
                  >
                    <hr style={{ width: "100%", color: "gray" }} />
                    {chapter?.sections.map((video, idx) => (
                      <p
                        key={idx}
                        onClick={() =>
                          navigate(
                            `/video/${chapter?.chapterId}/${video?.sectionId}`
                          )
                        }
                        className="videoLinkTile"
                      >
                        <img
                          src="https://learn.pegasus.imarticus.org/images/play-button.svg"
                          alt="play-button"
                          style={{ paddingRight: "1rem" }}
                        />
                        {idx + 1}
                        {". "}
                        {video?.sectionHeader}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePage;
