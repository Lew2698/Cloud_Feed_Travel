"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const store_cart = require("./store/cart.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/shopping/shopping.js";
  "./pages/farm/farm.js";
  "./pages/farm/game.js";
  "./pages/farm/game2.js";
  "./pages/farm/new.js";
  "./pages/farm/my.js";
  "./pages/farm/monitor.js";
  "./pages/farm/data.js";
  "./pages/activity/activity.js";
  "./pages/profile/profile.js";
  "./pages/shopping/detail/detail.js";
  "./pages/shopping/cart/cart.js";
  "./pages/shopping/detail/trace.js";
  "./pages/shopping/checkout/checkout.js";
  "./pages/shopping/checkout/address.js";
  "./pages/test/cart-user-test.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$cartStore = store_cart.cartStore;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
