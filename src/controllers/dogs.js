const axios = require("axios");
const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

// Get All Dogs from API
const getAllApi = async () => {
  const results = [];
  try {
    const apiResults = await axios.get("https://api.thedogapi.com/v1/breeds");
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: r.reference_image_id,
          temperament: r.temperament,
          weight: r.weight.metric,
        });
      });
    }
    return results;
  } catch (error) {
    throw new Error("Error trying to get all dogs from API");
  }
};

// Get dog by its id from API
const findDogByIdApi = async (id) => {
  const result = [];

  try {
    const apiResults = await axios.get("https://api.thedogapi.com/v1/breeds");
    if (apiResults) {
      apiResults.data.forEach((r) => {
        if (r.id === parseInt(id)) {
          result.push({
            id: r.id,
            name: r.name,
            image: r.reference_image_id,
            temperament: r.temperament,
            weight: r.weight.metric,
            height: r.height.metric,
            life_span: r.life_span,
          });
        }
      });
    }
    return result;
  } catch (error) {
    throw new Error("Error finding a dog by its ID from API");
  }
};

module.exports = {
  getAllApi,
  findDogByIdApi,
};
