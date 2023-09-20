const Notes = require("../database/models/Notes");
const { ValidationError } = require("../utils/handelErrors/definedError");
const handelError = require("../utils/handelErrors/handelError");
const logger = require("../utils/logger/errorLogger");

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
    logger.error(error.name);

    return handelError(error);
  }
};
