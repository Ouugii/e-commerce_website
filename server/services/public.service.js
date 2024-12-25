"use strict";

const { Op } = require("sequelize");
const { NotFoundError } = require("../core/error.response");
const {
  Product,
  Category,
  Brand,
  ProductImage,
  Shop,
  Review,
  ReviewImage,
} = require("../models");

class PublicService {
  static async getProducts(query) {
    const {
      keyword,
      category,
      brand,
      minPrice,
      maxPrice,
      minRating,
      inStock,
      discounted,
      sortBy = "createdAt",
      order = "desc",
      new: isNew,
      page = 1,
      limit = 20,
    } = query;

    let filters = {};

    if (keyword) filters.name = { [Op.like]: `%${keyword}%` };

    if (category) filters["$categories._id$"] = category;

    if (brand) filters.brand_id = brand;

    if (minPrice) filters.price = { [Op.gte]: minPrice };
    if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };

    if (minRating) filters.rating = { [Op.gte]: minRating };

    if (inStock) filters.stock_quantity = { [Op.gt]: 0 };

    if (discounted) filters.sale_price = { [Op.ne]: null };

    if (isNew) {
      filters.createdAt = {
        [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000), // 30 days
      };
    }

    if (isNew)
      filters.createdAt = {
        [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000),
      };

    const offset = (page - 1) * limit;

    try {
      const products = await Product.findAndCountAll({
        where: filters,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [[sortBy, order]],
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["_id", "name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Brand,
            as: "brand",
            attributes: ["_id", "name"],
          },
          {
            model: ProductImage,
            as: "images",
            attributes: ["_id", "url"],
          },
          {
            model: Review,
            as: "reviews",
            attributes: ["_id", "rating_point", "content"], // Update to correct field names in Review model
            include: [
              {
                model: ReviewImage,
                as: "review_images", // Use the correct alias as defined in the Review model
                attributes: ["_id", "url"],
              },
            ],
          },
          {
            model: Shop,
            as: "shop",
            attributes: ["_id", "name", "img_url"],
          },
        ],
      });

      if (!products) {
        throw new NotFoundError("ERR: cannot get products");
      }

      const totalPages = Math.ceil(products.count / limit);

      return {
        products: products.rows,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: products.count,
        },
      };
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  }

  static async getProductDetails(productId) {
    const foundProduct = await Product.findOne({
      where: { _id: productId },
      include: [
        {
          model: ProductImage,
          as: "images",
          attributes: ["_id", "url"],
        },
        {
          model: Review,
          as: "reviews",
          include: [
            {
              model: ReviewImage,
              as: "review_images", // Use the correct alias as defined in the Review model
              attributes: ["_id", "url"],
            },
          ],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["_id", "name"],
          through: { attributes: [] },
        },
        {
          model: Brand,
          as: "brand",
          attributes: ["_id", "name"],
        },
        {
          model: Shop,
          as: "shop",
        },
      ],
    });

    if (!foundProduct) {
      throw new NotFoundError("Can not find this product");
    }

    return { product: foundProduct };
  }

  static async getCategories() {
    const categories = await Category.findAll();

    if (!categories) {
      throw new NotFoundError("ERR: Can not get categories");
    }

    const baseUrl = "http://localhost:3030";

    const r = categories.map((category) => {
      return {
        ...category.dataValues,
        image_url: `${baseUrl}${category.image_url}`,
      };
    });

    return {
      categories: r,
    };
  }
  static async getProductsByCategory(categoryId) {}

  static async getBrands() {
    const brands = await Brand.findAll();

    if (!brands) {
      throw new NotFoundError("ERR: Can not get categories");
    }

    const baseUrl = "http://localhost:3030";

    const r = brands.map((brand) => {
      return {
        ...brand.dataValues,
        image_url: `${baseUrl}${brand.image_url}`,
      };
    });

    return {
      brands: r,
    };
  }
  static async getProductsByBrand(brandId) {}

  static async getShopDetails(shopId) {
    const foundShop = await await Shop.findByPk(shopId, {
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["_id", "name", "price", "sale_price", "stock_quantity"],
          include: [
            {
              model: ProductImage,
              as: "images",
              attributes: ["url"],
            },
          ],
        },
      ],
    });

    if (!foundShop) {
      throw new NotFoundError("Can not find the shop");
    }

    return {
      shop: foundShop,
    };
  }

  static async getFeaturedProduct() {
    try {
      const featuredProducts = await Product.findAndCountAll({
        limit: 20,
        order: [["createdAt", "desc"]],
        include: [
          {
            model: Category,
            as: "categories",
            attributes: ["_id", "name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Brand,
            as: "brand",
            attributes: ["_id", "name"],
          },
          { model: ProductImage, as: "images" },
          {
            model: Shop,
            as: "shop",
            attributes: ["_id", "name", "img_url"],
          },
        ],
      });

      if (!featuredProducts) {
        throw new NotFoundError("ERR: No featured products found");
      }

      return {
        featuredProducts: featuredProducts.rows,
        totalItems: featuredProducts.count,
      };
    } catch (error) {
      console.error("Error fetching featured products:", error);
      throw error;
    }
  }

  // static async searchingProducts() {
  //   app.get('/api/v1/p/products', async (req, res) => {
  //     const { query, category, brand, minPrice, maxPrice, minRating, inStock, sortBy, order, featured, discounted, new: isNew } = req.query;

  //     let filters = {};

  //     if (query) filters.name = { [Op.like]: `%${query}%` };
  //     if (category) filters.category_id = category;
  //     if (brand) filters.brand_id = brand;
  //     if (minPrice) filters.price = { [Op.gte]: minPrice };
  //     if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };
  //     if (minRating) filters.rating = { [Op.gte]: minRating };
  //     if (inStock) filters.inStock = true;
  //     if (featured) filters.featured = true;
  //     if (discounted) filters.discounted = true;
  //     if (isNew) filters.createdAt = { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }; // Sản phẩm mới nhất trong 30 ngày

  //     const products = await Product.findAll({
  //       where: filters,
  //       order: [[sortBy || 'createdAt', order || 'desc']]
  //     });

  //     res.json(products);
  //   });

  // ----------------------------------------------------------------------------------------------------------------------------

  //   const { Op } = require('sequelize');
  // const db = require('../models'); // Đảm bảo bạn đã import đúng mô hình

  // app.get('/api/v1/p/products', async (req, res) => {
  //   // Lấy các tham số từ query
  //   const { query, category, brand, minPrice, maxPrice, minRating, inStock, sortBy, order, featured, discounted, new: isNew, page = 1, limit = 10 } = req.query;

  //   let filters = {};

  //   // Áp dụng các bộ lọc dựa trên tham số
  //   if (query) filters.name = { [Op.like]: `%${query}%` };
  //   if (category) filters.category_id = category;
  //   if (brand) filters.brand_id = brand;
  //   if (minPrice) filters.price = { [Op.gte]: minPrice };
  //   if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };
  //   if (minRating) filters.rating = { [Op.gte]: minRating };
  //   if (inStock) filters.inStock = true;
  //   if (featured) filters.featured = true;
  //   if (discounted) filters.discounted = true;
  //   if (isNew) filters.createdAt = { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) }; // Sản phẩm mới nhất trong 30 ngày

  //   // Tính toán offset cho phân trang
  //   const offset = (page - 1) * limit;

  //   try {
  //     // Tìm sản phẩm với các bộ lọc, phân trang, và sắp xếp
  //     const products = await db.Product.findAndCountAll({
  //       where: filters,
  //       limit: parseInt(limit),
  //       offset: parseInt(offset),
  //       order: [[sortBy || 'createdAt', order || 'desc']]
  //     });

  //     // Tính tổng số trang
  //     const totalPages = Math.ceil(products.count / limit);

  //     // Trả về kết quả
  //     res.json({
  //       data: products.rows,
  //       pagination: {
  //         currentPage: parseInt(page),
  //         totalPages,
  //         totalItems: products.count
  //       }
  //     });

  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // });

  // ----------------------------------------------------------------------------------------------------------------------------

  //   const { Op } = require('sequelize');
  // const db = require('../models');

  // app.get('/api/v1/p/products', async (req, res) => {
  //   const {
  //     query,
  //     category,
  //     brand,
  //     minPrice,
  //     maxPrice,
  //     minRating,
  //     inStock,
  //     sortBy = 'createdAt',
  //     order = 'desc',
  //     featured,
  //     discounted,
  //     new: isNew,
  //     page = 1,
  //     limit = 10
  //   } = req.query;

  //   let filters = {};

  //   // Tìm kiếm theo tên sản phẩm
  //   if (query) filters.name = { [Op.like]: `%${query}%` };

  //   // Lọc theo danh mục
  //   if (category) filters.category_id = category;

  //   // Lọc theo thương hiệu
  //   if (brand) filters.brand_id = brand;

  //   // Lọc theo giá
  //   if (minPrice) filters.price = { [Op.gte]: minPrice };
  //   if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };

  //   // Lọc theo đánh giá
  //   if (minRating) filters.rating = { [Op.gte]: minRating };

  //   // Lọc theo trạng thái còn hàng
  //   if (inStock) filters.inStock = true;

  //   // Lọc theo sản phẩm nổi bật
  //   if (featured) filters.featured = true;

  //   // Lọc theo sản phẩm đang giảm giá
  //   if (discounted) filters.discounted = true;

  //   // Lọc theo sản phẩm mới trong 30 ngày
  //   if (isNew) filters.createdAt = { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) };

  //   const offset = (page - 1) * limit;

  //   try {
  //     // Tìm sản phẩm dựa trên các tiêu chí
  //     const products = await db.Product.findAndCountAll({
  //       where: filters,
  //       limit: parseInt(limit),
  //       offset: parseInt(offset),
  //       order: [[sortBy, order]],
  //       include: [
  //         { model: db.Category, as: 'category' },
  //         { model: db.Brand, as: 'brand' }
  //       ]
  //     });

  //     // Tìm danh mục chứa sản phẩm theo keyword
  //     const categories = await db.Category.findAll({
  //       include: [
  //         {
  //           model: db.Product,
  //           where: query ? { name: { [Op.like]: `%${query}%` } } : {}
  //         }
  //       ]
  //     });

  //     // Tìm thương hiệu chứa sản phẩm theo keyword
  //     const brands = await db.Brand.findAll({
  //       include: [
  //         {
  //           model: db.Product,
  //           where: query ? { name: { [Op.like]: `%${query}%` } } : {}
  //         }
  //       ]
  //     });

  //     const totalPages = Math.ceil(products.count / limit);

  //     return res.json({
  //       products: products.rows,
  //       categories,
  //       brands,
  //       pagination: {
  //         currentPage: parseInt(page),
  //         totalPages,
  //         totalItems: products.count
  //       }
  //     });

  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //     return res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // });

  //----------------------------------------------------------------------------------------------------------------
  //   const { Op } = require('sequelize');
  // const db = require('../models');

  // app.get('/api/v1/p/products', async (req, res) => {
  //   const {
  //     query,
  //     category,
  //     brand,
  //     minPrice,
  //     maxPrice,
  //     minRating,
  //     inStock,
  //     sortBy = 'createdAt',
  //     order = 'desc',
  //     featured,
  //     discounted,
  //     new: isNew,
  //     page = 1,
  //     limit = 10
  //   } = req.query;

  //   let filters = {};

  //   // Tìm kiếm theo tên sản phẩm
  //   if (query) filters.name = { [Op.like]: `%${query}%` };

  //   // Lọc theo danh mục
  //   if (category) filters.category_id = category;

  //   // Lọc theo thương hiệu
  //   if (brand) filters.brand_id = brand;

  //   // Lọc theo giá
  //   if (minPrice) filters.price = { [Op.gte]: minPrice };
  //   if (maxPrice) filters.price = { ...filters.price, [Op.lte]: maxPrice };

  //   // Lọc theo đánh giá
  //   if (minRating) filters.rating = { [Op.gte]: minRating };

  //   // Lọc theo trạng thái còn hàng
  //   if (inStock) filters.inStock = true;

  //   // Lọc theo sản phẩm nổi bật
  //   if (featured) filters.featured = true;

  //   // Lọc theo sản phẩm đang giảm giá
  //   if (discounted) filters.discounted = true;

  //   // Lọc theo sản phẩm mới trong 30 ngày
  //   if (isNew) filters.createdAt = { [Op.gte]: new Date(new Date() - 30 * 24 * 60 * 60 * 1000) };

  //   const offset = (page - 1) * limit;

  //   try {
  //     // Tìm sản phẩm dựa trên các tiêu chí
  //     const products = await db.Product.findAndCountAll({
  //       where: filters,
  //       limit: parseInt(limit),
  //       offset: parseInt(offset),
  //       order: [[sortBy === 'price' ? 'price' : 'createdAt', order]],
  //       include: [
  //         { model: db.Category, as: 'category' },
  //         { model: db.Brand, as: 'brand' }
  //       ]
  //     });

  //     // Tìm danh mục chứa sản phẩm theo keyword
  //     const categories = await db.Category.findAll({
  //       include: [
  //         {
  //           model: db.Product,
  //           where: query ? { name: { [Op.like]: `%${query}%` } } : {}
  //         }
  //       ]
  //     });

  //     // Tìm thương hiệu chứa sản phẩm theo keyword
  //     const brands = await db.Brand.findAll({
  //       include: [
  //         {
  //           model: db.Product,
  //           where: query ? { name: { [Op.like]: `%${query}%` } } : {}
  //         }
  //       ]
  //     });

  //     const totalPages = Math.ceil(products.count / limit);

  //     return res.json({
  //       products: products.rows,
  //       categories,
  //       brands,
  //       pagination: {
  //         currentPage: parseInt(page),
  //         totalPages,
  //         totalItems: products.count
  //       }
  //     });

  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //     return res.status(500).json({ message: 'Internal Server Error' });
  //   }
  // });

  // }
}

module.exports = PublicService;
