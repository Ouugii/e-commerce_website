"use strict";
const { CREATED, OK } = require("../core/success.response");
const PublicService = require("../services/public.service");

class PublicController {
  getProducts = async (req, res, next) => {
    new OK({
      message: "get products list OK",
      metadata: await PublicService.getProducts(req.query),
    }).send(res);
  };

  getProductDetails = async (req, res, next) => {
    new OK({
      message: "get product detail OK",
      metadata: await PublicService.getProductDetails(req.params.productId),
    }).send(res);
  };

  getCategories = async (req, res, next) => {
    new OK({
      message: "get categories list",
      metadata: await PublicService.getCategories(),
    }).send(res);
  };

  getProductsByCategory = async (req, res, next) => {
    new OK({
      message: "update shop image OK",
      metadata: await PublicService.getProductsByCategory(
        req.params.categoryId
      ),
    }).send(res);
  };

  getBrands = async (req, res, next) => {
    new OK({
      message: "get brand list OK",
      metadata: await PublicService.getBrands(),
    }).send(res);
  };

  getProductsByBrand = async (req, res, next) => {
    new OK({
      message: "update shop image OK",
      metadata: await PublicService.getProductsByBrand(req.params),
    }).send(res);
  };

  getShopDetails = async (req, res, next) => {
    new OK({
      message: "get shop detail OK",
      metadata: await PublicService.getShopDetails(req.params.shopId),
    }).send(res);
  };

  getFeaturedProduct = async (req, res, next) => {
    new OK({
      message: "get featured product  OK",
      metadata: await PublicService.getFeaturedProduct(),
    }).send(res);
  };

  getProductDetails = async (req, res, next) => {
    new OK({
      message: "get product detail OK",
      metadata: await PublicService.getProductDetails(req.params.productId),
    }).send(res);
  };
}

module.exports = new PublicController();
