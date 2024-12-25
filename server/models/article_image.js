"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class ArticleImage extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.User, {
        foreignKey: "article_id",
        as: "article",
      });
    }
  }

  ArticleImage.init(
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
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ArticleImage",
      tableName: "article_images",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return ArticleImage;
};
