const crypto = require("crypto");
const dotenv = require("dotenv");
const logger = require("../../utils/logger/errorLogger");

dotenv.config();

class encryptNotes {
  constructor() {
    this.algorithm = process.env.ENCRYPTION_ALGORITHM;
    this.secuityKey = crypto.randomBytes(32);
    this.iv = crypto.randomBytes(16);
  }

  /**
   * Method for encrypting user notes.
   * @param {User Notes}
   * @returns {string} hash
   * @desc This will create a user notes has and this will be stored in database;
   */
  async ecryptUserNotes(userNotes) {
    try {
      const data = userNotes;

      let cipher = crypto.createCipheriv(
        this.algorithm.toString(),
        Buffer.from(this.secuityKey),
        this.iv
      );

      let encrypted = cipher.update(data);

      encrypted = Buffer.concat([encrypted, cipher.final()]);

      return encrypted.toString("hex");
    } catch (error) {
      logger.error(error);
    }
  }

  // /**
  //  * Method for decrypting user notes.
  //  * @param {User Notes Hash}
  //  * @returns {string} hash
  //  * @desc This will create a user notes has and this will be stored in database;
  //  */
  // async decryptUserNotes(hash) {}
}

module.exports = { encryptNotes };
