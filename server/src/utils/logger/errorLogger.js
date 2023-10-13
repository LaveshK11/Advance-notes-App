const winston = require("winston");
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: "info", // Set the default log level to 'info'
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "combined.log",
    }),

    new winston.transports.File({
      filename: "error.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
