const express = require("express");
const cors = require("cors");
const routes = require("./src/routes/routes");

require("dotenv").config();

const app = express();
app.use(express.json());
app.use("/api/v1", routes);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

require("./src/database/dbConnection");
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
