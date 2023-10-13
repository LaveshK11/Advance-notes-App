const bcrypt = require("bcrypt");
const User = require("../database/models/User");
const logger = require("../utils/logger/errorLogger");
const { APIError } = require("../utils/handelErrors/definedError");
const { bodySchema } = require("../utils/validation/schemas/userObj");
const generateToken = require("../helpers/jwtHelper");

const validateUserPayload = (payload) => {
  return bodySchema.validate(payload);
};

const createUser = async (userData) => {
  const saltRounds = 10;
  const hashedPass = await bcrypt.hash(userData.password, saltRounds);
  const userObj = {
    name: userData.name,
    email: userData.email,
    password: hashedPass,
  };
  const newUser = await User.create(userObj);
  return newUser;
};

const userRegister = async (payload) => {
  try {
    const validation = validateUserPayload(payload);

    if (validation.error) {
      return false;
    }

    const existingUser = await User.findOne({
      where: { email: payload.email },
    });

    if (existingUser) {
      return { newUser: false, message: "User already exists" };
    }

    const newUser = await createUser(payload);

    const userToken = await generateToken(newUser.id, newUser.email);

    return { Token: userToken };
  } catch (error) {
    logger.error(error);
    throw new APIError("Data Not found", error);
  }
};

module.exports = { userRegister };
