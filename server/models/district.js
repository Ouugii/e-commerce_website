"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class District extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      District.belongsTo(models.Province, { foreignKey: "province_code" });
      District.belongsTo(models.AdministrativeUnit, {
        foreignKey: "administrative_unit_id",
      });
    }
  }

  District.init(
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
      province_code: {
        type: DataTypes.STRING,
      },
      administrative_unit_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "District",
      tableName: "districts",
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
          fields: ["province_code"],
        },
      ],
    }
  );

  return District;
};
