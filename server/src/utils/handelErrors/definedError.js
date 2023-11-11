class AppError extends Error {
  constructor(
    name,
    statusCode,
    description,
    isOperational = true,
    errorStack = false,
    logingErrorResponse = false
  ) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errorStack = errorStack;
    this.logError = logingErrorResponse;
  }

  toJSON() {
    return {
      error: this.name,
      statusCode: this.statusCode,
      description: this.message,
    };
  }
}

class BadRequestError extends AppError {
  constructor(description = "Bad request", logingErrorResponse = false) {
    super("BAD REQUEST", 400, description, true, false, logingErrorResponse);
  }
}

class ValidationError extends AppError {
  constructor(description = "Validation Error", errorStack = false) {
    super("BAD REQUEST", 400, description, true, errorStack);
  }
}

class AuthorizationError extends AppError {
  constructor(description = "Unauthorized Error", errorStack = false) {
    super("UNAUTHORIZED", 401, description, true, errorStack);
  }
}

module.exports = {
  AppError,
  BadRequestError,
  ValidationError,
  AuthorizationError,
};
