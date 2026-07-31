require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();

dbConnection();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(5000, () => {
  console.log("Server running");
});
