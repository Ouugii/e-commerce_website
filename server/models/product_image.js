"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
    }
  }

  ProductImage.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductImage",
      tableName: "product_images",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ProductImage;
};
