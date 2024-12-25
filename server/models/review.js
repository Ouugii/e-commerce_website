"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "order",
      });

      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "product",
      });

      this.hasMany(models.ReviewImage, {
        foreignKey: "review_id",
        as: "review_images",
      });
    }
  }

  Review.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
      },
      rating_point: {
        type: DataTypes.ENUM("1", "2", "3", "4", "5"),
      },
      reply: {
        type: DataTypes.STRING,
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Review",
      tableName: "reviews",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Review;
};
