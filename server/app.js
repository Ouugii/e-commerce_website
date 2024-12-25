"use strict";

require("dotenv").config();

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");

const db = require("./models");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: `http://localhost:${process.env.CLIENT_PORT}`,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.static(path.join(__dirname, "public")));

app.use("/", require("./routes"));

// check connect db

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler

// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.error(error.stack); // Log the error stack trace

  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    stack: req.app.get("env") === "development" ? error.stack : {}, // Only provide stack in development
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
