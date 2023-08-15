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
    timestamps: false,
  }
);

module.exports = Temperament;
