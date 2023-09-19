const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/api/v1", routes);
require("./src/database/dbConnection");

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
