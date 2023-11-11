const {
  AppError,
  BadRequestError,
  ValidationError,
} = require("./definedError");

const handleError = (error) => {
  switch (error.name) {
    case "SequelizeForeignKeyConstraintError":
      return new ValidationError("Please enter correct data", error.name);
    default:
      throw error;
  }
};

module.exports = handleError;
