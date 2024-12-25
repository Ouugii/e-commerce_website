const express = require("express");
const router = express.Router();

router
  .use("/access", require("./access.route"))
  .use("/shop", require("./shop.route"))
  .use("/address", require("./address.route"))
  .use("/customer", require("./customer.route"))
  .use("/p", require("./public.route"))

  .post("/test", function (req, res, next) {
    res.send(req.body);
  })

  .get("/", function (req, res, next) {
    res.render("index", { title: "TMDT CTK45A API V1" });
  });

module.exports = router;
