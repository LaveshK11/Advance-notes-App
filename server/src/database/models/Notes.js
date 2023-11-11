const { DataTypes } = require("sequelize");
const User = require("./User");
const sequelize = require("../dbConnection");

const Notes = sequelize.define("notes", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },

  release_date: {
    type: DataTypes.DATEONLY,
    defaultValue: DataTypes.NOW,
  },
  Content: {
    type: DataTypes.TEXT,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Notes.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Notes.sync({ alter: true , Force : true });

module.exports = Notes;
