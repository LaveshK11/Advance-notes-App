const Notes = require("../../database/models/Notes");
const { ValidationError } = require("../../utils/handelErrors/definedError");
const handelError = require("../../utils/handelErrors/handelError");
const logger = require("../../utils/logger/errorLogger");

exports.storeNotes = async (body, payload) => {
  try {
    const user_id = payload.userId;
    const content = body.Content;

    if (
      user_id != "" &&
      user_id !== undefined &&
      content != "" &&
      content !== undefined
    ) {
      let data = {
        user_id: user_id,
        Content: content,
      };

      const dataObj = new Notes(data);


      const response = await dataObj.save();

      return response;
    } else {
      throw new ValidationError("Iccorect Data entered");
    }
  } catch (error) {
    logger.error(error.name);

    return handelError(error);
  }
};
