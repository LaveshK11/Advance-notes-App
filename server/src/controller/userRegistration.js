const saveUserData = require("../services/userService").userRegister;

/**
 *
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 */

const register = async (req, res, next) => {
  try {
    let data = await saveUserData(req.body);

    return res.json(data);
    
  } catch (error) {
    next(error);
  }
};

module.exports = { register };
