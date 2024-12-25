const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const AddressController = require("../../controllers/address.controller");

router
  .get("/procince", asyncHandler(AddressController.getProvinces))
  .get(
    "/district/:province_code",
    asyncHandler(AddressController.getDistrictsByProvinceCode)
  )
  .get(
    "/ward/:district_code",
    asyncHandler(AddressController.getWardsByDistrictCode)
  )
  .get("/search", asyncHandler(AddressController.searchPlace))

  // .get("/search", (req, res) => {
  //   res.send(req.query);
  // })

  .get("/", (req, res) => {
    res.send("TEST API V1 FOR ADDRESS");
  });

module.exports = router;
