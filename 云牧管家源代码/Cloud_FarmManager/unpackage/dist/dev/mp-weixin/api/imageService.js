"use strict";
const common_vendor = require("../common/vendor.js");
async function uploadImage(options = {}) {
  try {
    const {
      category = "products",
      count = 1,
      sizeType = ["compressed"],
      sourceType = ["camera", "album"]
    } = options;
    const chooseResult = await common_vendor.index.chooseImage({
      count,
      sizeType,
      sourceType
    });
    if (!chooseResult.tempFilePaths || chooseResult.tempFilePaths.length === 0) {
      throw new Error("未选择图片");
    }
    const uploadResults = [];
    for (let i = 0; i < chooseResult.tempFilePaths.length; i++) {
      const tempFilePath = chooseResult.tempFilePaths[i];
      const fileName = `${category}_${Date.now()}_${i}`;
      try {
        const uploadResult = await common_vendor.nr.uploadFile({
          filePath: tempFilePath,
          cloudPath: `images/${category}/${fileName}.jpg`
        });
        if (uploadResult.fileID) {
          uploadResults.push({
            success: true,
            fileID: uploadResult.fileID,
            cloudPath: `images/${category}/${fileName}.jpg`,
            originalPath: tempFilePath
          });
        } else {
          uploadResults.push({
            success: false,
            error: "上传失败",
            originalPath: tempFilePath
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at api/imageService.js:60", "上传图片失败:", error);
        uploadResults.push({
          success: false,
          error: error.message,
          originalPath: tempFilePath
        });
      }
    }
    return {
      code: 200,
      message: "图片上传完成",
      data: {
        total: chooseResult.tempFilePaths.length,
        success: uploadResults.filter((r) => r.success).length,
        failed: uploadResults.filter((r) => !r.success).length,
        results: uploadResults
      }
    };
  } catch (error) {
    common_vendor.index.__f__("error", "at api/imageService.js:81", "选择图片失败:", error);
    return {
      code: 500,
      message: "上传图片失败",
      error: error.message
    };
  }
}
async function deleteImage(fileID) {
  try {
    const result = await common_vendor.nr.callFunction({
      name: "image-manager",
      data: {
        action: "deleteImage",
        data: { fileID }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/imageService.js:139", "删除图片失败:", error);
    return {
      code: 500,
      message: "删除图片失败",
      error: error.message
    };
  }
}
async function getTempFileURLs(fileIDs) {
  try {
    if (!Array.isArray(fileIDs)) {
      fileIDs = [fileIDs];
    }
    const result = await common_vendor.nr.getTempFileURL({
      fileList: fileIDs
    });
    return {
      code: 200,
      message: "获取临时URL成功",
      data: result.fileList
    };
  } catch (error) {
    common_vendor.index.__f__("error", "at api/imageService.js:169", "获取临时URL失败:", error);
    return {
      code: 500,
      message: "获取临时URL失败",
      error: error.message
    };
  }
}
async function getImageMigrationMapping() {
  try {
    const result = await common_vendor.nr.callFunction({
      name: "image-manager",
      data: {
        action: "migrateLocalImages",
        data: {}
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/imageService.js:194", "获取图片迁移映射失败:", error);
    return {
      code: 500,
      message: "获取图片迁移映射失败",
      error: error.message
    };
  }
}
async function updateProductImages(imageMapping) {
  try {
    const result = await common_vendor.nr.callFunction({
      name: "image-manager",
      data: {
        action: "updateProductImages",
        data: { imageMapping }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/imageService.js:220", "更新商品图片路径失败:", error);
    return {
      code: 500,
      message: "更新商品图片路径失败",
      error: error.message
    };
  }
}
function previewImages(urls, current = 0) {
  if (typeof urls === "string") {
    urls = [urls];
  }
  common_vendor.index.previewImage({
    urls,
    current
  });
}
exports.deleteImage = deleteImage;
exports.getImageMigrationMapping = getImageMigrationMapping;
exports.getTempFileURLs = getTempFileURLs;
exports.previewImages = previewImages;
exports.updateProductImages = updateProductImages;
exports.uploadImage = uploadImage;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/imageService.js.map
