"use strict";

const bcrypt = require("bcrypt");
const saltRounds = 10;

const { User, Role, UserRole } = require("../models"); // Adjust the path to your models if necessary

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const hashedPassword = await bcrypt.hash("admin", saltRounds);

    const adminUser = await User.create({
      user_name: "admin",
      password: hashedPassword,
      first_name: "Admin",
      last_name: "User",
      email: "admin@example.com",
      phone_number: "1234567890",
      image_url: null,
    });

    const adminRole = await Role.findOne({ where: { name: "admin" } });

    if (!adminRole) {
      throw new Error(
        "Admin role not found. Please ensure the 'admin' role exists in the roles table."
      );
    }

    // Insert the user role for the admin user
    await UserRole.create({
      user_id: adminUser._id,
      role_id: adminRole._id,
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    const adminUser = await User.findOne({ where: { user_name: "admin" } });

    if (adminUser) {
      await UserRole.destroy({ where: { user_id: adminUser._id } });
      await User.destroy({ where: { user_name: "admin" } });
    }
  },
};
