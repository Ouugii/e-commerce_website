"use strict";

require("dotenv").config();
const { sequelize, User, Role, UserRole } = require("../models");
const { BadRequestError, AuthFailureError } = require("../core/error.response");

class AdminService {
  static async addBrand() {}

  static async addCategory() {}

  static async addArticle() {}

  static async addVoucer() {}

  static async addRole() {}
}

module.exports = AdminService;
