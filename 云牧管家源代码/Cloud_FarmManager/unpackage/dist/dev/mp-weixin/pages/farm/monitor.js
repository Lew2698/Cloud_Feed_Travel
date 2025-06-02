"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "poultry",
      activeItemId: "#A5831",
      monitorItems: [
        {
          id: "#A5831",
          name: "散养鸡",
          fullName: "瑶山散养鸡 #A5831",
          icon: "/static/icons/monitor icon/kiwi-bird.svg",
          liveImage: "/static/static2/3545.jpg_wh860.jpg",
          type: "poultry"
        },
        {
          id: "#P3492",
          name: "黑猪",
          fullName: "瑶山黑猪 #P3492",
          icon: "/static/icons/monitor icon/piggy-bank.svg",
          liveImage: "/static/static2/1529152636_835789403.jpg",
          type: "poultry"
        },
        {
          id: "#G1205",
          name: "土鹅",
          fullName: "瑶山土鹅 #G1205",
          icon: "/static/icons/monitor icon/Swan.svg",
          liveImage: "/static/static2/23674369667344d4b28456a20e2c41ab_th.jpg",
          type: "poultry"
        },
        {
          id: "#C1001",
          name: "有机玉米",
          fullName: "有机玉米 #C1001",
          icon: "/static/icons/monitor icon/玉米.svg",
          liveImage: "/static/static2/67a2cfed4e91e1a411bbb1ff591cafdc.jpg",
          type: "crops"
        }
      ],
      environmentData: [
        { label: "温度", value: "23°C" },
        { label: "湿度", value: "65%" },
        { label: "光照", value: "良好" },
        { label: "空气质量", value: "优" }
      ],
      farmingData: [
        { label: "当前体重", value: "1.8kg" },
        { label: "活动量", value: "正常" },
        { label: "饮食情况", value: "良好" },
        { label: "生长状态", value: "健康" }
      ],
      feedingRecords: [
        {
          icon: "/static/icons/monitor icon/fas fa-utensils 2.svg",
          title: "早间投喂",
          time: "07:30",
          desc: "有机谷物饲料"
        },
        {
          icon: "/static/icons/monitor icon/broom-ball-solid.svg",
          title: "环境清理",
          time: "09:15",
          desc: "养殖区清洁"
        },
        {
          icon: "/static/icons/monitor icon/fas fa-utensils 2.svg",
          title: "午间投喂",
          time: "13:00",
          desc: "蔬菜混合饲料"
        }
      ]
    };
  },
  computed: {
    currentTime() {
      const now = /* @__PURE__ */ new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    currentItem() {
      return this.monitorItems.find((item) => item.id === this.activeItemId) || this.monitorItems[0];
    },
    filteredMonitorItems() {
      return this.monitorItems.filter((item) => item.type === this.activeTab);
    }
  },
  watch: {
    activeTab(newVal) {
      const firstItem = this.monitorItems.find((item) => item.type === newVal);
      if (firstItem) {
        this.activeItemId = firstItem.id;
      }
    }
  },
  methods: {
    refreshData() {
      common_vendor.index.showLoading({
        title: "更新中..."
      });
      setTimeout(() => {
        if (this.activeTab === "poultry") {
          this.environmentData = [
            { label: "温度", value: (22 + Math.random() * 3).toFixed(1) + "°C" },
            { label: "湿度", value: (60 + Math.random() * 10).toFixed(0) + "%" },
            { label: "光照", value: "良好" },
            { label: "空气质量", value: "优" }
          ];
          this.farmingData = [
            { label: "当前体重", value: (1.7 + Math.random() * 0.3).toFixed(1) + "kg" },
            { label: "活动量", value: "正常" },
            { label: "饮食情况", value: "良好" },
            { label: "生长状态", value: "健康" }
          ];
        } else {
          this.environmentData = [
            { label: "温度", value: (22 + Math.random() * 3).toFixed(1) + "°C" },
            { label: "湿度", value: (60 + Math.random() * 10).toFixed(0) + "%" },
            { label: "土壤湿度", value: (70 + Math.random() * 10).toFixed(0) + "%" },
            { label: "光照", value: "充足" }
          ];
          this.farmingData = [
            { label: "当前高度", value: (80 + Math.random() * 10).toFixed(0) + "cm" },
            { label: "叶片数量", value: (12 + Math.random() * 4).toFixed(0) + "片" },
            { label: "生长状态", value: "良好" },
            { label: "预计产量", value: "高" }
          ];
        }
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "数据已更新",
          icon: "success"
        });
      }, 1e3);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$5,
    b: $data.activeTab === "poultry" ? 1 : "",
    c: common_vendor.o(($event) => $data.activeTab = "poultry"),
    d: $data.activeTab === "crops" ? 1 : "",
    e: common_vendor.o(($event) => $data.activeTab = "crops"),
    f: common_vendor.f($data.monitorItems, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.id),
        d: index,
        e: $data.activeItemId === item.id ? 1 : "",
        f: common_vendor.o(($event) => $data.activeItemId = item.id, index)
      };
    }),
    g: common_vendor.t($options.currentItem.fullName),
    h: $options.currentItem.liveImage,
    i: common_vendor.t($options.currentTime),
    j: common_vendor.o((...args) => $options.refreshData && $options.refreshData(...args)),
    k: common_vendor.f($data.environmentData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: index
      };
    }),
    l: common_vendor.o((...args) => $options.refreshData && $options.refreshData(...args)),
    m: common_vendor.f($data.farmingData, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: index
      };
    }),
    n: common_vendor.f($data.feedingRecords, (item, index, i0) => {
      return {
        a: item.icon,
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.desc),
        e: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/monitor.js.map
