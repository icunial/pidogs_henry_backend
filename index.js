const express = require("express");
const app = express();

// Body-Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialized Express Server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
