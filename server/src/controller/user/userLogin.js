const { userLogin } = require("../../services/userService/userLoginService");

/**
 *
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 * @description controller for user login
 */

const userService = new userLogin();

const login = async (req, res, next) => {
  try {
    let data = await userService.userLogin(req.body);

    return res.json(data).send();
  } catch (error) {
    next(error);
  }
};

module.exports = { login };
