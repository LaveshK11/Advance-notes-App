const Notes = require("../database/models/Notes");
const { ValidationError } = require("../utils/handelErrors/definedError");
const handleError = require("../utils/handelErrors/handelError");

exports.getNotesById = async (payload) => {
  try {
    const { user_id } = payload;

    if ((user_id != "" && user_id != undefined)) {

      const response = await Notes.findAll({ where: { user_id: user_id } });

      return response;
    }
    else{
        throw new ValidationError("Please enter userId")
    }
  } catch (error) {
    handleError(error);
  }
};
