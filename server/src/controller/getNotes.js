const { getNotesById } = require("../services/notesService/getUserNotes");

/**
 * @param {user_id} req
 * @param {User notes} res
 * @param {*} next
 * @returns Json Data.
 */
exports.getNotes = async (req, res, next) => {
  try {
    let data = await getNotesById(req.params);

    return res.json(data);
  } catch (error) {
    next(error);
  }
};
