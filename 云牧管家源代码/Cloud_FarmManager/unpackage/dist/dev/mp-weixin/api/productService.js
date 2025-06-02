"use strict";
const common_vendor = require("../common/vendor.js");
async function getAllProducts(options = {}) {
  try {
    const {
      pageSize = 20,
      pageNum = 1,
      category = null,
      isNew = null,
      isOrganic = null,
      sortBy = "createTime",
      sortOrder = "desc"
    } = options;
    const result = await common_vendor.nr.callFunction({
      name: "product-manager",
      data: {
        action: "getProductList",
        data: {
          pageSize,
          pageNum,
          category,
          isNew,
          isOrganic,
          sortBy,
          sortOrder
        }
      }
    });
    if (result.result.code === 200) {
      const products = result.result.data.list.map((product) => ({
        id: product._id,
        // 使用云数据库的_id作为id
        name: product.name,
        price: product.price,
        image: product.images && product.images[0] ? product.images[0] : "",
        sales: product.sales,
        rating: product.rating,
        badge: product.isNew ? "新品" : product.isOrganic ? "有机" : "",
        // 保留完整的商品信息
        ...product
      }));
      return products;
    } else {
      common_vendor.index.__f__("error", "at api/productService.js:53", "获取商品列表失败:", result.result.message);
      return [];
    }
  } catch (error) {
    common_vendor.index.__f__("error", "at api/productService.js:57", "获取商品列表异常:", error);
    return [];
  }
}
async function getProductById(id) {
  try {
    if (!id) {
      common_vendor.index.__f__("error", "at api/productService.js:71", "商品ID不能为空");
      return null;
    }
    const result = await common_vendor.nr.callFunction({
      name: "product-manager",
      data: {
        action: "getProductById",
        data: {
          productId: id
        }
      }
    });
    if (result.result.code === 200) {
      const product = result.result.data;
      product.id = product._id;
      return product;
    } else if (result.result.code === 404) {
      common_vendor.index.__f__("warn", "at api/productService.js:91", "商品不存在:", id);
      return null;
    } else {
      common_vendor.index.__f__("error", "at api/productService.js:94", "获取商品详情失败:", result.result.message);
      return null;
    }
  } catch (error) {
    common_vendor.index.__f__("error", "at api/productService.js:98", "获取商品详情异常:", error);
    return null;
  }
}
exports.getAllProducts = getAllProducts;
exports.getProductById = getProductById;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/productService.js.map
