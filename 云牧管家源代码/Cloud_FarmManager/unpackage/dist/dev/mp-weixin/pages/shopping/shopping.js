"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  components: {
    // TabBar
  },
  data() {
    return {};
  },
  methods: {
    goToProductDetail(productId) {
      common_vendor.index.navigateTo({
        url: `/pages/shopping/detail/detail?id=${productId}`
      });
    },
    addToCart(productId) {
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    },
    goToCart() {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/cart/cart"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_1$1,
    b: common_assets._imports_1$1,
    c: common_assets._imports_4$1,
    d: common_assets._imports_3$1,
    e: common_assets._imports_19,
    f: common_assets._imports_20,
    g: common_vendor.o(($event) => $options.addToCart(1)),
    h: common_vendor.o(($event) => $options.goToProductDetail(1)),
    i: common_assets._imports_6$1,
    j: common_assets._imports_19,
    k: common_assets._imports_20,
    l: common_vendor.o(($event) => $options.addToCart(2)),
    m: common_vendor.o(($event) => $options.goToProductDetail(2)),
    n: common_assets._imports_9,
    o: common_assets._imports_19,
    p: common_assets._imports_20,
    q: common_vendor.o(($event) => $options.addToCart(3)),
    r: common_vendor.o(($event) => $options.goToProductDetail(3)),
    s: common_assets._imports_12,
    t: common_assets._imports_19,
    v: common_assets._imports_20,
    w: common_vendor.o(($event) => $options.addToCart(4)),
    x: common_vendor.o(($event) => $options.goToProductDetail(4)),
    y: common_assets._imports_15,
    z: common_assets._imports_19,
    A: common_assets._imports_20,
    B: common_vendor.o(($event) => $options.addToCart(5)),
    C: common_vendor.o(($event) => $options.goToProductDetail(5)),
    D: common_assets._imports_18,
    E: common_assets._imports_19,
    F: common_assets._imports_20,
    G: common_vendor.o(($event) => $options.addToCart(6)),
    H: common_vendor.o(($event) => $options.goToProductDetail(6)),
    I: common_assets._imports_21,
    J: common_vendor.o(($event) => $options.goToCart())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shopping/shopping.js.map
