"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Province.belongsTo(models.AdministrativeRegion, {
        foreignKey: "administrative_region_id",
      });
      Province.belongsTo(models.AdministrativeUnit, {
        foreignKey: "administrative_unit_id",
      });
    }
  }

  Province.init(
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
      administrative_unit_id: {
        type: DataTypes.INTEGER,
      },
      administrative_region_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Province",
      tableName: "provinces",
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
          fields: ["administrative_region_id"],
        },
      ],
    }
  );

  return Province;
};
