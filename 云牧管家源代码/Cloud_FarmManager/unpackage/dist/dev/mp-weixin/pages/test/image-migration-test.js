"use strict";
const common_vendor = require("../../common/vendor.js");
const api_imageService = require("../../api/imageService.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      migrationInfo: {
        totalImages: 0,
        imageMapping: {}
      },
      uploadedImages: [],
      // 已上传的图片列表
      imageMapping: {},
      // 图片路径映射
      testResults: [],
      logs: []
    };
  },
  computed: {
    migrationProgress() {
      if (this.migrationInfo.totalImages === 0)
        return 0;
      return Math.round(this.uploadedImages.length / this.migrationInfo.totalImages * 100);
    }
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
        const result = await api_imageService.getImageMigrationMapping();
        if (result.code === 200) {
          this.migrationInfo.totalImages = result.data.totalImages;
          this.migrationInfo.imageMapping = result.data.imageMapping;
          this.imageMapping = result.data.imageMapping;
          this.addLog(`发现 ${result.data.totalImages} 个需要迁移的图片`, "success");
        } else {
          this.addLog(`检查迁移状态失败: ${result.message}`, "error");
        }
      } catch (error) {
        this.addLog(`检查迁移状态异常: ${error.message}`, "error");
      }
    },
    // 上传图片
    async uploadImages(category) {
      try {
        this.addLog(`开始上传${category}图片...`, "info");
        const result = await api_imageService.uploadImage({
          category,
          count: 9,
          sizeType: ["compressed"]
        });
        if (result.code === 200) {
          const successImages = result.data.results.filter((r) => r.success);
          for (let img of successImages) {
            const urlResult = await api_imageService.getTempFileURLs([img.fileID]);
            this.uploadedImages.push({
              fileID: img.fileID,
              cloudPath: img.cloudPath,
              url: urlResult.data[0].tempFileURL,
              name: `${category}_image_${Date.now()}`,
              category
            });
          }
          this.addLog(`上传成功 ${successImages.length} 张图片`, "success");
          common_vendor.index.showToast({
            title: `上传成功${successImages.length}张`,
            icon: "success"
          });
        } else {
          this.addLog(`上传图片失败: ${result.message}`, "error");
        }
      } catch (error) {
        this.addLog(`上传图片异常: ${error.message}`, "error");
      }
    },
    // 批量上传图片
    async batchUploadImages() {
      if (this.loading)
        return;
      this.loading = true;
      try {
        this.addLog("开始批量上传图片...", "info");
        const categories = ["products", "farms", "avatars"];
        for (let category of categories) {
          await this.uploadImages(category);
        }
        this.addLog("批量上传完成", "success");
      } catch (error) {
        this.addLog(`批量上传失败: ${error.message}`, "error");
      } finally {
        this.loading = false;
      }
    },
    // 更新商品图片路径
    async updateImagePaths() {
      if (this.loading)
        return;
      common_vendor.index.showModal({
        title: "确认更新",
        content: "确定要更新数据库中的图片路径吗？此操作将修改所有商品数据。",
        success: async (res) => {
          if (res.confirm) {
            await this.performUpdateImagePaths();
          }
        }
      });
    },
    // 执行更新图片路径
    async performUpdateImagePaths() {
      this.loading = true;
      try {
        this.addLog("开始更新商品图片路径...", "info");
        const actualMapping = {};
        this.uploadedImages.forEach((img, index) => {
          const localPaths = Object.keys(this.imageMapping);
          if (localPaths[index]) {
            actualMapping[localPaths[index]] = img.fileID;
          }
        });
        const result = await api_imageService.updateProductImages(actualMapping);
        if (result.code === 200) {
          this.addLog(`成功更新 ${result.data.updatedProducts} 个商品的图片路径`, "success");
          common_vendor.index.showToast({
            title: "路径更新成功",
            icon: "success"
          });
        } else {
          this.addLog(`更新图片路径失败: ${result.message}`, "error");
          common_vendor.index.showToast({
            title: "更新失败",
            icon: "error"
          });
        }
      } catch (error) {
        this.addLog(`更新图片路径异常: ${error.message}`, "error");
      } finally {
        this.loading = false;
      }
    },
    // 测试图片访问
    async testImageAccess() {
      if (this.loading)
        return;
      this.loading = true;
      this.testResults = [];
      try {
        this.addLog("开始测试图片访问...", "info");
        for (let i = 0; i < Math.min(this.uploadedImages.length, 3); i++) {
          const image = this.uploadedImages[i];
          try {
            const urlResult = await api_imageService.getTempFileURLs([image.fileID]);
            this.testResults.push({
              title: `图片访问测试 ${i + 1}`,
              success: urlResult.code === 200,
              message: urlResult.code === 200 ? `图片访问正常: ${image.name}` : `图片访问失败: ${urlResult.message}`
            });
          } catch (error) {
            this.testResults.push({
              title: `图片访问测试 ${i + 1}`,
              success: false,
              message: `测试失败: ${error.message}`
            });
          }
        }
        this.addLog("图片访问测试完成", "success");
      } catch (error) {
        this.addLog(`测试图片访问异常: ${error.message}`, "error");
      } finally {
        this.loading = false;
      }
    },
    // 删除图片
    async deleteImage(image, index) {
      common_vendor.index.showModal({
        title: "确认删除",
        content: `确定要删除图片 ${image.name} 吗？`,
        success: async (res) => {
          if (res.confirm) {
            try {
              const result = await api_imageService.deleteImage(image.fileID);
              if (result.code === 200) {
                this.uploadedImages.splice(index, 1);
                this.addLog(`删除图片成功: ${image.name}`, "success");
                common_vendor.index.showToast({
                  title: "删除成功",
                  icon: "success"
                });
              } else {
                this.addLog(`删除图片失败: ${result.message}`, "error");
              }
            } catch (error) {
              this.addLog(`删除图片异常: ${error.message}`, "error");
            }
          }
        }
      });
    },
    // 预览图片
    previewImage(url) {
      api_imageService.previewImages([url]);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.checkMigrationStatus && $options.checkMigrationStatus(...args)),
    b: common_vendor.t($data.migrationInfo.totalImages),
    c: common_vendor.t($data.uploadedImages.length),
    d: common_vendor.t($options.migrationProgress),
    e: common_assets._imports_2$9,
    f: common_vendor.o(($event) => $options.uploadImages("products")),
    g: common_assets._imports_2$9,
    h: common_vendor.o(($event) => $options.uploadImages("farms")),
    i: common_assets._imports_2$9,
    j: common_vendor.o(($event) => $options.uploadImages("avatars")),
    k: common_vendor.t($data.loading ? "上传中..." : "批量上传图片"),
    l: common_vendor.o((...args) => $options.batchUploadImages && $options.batchUploadImages(...args)),
    m: $data.loading,
    n: common_vendor.o((...args) => $options.updateImagePaths && $options.updateImagePaths(...args)),
    o: $data.loading || $data.uploadedImages.length === 0,
    p: common_vendor.o((...args) => $options.testImageAccess && $options.testImageAccess(...args)),
    q: $data.loading,
    r: $data.uploadedImages.length > 0
  }, $data.uploadedImages.length > 0 ? {
    s: common_vendor.t($data.uploadedImages.length),
    t: common_vendor.f($data.uploadedImages, (image, index, i0) => {
      return {
        a: image.url,
        b: common_vendor.o(($event) => $options.previewImage(image.url), index),
        c: common_vendor.t(image.name),
        d: common_vendor.t(image.fileID),
        e: common_vendor.o(($event) => $options.deleteImage(image, index), index),
        f: index
      };
    })
  } : {}, {
    v: Object.keys($data.imageMapping).length > 0
  }, Object.keys($data.imageMapping).length > 0 ? {
    w: common_vendor.f($data.imageMapping, (cloudPath, localPath, i0) => {
      return {
        a: common_vendor.t(localPath),
        b: common_vendor.t(cloudPath),
        c: localPath
      };
    })
  } : {}, {
    x: $data.testResults.length > 0
  }, $data.testResults.length > 0 ? {
    y: common_vendor.f($data.testResults, (result, index, i0) => {
      return {
        a: common_vendor.t(result.title),
        b: common_vendor.t(result.success ? "成功" : "失败"),
        c: common_vendor.n(result.success ? "success" : "error"),
        d: common_vendor.t(result.message),
        e: index
      };
    })
  } : {}, {
    z: $data.logs.length > 0
  }, $data.logs.length > 0 ? {
    A: common_vendor.f($data.logs, (log, index, i0) => {
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/image-migration-test.js.map
