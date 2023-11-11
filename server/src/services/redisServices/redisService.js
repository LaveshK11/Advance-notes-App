const { client } = require("../../database/redis/redisConnect");
const logger = require("../../utils/logger/errorLogger");

class redisOperations {
  /**
   * Setting token data of user in redis .
   * @param {Object} payload - Token containing user Data in hash.
   */
  async setData(id, token) {
    try {
      let status = await client.set(id.toString(), token);
      return status;
    } catch (error) {
      console.log(error);
      logger.error(error.message);
    }
  }

  /**
   * Getting token data of user in redis .
   * @param {Object} payload - user_id.
   * @return {refreshToken}
   */
  async getData(id) {
    try {
      return await client.get(id.toString());
    } catch (error) {
      console.log(error);
      logger.error(error.message);
    }
  }

  /**
   * Deleting token data of user in redis .
   * @param {Object} payload - Token containing user Data in hash.
   */
  async delData(id) {
    try {
      let delStatus = await client.del(id.toString());
      return delStatus;
    } catch (error) {
      console.log(error);
      logger.error(error.message)
    }
  }
}

module.exports = { redisOperations };
