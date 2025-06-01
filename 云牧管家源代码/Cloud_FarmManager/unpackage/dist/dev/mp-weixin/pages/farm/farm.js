"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = { data() {
  return { showGameModeSelector: false };
}, methods: { navigateTo(url) {
  common_vendor.index.navigateTo({ url });
}, showGameSelector() {
  this.showGameModeSelector = true;
}, hideGameSelector() {
  this.showGameModeSelector = false;
}, showRanchComingSoon() {
  common_vendor.index.showToast({ title: "牧场功能即将上线", icon: "none" });
} } };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_6$1,
    b: common_vendor.o((...args) => $options.showGameSelector && $options.showGameSelector(...args)),
    c: common_assets._imports_1$2,
    d: common_vendor.o(($event) => $options.navigateTo("/pages/farm/new")),
    e: common_assets._imports_2$1,
    f: common_vendor.o(($event) => $options.navigateTo("/pages/farm/my")),
    g: common_assets._imports_3$3,
    h: common_vendor.o(($event) => $options.navigateTo("/pages/farm/monitor")),
    i: common_assets._imports_3$4,
    j: common_vendor.o(($event) => $options.navigateTo("/pages/farm/data")),
    k: common_assets._imports_5$1,
    l: common_assets._imports_11,
    m: common_assets._imports_7$1,
    n: $data.showGameModeSelector
  }, $data.showGameModeSelector ? {
    o: common_vendor.o((...args) => $options.hideGameSelector && $options.hideGameSelector(...args)),
    p: common_assets._imports_11,
    q: common_vendor.o(($event) => $options.navigateTo("/pages/farm/game")),
    r: common_assets._imports_8,
    s: common_vendor.o(($event) => $options.navigateTo("/pages/farm/game2"))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/farm.js.map
