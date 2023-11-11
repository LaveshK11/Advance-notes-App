const { userLogout } = require("../../services/userService/userLogout");
const { BadRequestError } = require("../../utils/handelErrors/definedError");

/**
 *
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 */

const userLogoutServices = new userLogout();

const logout = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      return next(new BadRequestError("User Token Not Found"));
    }

    const token = authHeader.split(" ")[1];

    let data = await userLogoutServices.logout(token);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { logout };
