"use strict";

const { createSlug } = require("../utils/slug");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "brands",
      [
        // Thời Trang Nam
        {
          name: "Calvin Klein",
          slug: createSlug("Calvin Klein"),
          image_url:
            "/images/brands/png-transparent-ck-brand-logo-calvin-klein-logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Levi's",
          slug: createSlug("Levi's"),
          image_url: "/images/brands/Levis-Logo-PNG8.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nike",
          slug: createSlug("Nike"),
          image_url: "/images/brands/Nike-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Zara",
          slug: createSlug("Zara"),
          image_url: "/images/brands/Zara-Logo-1975-2008.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Thời Trang Nữ
        {
          name: "H&M",
          slug: createSlug("H&M"),
          image_url: "/images/brands/HM-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mango",
          slug: createSlug("Mango"),
          image_url: "/images/brands/Mango-logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chanel",
          slug: createSlug("Chanel"),
          image_url: "/images/brands/Chanel-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Gucci",
          slug: createSlug("Gucci"),
          image_url: "/images/brands/gucci.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Điện thoại & Phụ Kiện
        {
          name: "Apple",
          slug: createSlug("Apple"),
          image_url: "/images/brands/apple-classic-logo-vector.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsung",
          slug: createSlug("Samsung"),
          image_url: "/images/brands/samsung.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Xiaomi",
          slug: createSlug("Xiaomi"),
          image_url: "/images/brands/Xiaomi.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Anker",
          slug: createSlug("Anker"),
          image_url: "/images/brands/anker.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Máy Tính & Laptop
        {
          name: "Dell",
          slug: createSlug("Dell"),
          image_url: "/images/brands/dell.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HP",
          slug: createSlug("HP"),
          image_url: "/images/brands/hp.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "ASUS",
          slug: createSlug("ASUS"),
          image_url: "/images/brands/Asus-Logo-1995-present.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lenovo",
          slug: createSlug("Lenovo"),
          image_url: "/images/brands/Lenovo-Logo-1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Máy Anh & Máy Quay Phim
        {
          name: "Canon",
          slug: createSlug("Canon"),
          image_url: "/images/brands/Canon-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nikon",
          slug: createSlug("Nikon"),
          image_url:
            "/images/brands/free-vector-nikon-logo_090581_Nikon_logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sony",
          slug: createSlug("Sony"),
          image_url: "/images/brands/sony.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "GoPro",
          slug: createSlug("GoPro"),
          image_url: "/images/brands/GoPro-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Đồng Hồ
        {
          name: "Rolex",
          slug: createSlug("Rolex"),
          image_url: "/images/brands/rolex.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Casio",
          slug: createSlug("Casio"),
          image_url: "/images/brands/casio.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Omega",
          slug: createSlug("Omega"),
          image_url: "/images/brands/omega-logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fossil",
          slug: createSlug("Fossil"),
          image_url: "/images/brands/Fossil-Logo-1536x960.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Giày Dép Nam
        {
          name: "Adidas",
          slug: createSlug("Adidas"),
          image_url: "/images/brands/adidas_PNG8.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Puma",
          slug: createSlug("Puma"),
          image_url: "/images/brands/puma-logo-png-1.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Timberland",
          slug: createSlug("Timberland"),
          image_url: "/images/brands/Logo-Timberland.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clarks",
          slug: createSlug("Clarks"),
          image_url: "/images/brands/Clarks_logo_logotype.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Mẹ & Bé
        {
          name: "Johnson's Baby",
          slug: createSlug("Johnson's Baby"),
          image_url: "/images/brands/Johnsons-Baby-Emblema.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Pampers",
          slug: createSlug("Pampers"),
          image_url: "/images/brands/pampers-logo-png-transparent.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Huggies",
          slug: createSlug("Huggies"),
          image_url: "/images/brands/Huggies-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chicco",
          slug: createSlug("Chicco"),
          image_url: "/images/brands/chicco.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Nhà Cửa & Đời Sống
        {
          name: "IKEA",
          slug: createSlug("IKEA"),
          image_url: "/images/brands/IKEA-Logo-1982-2019.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tupperware",
          slug: createSlug("Tupperware"),
          image_url: "/images/brands/Tupperware-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Philips",
          slug: createSlug("Philips"),
          image_url: "/images/brands/Philips_logo_new.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electrolux",
          slug: createSlug("Electrolux"),
          image_url: "/images/brands/Electrolux-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Sắc Đẹp
        {
          name: "L'Oréal",
          slug: createSlug("L'Oréal"),
          image_url: "/images/brands/LOreal-Emblem.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Estée Lauder",
          slug: createSlug("Estée Lauder"),
          image_url:
            "/images/brands/purepng.com-estee-lauder-logologobrand-logoiconslogos-251519938041g3ko8.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Maybelline",
          slug: createSlug("Maybelline"),
          image_url: "/images/brands/Maybelline-Logo-2002-2019.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "MAC",
          slug: createSlug("MAC"),
          image_url:
            "/images/brands/378-3784059_mac-makeup-png-jpg-mac-lipstick.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Sức Khỏe
        {
          name: "GNC",
          slug: createSlug("GNC"),
          image_url: "/images/brands/GNC-Logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nature's Bounty",
          slug: createSlug("Nature's Bounty"),
          image_url: "/images/brands/Nature's Bounty.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Centrum",
          slug: createSlug("Centrum"),
          image_url: "/images/brands/centrum-logo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Abbott",
          slug: createSlug("Abbott"),
          image_url: "/images/brands/Abbott_Laboratories_Logo_blue.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Giày Dép Nữ
        {
          name: "Jimmy Choo",
          slug: createSlug("Jimmy Choo"),
          image_url: "/images/brands/Jimmy_Choo_Ltd-Logo.wine.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Steve Madden",
          slug: createSlug("Steve Madden"),
          image_url: "/images/brands/steve-madden-logo-png-transparent.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Nine West",
          slug: createSlug("Nine West"),
          image_url: "/images/brands/nine-west-logo-png-transparent.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Aldo",
          slug: createSlug("Aldo"),
          image_url: "/images/brands/aldo.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Túi Ví Nữ
        {
          name: "Louis Vuitton",
          slug: createSlug("Louis Vuitton"),
          image_url: "/images/brands/lv.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Michael Kors",
          slug: createSlug("Michael Kors"),
          image_url: "/images/brands/Michael Kors.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Prada",
          slug: createSlug("Prada"),
          image_url: "/images/brands/Prada.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Coach",
          slug: createSlug("Coach"),
          image_url: "/images/brands/Coach.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Thiết Bị Gia Dụng
        {
          name: "Dyson",
          slug: createSlug("Dyson"),
          image_url: "/images/brands/Dyson.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bosch",
          slug: createSlug("Bosch"),
          image_url: "/images/brands/Bosch.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Panasonic",
          slug: createSlug("Panasonic"),
          image_url: "/images/brands/Panasonic.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Phụ Kiện & Trang Sức Nữ
        {
          name: "Pandora",
          slug: createSlug("Pandora"),
          image_url: "/images/brands/Pandora.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Swarovski",
          slug: createSlug("Swarovski"),
          image_url: "/images/brands/Swarovski.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tiffany & Co.",
          slug: createSlug("Tiffany & Co."),
          image_url: "/images/brands/Tiffany & Co..png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Bvlgari",
          slug: createSlug("Bvlgari"),
          image_url: "/images/brands/Bvlgari.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Thể Thao & Du Lịch
        {
          name: "The North Face",
          slug: createSlug("The North Face"),
          image_url: "/images/brands/The North Face.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Patagonia",
          slug: createSlug("Patagonia"),
          image_url: "/images/brands/Patagonia.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Columbia",
          slug: createSlug("Columbia"),
          image_url: "/images/brands/Columbia.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Under Armour",
          slug: createSlug("Under Armour"),
          image_url: "/images/brands/Under Armour.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Bách Hóa Online
        {
          name: "Amazon Basics",
          slug: createSlug("Amazon Basics"),
          image_url: "/images/brands/Amazon Basics.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kirkland Signature",
          slug: createSlug("Kirkland Signature"),
          image_url: "/images/brands/Kirkland Signature.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Target",
          slug: createSlug("Target"),
          image_url: "/images/brands/Target.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Walmart",
          slug: createSlug("Walmart"),
          image_url: "/images/brands/Walmart.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Nhà Sách Online
        {
          name: "Barnes & Noble",
          slug: createSlug("Barnes & Noble"),
          image_url: "/images/brands/Barnes & Noble.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Scholastic",
          slug: createSlug("Scholastic"),
          image_url: "/images/brands/Scholastic.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Penguin Random House",
          slug: createSlug("Penguin Random House"),
          image_url: "/images/brands/Penguin Random House.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "HarperCollins",
          slug: createSlug("HarperCollins"),
          image_url: "/images/brands/HarperCollins.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Ô Tô & Xe Máy & Xe Đạp
        {
          name: "Honda",
          slug: createSlug("Honda"),
          image_url: "/images/brands/Honda.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Toyota",
          slug: createSlug("Toyota"),
          image_url: "/images/brands/Toyota.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Trek",
          slug: createSlug("Trek"),
          image_url: "/images/brands/Trek.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Harley-Davidson",
          slug: createSlug("Harley-Davidson"),
          image_url: "/images/brands/Harley-Davidson.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Balo & Túi Ví Nam
        {
          name: "Herschel",
          slug: createSlug("Herschel"),
          image_url: "/images/brands/Herschel.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tumi",
          slug: createSlug("Tumi"),
          image_url: "/images/brands/Tumi.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Samsonite",
          slug: createSlug("Samsonite"),
          image_url: "/images/brands/Samsonite.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Đồ Chơi
        {
          name: "LEGO",
          slug: createSlug("LEGO"),
          image_url: "/images/brands/LEGO.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mattel",
          slug: createSlug("Mattel"),
          image_url: "/images/brands/Mattel.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Hasbro",
          slug: createSlug("Hasbro"),
          image_url: "/images/brands/Hasbro.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Fisher-Price",
          slug: createSlug("Fisher-Price"),
          image_url: "/images/brands/Fisher-Price.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Chăm Sóc Thú Cưng
        {
          name: "Pedigree",
          slug: createSlug("Pedigree"),
          image_url: "/images/brands/Pedigree.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Royal Canin",
          slug: createSlug("Royal Canin"),
          image_url: "/images/brands/Royal Canin.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Purina",
          slug: createSlug("Purina"),
          image_url: "/images/brands/Purina.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Kong",
          slug: createSlug("Kong"),
          image_url: "/images/brands/Kong.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Dụng Cụ & Thiết Bị Tiện Ích
        {
          name: "Stanley",
          slug: createSlug("Stanley"),
          image_url: "/images/brands/Stanley.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Black+Decker",
          slug: createSlug("Black+Decker"),
          image_url: "/images/brands/Black+Decke.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Makita",
          slug: createSlug("Makita"),
          image_url: "/images/brands/Makita.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DeWalt",
          slug: createSlug("DeWalt"),
          image_url: "/images/brands/DeWalt.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Giặt Giũ & Chăm Sóc Nhà Cửa
        {
          name: "Tide",
          slug: createSlug("Tide"),
          image_url: "/images/brands/Tide.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Clorox",
          slug: createSlug("Clorox"),
          image_url: "/images/brands/Clorox.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Lysol",
          slug: createSlug("Lysol"),
          image_url: "/images/brands/Lysol.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Swiffer",
          slug: createSlug("Swiffer"),
          image_url: "/images/brands/Swiffer.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Voucher & Dịch Vụ
        {
          name: "Groupon",
          slug: createSlug("Groupon"),
          image_url: "/images/brands/Groupon.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Airbnb",
          slug: createSlug("Airbnb"),
          image_url: "/images/brands/Airbnb.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Uber",
          slug: createSlug("Uber"),
          image_url: "/images/brands/Uber.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "DoorDash",
          slug: createSlug("DoorDash"),
          image_url: "/images/brands/DoorDash.png",
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
