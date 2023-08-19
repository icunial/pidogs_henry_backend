const express = require("express");
const router = express.Router();

const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const axios = require("axios");

// GET all temperaments
router.get("/", async (req, res, next) => {
  try {
    let response = await axios.get("https://api.thedogapi.com/v1/breeds");

    let temperamentsFromApi = [];

    response = response.data.map((item) => {
      return item.temperament;
    });

    response.forEach((item) => {
      if (item !== undefined) {
        item.split(", ").forEach((i) => {
          temperamentsFromApi.push(i.toUpperCase());
        });
      }
    });

    temperamentsFromApi = Array.from(new Set(temperamentsFromApi));

    const tempExist = await Temperament.findOne({
      where: {
        name: temperamentsFromApi[0],
      },
    });

    // Get all temperaments from DB if are saved
    if (tempExist) {
      return res.status(200).json({
        statusCode: 200,
        json: await Temperament.findAll({ order: [["name"]] }),
      });
    }

    // Create a temperament for each item in the array, in de DB
    for (temperament of temperamentsFromApi) {
      await Temperament.create({ name: temperament });
    }

    // Get all temperaments from DB
    return res.status(200).json({
      statusCode: 200,
      json: await Temperament.findAll({ order: [["name"]] }),
    });
  } catch (error) {
    return next("Error trying to get all temperaments");
  }
});

// Gets all dogs with a temperament
router.get("/:temperament", async (req, res, next) => {
  try {
    const { temperament } = req.params;

    const result = await Temperament.findOne({
      where: {
        name: temperament.toUpperCase(),
      },
      include: Dog,
    });
    if (!result.dogs.length) {
      return res.status(404).json({
        statusCode: 404,
        msg: `Dogs with TEMPERAMENT: ${temperament} not found!`,
      });
    }
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next("Error trying to get all dogs with a temperament");
  }
});

module.exports = router;
