const express = require("express");
const router = express.Router();
const user = require("./api/users/Users");
const upload = require("./api/upload/upload");
const getData = require('./api/getData/getNotes')


router.use("/user", user);

router.use("/upload", upload);

router.use('/get' , getData )



module.exports = router;
