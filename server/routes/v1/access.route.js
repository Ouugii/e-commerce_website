const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const AccessController = require("../../controllers/access.controller");

router
  .post("/login", asyncHandler(AccessController.login))
  .delete("/login", asyncHandler(AccessController.logout))
  .post("/sign-up", asyncHandler(AccessController.signUp))
  .delete("/logout", asyncHandler(AccessController.logout))

  .get("/", function (req, res, next) {
    res.render("index", { title: "TMDT CTK45A ACCESS SERVICES API V1" });
  });

module.exports = router;
