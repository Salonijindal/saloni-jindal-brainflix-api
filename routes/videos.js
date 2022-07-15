const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const readDataFile = (dataFilePath) => {
  const videosDataFile = fs.readFileSync(dataFilePath);
  const videosData = JSON.parse(videosDataFile);
  return videosData;
};

//Get Request
router.get("/", (req, res) => {
  const videosData = readDataFile("./data/videos.json");
  res.status(200).json(videosData);
});

//Get requested video data from the video detail array
router.get("/:videoId", (req, res) => {
  const videoId = req.params.videoId;
  const videoDetailsData = readDataFile("./data/video-detail.json");
  const videoDetails = videoDetailsData.find((video) => video.id === videoId);

  !videoDetails
    ? res.status(404).send("Video not found")
    : res.status(200).json(videoDetails);

  return;
});

//POST request

module.exports = router;
