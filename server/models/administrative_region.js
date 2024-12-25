"use strict";

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AdministrativeRegion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AdministrativeRegion.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      name_en: {
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
      modelName: "AdministrativeRegion",
      tableName: "administrative_regions",
      timestamps: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return AdministrativeRegion;
};
