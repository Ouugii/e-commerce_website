"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdministrativeUnit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdministrativeUnit.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
      },
      full_name_en: {
        type: DataTypes.STRING,
      },
      short_name: {
        type: DataTypes.STRING,
      },
      short_name_en: {
        type: DataTypes.STRING,
      },
      code_name: {
        type: DataTypes.STRING,
      },
      code_name_en: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "AdministrativeUnit",
      tableName: "administrative_units",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return AdministrativeUnit;
};
