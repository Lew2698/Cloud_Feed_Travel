"use strict";
const common_vendor = require("../common/vendor.js");
class CartStore {
  constructor() {
    this.cartItems = [];
    this.currentUserId = null;
    this.loadCartFromStorage();
  }
  // 获取当前用户ID
  getCurrentUserId() {
    try {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      return userInfo && userInfo.userId ? userInfo.userId : "guest";
    } catch (error) {
      common_vendor.index.__f__("error", "at store/cart.js:15", "获取用户ID失败:", error);
      return "guest";
    }
  }
  // 获取用户专属的存储key
  getUserCartKey(userId = null) {
    const uid = userId || this.getCurrentUserId();
    return `cart_items_${uid}`;
  }
  // 从本地存储加载购物车数据
  loadCartFromStorage() {
    try {
      const currentUserId = this.getCurrentUserId();
      if (this.currentUserId && this.currentUserId !== currentUserId) {
        this.cartItems = [];
      }
      this.currentUserId = currentUserId;
      const cartKey = this.getUserCartKey(currentUserId);
      const cartData = common_vendor.index.getStorageSync(cartKey);
      if (cartData) {
        this.cartItems = JSON.parse(cartData);
      } else {
        this.cartItems = [];
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at store/cart.js:46", "加载购物车数据失败:", error);
      this.cartItems = [];
    }
  }
  // 保存购物车数据到本地存储
  saveCartToStorage() {
    try {
      const currentUserId = this.getCurrentUserId();
      const cartKey = this.getUserCartKey(currentUserId);
      common_vendor.index.setStorageSync(cartKey, JSON.stringify(this.cartItems));
    } catch (error) {
      common_vendor.index.__f__("error", "at store/cart.js:58", "保存购物车数据失败:", error);
    }
  }
  // 切换用户时调用此方法
  switchUser() {
    const newUserId = this.getCurrentUserId();
    if (this.currentUserId !== newUserId) {
      this.currentUserId = newUserId;
      this.loadCartFromStorage();
      this.notifyCartUpdate();
    }
  }
  // 清除指定用户的购物车数据
  clearUserCart(userId = null) {
    try {
      const uid = userId || this.getCurrentUserId();
      const cartKey = this.getUserCartKey(uid);
      common_vendor.index.removeStorageSync(cartKey);
      if (uid === this.currentUserId) {
        this.cartItems = [];
        this.notifyCartUpdate();
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at store/cart.js:85", "清除用户购物车数据失败:", error);
    }
  }
  // 添加商品到购物车
  addToCart(product, quantity = 1, specs = "默认规格") {
    this.switchUser();
    const existingItemIndex = this.cartItems.findIndex(
      (item) => item.id === product.id && item.specs === specs
    );
    if (existingItemIndex !== -1) {
      this.cartItems[existingItemIndex].quantity += quantity;
    } else {
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        specs,
        quantity,
        selected: true
      };
      this.cartItems.push(cartItem);
    }
    this.saveCartToStorage();
    this.notifyCartUpdate();
    return true;
  }
  // 更新商品数量
  updateQuantity(index, quantity) {
    this.switchUser();
    if (index >= 0 && index < this.cartItems.length) {
      if (quantity <= 0) {
        this.removeItem(index);
      } else {
        this.cartItems[index].quantity = quantity;
        this.saveCartToStorage();
        this.notifyCartUpdate();
      }
    }
  }
  // 切换商品选中状态
  toggleItemSelect(index) {
    this.switchUser();
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems[index].selected = !this.cartItems[index].selected;
      this.saveCartToStorage();
      this.notifyCartUpdate();
    }
  }
  // 移除商品
  removeItem(index) {
    this.switchUser();
    if (index >= 0 && index < this.cartItems.length) {
      this.cartItems.splice(index, 1);
      this.saveCartToStorage();
      this.notifyCartUpdate();
    }
  }
  // 清空购物车
  clearCart() {
    this.switchUser();
    this.cartItems = [];
    this.saveCartToStorage();
    this.notifyCartUpdate();
  }
  // 全选/取消全选
  toggleSelectAll() {
    this.switchUser();
    const allSelected = this.cartItems.every((item) => item.selected);
    this.cartItems.forEach((item) => {
      item.selected = !allSelected;
    });
    this.saveCartToStorage();
    this.notifyCartUpdate();
  }
  // 获取购物车商品总数
  getTotalCount() {
    this.switchUser();
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  // 获取选中商品总数
  getSelectedCount() {
    this.switchUser();
    return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
  }
  // 获取选中商品总价
  getSelectedTotalPrice() {
    this.switchUser();
    return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
  }
  // 获取选中的商品列表
  getSelectedItems() {
    this.switchUser();
    return this.cartItems.filter((item) => item.selected);
  }
  // 获取所有购物车商品
  getCartItems() {
    this.switchUser();
    return this.cartItems;
  }
  // 检查是否全选
  isAllSelected() {
    this.switchUser();
    return this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
  }
  // 通知购物车更新（用于页面间通信）
  notifyCartUpdate() {
    common_vendor.index.$emit("cartUpdated", {
      totalCount: this.getTotalCount(),
      selectedCount: this.getSelectedCount(),
      totalPrice: this.getSelectedTotalPrice(),
      items: this.cartItems,
      userId: this.currentUserId
    });
  }
  // 根据商品ID查找商品
  findItemById(productId) {
    this.switchUser();
    return this.cartItems.find((item) => item.id === productId);
  }
  // 获取商品在购物车中的数量
  getItemQuantity(productId) {
    this.switchUser();
    const item = this.findItemById(productId);
    return item ? item.quantity : 0;
  }
  // 获取当前用户信息（用于调试）
  getCurrentUserInfo() {
    return {
      userId: this.currentUserId,
      cartKey: this.getUserCartKey(),
      itemCount: this.cartItems.length
    };
  }
}
const cartStore = new CartStore();
exports.cartStore = cartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/cart.js.map
