const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const logger = require("../../utils/logger/errorLogger");
const { LoginSchema } = require("../../utils/validation/schemas/userObj");
const { JwtService } = require("../auth/jwtService");
const { redisOperations } = require("../redisServices/redisService");

const jwtService = new JwtService();
const redisOp = new redisOperations();

class userLogin {
  /**
   * Validates user payload data against a schema.
   * @param {Object} payload - User data to validate.
   * @returns {Object} - Validation result.
   */
  validateUserPayload(payload) {
    return LoginSchema.validate(payload);
  }

  /**
   * Login existing user.
   * @param {Object} payload - User Login data.
   * @returns {Object} - Login result or error.
   */
  async userLogin(payload) {
    try {
      const validation = await this.validateUserPayload(payload);

      if (validation.error) {
        return { status: false, message: "Invalid Payload" };
      }

      const existingUser = await User.findOne({
        where: { email: payload.email },
      });

      if (!existingUser) {
        return { status: false, message: "User Not Registered" };
      }

      if (!(await bcrypt.compare(payload.password, existingUser.password))) {
        return { status: false, message: "Invalid Credentials" };
      }

      const tokens = await jwtService.generateTokens(
        existingUser.id,
        existingUser.email
      );

      if (tokens) {
        let dataSaved = await redisOp.setData(
          existingUser.id,
          tokens.refreshToken
        );
        if (dataSaved === "OK") {
          return { status: true, tokens };
        }
      }
    } catch (error) {
      console.error(error);
      logger.error(error.name);
      throw new Error("User login failed");
    }
  }
}

module.exports = { userLogin };
