"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Shop extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.User, {
        foreignKey: "seller_id",
        as: "seller",
      });

      this.hasMany(models.Product, {
        foreignKey: "shop_id",
        as: "products",
      });

      this.hasMany(models.Order, {
        foreignKey: "shop_id",
        as: "orders",
      });

      this.belongsToMany(models.Ward, {
        through: models.ShopAddress,
        foreignKey: "shop_od",
        otherKey: "ward_code",
        as: "wards",
      });
    }
  }

  Shop.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      seller_id: {
        type: DataTypes.INTEGER,
      },
      img_url: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dby8y0z9g/image/upload/v1725332119/users/shop_acn6xu.png",
      },
    },
    {
      sequelize,
      modelName: "Shop",
      tableName: "shops",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Shop;
};
