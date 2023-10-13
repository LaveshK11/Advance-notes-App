const express = require("express");
const { register } = require("../../../controller/userRegistration");
const router = express.Router();

  router.get("/", (req, res) => {
  res.send("working");
});

router.post("/register", register);

module.exports = router;
