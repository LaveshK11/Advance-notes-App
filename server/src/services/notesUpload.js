const Notes = require("../database/models/Notes");
const { APIError, ValidationError } = require("../utils/errorHandler");

const storeNotes = async (payload) => {
  try {
    console.log(payload);
    const data = new Notes(payload);

    const response = await data.save();

    return response;
  } catch (error) {
    if (error.name == "SequelizeForeignKeyConstraintError") {
      throw new ValidationError("Data Not found", error);
    }
    throw new APIError("Data Not found", error);
  }
};

module.exports = { storeNotes };
