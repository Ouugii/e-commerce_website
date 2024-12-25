"use strict";

const { NotFoundError } = require("../core/error.response");

const { User } = require("../models");

class UserService {
  static async foundUser(userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: ["_id"],
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find this account");
    }

    return true;
  }

  static async getUserInfoById(userId) {
    const foundUser = await User.findOne({
      where: { _id: userId },
      attributes: { exclude: ["password", "_id"] },
      raw: true,
    });

    if (!foundUser) {
      throw new NotFoundError("Error: Can not find the user");
    }

    if (foundUser) {
      return {
        user: foundUser,
      };
    }
  }

  // static async updateUserInfo(userId, payload) {
  //   const updatedUser = await User.update(
  //     { payload },
  //     {
  //       where: {
  //         _id: userId,
  //       },
  //     }
  //   );

  //   if (!foundUser) {
  //     throw new NotFoundError("Error: Can not update this user");
  //   }

  //   if (foundUser) {
  //     return {
  //       user: updatedUser,
  //     };
  //   }
  // }
}

module.exports = UserService;
