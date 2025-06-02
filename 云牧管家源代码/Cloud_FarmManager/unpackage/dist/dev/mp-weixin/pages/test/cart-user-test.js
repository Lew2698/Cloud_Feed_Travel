"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "cart-user-test",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const currentUserInfo = common_vendor.ref({
      userId: "",
      cartKey: "",
      itemCount: 0
    });
    const cartItems = common_vendor.ref([]);
    const testResult = common_vendor.ref("等待测试...");
    const updateUserInfo = () => {
      const userInfo = proxy.$cartStore.getCurrentUserInfo();
      currentUserInfo.value = userInfo;
      cartItems.value = proxy.$cartStore.getCartItems();
    };
    const loginAsUser1 = () => {
      common_vendor.index.setStorageSync("userInfo", {
        userId: "user_001",
        username: "testuser1",
        nickname: "测试用户1"
      });
      common_vendor.index.setStorageSync("userToken", "token_user_001");
      proxy.$cartStore.switchUser();
      updateUserInfo();
      testResult.value = "已切换到用户1";
    };
    const loginAsUser2 = () => {
      common_vendor.index.setStorageSync("userInfo", {
        userId: "user_002",
        username: "testuser2",
        nickname: "测试用户2"
      });
      common_vendor.index.setStorageSync("userToken", "token_user_002");
      proxy.$cartStore.switchUser();
      updateUserInfo();
      testResult.value = "已切换到用户2";
    };
    const loginAsGuest = () => {
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.removeStorageSync("userToken");
      proxy.$cartStore.switchUser();
      updateUserInfo();
      testResult.value = "已切换到游客模式";
    };
    const addTestProduct = () => {
      const testProduct = {
        id: Date.now(),
        name: `测试商品_${Date.now()}`,
        price: Math.floor(Math.random() * 100) + 10,
        image: "/static/static2/3944.jpg_wh860.jpg"
      };
      const success = proxy.$cartStore.addToCart(testProduct, 1);
      if (success) {
        updateUserInfo();
        testResult.value = `已添加商品: ${testProduct.name}`;
      }
    };
    const clearCurrentCart = () => {
      proxy.$cartStore.clearCart();
      updateUserInfo();
      testResult.value = "已清空当前用户的购物车";
    };
    const viewCartItems = () => {
      updateUserInfo();
      testResult.value = `当前购物车有 ${cartItems.value.length} 件商品`;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      updateUserInfo();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(currentUserInfo.value.userId),
        b: common_vendor.t(currentUserInfo.value.cartKey),
        c: common_vendor.t(currentUserInfo.value.itemCount),
        d: common_vendor.o(loginAsUser1),
        e: common_vendor.o(loginAsUser2),
        f: common_vendor.o(loginAsGuest),
        g: common_vendor.o(addTestProduct),
        h: common_vendor.o(clearCurrentCart),
        i: common_vendor.o(viewCartItems),
        j: cartItems.value.length > 0
      }, cartItems.value.length > 0 ? {
        k: common_vendor.f(cartItems.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.quantity),
            c: common_vendor.t(item.price),
            d: index
          };
        })
      } : {}, {
        l: common_vendor.t(testResult.value),
        m: common_vendor.o(goBack)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-056262de"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/cart-user-test.js.map
