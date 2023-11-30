const { storeNotes } = require("../services/notesService/notesUpload");
const logger = require("../utils/logger/errorLogger");

/**
 * @param {user_id , content} req
 * @param {Json} res
 * @param {*} next
 * @returns Json Data.
 */

exports.addNotes = async (req, res, next) => {
  try {

    let data = await storeNotes(req.body, req.payload);

    res.json(data);
  } catch (error) {
    next(error);
  }
};
