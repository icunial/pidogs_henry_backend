const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const db = require("./src/db");

// Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialized Express Server
db.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
  });
});
