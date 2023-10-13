const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = async (user_id, email) => {
  const token = jwt.sign({ user_id: 2323, email: "laveh" }, process.env.TOKEN, {
    expiresIn: "2h",
  });

  return token;
};

module.exports = generateToken
