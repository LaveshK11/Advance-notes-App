const express = require("express");
const router = express.Router();
const user = require("./api/users/Users");
const upload = require("./api/upload/upload");

router.use("/user", user);
router.use("/upload", upload);



module.exports = router;
