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
  const videosData = readDataFile("./data/video-detail.json");
  console.log(Math.floor(Math.random() * 9));
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
router.post("/", (req, res) => {
  const videoUploadData = req.data;
  console.log("Requested Body: ", videoUploadData);
  if (!req.body.title || !req.body.channel) {
    return res.status(400).send("Title and channel are required fields");
  }
  const videosData = readDataFile("./data/videos.json");

  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: req.body.channel,
    Image: `/images/image${Math.floor(Math.random() * 9)}.jpeg`,
    //Put Default image, likes etc
  };
  videosData.push(newVideo); //Do we need write in both data
  fs.writeFileSync("./data/video-detial.json", JSON.stringify(videosData));
  res.status(201).json(newVideo);
});
module.exports = router;
