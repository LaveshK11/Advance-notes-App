const logger = require("../../utils/logger/errorLogger");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { redisOperations } = require("../redisServices/redisService");
const {
  AuthorizationError,
  AppError,
} = require("../../utils/handelErrors/definedError");
const redisOp = new redisOperations();

dotenv.config();

class JwtService {
  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  }

  /**
   * Creating an access token using user ID and email.
   * @param {Object} payload {userId, email}
   * @returns {string} accessToken
   */
  async getAccessToken(userId, email) {
    try {
      const accessToken = jwt.sign({ userId, email }, this.accessTokenSecret, {
        expiresIn: "20s",
      });
      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Access token generation failed");
    }
  }

  /**
   * Creating a refresh token using user ID and email.
   * @param {Object} payload {userId, email}
   * @returns {string} refreshToken
   */
  async getRefreshToken(userId, email) {
    try {
      const refreshToken = jwt.sign(
        { userId, email },
        this.refreshTokenSecret,
        {
          expiresIn: process.env.REFRESH_TOKEN_TIME,
        }
      );
      return refreshToken;
    } catch (error) {
      console.error(error);
      logger.error(error.name);
      throw new Error("Refresh token generation failed");
    }
  }

  /**
   * Method for verifying a refresh token.
   * @param {Object} payload {userId, email}
   * @returns {Object} {decoded from jwt}
   */
  async verifyRefreshToken(refreshToken) {
    try {
      const payload = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) {
            return false;
          } else {
            return decoded;
          }
        }
      );
      return payload;
    } catch (error) {
      throw new AppError("Internsal Server Error");
    }
  }

  /**
   * Function for generating an access token and a refresh token.
   * @param {Object} payload {userId, email}
   * @returns {Object} {accessToken, refreshToken}
   */
  async generateTokens(userId, email) {
    const accessToken = await this.getAccessToken(userId, email);
    const refreshToken = await this.getRefreshToken(userId, email);
    return { status: true, accessToken, refreshToken };
  }

  /**
   * Function for generating an access token and a refresh token.
   * @param {Object} payload {refreshToken}
   * @returns {Object} {accessToken, refreshToken}
   */
  async generateNewTokenFromOld(refreshToken) {
    let payload = await this.verifyRefreshToken(refreshToken);

    if (payload === false) return new AuthorizationError("Unauthorized User");

    const redisData = await redisOp.getData(payload.userId);

    if (redisData === refreshToken) {
      return await this.generateTokens(payload.userId, payload.email);
    } else {
      return new AuthorizationError("Unauthorized User");
    }
  }
}

module.exports = { JwtService };
