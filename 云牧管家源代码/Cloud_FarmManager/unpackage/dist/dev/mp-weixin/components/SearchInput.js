"use strict";
const common_assets = require("../common/assets.js");
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    placeholderText: {
      type: String
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$11,
    b: $props.placeholderText
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c39b51f2"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/SearchInput.js.map
