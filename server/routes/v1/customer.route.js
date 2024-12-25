const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const CustomerController = require("../../controllers/customer.controller");
const {
  verifyToken,
  verifyCustomer,
} = require("../../middlewares/auth.middleware");
const upload = require("../../config/multer.config");

router
  .get("/", function (req, res, next) {
    res.render("index", { title: "TMDT CTK45A API USER SERVICES V1" });
  })
  // profile
  .use(verifyToken, verifyCustomer)
  .get("/profile", asyncHandler(CustomerController.getInfoById))
  .put("/profile", asyncHandler(CustomerController.updateInfo))
  .put(
    "/update-image",
    upload.single("customerImage"),
    asyncHandler(CustomerController.updateCustomerImage)
  )
  // shipping address
  .get(
    "/shipping-addresses",
    asyncHandler(CustomerController.getShippingAddresses)
  )
  .post(
    "/shipping-address",
    asyncHandler(CustomerController.addShippingAddress)
  )
  .put(
    "/shipping-address/:shippingAddressId",
    asyncHandler(CustomerController.updateShippingAddress)
  )
  // // cart
  .get("/cart", asyncHandler(CustomerController.getCart))
  .post("/cart", asyncHandler(CustomerController.addProductToCart))

  // .put("/cart/:itemId", function (req, res, next) {
  //   res.render("index", { title: "cập nhật sản phẩm trong giỏ hàng" });
  // })
  // .delete("/cart/:itemId", function (req, res, next) {
  //   res.render("index", { title: "xóa sản phẩm khỏi giỏ hàng" });
  // });

  // // order
  // .get("/orders", function (req, res, next) {
  //   res.render("index", { title: "thông tin các dơn hàng" });
  // })
  .post("/orders", asyncHandler(CustomerController.checkOut))

  .post(
    "/orders/:orderId/review",
    upload.array("reviewImages", 5),
    asyncHandler(CustomerController.reviewOrder)
  );

// .put("/orders/:orderId", function (req, res, next) {
//   res.render("index", { title: "chi tiết đơn hàng" });
// })
// .put("/orders/:orderId/review", function (req, res, next) {
//   res.render("index", { title: "đánh giá đơn hàng" });
// })
// .delete("/orders/:orderId", function (req, res, next) {
//   res.render("index", { title: "hủy đơn hàng" });
// });

module.exports = router;
