const axios = require("axios");
const Dog = require("../models/Dog");

// Convert temperaments String to Array
const convertTemperamentsToArray = (temperaments) => {
  const temperamentsArray = [];
  temperaments
    .split(", ")
    .forEach((i) => temperamentsArray.push(i.toUpperCase()));
  return temperamentsArray;
};

module.exports = { convertTemperamentsToArray };
