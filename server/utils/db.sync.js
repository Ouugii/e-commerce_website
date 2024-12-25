"use strict";

const db = require("../models");

db.sequelize
  .sync({ alter: true })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });
