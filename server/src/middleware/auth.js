const jwt = require("jsonwebtoken");
const {
  AuthorizationError,
  AppError,
} = require("../utils/handelErrors/definedError");

module.exports = {
  verifyAccessToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        next(new AuthorizationError("Unauthorized"));
      }
      const token = authHeader.split(" ")[1];
      
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) {
          next(new AuthorizationError("Unauthorized User"));
        }
        req.payload = payload;
        next();
      });
    } catch (error) {
      console.log(error);
      next(new AppError());
    }
  },
};
