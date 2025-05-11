"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "TabBar",
  props: {
    active: {
      type: String,
      default: "home"
    }
  },
  methods: {
    navigate(tab) {
      switch (tab) {
        case "home":
          common_vendor.index.navigateTo({
            url: "/pages/index/index"
          });
          break;
        case "shopping":
          common_vendor.index.navigateTo({
            url: "/pages/shopping/shopping"
          });
          break;
        case "farm":
          common_vendor.index.navigateTo({
            url: "/pages/index/index"
            // 暂时都指向首页
          });
          break;
        case "activity":
          common_vendor.index.navigateTo({
            url: "/pages/index/index"
            // 暂时都指向首页
          });
          break;
        case "profile":
          common_vendor.index.navigateTo({
            url: "/pages/index/index"
            // 暂时都指向首页
          });
          break;
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.active === "home" ? 1 : "",
    b: common_vendor.o(($event) => $options.navigate("home")),
    c: $props.active === "shopping" ? 1 : "",
    d: common_vendor.o(($event) => $options.navigate("shopping")),
    e: $props.active === "farm" ? 1 : "",
    f: common_vendor.o(($event) => $options.navigate("farm")),
    g: $props.active === "activity" ? 1 : "",
    h: common_vendor.o(($event) => $options.navigate("activity")),
    i: $props.active === "profile" ? 1 : "",
    j: common_vendor.o(($event) => $options.navigate("profile"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/TabBar.js.map
