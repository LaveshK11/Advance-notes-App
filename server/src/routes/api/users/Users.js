const express = require("express");
const { register } = require("../../../controller/user/userRegistration");
const { login } = require("../../../controller/user/userLogin");
const { refreshToken } = require("../../../controller/user/refresh-token");
const { logout } = require("../../../controller/user/userLogout");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);

module.exports = router;
