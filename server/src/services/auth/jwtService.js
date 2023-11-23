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
    this.accessTokenTime = process.env.ACCESS_TOKEN_TIME;
    this.refreshTokenTime = process.env.REFRESH_TOKEN_TIME;
  }

  /**
   * Creating an access token using user ID and email.
   * @param {Object} payload {userId, email}
   * @returns {string} accessToken
   */
  async getAccessToken(userId, email) {
    try {
      const accessToken = jwt.sign({ userId, email }, this.accessTokenSecret, {
        expiresIn: this.accessTokenTime,
      });
      return accessToken;
    } catch (error) {
      console.error(error);
      logger.error(error.name);
      throw new Error("Refresh token generation failed");
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
          expiresIn: this.refreshTokenTime,
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
      const payload = jwt.verify(refreshToken, this.refreshTokenSecret);
      return payload;
    } catch (error) {
      console.error(error);
      throw new AuthorizationError("Unauthorized User");
    }
  }

  async verifyAccessToken(accessToken) {
    try {
      const payload = jwt.verify(
        accessToken,
        this.accessTokenSecret,
        (err, payload) => {
          if (err) {
            console.log(err);
          }
          return payload;
        }
      );
      return payload;
    } catch (error) {
      console.error(error);
      throw new AuthorizationError("Unauthorized User");
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
      return await this.generateTokens(6, "firstuseer1@gmail.com");
    } else {
      return new AuthorizationError("Unauthorized User");
    }
  }
}

module.exports = { JwtService };
