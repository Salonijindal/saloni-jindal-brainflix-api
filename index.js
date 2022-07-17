const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos");
const cors = require("cors");
app.use(express.json());
app.use(express.static("public"));

// Enable .env variables
require("dotenv").config();

const PORT = process.env.PORT || 5050;
//Enable access from client server to API
app.use(cors());
app.use((req, res, next) => {
  console.log("Incoming request: ", req.path);

  // You have to call next if you want to proceed to next middleware
  next();
});

app.use("/videos", videoRoutes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
