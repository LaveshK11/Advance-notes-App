const User = require("../database/models/User");
const { APIError } = require("../utils/handelErrors/definedError");

const userRegister = async (payload) => {
  try {
    const { name } = payload;
    const user = await User.findOne({ where: { name: name } });

    if (user) {
      let data = { newUser: false, message: "already exisits" };

      return data;
    } else {
      const newUser = new User(payload);

      const response = await newUser.save();

      return response;
    }
  } catch (error) {
    throw new APIError("Data Not found", error);
  }
};

module.exports = { userRegister };
