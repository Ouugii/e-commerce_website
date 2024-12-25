"use strict";

const db = require("../models");

db.sequelize
  .authenticate()
  .then(() => {
    const { host, port, database } = db.sequelize.config;

    console.log(`Connection established successfully.`);
    console.log(`Host: ${host}`);
    console.log(`Port: ${port}`);
    console.log(`Database: ${database}`);
  })
  .then(() => {
    console.log("Connection closed successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
