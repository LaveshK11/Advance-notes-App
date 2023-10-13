const express = require("express");
const { addNotes } = require("../../../controller/addNotes");
const router = express.Router();

router.post("/addNotes", addNotes);

module.exports = router;
