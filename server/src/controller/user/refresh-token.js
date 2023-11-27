const { JwtService } = require("../../services/auth/jwtService");
const { AuthorizationError } = require("../../utils/handelErrors/definedError");
const logger = require("../../utils/logger/errorLogger");

/**
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 * @description controller for generating refresh token
 */

const tokenService = new JwtService();

const refreshToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(new AuthorizationError("Unauthorized"));
    }

    const token = authHeader.split(" ")[1];

    let data = await tokenService.generateNewTokenFromOld(token);

    return res.json(data).send();
  } catch (error) {
    console.log(error);
    logger.error(error.name);
    next(error);
  }
};

module.exports = { refreshToken };
