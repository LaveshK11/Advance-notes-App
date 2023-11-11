const express = require("express");
const { addNotes } = require("../../../controller/addNotes");
const { verifyAccessToken } = require("../../../middleware/auth");
const router = express.Router();

router.post("/addNotes", verifyAccessToken,  addNotes);

module.exports = router;
