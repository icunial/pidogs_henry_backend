const express = require("express");
const router = express.Router();

const Dog = require("../models/Dog");
const Temperament = require("../models/Temperament");

const dogController = require("../controllers/dogs");

// GET all dogs
router.get("/", async (req, res) => {
  try {
    const apiResults = await dogController.getAllApi();
    return res.status(200).json({
      statusCode: 200,
      data: apiResults,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
