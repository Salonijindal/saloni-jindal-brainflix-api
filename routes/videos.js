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
  const videosDataFile = readDataFile("./data/video-detail.json");
  const videosData = videosDataFile.map((video) => {
    return {
      id: video.id,
      title: video.title,
      channel: video.channel,
      image: video.image,
    };
  });
  console.log(videosData);
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
  if (!req.body.title || !req.body.description) {
    return res.status(400).send("Title and description are required fields");
  }
  const videosData = readDataFile("./data/video-detail.json");

  const newVideo = {
    id: uuid(),
    title: req.body.title,
    channel: "Red Cow",
    description: req.body.description,
    image: `/images/image${Math.floor(Math.random() * 9)}.jpeg`,
    views: "1,001,023",
    likes: "110,985",
    duration: "4:01",
    timestamp: Date.now(),
    comments: [
      {
        name: "Micheal Lyons",
        comment:
          "They BLEW the ROOF off at their last event, once everyone started figuring out they were going. This is still simply the greatest opening of an event I have EVER witnessed.",
        likes: 0,
        timestamp: 1628522461000,
      },
      {
        name: "Gary Wong",
        comment:
          "Every time I see him shred I feel so motivated to get off my couch and hop on my board. He’s so talented! I wish I can ride like him one day so I can really enjoy myself!",
        likes: 0,
        timestamp: 1626359541000,
      },
      {
        name: "Theodore Duncan",
        comment:
          "How can someone be so good!!! You can tell he lives for this and loves to do it every day. Every time I see him I feel instantly happy! He’s definitely my favorite ever!",
        likes: 0,
        timestamp: 1626011132000,
      },
    ],
    //Put Default image, likes etc
  };
  videosData.push(newVideo);
  fs.writeFileSync("./data/video-detail.json", JSON.stringify(videosData));
  res.status(201).json(newVideo);
});
module.exports = router;
