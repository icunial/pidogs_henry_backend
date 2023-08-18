const axios = require("axios");
const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");
const utils = require("../utils/index");

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
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "Not Specified"
              : r.weight.metric,
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
            temperament: r.temperament
              ? utils.convertTemperamentsToArray(r.temperament)
              : [],
            weight:
              r.weight.metric.substring(0, 3) === "NaN"
                ? "Not Specified"
                : r.weight.metric,
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

// Get dogs by its name from API
const findByNameApi = async (name) => {
  const results = [];
  try {
    const apiResults = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${name}`
    );
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: `https://cdn2.thedogapi.com/images/${r.reference_image_id}.jpg`,
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "Not Specified"
              : r.weight.metric,
        });
      });
    }
    return results;
  } catch (error) {
    throw new Error("Error trying to get a dog by its name from API");
  }
};

// Get dogs by its temperament
const findByTemperamentApi = async (temp) => {
  let results = [];
  try {
    const apiResults = await axios.get(`https://api.thedogapi.com/v1/breeds`);
    if (apiResults) {
      apiResults.data.forEach((r) => {
        results.push({
          id: r.id,
          name: r.name,
          image: r.reference_image_id,
          temperament: r.temperament
            ? utils.convertTemperamentsToArray(r.temperament)
            : [],
          weight:
            r.weight.metric.substring(0, 3) === "NaN"
              ? "Not Specified"
              : r.weight.metric,
        });
      });
      results = results.filter((r) => {
        return r.temperament.includes(temp.toUpperCase());
      });

      return results;
    }
  } catch (error) {
    throw new Error(
      "Error trying to get all dogs by their temperament from API"
    );
  }
};

// Get dogs ordered from A to Z
const orderDogsFromAtoZ = async () => {
  try {
    let dogsFromApi = await getAllApi();

    return dogsFromApi.sort((a, b) => {
      if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error(`Error trying to order dogs from A to Z`);
  }
};

// Get dogs ordered from Z to A
const orderDogsFromZtoA = async () => {
  try {
    let dogsFromApi = await getAllApi();

    return dogsFromApi.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      return 0;
    });
  } catch (error) {
    throw new Error(`Error trying to order dogs from Z to A`);
  }
};

// Get dogs ordered by their weight from more to less
const orderDogsMoreWeight = async () => {
  try {
    let dogsFromApi = await utils.getAllApiConvertWeight();

    return dogsFromApi.sort((a, b) => {
      if (a.min_weight < b.min_weight) return 1;
      if (a.min_weight > b.min_weight) return -1;
      if (a.min_weight === b.min_weight) {
        if (a.max_weight < b.max_weight) return 1;
        if (a.max_weight > b.max_weight) return -1;
      }
      return 0;
    });
  } catch (error) {
    throw new Error(`Error trying to order dogs from More Weight to Less`);
  }
};

module.exports = {
  getAllApi,
  findDogByIdApi,
  findByNameApi,
  findByTemperamentApi,
  orderDogsFromAtoZ,
  orderDogsFromZtoA,
};
