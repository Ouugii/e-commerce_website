"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      // Define associations here if needed
      this.belongsToMany(models.User, {
        through: models.UserRole,
        foreignKey: "role_id",
        otherKey: "user_id",
        as: "users",
      });
    }
  }

  Role.init(
    {
      _id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "Role",
      tableName: "roles",
      timestamps: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return Role;
};
