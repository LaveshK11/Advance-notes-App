const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const logger = require("../utils/logger/errorLogger");
const { APIError } = require("../utils/handelErrors/definedError");
const { bodySchema } = require("../utils/validation/schemas/userObj");

const userRegister = async (payload) => {
  try {
    let approve = bodySchema.validate(payload);

    if (!approve.error) {
      const user = await User.findOne({
        where: { email: approve.value.email },
      });

      if (user) {
        let data = { newUser: false, message: "already exisits" };

        return data;
      } else {
        const saltRounds = 10;

        const hashedPass = await bcrypt.hash(approve.value.password, saltRounds);

        const userObj = {
          name: approve.value.email,
          email: approve.value.email,
          password: hashedPass,
        };

        const newUser = new User(userObj);

        const response = await newUser.save();

        return response;
      }
    } else {
      return approve.error;
    }
  } catch (error) {
    console.log(error);
    logger.error(error);

    throw new APIError("Data Not found", error);
  }
};

module.exports = { userRegister };
