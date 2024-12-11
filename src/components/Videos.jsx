import React, { useState, useEffect } from "react";
import "./Videos.css";
import { API_KEY } from "../data";
import { valueConverter } from "../data";
import moment from "moment";
import { useNavigate } from "react-router-dom";

moment().format();

const Videos = ({ category, onVideoSelect }) => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
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
  }, [category]);

  const handleVideoClick = (videoId) => {
    navigate(`/VideoPage/${category}/${videoId}`);
    onVideoSelect(videoId);
  };

  return (
    <div className="videosContainer">
      {data.map((item, index) => (
        <div
          className="video"
          key={index}
          onClick={() => handleVideoClick(item.id)}
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <div className="flex info">
            <img className="pfp" src={item.profilePicture} alt="" />
            <div className="infoText flexCol">
              <h1 className="videoTitle">{item.snippet.title}</h1>
              <div className="info2">
                <h1 className="videoSubtitle">{item.snippet.channelTitle}</h1>
                <div className="flex">
                  <h4 className="videoSubtitle">
                    {valueConverter(item.statistics.viewCount)} views •{" "}
                    {moment(item.snippet.publishedAt).fromNow()}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
