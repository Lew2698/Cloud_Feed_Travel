"use strict";
const common_vendor = require("../common/vendor.js");
function getCurrentUserId() {
  try {
    const userInfo = common_vendor.index.getStorageSync("userInfo");
    return userInfo && userInfo.userId ? userInfo.userId : null;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:13", "获取用户ID失败:", error);
    return null;
  }
}
async function getAddressList() {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录",
        data: []
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "getAddressList",
        data: { userId }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:44", "获取地址列表失败:", error);
    return {
      code: 500,
      message: "获取地址列表失败",
      data: []
    };
  }
}
async function addAddress(address) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录"
      };
    }
    if (!address.name || !address.phone || !address.detail) {
      return {
        code: 400,
        message: "请填写完整的地址信息"
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "addAddress",
        data: {
          userId,
          address
        }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:90", "添加地址失败:", error);
    return {
      code: 500,
      message: "添加地址失败"
    };
  }
}
async function updateAddress(addressId, address) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录"
      };
    }
    if (!addressId) {
      return {
        code: 400,
        message: "地址ID不能为空"
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "updateAddress",
        data: {
          userId,
          addressId,
          address
        }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:136", "更新地址失败:", error);
    return {
      code: 500,
      message: "更新地址失败"
    };
  }
}
async function deleteAddress(addressId) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录"
      };
    }
    if (!addressId) {
      return {
        code: 400,
        message: "地址ID不能为空"
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "deleteAddress",
        data: {
          userId,
          addressId
        }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:180", "删除地址失败:", error);
    return {
      code: 500,
      message: "删除地址失败"
    };
  }
}
async function setDefaultAddress(addressId) {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录"
      };
    }
    if (!addressId) {
      return {
        code: 400,
        message: "地址ID不能为空"
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "setDefaultAddress",
        data: {
          userId,
          addressId
        }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:224", "设置默认地址失败:", error);
    return {
      code: 500,
      message: "设置默认地址失败"
    };
  }
}
async function getDefaultAddress() {
  try {
    const userId = getCurrentUserId();
    if (!userId) {
      return {
        code: 401,
        message: "请先登录",
        data: null
      };
    }
    const result = await common_vendor.nr.callFunction({
      name: "address-manager",
      data: {
        action: "getDefaultAddress",
        data: { userId }
      }
    });
    return result.result;
  } catch (error) {
    common_vendor.index.__f__("error", "at api/addressService.js:258", "获取默认地址失败:", error);
    return {
      code: 500,
      message: "获取默认地址失败",
      data: null
    };
  }
}
function validateAddress(address) {
  const errors = [];
  if (!address.name || address.name.trim() === "") {
    errors.push("请输入收货人姓名");
  }
  if (!address.phone || address.phone.trim() === "") {
    errors.push("请输入手机号码");
  } else if (!/^1[3-9]\d{9}$/.test(address.phone)) {
    errors.push("请输入正确的手机号码");
  }
  if (!address.detail || address.detail.trim() === "") {
    errors.push("请输入详细地址");
  }
  return {
    isValid: errors.length === 0,
    errors
  };
}
exports.addAddress = addAddress;
exports.deleteAddress = deleteAddress;
exports.getAddressList = getAddressList;
exports.getDefaultAddress = getDefaultAddress;
exports.setDefaultAddress = setDefaultAddress;
exports.updateAddress = updateAddress;
exports.validateAddress = validateAddress;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/addressService.js.map
