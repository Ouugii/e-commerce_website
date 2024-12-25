"use strict";

const db = require("../models");

db.sequelize
  .sync({ force: true })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
