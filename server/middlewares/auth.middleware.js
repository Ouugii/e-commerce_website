require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const { AuthFailureError, BadRequestError } = require("../core/error.response");

const { Shop, Role, UserRole, User } = require("../models");

const HEADER = {
  API_KEY: "x-api-key",
  CLIENT_ID: "x-client-id",
  AUTHORIZATION: "authorization",
  REFRESHTOKEN: "x-rtoken-id",
};

const verifyToken = asyncHandler(async (req, res, next) => {
  // const token = req.cookies.accessToken || req.headers[HEADER.AUTHORIZATION];

  const token = req.headers[HEADER.AUTHORIZATION];

  if (!token) throw new AuthFailureError("Not found token");

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) throw new AuthFailureError("Invalid token");
    // req.user = decoded;
    req._id = decoded._id;
    next();
  });
});

const checkRole = asyncHandler(async (req, res, next, roleName) => {
  const userId = req._id; // Ensure `_id` is properly set on req object

  if (!userId) {
    return res.status(401).json({ message: "User ID is required." });
  }

  const foundUser = await User.findOne({
    where: { _id: userId },
    include: {
      model: Role,
      as: "roles",
      where: { name: roleName },
      attributes: ["name"],
    },
    attributes: ["_id"],
  });

  if (foundUser && foundUser.roles.length > 0) {
    next();
  } else {
    return next(new AuthFailureError("Insufficient privileges"));
  }
});

const verifyCustomer = (req, res, next) => {
  return checkRole(req, res, next, "customer");
};

const verifySeller = (req, res, next) => {
  return checkRole(req, res, next, "seller");
};

const verifyAdmin = (req, res, next) => {
  return checkRole(req, res, next, "admin");
};

const verifyShopOwner = asyncHandler(async (req, res, next) => {
  const userId = req._id;
  const shopId = req.params.shopId || req.body.shopId;

  if (!shopId) throw new AuthFailureError("Shop ID is required");

  const shop = await Shop.findOne({
    where: {
      _id: shopId,
      owner_id: userId,
    },
  });

  if (!shop) {
    throw new AuthFailureError(
      "You do not have permission to access this shop"
    );
  }

  next();
});

module.exports = {
  verifyToken,
  verifyCustomer,
  verifySeller,
  verifyAdmin,
  verifyShopOwner,
};
