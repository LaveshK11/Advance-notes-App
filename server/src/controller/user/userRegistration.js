const { userRegister } = require("../../services/userService/userRegisterService");

/**
 *
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 */


const userController =  new userRegister()

const register = async (req, res, next) => {
  try {
    let data = await userController.userRegister(req.body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
