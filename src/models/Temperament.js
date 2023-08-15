const { DataTypes } = require("sequelize");
const db = require("../db");

const Temperament = db.define(
  "temperament",
  {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamp: false,
  }
);

module.exports = Temperament;
