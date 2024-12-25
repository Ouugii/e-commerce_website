const express = require("express");
const router = express.Router();

const asyncHandler = require("express-async-handler");
const ShopController = require("../../controllers/shop.controller");

const {
  verifyToken,
  verifySeller,
} = require("../../middlewares/auth.middleware");

const upload = require("../../config/multer.config");

router
  .get("/", function (req, res, next) {
    res.render("index", { title: "TMDT CTK45A API SHOP SERVICES V1" });
  })

  .post("/register", verifyToken, asyncHandler(ShopController.registerShop))

  .use(verifyToken)
  .use(verifySeller)
  // profile
  .get("/profile", asyncHandler(ShopController.viewShop))
  .put(
    "/profile-image",
    upload.single("customerImage"),
    asyncHandler(ShopController.updateShopImage)
  )

  // product

  .post("/products", asyncHandler(ShopController.addProduct))
  // .get("/products/:productId", asyncHandler(ShopController.addProduct))
  // .delete("/products/:productId", asyncHandler(ShopController.addProduct))
  // .put("/products/:productId", asyncHandler(ShopController.addProduct))
  .post(
    "/product-images/:productId",
    upload.array("productImages"),
    asyncHandler(ShopController.addProductImages)
  )
  .post("/order/:orderId/confirm", asyncHandler(ShopController.confirmOrder))
  .post("/order/:orderId/ship", asyncHandler(ShopController.shipOrder))
  .post("/order/:orderId/deliver", asyncHandler(ShopController.deliverOrder));

// order

// .get("/order", asyncHandler(ShopController.addProduct))
// .get("/order/:orderId", asyncHandler(ShopController.addProduct))
// .put("/order/:orderId/status", asyncHandler(ShopController.addProduct));

module.exports = router;
