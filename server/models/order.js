"use strict";

const { Model } = require("sequelize");

// const generateOrderCode = () => {
//   const prefix = "ORD-";
//   const randomNum = Math.floor(Math.random() * 100000);
//   const timestamp = Date.now();
//   return `${prefix}${timestamp}-${randomNum}`;
// };

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.Shop, {
        foreignKey: "shop_id",
        as: "shop",
      });

      this.belongsTo(models.User, {
        foreignKey: "customer_id",
        as: "user",
      });

      this.belongsToMany(models.Product, {
        through: models.OrderItem,
        foreignKey: "order_id",
        otherKey: "product_id",
        as: "products",
      });

      this.hasMany(models.Review, {
        foreignKey: "order_id",
        as: "review",
      });

      this.belongsTo(models.CustomerShippingAddress, {
        foreignKey: "customer_shipping_address_id",
        as: "shipping_address",
      });

      // this.belongsTo(models.ShopAddress, {
      //   foreignKey: "shop_address_id",
      //   as: "shop_address",
      // });

      this.belongsToMany(models.Voucher, {
        through: models.OrderVoucher,
        foreignKey: "order_id",
        otherKey: "voucher_id",
        as: "voucher",
      });
    }
  }

  Order.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM(
          "pending",
          "confirmed",
          "shipped",
          "delivered",
          "cancelled"
        ),
        defaultValue: "pending",
      },
      description: {
        type: DataTypes.STRING,
        unique: true,
      },
      order_code: {
        type: DataTypes.STRING,
        unique: true,
      },
      total_amount: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      shipping_cost: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      discount_amount: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      final_amount: {
        type: DataTypes.BIGINT.UNSIGNED,
      },
      is_paid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      customer_shipping_address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      shop_address_id: {
        type: DataTypes.INTEGER,
      },
      shop_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Order",
      tableName: "orders",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Order;
};
