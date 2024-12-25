const express = require("express");
const router = express.Router();

/* GET home page. */
router.use("/api/v1", require("./v1"));

router.get("/", function (req, res, next) {
  res.render("index", { title: "TMDT CTK45A" });
});

module.exports = router;
