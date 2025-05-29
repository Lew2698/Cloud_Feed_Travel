"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        name: "云养者",
        id: "1001583",
        level: 3,
        progress: 60
      },
      stats: {
        claims: 12,
        orders: 43,
        points: 2064
      }
    };
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    contactService() {
      common_vendor.index.showToast({
        title: "正在连接客服...",
        icon: "none"
      });
    },
    logout() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "退出成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }, 1500);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$5,
    b: common_assets._imports_1$6,
    c: common_assets._imports_2$4,
    d: common_assets._imports_3$6,
    e: common_assets._imports_8$1,
    f: common_vendor.o(($event) => $options.navigateTo("/pages/profile/orders?type=unreceived")),
    g: common_assets._imports_5$3,
    h: common_assets._imports_6$1,
    i: common_assets._imports_7$4,
    j: common_assets._imports_8$1,
    k: common_assets._imports_9$2,
    l: common_assets._imports_10$1,
    m: common_assets._imports_11$2,
    n: common_assets._imports_12$2,
    o: common_assets._imports_13,
    p: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
