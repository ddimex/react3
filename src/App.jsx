import { useState } from "react";
import "./App.css";
import Header from "./components/header";
import HamburgerMenu from "./components/HamburgerMenu";
import Chips from "./components/Chips";
import Videos from "./components/Videos";
import VideoPage from "./components/VideoPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [category, setCategory] = useState(0);
  const [selectedVideoId, setSelectedVideoId] = useState(null);

  const handleVideoSelect = (videoId) => {
    setSelectedVideoId(videoId);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <div>
                <Header />
                <div className="flex">
                  <HamburgerMenu
                    category={category}
                    setCategory={setCategory}
                  />
                  <div className="flexCol">
                    <Chips />
                    <Videos
                      category={category}
                      onVideoSelect={handleVideoSelect}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
        />

        <Route
          path="/VideoPage/:categoryId/:videoId"
          element={
            <div>
              <div>
                <Header />
                <VideoPage />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
