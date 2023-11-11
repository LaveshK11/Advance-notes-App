const { AuthorizationError } = require("../../utils/handelErrors/definedError");
const { JwtService } = require("../auth/jwtService");
const { redisOperations } = require("../redisServices/redisService");

const redisOp = new redisOperations();
const jwtService = new JwtService();

class userLogout {
  constructor() {}

  async logout(token) {
    try {
      let data = await jwtService.verifyRefreshToken(token);

      if (data === false) return new AuthorizationError("Unauthorized User");

      let status = await redisOp.delData(data.userId);

      if (status) {
        return { success: true, description: "User Logout Successfully" };
      } else {
        return new AuthorizationError("Unauthorized User");
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = { userLogout };
