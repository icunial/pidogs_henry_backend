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

module.exports = {
  getAllApi,
};
