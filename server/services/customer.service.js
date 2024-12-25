"use strict";

require("dotenv").config();
const {
  sequelize,
  User,
  CustomerShippingAddress,
  Role,
  Cart,
  CartItem,
  Product,
  Order,
  Shop,
  OrderItem,
  ReviewImage,
} = require("../models");
const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../core/error.response");
const { getInfoData, omitInfoData } = require("../utils");
const UserService = require("./user.service");
const cloudinary = require("../config/cloudinary.config");

class CustomerService {
  static async getUserInfoById(userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Some thing wrong with your info");
    }

    const isSeller = await User.findOne({
      where: { _id: userId },
      include: {
        model: Role,
        as: "roles",
        where: { name: "seller" },
        attributes: ["name"],
      },
      attributes: ["_id"],
    });

    const isAdmin = await User.findOne({
      where: { _id: userId },
      include: {
        model: Role,
        as: "roles",
        where: { name: "admin" },
        attributes: ["name"],
      },
      attributes: ["_id"],
    });

    if (isSeller) {
      foundUser.isSeller = true;
    } else {
      foundUser.isSeller = false;
    }

    if (isAdmin) {
      foundUser.isAdmin = true;
    } else {
      foundUser.isAdmin = false;
    }

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    return {
      user: foundUser,
    };
  }

  static async updateInfo(userId, payload) {
    try {
      await UserService.foundUser(userId);

      const updatedUser = await User.update(
        { ...payload },
        {
          where: {
            _id: userId,
          },
        }
      );

      if (updatedUser.length === 0) {
        throw new NotFoundError("Error: Can not update this user");
      }

      if (updatedUser) {
        return {
          user: omitInfoData({
            fields: ["_id", "password"],
            object: updatedUser,
          }),
        };
      }
    } catch (error) {
      throw error;
    }
  }

  static async updateCustomerImage(userId, file) {
    const imgPath = file.path;

    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    try {
      const r = await cloudinary.uploader.upload(imgPath, {
        folder: "users",
        public_id: `user_${userId}`,
        overwrite: true,
      });

      if (!r) {
        throw new BadRequestError("Error---: Can not update this user");
      }

      const updatedUser = await User.update(
        {
          image_url: r.secure_url,
        },
        {
          where: {
            _id: userId,
          },
        }
      );

      if (updatedUser.length === 0) {
        throw new NotFoundError("Error: Can not update this user");
      }

      return {
        user: omitInfoData({
          fields: ["_id", "password"],
          object: updatedUser,
        }),
      };
    } catch (error) {
      throw error;
    }
  }

  static async addShipingAddress(userId, payload) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    const address = `${payload.address} - ${payload.ward} - ${payload.district} - ${payload.province}`;

    const newAddress = await CustomerShippingAddress.create({
      customer_id: userId,
      ward_code: payload.ward_code,
      address: address,
      phone_number: payload.phone_number,
    });

    if (!newAddress) {
      throw new BadRequestError(
        "Error: Can not add new shipping address to your account"
      );
    }

    return {
      shipping_address: getInfoData({
        fields: ["address", "phone_number"],
        object: newAddress,
      }),
    };
  }

  static async getShippingAddresses(userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    const shippingAddresses = await CustomerShippingAddress.findAll({
      where: {
        customer_id: userId,
      },
      attributes: { exclude: ["createdAt", "updatedAt", "customer_id"] },
    });

    if (!shippingAddresses) {
      throw new NotFoundError("Error: Can not find address");
    }

    return {
      shipping_ddresses: shippingAddresses,
    };
  }

  static async deleteShipingAddres(userId, shippingAddressId) {
    const deletedAddress = await User.delete({
      where: { customer_id: userId, _id: shippingAddressId },
      attributes: [],
    });

    if (!deletedAddress) {
      throw new NotFoundError("Error: Can not delete this address");
    }

    return {
      deletedAddress,
    };
  }

  static async getCart(userId) {
    try {
      const cart = await Cart.findOne({
        where: {
          customer_id: userId,
          status: "active",
        },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [
              {
                model: Product,
                as: "product",
                include: [{ model: Shop, as: "shop" }],
                attributes: { include: ["_id", "name"] },
              },
            ],
          },
        ],
      });

      if (!cart) {
        throw new NotFoundError("No active cart found");
      }

      const groupedByShop = cart.items.reduce((shops, item) => {
        if (!item.product) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }

        const shopId = item.product.shop_id;
        const shopName = item.product.shop
          ? item.product.shop.name
          : "Unknown Shop";

        if (!shops[shopId]) {
          shops[shopId] = {
            shopId: shopId,
            shopName: shopName,
            items: [],
          };
        }

        shops[shopId].items.push({
          productId: item.product_id,
          productName: item.product.name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          totalPrice: item.total_price,
        });

        return shops;
      }, {});

      const shops = Object.values(groupedByShop);

      return {
        cartId: cart._id,
        customer_id: cart.customer_id,
        total_amount: cart.total_amount,
        shops,
      };
    } catch (error) {
      throw error;
    }
  }

  static async addProductToCart(userId, payload) {
    const { productId, quantity } = payload;

    const foundProduct = await Product.findOne({
      where: { _id: productId },
    });

    if (!foundProduct) {
      throw new ForbiddenError("Can not find the product product");
    }

    const foundShop = await Shop.findOne({
      where: { _id: foundProduct.shop_id },
    });

    if (!foundShop) {
      throw new ForbiddenError("Can not find the shop");
    }

    if (foundShop.seller_id === userId) {
      throw new ForbiddenError("You can not make order for your shop");
    }

    try {
      let cart = await Cart.findOne({
        where: {
          customer_id: userId,
          status: "active",
        },
        include: [
          {
            model: CartItem,
            as: "items",
            required: false,
            include: [{ model: Product, as: "product" }],
          },
        ],
      });

      if (!cart) {
        cart = await Cart.create({
          customer_id: userId,
        });
      }

      const product = await Product.findByPk(productId);
      if (!product) {
        throw new NotFoundError("Product not found");
      }

      const shopId = product.shop_id;

      if (!cart.items || cart.items.length === 0) {
        // If items don't exist or no items, proceed
        const shopId = product.shop_id;
      } else {
        const firstItemShopId = cart.items[0].product.shop_id;

        if (shopId !== firstItemShopId) {
          throw new BadRequestError(
            "Cannot add products from different shops to the same cart."
          );
        }
      }

      const unitPrice = product.sale_price || product.price;
      const totalPrice = unitPrice * quantity;

      const [cartItem, created] = await CartItem.findOrCreate({
        where: {
          cart_id: cart._id,
          product_id: product._id,
        },
        defaults: {
          quantity,
          unit_price: unitPrice,
          total_price: totalPrice,
        },
      });

      if (!created) {
        cartItem.quantity += quantity;
        cartItem.total_price = cartItem.quantity * unitPrice;
        await cartItem.save();
      }

      const cartItems = await CartItem.findAll({
        where: { cart_id: cart._id },
      });
      const cartTotal = cartItems.reduce(
        (total, item) => total + item.total_price,
        0
      );
      cart.total_amount = cartTotal;
      await cart.save();

      return { cart };
    } catch (error) {
      throw error;
    }
  }

  static async checkout(userId, payload) {
    let selectedProductIds = payload.productIds;

    try {
      let cart = await Cart.findOne({
        where: {
          customer_id: userId,
          status: "active",
        },
        include: [
          {
            model: CartItem,
            as: "items",
            include: [{ model: Product, as: "product" }],
          },
        ],
      });

      if (!cart) {
        throw new Error("No active cart found");
      }

      const selectedItems = cart.items.filter((item) =>
        selectedProductIds.includes(item.product_id)
      );

      if (selectedItems.length === 0) {
        throw new Error("No products selected for checkout");
      }

      const firstItemShopId = selectedItems[0].product.shop_id;
      const isSameShop = selectedItems.every(
        (item) => item.product.shop_id === firstItemShopId
      );

      if (!isSameShop) {
        throw new Error(
          "Cannot checkout products from different shops in one order."
        );
      }

      const totalAmount = selectedItems.reduce(
        (total, item) => total + item.total_price,
        0
      );

      const order = await Order.create({
        customer_id: userId,
        shop_id: firstItemShopId,
        customer_shipping_address_id: payload.customer_shipping_address_id,
        // shop_address_id: payload.shop_address_id,
        total_amount: totalAmount,
        status: "pending",
      });

      await Promise.all(
        selectedItems.map((item) => {
          return OrderItem.create({
            order_id: order._id,
            product_id: item.product._id,
            quantity: item.quantity,
            unit_price: item.unit_price,
            total_price: item.total_price,
          });
        })
      );

      await CartItem.destroy({
        where: {
          cart_id: cart._id,
          product_id: selectedProductIds,
        },
      });

      const remainingItems = await CartItem.findAll({
        where: { cart_id: cart._id },
      });
      const remainingTotal = remainingItems.reduce(
        (total, item) => total + item.total_price,
        0
      );
      cart.total_amount = remainingTotal;
      await cart.save();

      return {
        order: order,
      };
    } catch (error) {
      throw error;
    }
  }

  static async updateCart(userId) {}
  static async deleteProductInCart(userId) {}

  static async getOrders(userId) {}
  static async getOrderDetails(orderId) {}
  static async cacelOrder(orderId) {}

  static async reviewOrder(userId, orderId, payload, images) {
    try {
      const foundUser = await User.findOne({
        where: { _id: userId },
        attributes: { exclude: ["password", "_id"] },
        raw: true,
      });
      if (!foundUser) {
        throw new NotFoundError("Something went wrong with your information");
      }

      const foundOrder = await Order.findOne({
        where: { _id: orderId, customer_id: userId, status: "delivered" },
        include: [
          {
            model: OrderItem,
            as: "order_items",
            include: {
              model: Product,
              as: "product",
            },
          },
        ],
      });
      if (!foundOrder) {
        throw new NotFoundError("No delivered order found for review");
      }

      const existingReview = await Review.findOne({
        where: { order_id: orderId, product_id: payload.product_id },
      });
      if (existingReview) {
        throw new BadRequestError(
          "You have already reviewed this product in this order"
        );
      }

      const newReview = await Review.create({
        content: payload.content,
        rating_point: payload.rating_point,
        order_id: orderId,
      });

      const uploadedImages = [];
      if (images && images.length > 0) {
        for (const image of images) {
          const result = await cloudinary.uploader.upload(image.path, {
            folder: "reviews",
          });

          const newReviewImage = await ReviewImage.create({
            url: result.secure_url,
            review_id: newReview._id,
          });

          uploadedImages.push(newReviewImage);
        }
      }

      return {
        review: newReview,
        images: uploadedImages,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CustomerService;
