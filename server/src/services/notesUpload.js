const Notes = require("../database/models/Notes");
const { ValidationError } = require("../utils/definedError");
const handelError = require("../utils/handelError");

exports.storeNotes = async (payload) => {
  let transaction;

  try {
    const { user_id, Content } = payload;
    if (
      user_id != "" &&
      user_id !== undefined &&
      Content != "" &&
      Content !== undefined
    ) {
      
      const data = new Notes(payload);

      const response = await data.save();

      return response;

    } else {

      throw new ValidationError("Iccorect Data entered");

    }
  } catch (error) {
    return handelError(error);
  }
};


