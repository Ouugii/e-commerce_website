"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.ProductCategory,
        foreignKey: "category_id",
        as: "products",
      });
    }
  }
  Category.init(
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
        unique: true,
      },
      image_url: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Category",
      tableName: "categories",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Category;
};
