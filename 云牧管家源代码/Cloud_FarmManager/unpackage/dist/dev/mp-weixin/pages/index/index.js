"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const SearchInputVue = () => "../../components/SearchInput.js";
const _sfc_main = {
  components: {
    SearchInputVue
  },
  data() {
  },
  onLoad() {
  },
  methods: {}
};
if (!Array) {
  const _component_SearchInputVue = common_vendor.resolveComponent("SearchInputVue");
  _component_SearchInputVue();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      placeholderText: "搜索农产品,活动,服务"
    }),
    b: common_assets._imports_0,
    c: common_assets._imports_1,
    d: common_assets._imports_2,
    e: common_assets._imports_3,
    f: common_assets._imports_4,
    g: common_assets._imports_5,
    h: common_assets._imports_6,
    i: common_assets._imports_7,
    j: common_assets._imports_0$1,
    k: common_assets._imports_9,
    l: common_assets._imports_0$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
