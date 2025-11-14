const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());
app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/b", (req, res) => {
  res.send("<h2>Heel</h2>");
});
module.exports = app;
