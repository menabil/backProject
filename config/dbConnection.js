const mongoose = require("mongoose");

let dbConnection = () => {
  mongoose
    .connect(
      `
      mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@practice.4u2mmnp.mongodb.net/${process.env.MONGODB_DBNAME}backproject?appName=Practice`,
    )
    .then(() => {
      console.log("DB Connected");
    })
    .catch((error) => {
      console.log("DB Error: ", error);
    });
};

module.exports = dbConnection;
