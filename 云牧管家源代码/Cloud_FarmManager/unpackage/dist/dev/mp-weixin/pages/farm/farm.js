"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_7$1,
    b: common_assets._imports_1$2,
    c: common_vendor.o(($event) => $options.navigateTo("/pages/farm/new")),
    d: common_assets._imports_2$1,
    e: common_vendor.o(($event) => $options.navigateTo("/pages/farm/my")),
    f: common_assets._imports_3$2,
    g: common_vendor.o(($event) => $options.navigateTo("/pages/farm/monitor")),
    h: common_assets._imports_3$3,
    i: common_vendor.o(($event) => $options.navigateTo("/pages/farm/data")),
    j: common_assets._imports_5$1,
    k: common_assets._imports_6$2,
    l: common_assets._imports_7$2
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/farm.js.map
