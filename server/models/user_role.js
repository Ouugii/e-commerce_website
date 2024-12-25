"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class UserRole extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
      this.belongsTo(models.Role, {
        foreignKey: "role_id",
        as: "role",
      });
    }
  }

  UserRole.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "UserRole",
      tableName: "user_roles",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return UserRole;
};
