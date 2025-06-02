"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      tabs: [
        { id: "all", name: "全部认领" },
        { id: "poultry", name: "家禽" },
        { id: "crops", name: "农作物" }
      ],
      activeTab: "all",
      claimItems: [
        {
          id: "c1",
          name: "瑶山散养鸡 #A5831",
          type: "poultry",
          claimDate: "2023-04-26",
          expectedDate: "2023-05-26",
          status: "growing",
          growthPercent: "75%",
          healthStatus: "良好",
          healthPercent: "90%",
          lastUpdateDate: "2023-05-10",
          milestoneTitle: "已完成疫苗接种",
          milestoneDesc: "完成了所有必要疫苗的接种，健康状况良好",
          image: "/static/static2/3799.jpg_wh1200.jpg"
        },
        {
          id: "c2",
          name: "有机玉米 50㎡",
          type: "crops",
          claimDate: "2023-04-26",
          expectedDate: "2023-05-26",
          status: "ready",
          growthPercent: "100%",
          healthStatus: "优秀",
          healthPercent: "95%",
          lastUpdateDate: "2023-05-10",
          milestoneTitle: "已成熟",
          milestoneDesc: "玉米已成熟，随时可以收获",
          image: "/static/static2/67a2cfed4e91e1a411bbb1ff591cafdc.jpg"
        },
        {
          id: "c3",
          name: "瑶山蜜桃树 #T2391",
          type: "crops",
          claimDate: "2023-04-26",
          expectedDate: "2023-05-26",
          status: "growing",
          growthPercent: "80%",
          healthStatus: "优秀",
          healthPercent: "98%",
          lastUpdateDate: "2023-05-10",
          milestoneTitle: "进入挂果期",
          milestoneDesc: "蜜桃已开始挂果，生长状况良好",
          image: "/static/static2/3397.jpg_wh860.jpg"
        }
      ]
    };
  },
  computed: {
    myClaimItems() {
      if (this.activeTab === "all") {
        return this.claimItems;
      } else {
        return this.claimItems.filter((item) => item.type === this.activeTab);
      }
    }
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    getStatusClass(item) {
      return item.status === "growing" ? "status-growing" : "status-ready";
    },
    harvestProduct(product) {
      common_vendor.index.showModal({
        title: "收获确认",
        content: `确认收获 ${product.name}？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "收获成功",
              icon: "success"
            });
            setTimeout(() => {
              const index = this.claimItems.findIndex((item) => item.id === product.id);
              if (index !== -1) {
                this.claimItems.splice(index, 1);
              }
            }, 1500);
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.activeTab === tab.id ? 1 : "",
        d: common_vendor.o(($event) => $data.activeTab = tab.id, index)
      };
    }),
    c: $options.myClaimItems.length > 0
  }, $options.myClaimItems.length > 0 ? {
    d: common_vendor.f($options.myClaimItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.image,
        b: item.name,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.claimDate),
        e: common_vendor.t(item.type === "poultry" ? "出栏" : "收获"),
        f: common_vendor.t(item.expectedDate),
        g: common_vendor.t(item.status === "growing" ? "成长中 " + item.growthPercent : "可收获"),
        h: common_vendor.n($options.getStatusClass(item)),
        i: common_vendor.t(item.growthPercent),
        j: item.growthPercent,
        k: common_vendor.t(item.healthStatus),
        l: common_vendor.t(item.healthPercent),
        m: item.healthPercent,
        n: common_vendor.t(item.lastUpdateDate),
        o: common_vendor.t(item.milestoneTitle),
        p: common_vendor.t(item.milestoneDesc),
        q: index < $options.myClaimItems.length - 1
      }, index < $options.myClaimItems.length - 1 ? {} : {}, {
        r: common_vendor.o(($event) => $options.navigateTo("/pages/farm/monitor"), index),
        s: item.status === "growing"
      }, item.status === "growing" ? {
        t: common_assets._imports_3$4,
        v: common_vendor.o(($event) => $options.navigateTo("/pages/farm/data"), index)
      } : {
        w: common_assets._imports_4$3,
        x: common_vendor.o(($event) => $options.harvestProduct(item), index)
      }, {
        y: index
      });
    }),
    e: common_assets._imports_1$5,
    f: common_assets._imports_2$3
  } : {
    g: common_vendor.o(($event) => $options.navigateTo("/pages/farm/new"))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/my.js.map
