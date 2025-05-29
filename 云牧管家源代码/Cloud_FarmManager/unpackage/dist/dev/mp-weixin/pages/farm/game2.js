"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      // 游戏状态
      currentTool: "",
      // 农田地块数据
      farmPlots: [
        {
          id: "plot1",
          position: { top: "45%", left: "16%" },
          status: "child",
          cropType: "chicken",
          cropImage: "/static/game/ranch/028-hen.svg",
          needsWater: true,
          needsFertilizer: true,
          growthStage: 1,
          growthTime: 30,
          harvestTime: null
        },
        {
          id: "plot2",
          position: { top: "45%", left: "40%" },
          status: "ready",
          cropType: "horse",
          cropImage: "/static/game/ranch/007-horse.svg",
          needsWater: false,
          needsFertilizer: false,
          growthStage: 3,
          growthTime: 100,
          harvestTime: /* @__PURE__ */ new Date()
        },
        {
          id: "plot3",
          position: { top: "57%", left: "16%" },
          status: "child",
          cropType: "pig",
          cropImage: "/static/game/ranch/035-pig.svg",
          needsWater: true,
          needsFertilizer: false,
          growthStage: 0,
          growthTime: 10,
          harvestTime: null
        },
        {
          id: "plot4",
          position: { top: "57%", left: "40%" },
          status: "adult",
          cropType: "cow",
          cropImage: "/static/game/ranch/056-cow.svg",
          needsWater: false,
          needsFertilizer: true,
          growthStage: 1,
          growthTime: 20,
          harvestTime: null
        },
        {
          id: "plot5",
          position: { top: "69%", left: "16%" },
          status: "ready",
          cropType: "chicken",
          cropImage: "/static/game/ranch/028-hen.svg",
          needsWater: true,
          needsFertilizer: false,
          growthStage: 3,
          growthTime: 100,
          harvestTime: /* @__PURE__ */ new Date()
        },
        {
          id: "plot6",
          position: { top: "69%", left: "40%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        },
        {
          id: "plot7",
          position: { top: "45%", left: "66%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        },
        {
          id: "plot8",
          position: { top: "57%", left: "66%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        },
        {
          id: "plot9",
          position: { top: "69%", left: "66%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        }
      ]
    };
  },
  methods: {
    // 工具选择
    selectTool(tool) {
      this.currentTool = tool;
    },
    // 返回上一页
    goBack() {
      common_vendor.index.switchTab({
        url: "/pages/farm/farm"
      });
    },
    // 打开市场
    openMarket() {
      common_vendor.index.showToast({
        title: "市场功能即将上线",
        icon: "none"
      });
    },
    // 处理地块点击
    handlePlotClick(index) {
      const plot = this.farmPlots[index];
      if (this.currentTool === "") {
        this.showCropDetail(plot);
      } else if (this.currentTool === "seed" && plot.status === "empty") {
        this.showCropSelector(index);
      } else if (this.currentTool === "water" && plot.needsWater) {
        this.waterCrop(index);
      } else if (this.currentTool === "fertilizer") {
        this.fertilizeCrop(index);
      } else if (this.currentTool === "harvest" && plot.status === "ready") {
        this.harvestCrop(index);
      } else {
        common_vendor.index.showToast({
          title: "无法对此地块使用该工具",
          icon: "none"
        });
      }
    },
    // 显示作物选择器
    showCropSelector(plotIndex) {
      common_vendor.index.showActionSheet({
        itemList: ["猪", "牛", "鸡", "马"],
        success: (res) => {
          let cropType;
          let cropImage;
          switch (res.tapIndex) {
            case 0:
              cropType = "pig";
              cropImage = "/static/game/ranch/035-pig.svg";
              break;
            case 1:
              cropType = "cow";
              cropImage = "/static/game/ranch/056-cow.svg";
              break;
            case 2:
              cropType = "chicken";
              cropImage = "/static/game/ranch/028-hen.svg";
              break;
            case 3:
              cropType = "horse";
              cropImage = "/static/game/ranch/007-horse.svg";
              break;
          }
          this.farmPlots[plotIndex].status = "child";
          this.farmPlots[plotIndex].cropType = cropType;
          this.farmPlots[plotIndex].cropImage = cropImage;
          this.farmPlots[plotIndex].needsWater = true;
          this.farmPlots[plotIndex].growthStage = 0;
          this.farmPlots[plotIndex].growthTime = 0;
          common_vendor.index.showToast({
            title: "养殖成功",
            icon: "success"
          });
        }
      });
    },
    // 浇水
    waterCrop(index) {
      this.farmPlots[index].needsWater = false;
      this.farmPlots[index].growthTime += 10;
      if (this.farmPlots[index].growthTime >= 50 && this.farmPlots[index].status !== "ready") {
        this.farmPlots[index].status = "ready";
        this.farmPlots[index].growthStage = 3;
        this.farmPlots[index].harvestTime = /* @__PURE__ */ new Date();
      } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === "child") {
        this.farmPlots[index].status = "adult";
        this.farmPlots[index].growthStage = 1;
      }
      common_vendor.index.showToast({
        title: "喝水成功",
        icon: "success"
      });
    },
    // 施肥
    fertilizeCrop(index) {
      this.farmPlots[index].growthTime += 20;
      if (this.farmPlots[index].growthTime >= 50 && this.farmPlots[index].status !== "ready") {
        this.farmPlots[index].status = "ready";
        this.farmPlots[index].growthStage = 3;
        this.farmPlots[index].harvestTime = /* @__PURE__ */ new Date();
      } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === "child") {
        this.farmPlots[index].status = "adult";
        this.farmPlots[index].growthStage = 1;
      }
      common_vendor.index.showToast({
        title: "投喂成功",
        icon: "success"
      });
    },
    // 收获
    harvestCrop(index) {
      const cropType = this.farmPlots[index].cropType;
      this.farmPlots[index].status = "empty";
      this.farmPlots[index].cropType = "";
      this.farmPlots[index].cropImage = "";
      this.farmPlots[index].needsWater = false;
      this.farmPlots[index].growthStage = 0;
      this.farmPlots[index].growthTime = 0;
      this.farmPlots[index].harvestTime = null;
      common_vendor.index.showToast({
        title: `已收获${this.getCropName(cropType)}`,
        icon: "success"
      });
    },
    // 显示作物详情
    showCropDetail(plot) {
      if (plot.status === "empty") {
        common_vendor.index.showToast({
          title: "这块地还没有养殖动物",
          icon: "none"
        });
        return;
      }
      const cropName = this.getCropName(plot.cropType);
      const growthStage = this.getGrowthStageName(plot.status);
      const needsWater = plot.needsWater ? "需要喝水" : "水分充足";
      common_vendor.index.showModal({
        title: `有机${cropName}`,
        content: `生长阶段: ${growthStage}
水分状态: ${needsWater}
生长进度: ${plot.growthTime}%`,
        showCancel: false
      });
    },
    // 获取作物信息文本
    getPlotInfoText(plot) {
      if (plot.status === "empty") {
        return "点击养殖";
      } else if (plot.status === "ready") {
        return `${this.getCropName(plot.cropType)}  可以收获`;
      } else if (plot.needsWater) {
        return `${this.getCropName(plot.cropType)}  需要喝水`;
      } else {
        return `${this.getCropName(plot.cropType)}  生长中`;
      }
    },
    // 获取作物名称
    getCropName(cropType) {
      switch (cropType) {
        case "chicken":
          return "鸡";
        case "pig":
          return "猪";
        case "cow":
          return "牛";
        case "horse":
          return "马";
        default:
          return "";
      }
    },
    // 获取生长阶段名称
    getGrowthStageName(status) {
      switch (status) {
        case "child":
          return "幼年期";
        case "adult":
          return "成年期";
        case "ready":
          return "成熟期";
        default:
          return "";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$3,
    b: common_vendor.f($data.farmPlots, (plot, index, i0) => {
      return common_vendor.e({
        a: plot.status === "empty"
      }, plot.status === "empty" ? {
        b: common_assets._imports_1$4
      } : plot.status === "child" ? {
        d: plot.cropImage
      } : plot.status === "adult" ? {
        f: plot.cropImage
      } : plot.status === "ready" ? {
        h: plot.cropImage
      } : {}, {
        c: plot.status === "child",
        e: plot.status === "adult",
        g: plot.status === "ready",
        i: plot.status !== "empty" && plot.needsWater
      }, plot.status !== "empty" && plot.needsWater ? {
        j: common_assets._imports_2$2
      } : {}, {
        k: plot.status !== "empty" && plot.status !== "seed" && plot.needsFertilizer
      }, plot.status !== "empty" && plot.status !== "seed" && plot.needsFertilizer ? {
        l: common_assets._imports_3$4
      } : {}, {
        m: plot.status === "ready"
      }, plot.status === "ready" ? {
        n: common_assets._imports_4$2
      } : {}, {
        o: common_vendor.t($options.getPlotInfoText(plot)),
        p: index,
        q: plot.status !== "empty" ? 1 : "",
        r: plot.position.top,
        s: plot.position.left,
        t: common_vendor.o(($event) => $options.handlePlotClick(index), index)
      });
    }),
    c: common_assets._imports_5$2,
    d: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    e: common_assets._imports_8,
    f: common_assets._imports_7$3,
    g: common_assets._imports_8,
    h: $data.currentTool === "seed" ? 1 : "",
    i: common_vendor.o(($event) => $options.selectTool("seed")),
    j: common_assets._imports_9$1,
    k: $data.currentTool === "water" ? 1 : "",
    l: common_vendor.o(($event) => $options.selectTool("water")),
    m: common_assets._imports_10,
    n: $data.currentTool === "fertilizer" ? 1 : "",
    o: common_vendor.o(($event) => $options.selectTool("fertilizer")),
    p: common_assets._imports_11$1,
    q: $data.currentTool === "harvest" ? 1 : "",
    r: common_vendor.o(($event) => $options.selectTool("harvest")),
    s: common_assets._imports_12$1,
    t: common_vendor.o((...args) => $options.openMarket && $options.openMarket(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/game2.js.map
