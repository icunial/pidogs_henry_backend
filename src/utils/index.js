const axios = require("axios");
const Dog = require("../models/Dog");

// Convert weight property from API
const getAllApiConvertWeight = async () => {
  const results = [];
  try {
    const apiResults = await axios.get("https://api.thedogapi.com/v1/breeds");
    if (apiResults) {
      apiResults.data.forEach((r) => {
        if (r.weight !== "NaN") {
          if (r.id !== 232 && r.id !== 179) {
            results.push({
              id: r.id,
              name: r.name,
              image: r.reference_image_id,
              temperament: r.temperament
                ? convertTemperamentsToArray(r.temperament)
                : [],
              min_weight: parseInt(r.weight.metric.split(" - ")[0]),
              max_weight: parseInt(r.weight.metric.split(" - ")[1]),
              weight: r.weight.metric,
            });
          }
        }
      });
    }
    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from API");
  }
};

// Convert weight property from DB
const getAllDbConvertWeight = async () => {
  const results = [];
  try {
    const dbResults = await Dog.findAll({
      attributes: ["id", "name", "image", "weight"],
      include: Temperament,
    });
    dbResults.forEach((r) => {
      results.push({
        id: r.id,
        name: r.name,
        image: r.image,
        temperament: r.temperament.map((t) => t.name),
        min_weight: parseInt(r.weight.split(" - ")[0]),
        max_weight: parseInt(r.weight.split(" - ")[1]),
        weight: r.weight,
      });
    });
    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from DB");
  }
};

// Convert temperaments String to Array
const convertTemperamentsToArray = (temperaments) => {
  const temperamentsArray = [];
  temperaments
    .split(", ")
    .forEach((i) => temperamentsArray.push(i.toUpperCase()));
  return temperamentsArray;
};

module.exports = { convertTemperamentsToArray, getAllApiConvertWeight };
