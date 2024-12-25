"use strict";

const db = require("../models");

db.sequelize
  .sync()
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
