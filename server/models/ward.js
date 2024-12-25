"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Ward extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ward.belongsTo(models.District, { foreignKey: "district_code" });

      Ward.belongsTo(models.AdministrativeUnit, {
        foreignKey: "administrative_unit_id",
      });

      this.hasMany(models.CustomerShippingAddress, {
        foreignKey: "ward_code",
        as: "users",
      });

      this.hasMany(models.ShopAddress, {
        foreignKey: "ward_code",
        as: "shops",
      });
    }
  }
  Ward.init(
    {
      code: {
        type: DataTypes.STRING(20),
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      name_en: {
        type: DataTypes.STRING,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      full_name_en: {
        type: DataTypes.STRING,
      },
      code_name: {
        type: DataTypes.STRING,
      },
      district_code: {
        type: DataTypes.STRING,
      },
      administrative_unit_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Ward",
      tableName: "wards",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
      indexes: [
        {
          unique: false,
          fields: ["administrative_unit_id"],
        },
        {
          unique: false,
          fields: ["district_code"],
        },
      ],
    }
  );

  return Ward;
};
