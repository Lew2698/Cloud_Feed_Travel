"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const TabBar = () => "../../components/TabBar.js";
const _sfc_main = {
  components: {
    TabBar
  },
  data() {
    return {
      title: "云养智旅"
    };
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_assets._imports_1,
    c: common_assets._imports_2,
    d: common_assets._imports_0$1,
    e: common_assets._imports_1$1,
    f: common_vendor.p({
      active: "home"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
