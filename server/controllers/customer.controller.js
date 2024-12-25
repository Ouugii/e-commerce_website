"use strict";
const { OK, CREATED } = require("../core/success.response");
const CustomerService = require("../services/customer.service");

class CustomerController {
  // profile
  getInfoById = async (req, res, next) => {
    new OK({
      message: "get user info OK",
      metadata: await CustomerService.getUserInfoById(req._id),
    }).send(res);
  };

  updateInfo = async (req, res, next) => {
    new OK({
      message: "update user info OK",
      metadata: await CustomerService.updateInfo(req._id, req.body),
    }).send(res);
  };

  updateCustomerImage = async (req, res, next) => {
    new OK({
      message: "update user image OK",
      metadata: await CustomerService.updateCustomerImage(req._id, req.file),
    }).send(res);
  };

  // shipping address
  addShippingAddress = async (req, res, next) => {
    new CREATED({
      message: "add shipping address OK",
      metadata: await CustomerService.addShipingAddress(req._id, req.body),
    }).send(res);
  };

  getShippingAddresses = async (req, res, next) => {
    new OK({
      message: "get shipping addresses OK",
      metadata: await CustomerService.getShippingAddresses(req._id),
    }).send(res);
  };

  updateShippingAddress = async (req, res, next) => {
    new OK({
      message: "update shipping addresses OK",
      // metadata: await CustomerService.getShippingAddresses(req._id),
    }).send(res);
  };

  // cart
  getCart = async (req, res, next) => {
    new OK({
      message: "get card",
      metadata: await CustomerService.getCart(req._id),
    }).send(res);
  };

  addProductToCart = async (req, res, next) => {
    new CREATED({
      message: "get product to cart",
      metadata: await CustomerService.addProductToCart(req._id, req.body),
    }).send(res);
  };

  checkOut = async (req, res, next) => {
    new CREATED({
      message: "get product to cart",
      metadata: await CustomerService.checkout(req._id, req.body),
    }).send(res);
  };

  reviewOrder = async (req, res, next) => {
    new CREATED({
      message: "review order ok",
      metadata: await CustomerService.reviewOrder(
        req._id,
        req.params.orderId,
        req.body,
        req.files
      ),
    }).send(res);
  };

  // updateCart = async (req, res, next) => {
  //   new OK({
  //     message: "update cart card",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // deleteProductInCart = async (req, res, next) => {
  //   new OK({
  //     message: "delete product card",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // order
  // getOrders = async (req, res, next) => {
  //   new OK({
  //     message: "get all order OK",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // createOrder = async (req, res, next) => {
  //   new OK({
  //     message: "create order OK",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // getOrderDetails = async (req, res, next) => {
  //   new OK({
  //     message: "get order detail OK",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // reviewOrder = async (req, res, next) => {
  //   new OK({
  //     message: "resview order OK",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };

  // cacelOrder = async (req, res, next) => {
  //   new OK({
  //     message: "cancel order OK",
  //     // metadata: await CustomerService.getShippingAddresses(req._id),
  //   }).send(res);
  // };
}

module.exports = new CustomerController();
