const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./src/db");

const router = require("./src/routes/index");

// Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router middleware
app.use("/", router);

// Instantiated Models
const Dog = require("./src/models/Dog");
const Temperament = require("./src/models/Temperament");

// Model associations
Dog.belongsToMany(Temperament, { through: "DogsTemperaments" });
Temperament.belongsToMany(Dog, { through: "DogsTemperaments" });

// Initialized Express Server
db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});
