const Notes = require("../database/models/Notes");
const { storeNotes } = require("../services/notesUpload");

/**
 * @param {} req
 * @param {} res
 * @param {*} next
 * @returns Json Data.
 */

exports.addNotes = async (req, res, next) => {
  try {
    let data = await storeNotes(req.body);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
