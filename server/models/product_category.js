"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ProductCategory extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });
      this.belongsTo(models.Category, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }

  ProductCategory.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductCategory",
      tableName: "product_categories",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ProductCategory;
};
