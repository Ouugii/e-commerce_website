const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const PublicController = require("../../controllers/public.controller");

router
  .get("/", function (req, res, next) {
    res.render("index", { title: "TMDT CTK45A API PUBLIC SERVICES V1" });
  })

  .get("/products", asyncHandler(PublicController.getProducts))

  .get("/products/:productId", asyncHandler(PublicController.getProductDetails))

  .get("/categories", asyncHandler(PublicController.getCategories))

  .get("/categories/:categoryId/products", function (req, res, next) {
    res.render("index", { title: "danh sách sản phẩm theo danh mục" });
  })

  .get("/brands", asyncHandler(PublicController.getBrands))

  .get("/brands/:brandId/products", function (req, res, next) {
    res.render("index", { title: "danh sách sản phẩm theo thương hiệu" });
  })

  .get("/shop/:shopId", asyncHandler(PublicController.getShopDetails))

  .get("/featured-products", asyncHandler(PublicController.getFeaturedProduct));

module.exports = router;
