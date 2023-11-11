const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { redisConnect } = require("./src/database/redis/redisConnect");
const routes = require("./src/routes/routes");

require("dotenv").config({ path: ".env" });

const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));

app.use("/api/v1", routes);
require("./src/database/dbConnection");
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json(err);
});
redisConnect();

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
