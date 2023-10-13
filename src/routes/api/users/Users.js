const express = require("express");
const { userRegister } = require("../../../services/userService");
const router = express.Router();

  router.get("/", (req, res) => {
  res.send("working");
});

router.post("/register", userRegister);

module.exports = router;
