"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CustomerShippingAddress extends Model {
    static associate(models) {
      // Define associations here if needed
      // this.belongsTo(models.User, {
      //   foreignKey: "customer_id",
      //   as: "user",
      // });
      // this.belongsTo(models.Ward, {
      //   foreignKey: "ward_code",
      //   as: "ward",
      // });
    }
  }

  CustomerShippingAddress.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ward_code: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
      },
      phone_number: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "CustomerShippingAddress",
      tableName: "customer_shipping_addresses",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return CustomerShippingAddress;
};
