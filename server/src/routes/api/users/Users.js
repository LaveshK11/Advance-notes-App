const express = require("express");
const router = express.Router();
const register = require("../../../controller/userController").register;

  router.get("/", (req, res) => {
  res.send("working");
});

router.post("/register", register);

module.exports = router;
