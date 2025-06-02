"use strict";
const common_vendor = require("../../common/vendor.js");
const api_productService = require("../../api/productService.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      migrationStatus: {
        totalProducts: 0,
        status: "未知",
        lastCheck: "从未检查"
      },
      testResults: [],
      products: [],
      logs: []
    };
  },
  onLoad() {
    this.addLog("页面加载完成", "info");
    this.checkMigrationStatus();
  },
  methods: {
    // 添加日志
    addLog(message, type = "info") {
      const now = /* @__PURE__ */ new Date();
      const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`;
      this.logs.unshift({
        time,
        message,
        type
      });
      if (this.logs.length > 50) {
        this.logs = this.logs.slice(0, 50);
      }
    },
    // 检查迁移状态
    async checkMigrationStatus() {
      try {
        this.addLog("检查迁移状态...", "info");
        const result = await api_productService.migration.checkStatus();
        if (result.code === 200) {
          this.migrationStatus = {
            totalProducts: result.data.totalProducts,
            status: result.data.migrationStatus === "completed" ? "已完成" : "待迁移",
            lastCheck: (/* @__PURE__ */ new Date()).toLocaleString()
          };
          this.addLog(`迁移状态检查成功: ${result.data.totalProducts} 个商品`, "success");
        } else {
          this.addLog(`检查迁移状态失败: ${result.message}`, "error");
        }
      } catch (error) {
        this.addLog(`检查迁移状态异常: ${error.message}`, "error");
      }
    },
    // 开始迁移
    async startMigration() {
      if (this.loading)
        return;
      common_vendor.index.showModal({
        title: "确认迁移",
        content: "确定要将本地商品数据迁移到云端数据库吗？这将覆盖现有数据。",
        success: async (res) => {
          if (res.confirm) {
            await this.performMigration();
          }
        }
      });
    },
    // 执行迁移
    async performMigration() {
      this.loading = true;
      try {
        this.addLog("开始数据迁移...", "info");
        const result = await api_productService.migration.migrateData();
        if (result.code === 200) {
          this.addLog(`数据迁移成功: 插入了 ${result.data.insertedCount} 个商品`, "success");
          common_vendor.index.showToast({
            title: "迁移成功",
            icon: "success"
          });
          await this.checkMigrationStatus();
        } else {
          this.addLog(`数据迁移失败: ${result.message}`, "error");
          common_vendor.index.showToast({
            title: "迁移失败",
            icon: "error"
          });
        }
      } catch (error) {
        this.addLog(`数据迁移异常: ${error.message}`, "error");
        common_vendor.index.showToast({
          title: "迁移异常",
          icon: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    // 清空数据
    async clearData() {
      if (this.loading)
        return;
      common_vendor.index.showModal({
        title: "确认清空",
        content: "确定要清空云端所有商品数据吗？此操作不可恢复！",
        confirmColor: "#ff4757",
        success: async (res) => {
          if (res.confirm) {
            await this.performClearData();
          }
        }
      });
    },
    // 执行清空数据
    async performClearData() {
      this.loading = true;
      try {
        this.addLog("开始清空数据...", "info");
        const result = await api_productService.migration.clearData();
        if (result.code === 200) {
          this.addLog(`数据清空成功: 删除了 ${result.data.deletedCount} 个商品`, "success");
          common_vendor.index.showToast({
            title: "清空成功",
            icon: "success"
          });
          await this.checkMigrationStatus();
          this.products = [];
        } else {
          this.addLog(`数据清空失败: ${result.message}`, "error");
          common_vendor.index.showToast({
            title: "清空失败",
            icon: "error"
          });
        }
      } catch (error) {
        this.addLog(`数据清空异常: ${error.message}`, "error");
        common_vendor.index.showToast({
          title: "清空异常",
          icon: "error"
        });
      } finally {
        this.loading = false;
      }
    },
    // 测试云端数据
    async testCloudData() {
      if (this.loading)
        return;
      this.loading = true;
      this.testResults = [];
      try {
        this.addLog("开始测试云端数据...", "info");
        await this.testGetProductList();
        await this.testGetProductDetail();
        await this.testSearchProducts();
        this.addLog("云端数据测试完成", "success");
      } catch (error) {
        this.addLog(`测试云端数据异常: ${error.message}`, "error");
      } finally {
        this.loading = false;
      }
    },
    // 测试获取商品列表
    async testGetProductList() {
      try {
        const products = await api_productService.getAllProducts({ pageSize: 10 });
        this.testResults.push({
          title: "获取商品列表",
          success: products.length > 0,
          message: `获取到 ${products.length} 个商品`,
          data: products.length > 0 ? products.slice(0, 3) : null
        });
        if (products.length > 0) {
          this.products = products.slice(0, 5);
        }
      } catch (error) {
        this.testResults.push({
          title: "获取商品列表",
          success: false,
          message: `测试失败: ${error.message}`,
          data: null
        });
      }
    },
    // 测试获取商品详情
    async testGetProductDetail() {
      try {
        if (this.products.length === 0) {
          this.testResults.push({
            title: "获取商品详情",
            success: false,
            message: "没有可用的商品ID进行测试",
            data: null
          });
          return;
        }
        const productId = this.products[0].id;
        const product = await api_productService.getProductById(productId);
        this.testResults.push({
          title: "获取商品详情",
          success: product !== null,
          message: product ? `成功获取商品: ${product.name}` : "获取商品详情失败",
          data: product ? {
            id: product.id,
            name: product.name,
            price: product.price
          } : null
        });
      } catch (error) {
        this.testResults.push({
          title: "获取商品详情",
          success: false,
          message: `测试失败: ${error.message}`,
          data: null
        });
      }
    },
    // 测试搜索商品
    async testSearchProducts() {
      try {
        const { searchProducts } = await "../../api/productService.js";
        const results = await searchProducts("瑶");
        this.testResults.push({
          title: "搜索商品",
          success: results.length >= 0,
          message: `搜索"瑶"找到 ${results.length} 个商品`,
          data: results.length > 0 ? results.slice(0, 2) : null
        });
      } catch (error) {
        this.testResults.push({
          title: "搜索商品",
          success: false,
          message: `测试失败: ${error.message}`,
          data: null
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.checkMigrationStatus && $options.checkMigrationStatus(...args)),
    b: common_vendor.t($data.migrationStatus.totalProducts),
    c: common_vendor.t($data.migrationStatus.status),
    d: common_vendor.t($data.migrationStatus.lastCheck),
    e: common_vendor.t($data.loading ? "迁移中..." : "开始迁移"),
    f: common_vendor.o((...args) => $options.startMigration && $options.startMigration(...args)),
    g: $data.loading,
    h: common_vendor.o((...args) => $options.clearData && $options.clearData(...args)),
    i: $data.loading,
    j: common_vendor.o((...args) => $options.testCloudData && $options.testCloudData(...args)),
    k: $data.loading,
    l: $data.testResults.length > 0
  }, $data.testResults.length > 0 ? {
    m: common_vendor.f($data.testResults, (result, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(result.title),
        b: common_vendor.t(result.success ? "成功" : "失败"),
        c: common_vendor.n(result.success ? "success" : "error"),
        d: common_vendor.t(result.message),
        e: result.data
      }, result.data ? {
        f: common_vendor.t(JSON.stringify(result.data, null, 2))
      } : {}, {
        g: index
      });
    })
  } : {}, {
    n: $data.products.length > 0
  }, $data.products.length > 0 ? {
    o: common_vendor.f($data.products, (product, k0, i0) => {
      return {
        a: product.image,
        b: common_vendor.t(product.name),
        c: common_vendor.t(product.price),
        d: common_vendor.t(product.sales),
        e: common_vendor.t(product.rating),
        f: product.id
      };
    })
  } : {}, {
    p: $data.logs.length > 0
  }, $data.logs.length > 0 ? {
    q: common_vendor.f($data.logs, (log, index, i0) => {
      return {
        a: common_vendor.t(log.time),
        b: common_vendor.t(log.message),
        c: common_vendor.n(log.type),
        d: index
      };
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/product-migration-test.js.map
