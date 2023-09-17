const { storeNotes , getNotesById } = require("../services/notesUpload");

/**
 * @param {user_id , content} req
 * @param {Json} res
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


