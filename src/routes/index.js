const express = require("express");
const router = express.Router();

const dogsRouter = require("./dogs");
const temperamentsRouter = require("./temperaments");

// Specify router root route
router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);

module.exports = router;
