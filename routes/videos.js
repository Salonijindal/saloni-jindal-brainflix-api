const express = require("express");
const router = express.Router();
const fs = require("fs");
const { v4: uuid } = require("uuid");

const readVideos = () => {
  const videosDataFile = fs.readFileSync("./data/videos.json");
  const videosData = JSON.parse(videosDataFile);
  console.log(videosData);
  return videosData;
};

router.get("/", (req, res) => {
  const videosData = readVideos();
  console.log("Data in get /video", videosData);
  res.status(200).json(videosData);
});

module.exports = router;
