"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "user-system-test",
  setup(__props) {
    const loading = common_vendor.ref(false);
    const userToken = common_vendor.ref("");
    const userInfo = common_vendor.ref(null);
    const cartItems = common_vendor.ref([]);
    const registerResult = common_vendor.ref("");
    const loginResult = common_vendor.ref("");
    const logoutResult = common_vendor.ref("");
    const addCartResult = common_vendor.ref("");
    const getCartResult = common_vendor.ref("");
    const clearCartResult = common_vendor.ref("");
    const isLoggedIn = common_vendor.computed(() => !!userToken.value);
    const checkLoginStatus = () => {
      userToken.value = common_vendor.index.getStorageSync("userToken") || "";
      userInfo.value = common_vendor.index.getStorageSync("userInfo") || null;
    };
    const testRegister = async () => {
      loading.value = true;
      registerResult.value = "注册中...";
      try {
        const timestamp = Date.now();
        const result = await common_vendor.nr.callFunction({
          name: "user-auth",
          data: {
            action: "register",
            username: `test_${timestamp}`,
            password: "123456",
            nickname: `测试用户_${timestamp}`
          }
        });
        registerResult.value = `注册结果: ${result.result.errCode === 0 ? "成功" : result.result.errMsg}`;
      } catch (error) {
        registerResult.value = `注册失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const testLogin = async () => {
      loading.value = true;
      loginResult.value = "登录中...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-auth",
          data: {
            action: "login",
            username: "testuser",
            password: "123456"
          }
        });
        common_vendor.index.__f__("log", "at pages/test/user-system-test.vue:141", "测试登录云函数返回结果:", result.result);
        if (result.result.errCode === 0) {
          common_vendor.index.setStorageSync("userToken", result.result.token);
          if (result.result.userInfo) {
            common_vendor.index.setStorageSync("userInfo", result.result.userInfo);
          } else {
            common_vendor.index.setStorageSync("userInfo", {
              username: "testuser",
              userId: result.result.userId || ""
            });
          }
          checkLoginStatus();
          loginResult.value = "登录成功";
        } else {
          loginResult.value = `登录失败: ${result.result.errMsg}`;
        }
      } catch (error) {
        loginResult.value = `登录失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const testLogout = async () => {
      loading.value = true;
      logoutResult.value = "登出中...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-auth",
          data: {
            action: "logout",
            token: userToken.value
          }
        });
        common_vendor.index.removeStorageSync("userToken");
        common_vendor.index.removeStorageSync("userInfo");
        checkLoginStatus();
        cartItems.value = [];
        logoutResult.value = "登出成功";
      } catch (error) {
        logoutResult.value = `登出失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const testAddToCart = async () => {
      loading.value = true;
      addCartResult.value = "添加中...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-cart",
          data: {
            action: "addToCart",
            token: userToken.value,
            productId: 1,
            quantity: 1,
            productInfo: {
              name: "测试商品",
              price: 99,
              image: "/static/test.jpg",
              specs: "测试规格"
            }
          }
        });
        addCartResult.value = `添加结果: ${result.result.errCode === 0 ? "成功" : result.result.errMsg}`;
        if (result.result.errCode === 0) {
          await testGetCart();
        }
      } catch (error) {
        addCartResult.value = `添加失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const testGetCart = async () => {
      loading.value = true;
      getCartResult.value = "获取中...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-cart",
          data: {
            action: "getCart",
            token: userToken.value
          }
        });
        if (result.result.errCode === 0) {
          cartItems.value = result.result.data || [];
          getCartResult.value = `获取成功，共${cartItems.value.length}件商品`;
        } else {
          getCartResult.value = `获取失败: ${result.result.errMsg}`;
        }
      } catch (error) {
        getCartResult.value = `获取失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const testClearCart = async () => {
      loading.value = true;
      clearCartResult.value = "清空中...";
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-cart",
          data: {
            action: "clearCart",
            token: userToken.value
          }
        });
        clearCartResult.value = `清空结果: ${result.result.errCode === 0 ? "成功" : result.result.errMsg}`;
        if (result.result.errCode === 0) {
          cartItems.value = [];
        }
      } catch (error) {
        clearCartResult.value = `清空失败: ${error.message}`;
      } finally {
        loading.value = false;
      }
    };
    const clearAllResults = () => {
      registerResult.value = "";
      loginResult.value = "";
      logoutResult.value = "";
      addCartResult.value = "";
      getCartResult.value = "";
      clearCartResult.value = "";
    };
    const goToLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const goToCart = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/cart/cart"
      });
    };
    common_vendor.onMounted(() => {
      checkLoginStatus();
      if (isLoggedIn.value) {
        testGetCart();
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(isLoggedIn.value ? "已登录" : "未登录"),
        b: userInfo.value
      }, userInfo.value ? {
        c: common_vendor.t(userInfo.value.username)
      } : {}, {
        d: userToken.value
      }, userToken.value ? {
        e: common_vendor.t(userToken.value.substring(0, 10))
      } : {}, {
        f: common_vendor.o(testRegister),
        g: loading.value,
        h: common_vendor.t(registerResult.value),
        i: common_vendor.o(testLogin),
        j: loading.value,
        k: common_vendor.t(loginResult.value),
        l: common_vendor.o(testLogout),
        m: loading.value,
        n: common_vendor.t(logoutResult.value),
        o: common_vendor.o(testAddToCart),
        p: loading.value || !isLoggedIn.value,
        q: common_vendor.t(addCartResult.value),
        r: common_vendor.o(testGetCart),
        s: loading.value || !isLoggedIn.value,
        t: common_vendor.t(getCartResult.value),
        v: common_vendor.o(testClearCart),
        w: loading.value || !isLoggedIn.value,
        x: common_vendor.t(clearCartResult.value),
        y: cartItems.value.length > 0
      }, cartItems.value.length > 0 ? {
        z: common_vendor.f(cartItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.productInfo.name),
            b: common_vendor.t(item.quantity),
            c: common_vendor.t(item.productInfo.price),
            d: item._id
          };
        })
      } : {}, {
        A: common_vendor.o(clearAllResults),
        B: common_vendor.o(goToLogin),
        C: common_vendor.o(goToCart)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e11e4325"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/user-system-test.js.map
