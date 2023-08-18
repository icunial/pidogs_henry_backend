const express = require("express");
const router = express.Router();

const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const dogController = require("../controllers/dogs");

// Get dog by its id
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  let result = [];

  try {
    result = await dogController.findDogByIdApi(id);
    if (!result.length)
      return res.status(404).json({
        statusCode: 404,
        msg: `Dog with ID: ${id} not found!`,
      });
    res.status(200).json({
      statusCode: 200,
      data: result,
    });
  } catch (error) {
    return next(error);
  }
});

// GET all dogs
router.get("/", async (req, res, next) => {
  const { name } = req.query;

  try {
    // Search dogs by its name
    if (name) {
      const apiResults = await dogController.findByNameApi(name);
      if (!apiResults.length)
        return res.status(404).json({
          statusCode: 404,
          msg: `Dog with name ${name} not found!`,
        });
      return res.status(200).json({
        statusCode: 200,
        data: apiResults,
      });
    }
    const apiResults = await dogController.getAllApi();
    const dbResults = await dogController.getAllDb();
    return res.status(200).json({
      statusCode: 200,
      data: dbResults.concat(apiResults),
    });
  } catch (error) {
    return next(error);
  }
});

// Get dogs by its temperament
router.get("/temperaments/:temperament", async (req, res, next) => {
  const { temperament } = req.params;
  try {
    if (temperament) {
      const apiResults = await dogController.findByTemperamentApi(temperament);
      if (!apiResults.length) {
        return res.status(404).json({
          statusCode: 404,
          msg: `Dogs with temperament ${temperament} not found!`,
        });
      }
      return res.status(200).json({
        statusCode: 200,
        data: apiResults,
      });
    }
  } catch (error) {
    return next(error);
  }
});

// Order features routes
router.get("/filter/:opt", async (req, res, next) => {
  try {
    const { opt } = req.params;

    let results = [];

    if (opt === "az") {
      results = await dogController.orderDogsFromAtoZ();
    } else if (opt === "za") {
      results = await dogController.orderDogsFromZtoA();
    } else if (opt === "more") {
      results = await dogController.orderDogsMoreWeight();
    } else if (opt === "less") {
      results = await dogController.orderDogsLessWeight();
    } else {
      return res.status(400).json({
        statusCode: 400,
        msg: `No filter available`,
      });
    }

    res.status(200).json({
      statusCode: 200,
      data: results,
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
