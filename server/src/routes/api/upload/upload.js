const express = require("express");
const { addNotes } = require("../../../controller/addNotes");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("upload");
});

router.post("/addNotes" , addNotes);
module.exports = router;
