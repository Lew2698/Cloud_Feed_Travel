"use strict";
const common_vendor = require("../common/vendor.js");
const useCartStore = common_vendor.defineStore("cart", () => {
  const cartItems = common_vendor.ref([]);
  const currentUserId = common_vendor.ref(null);
  const getCurrentUserId = () => {
    try {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      return userInfo && userInfo.userId ? userInfo.userId : "guest";
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/cart.js:16", "获取用户ID失败:", error);
      return "guest";
    }
  };
  const getUserCartKey = (userId = null) => {
    const uid = userId || getCurrentUserId();
    return `cart_items_${uid}`;
  };
  const loadCartFromStorage = () => {
    try {
      const newUserId = getCurrentUserId();
      if (currentUserId.value && currentUserId.value !== newUserId) {
        cartItems.value = [];
      }
      currentUserId.value = newUserId;
      const cartKey = getUserCartKey(newUserId);
      const cartData = common_vendor.index.getStorageSync(cartKey);
      if (cartData) {
        cartItems.value = JSON.parse(cartData);
      } else {
        cartItems.value = [];
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/cart.js:48", "加载购物车数据失败:", error);
      cartItems.value = [];
    }
  };
  const saveCartToStorage = () => {
    try {
      const userId = getCurrentUserId();
      const cartKey = getUserCartKey(userId);
      common_vendor.index.setStorageSync(cartKey, JSON.stringify(cartItems.value));
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/cart.js:60", "保存购物车数据失败:", error);
    }
  };
  const switchUser = () => {
    const newUserId = getCurrentUserId();
    if (currentUserId.value !== newUserId) {
      currentUserId.value = newUserId;
      loadCartFromStorage();
      notifyCartUpdate();
    }
  };
  const clearUserCart = (userId = null) => {
    try {
      const uid = userId || getCurrentUserId();
      const cartKey = getUserCartKey(uid);
      common_vendor.index.removeStorageSync(cartKey);
      if (uid === currentUserId.value) {
        cartItems.value = [];
        notifyCartUpdate();
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/cart.js:87", "清除用户购物车数据失败:", error);
    }
  };
  const notifyCartUpdate = () => {
    common_vendor.index.$emit("cartUpdated", {
      totalCount: totalCount.value,
      selectedCount: selectedCount.value,
      totalPrice: selectedTotalPrice.value,
      items: cartItems.value,
      userId: currentUserId.value
    });
  };
  const addToCart = (product, quantity = 1, specs = "默认规格") => {
    switchUser();
    const existingItemIndex = cartItems.value.findIndex(
      (item) => item.id === product.id && item.specs === specs
    );
    if (existingItemIndex !== -1) {
      cartItems.value[existingItemIndex].quantity += quantity;
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
      cartItems.value.push(cartItem);
    }
    saveCartToStorage();
    notifyCartUpdate();
    return true;
  };
  const updateQuantity = (index, quantity) => {
    switchUser();
    if (index >= 0 && index < cartItems.value.length) {
      if (quantity <= 0) {
        removeItem(index);
      } else {
        cartItems.value[index].quantity = quantity;
        saveCartToStorage();
        notifyCartUpdate();
      }
    }
  };
  const toggleItemSelect = (index) => {
    switchUser();
    if (index >= 0 && index < cartItems.value.length) {
      cartItems.value[index].selected = !cartItems.value[index].selected;
      saveCartToStorage();
      notifyCartUpdate();
    }
  };
  const removeItem = (index) => {
    switchUser();
    if (index >= 0 && index < cartItems.value.length) {
      cartItems.value.splice(index, 1);
      saveCartToStorage();
      notifyCartUpdate();
    }
  };
  const clearCart = () => {
    switchUser();
    cartItems.value = [];
    saveCartToStorage();
    notifyCartUpdate();
  };
  const toggleSelectAll = () => {
    switchUser();
    const allSelected = cartItems.value.every((item) => item.selected);
    cartItems.value.forEach((item) => {
      item.selected = !allSelected;
    });
    saveCartToStorage();
    notifyCartUpdate();
  };
  const findItemById = (productId) => {
    switchUser();
    return cartItems.value.find((item) => item.id === productId);
  };
  const getItemQuantity = (productId) => {
    switchUser();
    const item = findItemById(productId);
    return item ? item.quantity : 0;
  };
  const getCurrentUserInfo = () => {
    return {
      userId: currentUserId.value,
      cartKey: getUserCartKey(),
      itemCount: cartItems.value.length
    };
  };
  const totalCount = common_vendor.computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0);
  });
  const selectedCount = common_vendor.computed(() => {
    return cartItems.value.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
  });
  const selectedTotalPrice = common_vendor.computed(() => {
    return cartItems.value.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
  });
  const selectedItems = common_vendor.computed(() => {
    return cartItems.value.filter((item) => item.selected);
  });
  const isAllSelected = common_vendor.computed(() => {
    return cartItems.value.length > 0 && cartItems.value.every((item) => item.selected);
  });
  loadCartFromStorage();
  return {
    // 状态
    cartItems,
    currentUserId,
    // 计算属性
    totalCount,
    selectedCount,
    selectedTotalPrice,
    selectedItems,
    isAllSelected,
    // 方法
    switchUser,
    clearUserCart,
    addToCart,
    updateQuantity,
    toggleItemSelect,
    removeItem,
    clearCart,
    toggleSelectAll,
    findItemById,
    getItemQuantity,
    getCurrentUserInfo,
    loadCartFromStorage,
    saveCartToStorage
  };
});
exports.useCartStore = useCartStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/cart.js.map
