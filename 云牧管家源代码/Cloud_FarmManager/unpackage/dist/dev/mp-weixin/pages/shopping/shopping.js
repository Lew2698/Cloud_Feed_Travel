"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {};
  },
  methods: {}
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_assets._imports_1$1,
    c: common_assets._imports_2$1,
    d: common_assets._imports_3,
    e: common_assets._imports_4,
    f: common_assets._imports_5,
    g: common_vendor.p({
      active: "shopping"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shopping/shopping.js.map
