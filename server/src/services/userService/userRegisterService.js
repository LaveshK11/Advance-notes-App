const bcrypt = require("bcrypt");
const User = require("../../database/models/User");
const logger = require("../../utils/logger/errorLogger");
const { AppError } = require("../../utils/handelErrors/definedError");
const {
  registrationSchema,
} = require("../../utils/validation/schemas/userObj");
const { JwtService } = require("../auth/jwtService");
const { redisOperations } = require("../redisServices/redisService");

const jwtService = new JwtService();
const redisOp = new redisOperations();

class userRegister {
  /**
   * Validates user payload data against a schema.
   * @param {Object} payload - User data to validate.
   * @returns {Object} - Validation result.
   */
  validateUserPayload(payload) {
    return registrationSchema.validate(payload);
  }

  /**
   * Creates a new user and stores it in the database.
   * @param {Object} userData - User data to create.
   * @returns {Object} - Created user.
   */
  async createUser(userData) {
    let saltRounds = process.env.SALTROUNDS;

    const hashedPass = await bcrypt.hash(userData.password, Number(saltRounds));

    const userObj = {
      name: userData.name,
      email: userData.email,
      password: hashedPass,
    };

    const newUser = await User.create(userObj);
    return newUser;
  }

  /**
   * Registers a new user.
   * @param {Object} payload - User registration data.
   * @returns {Object} - Registration result or error.
   */
  async userRegister(payload) {
    try {
      const validation = this.validateUserPayload(payload);

      if (validation.error) {
        return validation.error;
      }

      const existingUser = await User.findOne({
        where: { email: payload.email },
      });

      if (existingUser) {
        return { newUser: false, message: "User already exists" };
      }

      const newUser = await this.createUser(payload);

      const tokens = await jwtService.generateTokens(newUser.id, newUser.email);

      if (tokens) {
        await redisOp.setData(newUser.id, tokens.refreshToken);
      }

      return {
        status: true,
        tokens,
      };
    } catch (error) {
      logger.error(error);
      throw new AppError("User registration failed", error);
    }
  }
}

module.exports = { userRegister };
