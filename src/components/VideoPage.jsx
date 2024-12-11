import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_KEY } from "../data";
import { valueConverter } from "../data";
import moment from "moment";
import "./VideoPage.css";

function VideoPage() {
  const [data, setData] = useState([]);
  const { categoryId, videoId } = useParams();
  const navigate = useNavigate();

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
    const response = await fetch(videoList_url);
    const data = await response.json();
    const videoItems = data.items;

    const updatedItems = await Promise.all(
      videoItems.map(async (item) => {
        const channelId = item.snippet.channelId;
        const profileUrl = await fetchProfile(channelId);
        return { ...item, profilePicture: profileUrl };
      })
    );

    setData(updatedItems);
  };

  const fetchProfile = async (channelId) => {
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`;
    const response = await fetch(channelUrl);
    const data = await response.json();
    return data.items[0].snippet.thumbnails.default.url;
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  const selectedVideo = data.find((video) => video.id === videoId);

  if (!selectedVideo) {
    return <div></div>;
  }

  return (
    <div>
      <iframe
        className="video2"
        width="1045"
        height="586"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="YouTube video player"
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      <div className="info3">
        <h1 className="videoTitle2">{selectedVideo.snippet.title}</h1>
        <div className="flexRow">
          <img
            className="videoPfp"
            src={selectedVideo.profilePicture}
            alt="Profile"
          />
          <h2 className="videoSubtitle2">
            {selectedVideo.snippet.channelTitle}
          </h2>
        </div>
        <h2>{valueConverter(selectedVideo.statistics.viewCount)} views</h2>
        <h2>{moment(selectedVideo.snippet.publishedAt).fromNow()}</h2>
      </div>
    </div>
  );
}

export default VideoPage;
