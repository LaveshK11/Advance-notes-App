// const { sequelize, DataTypes } = require("../dbConnection");
const { DataTypes } = require("sequelize");
const sequelize = require("../dbConnection");
const user = sequelize.define("User", {
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
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    allowNull: false,
  },
});

user.sync({ alter: true });
module.exports = user;
