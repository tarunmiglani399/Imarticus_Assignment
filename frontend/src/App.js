import "./App.css";
import { Routes, Route } from "react-router-dom";
import CoursePage from "./components/CoursePage/CoursePage";
import VideoPage from "./components/VideoPage/VideoPage";

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<CoursePage />} />
      <Route path="/video/:chapter/:section" element={<VideoPage />} />
    </Routes>
  );
}

export default App;
