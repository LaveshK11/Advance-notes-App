const express = require("express");
const { getNotes } = require("../../../controller/getNotes");
const router = express.Router();


router.get("/getNotes/:user_id", getNotes);


module.exports = router;
