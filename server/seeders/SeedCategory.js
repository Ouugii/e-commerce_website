"use strict";

const { createSlug } = require("../utils/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Thời Trang Nam",
          slug: createSlug("Thời Trang Nam"),
          image_url: "/images/categories/polo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thời Trang Nữ",
          slug: createSlug("Thời Trang Nữ"),
          image_url: "/images/categories/woman-clothes.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Điện thoại & Phụ Kiện",
          slug: createSlug("Điện thoại & Phụ Kiện"),
          image_url: "/images/categories/phone-case.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Máy Tính & Laptop",
          slug: createSlug("Máy Tính & Laptop"),
          image_url: "/images/categories/laptop-screen.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Máy Ảnh & Máy Quay Phim",
          slug: createSlug("Máy Ảnh & Máy Quay Phim"),
          image_url: "/images/categories/photo-camera.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đồng Hồ",
          slug: createSlug("Đồng Hồ"),
          image_url: "/images/categories/wristwatch.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Giày Dép Nam",
          slug: createSlug("Giày Dép Nam"),
          image_url: "/images/categories/shoes.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mẹ & Bé",
          slug: createSlug("Mẹ & Bé"),
          image_url: "/images/categories/mother.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nhà Cửa & Đời Sống",
          slug: createSlug("Nhà Cửa & Đời Sống"),
          image_url: "/images/categories/morning.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sắc Đẹp",
          slug: createSlug("Sắc Đẹp"),
          image_url: "/images/categories/makeup.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sức Khỏe",
          slug: createSlug("Sức Khỏe"),
          image_url: "/images/categories/better-health.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Giày Dép Nữ",
          slug: createSlug("Giày Dép Nữ"),
          image_url: "/images/categories/high-heels.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Túi Ví Nữ",
          slug: createSlug("Túi Ví Nữ"),
          image_url: "/images/categories/pouch.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thiết Bị Gia Dụng",
          slug: createSlug("Thiết Bị Gia Dụng"),
          image_url: "/images/categories/electric-appliance.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Phụ Kiện & Trang Sức Nữ",
          slug: createSlug("Phụ Kiện & Trang Sức Nữ"),
          image_url: "/images/categories/jewelry.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Thể Thao & Du Lịch",
          slug: createSlug("Thể Thao & Du Lịch"),
          image_url: "/images/categories/sport-bag.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bách Hóa Online",
          slug: createSlug("Bách Hóa Online"),
          image_url: "/images/categories/shopping-bag.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nhà Sách Online",
          slug: createSlug("Nhà Sách Online"),
          image_url: "/images/categories/books.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ô Tô & Xe Máy & Xe Đạp",
          slug: createSlug("Ô Tô & Xe Máy & Xe Đạp"),
          image_url: "/images/categories/vehicles.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Balo & Túi Ví Nam",
          slug: createSlug("Balo & Túi Ví Nam"),
          image_url: "/images/categories/school-bag.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Đồ Chơi",
          slug: createSlug("Đồ Chơi"),
          image_url: "/images/categories/puzzle.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chăm Sóc Thú Cưng",
          slug: createSlug("Chăm Sóc Thú Cưng"),
          image_url: "/images/categories/pet-food.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Dụng Cụ & Thiết Bị Tiện Ích",
          slug: createSlug("Dụng Cụ & Thiết Bị Tiện Ích"),
          image_url: "/images/categories/belt.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Giặt Giũ & Chăm Sóc Nhà Cửa",
          slug: createSlug("Giặt Giũ & Chăm Sóc Nhà Cửa"),
          image_url: "/images/categories/laundry-detergent.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Voucher & Dịch Vụ",
          slug: createSlug("Voucher & Dịch Vụ"),
          image_url: "/images/categories/voucher.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("categories", null, {});
  },
};
