"use strict";
const common_vendor = require("../../common/vendor.js");
const store_cart = require("../../store/cart.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      currentTab: "login",
      loginForm: {
        username: "",
        password: ""
      },
      registerForm: {
        username: "",
        password: "",
        confirmPassword: "",
        nickname: ""
      },
      loginLoading: false,
      registerLoading: false
    };
  },
  methods: {
    async handleLogin() {
      if (!this.loginForm.username || !this.loginForm.password) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      this.loginLoading = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-auth",
          data: {
            action: "login",
            username: this.loginForm.username,
            password: this.loginForm.password
          }
        });
        common_vendor.index.__f__("log", "at pages/login/login.vue:113", "登录云函数返回结果:", result.result);
        if (result.result.errCode === 0) {
          common_vendor.index.setStorageSync("userToken", result.result.token);
          if (result.result.userInfo) {
            common_vendor.index.setStorageSync("userInfo", result.result.userInfo);
          } else {
            common_vendor.index.setStorageSync("userInfo", {
              username: this.loginForm.username,
              userId: result.result.userId || ""
            });
          }
          store_cart.cartStore.switchUser();
          common_vendor.index.showToast({
            title: "登录成功",
            icon: "success"
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/shopping/shopping"
            });
          }, 1500);
        } else {
          common_vendor.index.showToast({
            title: result.result.errMsg,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:147", "登录失败:", error);
        common_vendor.index.showToast({
          title: "登录失败，请重试",
          icon: "none"
        });
      } finally {
        this.loginLoading = false;
      }
    },
    async handleRegister() {
      if (!this.registerForm.username || !this.registerForm.password || !this.registerForm.confirmPassword) {
        common_vendor.index.showToast({
          title: "请填写完整信息",
          icon: "none"
        });
        return;
      }
      if (this.registerForm.password !== this.registerForm.confirmPassword) {
        common_vendor.index.showToast({
          title: "两次密码不一致",
          icon: "none"
        });
        return;
      }
      if (this.registerForm.password.length < 6) {
        common_vendor.index.showToast({
          title: "密码至少6位",
          icon: "none"
        });
        return;
      }
      this.registerLoading = true;
      try {
        const result = await common_vendor.nr.callFunction({
          name: "user-auth",
          data: {
            action: "register",
            username: this.registerForm.username,
            password: this.registerForm.password,
            nickname: this.registerForm.nickname || this.registerForm.username
          }
        });
        if (result.result.errCode === 0) {
          common_vendor.index.showToast({
            title: "注册成功",
            icon: "success"
          });
          Object.assign(this.registerForm, {
            username: "",
            password: "",
            confirmPassword: "",
            nickname: ""
          });
          this.currentTab = "login";
        } else {
          common_vendor.index.showToast({
            title: result.result.errMsg,
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:218", "注册失败:", error);
        common_vendor.index.showToast({
          title: "注册失败，请重试",
          icon: "none"
        });
      } finally {
        this.registerLoading = false;
      }
    },
    skipLogin() {
      common_vendor.index.switchTab({
        url: "/pages/shopping/shopping"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$2,
    b: $data.currentTab === "login" ? 1 : "",
    c: common_vendor.o(($event) => $data.currentTab = "login"),
    d: $data.currentTab === "register" ? 1 : "",
    e: common_vendor.o(($event) => $data.currentTab = "register"),
    f: $data.currentTab === "login"
  }, $data.currentTab === "login" ? {
    g: $data.loginForm.username,
    h: common_vendor.o(($event) => $data.loginForm.username = $event.detail.value),
    i: $data.loginForm.password,
    j: common_vendor.o(($event) => $data.loginForm.password = $event.detail.value),
    k: common_vendor.t($data.loginLoading ? "登录中..." : "登录"),
    l: $data.loginLoading,
    m: common_vendor.o((...args) => $options.handleLogin && $options.handleLogin(...args))
  } : {}, {
    n: $data.currentTab === "register"
  }, $data.currentTab === "register" ? {
    o: $data.registerForm.username,
    p: common_vendor.o(($event) => $data.registerForm.username = $event.detail.value),
    q: $data.registerForm.password,
    r: common_vendor.o(($event) => $data.registerForm.password = $event.detail.value),
    s: $data.registerForm.confirmPassword,
    t: common_vendor.o(($event) => $data.registerForm.confirmPassword = $event.detail.value),
    v: $data.registerForm.nickname,
    w: common_vendor.o(($event) => $data.registerForm.nickname = $event.detail.value),
    x: common_vendor.t($data.registerLoading ? "注册中..." : "注册"),
    y: $data.registerLoading,
    z: common_vendor.o((...args) => $options.handleRegister && $options.handleRegister(...args))
  } : {}, {
    A: common_vendor.o((...args) => $options.skipLogin && $options.skipLogin(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
