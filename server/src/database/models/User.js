// const { sequelize, DataTypes } = require("../dbConnection");
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const AttendenceType = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});
AttendenceType.sync({ alter: true, force: true });
module.exports = AttendenceType;
