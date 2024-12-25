"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsTo(models.User, {
        foreignKey: "admin_id",
        as: "author",
      });

      this.hasMany(models.ArticleImage, {
        foreignKey: "article_id",
        as: "images",
      });
    }
  }

  Article.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      slug: {
        type: DataTypes.STRING,
        unique: true,
      },
      is_public: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Article",
      tableName: "articles",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Article;
};
