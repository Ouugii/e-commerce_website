"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsToMany(models.Role, {
        through: models.UserRole,
        foreignKey: "user_id",
        otherKey: "role_id",
        as: "roles",
      });

      this.hasMany(models.CustomerShippingAddress, {
        foreignKey: "customer_id",
        as: "shipping_addresses",
      });

      this.hasOne(models.Shop, {
        foreignKey: "seller_id",
        as: "shop",
      });

      this.hasMany(models.Order, {
        foreignKey: "customer_id",
        as: "orders",
      });

      this.hasMany(models.Article, {
        foreignKey: "admin_id",
        as: "articles",
      });
    }
  }

  User.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        unique: true,
      },
      image_url: {
        type: DataTypes.STRING,
        defaultValue:
          "https://res.cloudinary.com/dby8y0z9g/image/upload/v1725332119/users/user_djtxik.png",
      },
      full_name: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.first_name} ${this.last_name}`;
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return User;
};
