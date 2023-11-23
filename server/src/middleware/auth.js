const {
  AuthorizationError,
  AppError,
} = require("../utils/handelErrors/definedError");
const { JwtService } = require("../services/auth/jwtService");
const logger = require("../utils/logger/errorLogger");

const tokenService = new JwtService();
module.exports = {
  async verifyAccessToken(req, res, next) {
    try {
      const authHeader = req.headers["authorization"];
      if (!authHeader) {
        next(new AuthorizationError("Unauthorized"));
      }
      const token = authHeader.split(" ")[1];

      let data = await tokenService.verifyAccessToken(token);

      if (data) {
        req.payload = data;
        next();
      } else next(new AuthorizationError("Unauthorized User"));
    } catch (error) {
      logger.error(error)
      next(new AppError(error.name));
    }
  },
};
