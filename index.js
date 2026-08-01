require("node:dns").setServers(["1.1.1.1", "8.8.8.8"]);
require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();
const authRoute = require("./routes/authRoute");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const limiter = require("./utils/limiter");

dbConnection();
app.use(express.json());

app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/api/v1/auth", authRoute);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(5000, () => {
  console.log("Server running");
});
