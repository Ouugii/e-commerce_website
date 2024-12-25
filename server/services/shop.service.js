"use strict";
require("dotenv").config();

const ROLE = JSON.parse(process.env.ROLES).seller;

const {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
} = require("../core/error.response");

const { getInfoData } = require("../utils");

const {
  sequelize,
  User,
  Shop,
  UserRole,
  Product,
  ProductImage,
  Category,
  Brand,
  Order,
} = require("../models");
const { createSlug } = require("../utils/slug");

const cloudinary = require("../config/cloudinary.config");

class ShopService {
  static async registerShop(payload, userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: Not find user");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: userId },
      attributes: ["_id"],
    });

    if (foundShop) {
      throw new BadRequestError("You already have a booth");
    }

    const t = await sequelize.transaction();

    try {
      const slug = createSlug(payload.name);

      const newShop = await Shop.create(
        {
          seller_id: userId,
          name: payload.name,
          slug: slug,
        },
        { transaction: t }
      );

      if (!newShop) {
        throw new BadRequestError("Can not create a new booth");
      }

      const newRole = await UserRole.create(
        {
          user_id: userId,
          role_id: ROLE,
        },
        { transaction: t }
      );

      if (!newRole) {
        throw new BadRequestError("Can not add a new role");
      }

      await t.commit();

      return {
        shop: getInfoData({
          fields: ["_id", "name"],
          object: newShop,
        }),
      };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  static async viewShop(ownerId) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: Not find user");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["_id", "name", "stock_quantity", "price", "sale_price"],
          include: [
            {
              model: Category,
              as: "categories",
              attributes: ["_id", "name"],
              through: {
                attributes: [],
              },
            },
            {
              model: Brand,
              as: "brand",
              attributes: ["_id", "name"],
            },
            { model: ProductImage, as: "images" },
          ],
        },
        {
          model: Order,
          as: "orders",
          include: [
            {
              model: Product,
              as: "products",
              attributes: ["_id", "name", "price"],
              through: { attributes: ["quantity", "unit_price"] },
            },
          ],
        },
      ],
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Not find shop");
    }

    const pendingOrdersCount = await Order.count({
      where: {
        shop_id: foundShop._id,
        status: "pending",
      },
    });

    return {
      shop: foundShop,
      pendingOrdersCount: pendingOrdersCount,
    };
  }
  static async updateShopInfo() {}

  static async updateShopImage(ownerId, file) {
    const imgPath = file.path;

    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: Not find user");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Not find shop");
    }

    try {
      const r = await cloudinary.uploader.upload(imgPath, {
        folder: "shops",
        public_id: `shop_${foundShop._id}`,
        overwrite: true,
      });

      if (!r) {
        throw new BadRequestError("Error---: Can not update this user");
      }

      const updatedShop = await Shop.update(
        {
          img_url: r.secure_url,
        },
        {
          where: {
            _id: foundShop._id,
          },
        }
      );

      if (updatedShop.length === 0) {
        throw new NotFoundError("Error: Can not update this shop");
      }

      return {
        shop: updatedShop,
      };
    } catch (error) {
      throw error;
    }
  }

  static async addProduct(payload, ownerId) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("User not found with the given information");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      attributes: ["_id"],
    });

    if (!foundShop) {
      throw new NotFoundError("Shop not found with the given information");
    }

    const t = await sequelize.transaction();

    try {
      const slug = createSlug(payload.name);

      const newProduct = await Product.create(
        {
          name: payload.name,
          description: payload.description,
          price: payload.price,
          sale_price: payload.sale_price,
          stock_quantity: payload.stock_quantity,
          slug: slug,
          shop_id: foundShop._id,
          brand_id: payload.brand_id,
        },
        { transaction: t }
      );

      console.log(payload.category_ids);

      if (payload.category_ids && Array.isArray(payload.category_ids)) {
        await newProduct.setCategories(payload.category_ids, {
          transaction: t,
        });
      }

      await t.commit();

      const productDetails = await Product.findOne({
        where: { _id: newProduct._id },
        include: [
          { model: Category, as: "categories", attributes: ["_id", "name"] },
          { model: Brand, as: "brand", attributes: ["_id", "name"] },
        ],
      });

      return {
        product: productDetails,
      };
    } catch (error) {
      if (t.finished !== "commit") {
        await t.rollback();
      }
      throw error;
    } finally {
      if (!t.finished) {
        await t.rollback();
      }
    }
  }

  static async addProductImage(ownerId, productId, files) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: Not find user");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      attributes: ["_id"],
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Not find shop");
    }

    // Check if the number of images exceeds the limit (6 images max)
    const imgCount = await ProductImage.count({
      where: { product_id: productId },
    });

    const remainingSlots = 6 - imgCount;

    if (files.length > remainingSlots) {
      throw new BadRequestError(
        `Error: Limit is 6 images. You can only upload ${remainingSlots} more images.`
      );
    }

    const uploadedImages = [];

    // Use async/await with Promise.all for cleaner code
    const uploadPromises = files.map(async (file) => {
      try {
        const result = await cloudinary.uploader.upload(file.path);
        const uploadedImage = await ProductImage.create({
          product_id: productId,
          url: result.url,
        });

        uploadedImages.push(result.url);
        return uploadedImage;
      } catch (error) {
        throw new BadRequestError(
          `Error: Could not upload image or save to the database - Error: ${error.message}`
        );
      }
    });

    await Promise.all(uploadPromises);

    return { uploadedImages };
  }

  static async updateProductInfo() {}

  static async deleteProduct() {}

  static async viewProducts() {}

  static async viewProductById() {}

  static async viewOrders() {}

  static async viewOrderById(orderId) {}

  static async confirmOrder(ownerId, orderId) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: User not found");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      attributes: ["_id"],
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Shop not found");
    }

    const foundOrder = await Order.findByPk(orderId);

    if (!foundOrder) {
      throw new NotFoundError("ERR: Order not found");
    }

    if (foundOrder.shop_id !== foundShop._id) {
      throw new ForbiddenError("ERR: The order does not belong to your shop");
    }

    if (foundOrder.status === "confirmed") {
      throw new BadRequestError("ERR: The order is already confirmed");
    }

    foundOrder.status = "confirmed";
    await foundOrder.save();

    return { foundOrder };
  }

  static async shipOrder(ownerId, orderId) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: User not found");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      attributes: ["_id"],
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Shop not found");
    }

    const transaction = await sequelize.transaction();

    try {
      const foundOrder = await Order.findByPk(orderId, {
        include: [
          {
            model: OrderItem,
            as: "order_items",
            include: [{ model: Product, as: "product" }],
          },
        ],
        transaction,
      });

      if (!foundOrder) {
        throw new NotFoundError("Order not found");
      }

      if (foundOrder.shop_id !== foundShop._id) {
        throw new ForbiddenError("The order does not belong to your shop");
      }

      if (foundOrder.status !== "confirmed") {
        throw new BadRequestError("Order is not confirmed yet");
      }

      for (const item of foundOrder.order_items) {
        const product = item.product;

        if (product.stock_quantity < item.quantity) {
          throw new BadRequestError(
            `Insufficient stock for product ${product.name}`
          );
        }

        product.stock_quantity -= item.quantity;
        await product.save({ transaction });
      }

      foundOrder.status = "shipped";
      await foundOrder.save({ transaction });

      await transaction.commit();

      return foundOrder;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deliverOrder(ownerId, orderId) {
    const foundUser = await User.findOne({
      where: { _id: ownerId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Something wrong with your info: User not found");
    }

    const foundShop = await Shop.findOne({
      where: { seller_id: ownerId },
      attributes: ["_id"],
    });

    if (!foundShop) {
      throw new NotFoundError("Something wrong with your info: Shop not found");
    }

    const foundOrder = await Order.findByPk(orderId);

    if (!foundOrder) {
      throw new NotFoundError("ERR: Order not found");
    }

    if (foundOrder.shop_id !== foundShop._id) {
      throw new ForbiddenError("ERR: The order does not belong to your shop");
    }

    if (foundOrder.status !== "confirmed") {
      throw new BadRequestError("Order is not confirmed yet");
    }

    if (foundOrder.status === "delivered") {
      throw new BadRequestError("ERR: The order is already delivered");
    }

    foundOrder.status = "delivered";
    await foundOrder.save();

    return { foundOrder };
  }
}

module.exports = ShopService;
