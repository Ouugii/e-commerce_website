"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Brand extends Model {
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: "brand_id",
        as: "products",
      });
    }
  }
  Brand.init(
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
      modelName: "Brand",
      tableName: "brands",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Brand;
};
