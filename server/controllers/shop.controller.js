"use strict";
const { CREATED, OK } = require("../core/success.response");
const ShopService = require("../services/shop.service");

class ShopController {
  registerShop = async (req, res, next) => {
    new CREATED({
      message: "Registered Shop OK",
      metadata: await ShopService.registerShop(req.body, req._id),
    }).send(res);
  };

  viewShop = async (req, res, next) => {
    new OK({
      message: "view for owner shop OK",
      metadata: await ShopService.viewShop(req._id),
    }).send(res);
  };

  addProduct = async (req, res, next) => {
    new OK({
      message: "add product for shop OK",
      metadata: await ShopService.addProduct(req.body, req._id),
    }).send(res);
  };

  updateShopImage = async (req, res, next) => {
    new OK({
      message: "update shop image OK",
      metadata: await ShopService.updateShopImage(req._id, req.file),
    }).send(res);
  };

  addProductImages = async (req, res, next) => {
    new OK({
      message: "update shop image OK",
      metadata: await ShopService.addProductImage(
        req._id,
        req.params.productId,
        req.files
      ),
    }).send(res);
  };

  confirmOrder = async (req, res, next) => {
    new OK({
      message: "confirm order OK",
      metadata: await ShopService.confirmOrder(req._id, req.params.orderId),
    }).send(res);
  };

  shipOrder = async (req, res, next) => {
    new OK({
      message: "ship order OK",
      metadata: await ShopService.shipOrder(req._id, req.params.orderId),
    }).send(res);
  };

  deliverOrder = async (req, res, next) => {
    new OK({
      message: "deliver order OK",
      metadata: await ShopService.deleteProduct(req._id, req.params.orderId),
    }).send(res);
  };
}

module.exports = new ShopController();
