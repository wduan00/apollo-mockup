const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
// open MongoDB connection prior to running the server
mongoose
  .connect(uri)
  .then(() => {
    // only run app if DB is connected
    app.listen(port, () => {
      console.log("Apollo app is running on port 5000");
    });
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log(error);
  });

// route handling
app.get("/", (req, res) => {
  res.send("Hello Apollo");
});
