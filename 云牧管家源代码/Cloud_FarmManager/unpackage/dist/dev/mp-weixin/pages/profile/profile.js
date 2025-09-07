"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      isLoggedIn: false,
      currentUserInfo: {},
      userLevel: 3,
      userProgress: 60,
      stats: {
        claims: 12,
        orders: 43,
        points: 2064
      }
    };
  },
  onShow() {
    this.checkLoginStatus();
  },
  methods: {
    // 检查登录状态
    checkLoginStatus() {
      try {
        const userToken = common_vendor.index.getStorageSync("userToken");
        const userInfo = common_vendor.index.getStorageSync("userInfo");
        if (userToken && userInfo) {
          this.isLoggedIn = true;
          this.currentUserInfo = userInfo;
          this.loadUserData();
        } else {
          this.isLoggedIn = false;
          this.currentUserInfo = {};
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/profile/profile.vue:195", "检查登录状态失败:", error);
        this.isLoggedIn = false;
        this.currentUserInfo = {};
      }
    },
    // 加载用户数据
    loadUserData() {
      if (this.isLoggedIn) {
        this.userLevel = 3;
        this.userProgress = 60;
        this.stats = {
          claims: 12,
          orders: 43,
          points: 2064
        };
      }
    },
    // 跳转到登录页面
    goToLogin() {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    },
    // 处理菜单点击
    handleMenuClick(type, label) {
      if (!this.isLoggedIn) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请先登录后再使用此功能",
          confirmText: "去登录",
          cancelText: "取消",
          success: (res) => {
            if (res.confirm) {
              this.goToLogin();
            }
          }
        });
        return;
      }
      switch (type) {
        case "orders":
          common_vendor.index.navigateTo({
            url: "/pages/profile/orders"
          });
          break;
        case "pending-payment":
          common_vendor.index.navigateTo({
            url: "/pages/profile/orders?type=pending-payment"
          });
          break;
        case "pending-shipment":
          common_vendor.index.navigateTo({
            url: "/pages/profile/orders?type=pending-shipment"
          });
          break;
        case "pending-receipt":
          common_vendor.index.navigateTo({
            url: "/pages/profile/orders?type=pending-receipt"
          });
          break;
        case "pending-review":
          common_vendor.index.navigateTo({
            url: "/pages/profile/orders?type=pending-review"
          });
          break;
        case "favorites":
          common_vendor.index.navigateTo({
            url: "/pages/profile/favorites"
          });
          break;
        case "address":
          common_vendor.index.navigateTo({
            url: "/pages/shopping/checkout/address"
          });
          break;
        case "history":
          common_vendor.index.navigateTo({
            url: "/pages/profile/history"
          });
          break;
        case "my-farm":
          common_vendor.index.switchTab({
            url: "/pages/farm/farm"
          });
          break;
        case "coupons":
          common_vendor.index.navigateTo({
            url: "/pages/profile/coupons"
          });
          break;
        case "help":
          common_vendor.index.navigateTo({
            url: "/pages/profile/help"
          });
          break;
        case "settings":
          common_vendor.index.navigateTo({
            url: "/pages/profile/settings"
          });
          break;
        default:
          common_vendor.index.showToast({
            title: `${label}功能开发中`,
            icon: "none"
          });
      }
    },
    // 跳转到测试页面
    goToTest() {
      common_vendor.index.navigateTo({
        url: "/pages/test/cart-user-test"
      });
    },
    // 联系客服
    contactService() {
      common_vendor.index.showToast({
        title: "正在连接客服...",
        icon: "none"
      });
    },
    // 退出登录
    async logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              const userToken = common_vendor.index.getStorageSync("userToken");
              if (userToken) {
                await common_vendor.nr.callFunction({
                  name: "user-auth",
                  data: {
                    action: "logout",
                    token: userToken
                  }
                });
              }
              common_vendor.index.removeStorageSync("userToken");
              common_vendor.index.removeStorageSync("userInfo");
              cartStore.switchUser();
              this.isLoggedIn = false;
              this.currentUserInfo = {};
              common_vendor.index.showToast({
                title: "退出成功",
                icon: "success"
              });
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/profile/profile.vue:367", "退出登录失败:", error);
              common_vendor.index.removeStorageSync("userToken");
              common_vendor.index.removeStorageSync("userInfo");
              cartStore.switchUser();
              this.isLoggedIn = false;
              this.currentUserInfo = {};
              common_vendor.index.showToast({
                title: "退出成功",
                icon: "success"
              });
            }
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    b: $data.currentUserInfo.avatar || "/static/static2/photo-1545167622-3a6ac756afa4.avif",
    c: common_vendor.t($data.currentUserInfo.nickname || $data.currentUserInfo.username || "云养者"),
    d: common_vendor.t($data.currentUserInfo.userId || "游客"),
    e: common_vendor.t($data.userLevel),
    f: $data.userProgress + "%"
  } : {
    g: common_assets._imports_0$6,
    h: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args))
  }, {
    i: common_vendor.t($data.isLoggedIn ? $data.stats.claims : 0),
    j: common_vendor.t($data.isLoggedIn ? $data.stats.orders : 0),
    k: common_vendor.t($data.isLoggedIn ? $data.stats.points : 0),
    l: $data.isLoggedIn
  }, $data.isLoggedIn ? {} : {}, {
    m: !$data.isLoggedIn
  }, !$data.isLoggedIn ? {
    n: common_vendor.o((...args) => $options.goToLogin && $options.goToLogin(...args))
  } : {}, {
    o: common_assets._imports_1$6,
    p: common_vendor.o(($event) => $options.handleMenuClick("orders", "全部订单")),
    q: common_assets._imports_2$4,
    r: $data.isLoggedIn
  }, $data.isLoggedIn ? {} : {}, {
    s: common_vendor.o(($event) => $options.handleMenuClick("pending-payment", "待付款")),
    t: common_assets._imports_3$7,
    v: common_vendor.o(($event) => $options.handleMenuClick("pending-shipment", "待发货")),
    w: common_assets._imports_8$1,
    x: $data.isLoggedIn
  }, $data.isLoggedIn ? {} : {}, {
    y: common_vendor.o(($event) => $options.handleMenuClick("pending-receipt", "待收货")),
    z: common_assets._imports_5$3,
    A: common_vendor.o(($event) => $options.handleMenuClick("pending-review", "待评价")),
    B: common_assets._imports_6$2,
    C: common_vendor.o(($event) => $options.handleMenuClick("favorites", "我的收藏")),
    D: common_assets._imports_7$3,
    E: common_vendor.o(($event) => $options.handleMenuClick("address", "收货地址")),
    F: common_assets._imports_8$1,
    G: common_vendor.o(($event) => $options.handleMenuClick("history", "浏览历史")),
    H: common_assets._imports_9$2,
    I: common_vendor.o(($event) => $options.handleMenuClick("my-farm", "我的云养")),
    J: common_assets._imports_10$1,
    K: common_vendor.o(($event) => $options.handleMenuClick("coupons", "我的卡券")),
    L: common_assets._imports_11$2,
    M: common_vendor.o((...args) => $options.contactService && $options.contactService(...args)),
    N: common_assets._imports_12$2,
    O: common_vendor.o(($event) => $options.handleMenuClick("help", "帮助中心")),
    P: common_assets._imports_14,
    Q: common_vendor.o(($event) => $options.handleMenuClick("settings", "系统设置")),
    R: common_assets._imports_14,
    S: common_vendor.o((...args) => $options.goToTest && $options.goToTest(...args)),
    T: $data.isLoggedIn
  }, $data.isLoggedIn ? {
    U: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
