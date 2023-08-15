require("dotenv").config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
const Sequelize = require("sequelize");
const db = new Sequelize(`
postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`);

// Instantiated Models
const Dog = require("./models/Dog");
const Temperament = require("./models/Temperament");

// Model relationships
Dog.belongsToMany(Temperament, { through: "DogsTemperaments" });
Temperament.belongsToMany(Dog, { through: "DogsTemperaments" });

module.exports = db;
