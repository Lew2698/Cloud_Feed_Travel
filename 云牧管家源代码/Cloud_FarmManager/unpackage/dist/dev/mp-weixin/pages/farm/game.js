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
          position: { top: "38%", left: "24%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          needsFertilizer: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        },
        {
          id: "plot2",
          position: { top: "38%", right: "24%" },
          status: "empty",
          cropType: "",
          cropImage: "",
          needsWater: false,
          needsFertilizer: false,
          growthStage: 0,
          growthTime: 0,
          harvestTime: null
        },
        {
          id: "plot3",
          position: { top: "50%", left: "24%" },
          status: "growing",
          cropType: "tomato",
          cropImage: "/static/game/farm/faya.png",
          needsWater: true,
          needsFertilizer: true,
          growthStage: 1,
          growthTime: 30,
          harvestTime: null
        },
        {
          id: "plot4",
          position: { top: "50%", right: "24%" },
          status: "ready",
          cropType: "tomato",
          cropImage: "/static/game/farm/a-032-tomato.png",
          needsWater: false,
          needsFertilizer: false,
          growthStage: 3,
          growthTime: 100,
          harvestTime: /* @__PURE__ */ new Date()
        },
        {
          id: "plot5",
          position: { top: "62%", left: "24%" },
          status: "seed",
          cropType: "wheat",
          cropImage: "/static/game/farm/zhongzi.png",
          needsWater: true,
          needsFertilizer: false,
          growthStage: 0,
          growthTime: 10,
          harvestTime: null
        },
        {
          id: "plot6",
          position: { top: "62%", right: "24%" },
          status: "growing",
          cropType: "wheat",
          cropImage: "/static/game/farm/faya.png",
          needsWater: false,
          needsFertilizer: true,
          growthStage: 1,
          growthTime: 20,
          harvestTime: null
        },
        {
          id: "plot7",
          position: { top: "74%", left: "24%" },
          status: "ready",
          cropType: "corn",
          cropImage: "/static/game/farm/a-016-corn.png",
          needsWater: true,
          needsFertilizer: false,
          growthStage: 3,
          growthTime: 100,
          harvestTime: /* @__PURE__ */ new Date()
        },
        {
          id: "plot8",
          position: { top: "74%", right: "24%" },
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
        itemList: ["有机玉米", "有机小麦", "有机番茄"],
        success: (res) => {
          let cropType;
          let cropImage;
          switch (res.tapIndex) {
            case 0:
              cropType = "corn";
              cropImage = "/static/game/farm/a-016-corn.png";
              break;
            case 1:
              cropType = "wheat";
              cropImage = "/static/game/farm/a-058-wheat.png";
              break;
            case 2:
              cropType = "tomato";
              cropImage = "/static/game/farm/a-032-tomato.png";
              break;
          }
          this.farmPlots[plotIndex].status = "seed";
          this.farmPlots[plotIndex].cropType = cropType;
          this.farmPlots[plotIndex].cropImage = cropImage;
          this.farmPlots[plotIndex].needsWater = true;
          this.farmPlots[plotIndex].growthStage = 0;
          this.farmPlots[plotIndex].growthTime = 0;
          common_vendor.index.showToast({
            title: "种植成功",
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
      } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === "seed") {
        this.farmPlots[index].status = "growing";
        this.farmPlots[index].growthStage = 1;
      }
      common_vendor.index.showToast({
        title: "浇水成功",
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
      } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === "seed") {
        this.farmPlots[index].status = "growing";
        this.farmPlots[index].growthStage = 1;
      }
      common_vendor.index.showToast({
        title: "施肥成功",
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
        title: `收获了有机${this.getCropName(cropType)}`,
        icon: "success"
      });
    },
    // 显示作物详情
    showCropDetail(plot) {
      if (plot.status === "empty") {
        common_vendor.index.showToast({
          title: "这块地还没有种植作物",
          icon: "none"
        });
        return;
      }
      const cropName = this.getCropName(plot.cropType);
      const growthStage = this.getGrowthStageName(plot.status);
      const needsWater = plot.needsWater ? "需要浇水" : "水分充足";
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
        return "点击种植农作物";
      } else if (plot.status === "ready") {
        return `有机${this.getCropName(plot.cropType)} - 可以收获`;
      } else if (plot.needsWater) {
        return `有机${this.getCropName(plot.cropType)} - 需要浇水`;
      } else {
        return `有机${this.getCropName(plot.cropType)} - 生长中`;
      }
    },
    // 获取作物名称
    getCropName(cropType) {
      switch (cropType) {
        case "corn":
          return "玉米";
        case "wheat":
          return "小麦";
        case "tomato":
          return "番茄";
        default:
          return "";
      }
    },
    // 获取生长阶段名称
    getGrowthStageName(status) {
      switch (status) {
        case "seed":
          return "种子期";
        case "growing":
          return "生长期";
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
      } : plot.status === "seed" ? {
        d: common_assets._imports_3$6
      } : plot.status === "growing" ? {
        f: common_assets._imports_4$2
      } : plot.status === "ready" ? {
        h: plot.cropImage
      } : {}, {
        c: plot.status === "seed",
        e: plot.status === "growing",
        g: plot.status === "ready",
        i: plot.status !== "empty" && plot.needsWater
      }, plot.status !== "empty" && plot.needsWater ? {
        j: common_assets._imports_2$2
      } : {}, {
        k: plot.status !== "empty" && plot.status !== "seed" && plot.needsFertilizer
      }, plot.status !== "empty" && plot.status !== "seed" && plot.needsFertilizer ? {
        l: common_assets._imports_3$5
      } : {}, {
        m: plot.status === "ready"
      }, plot.status === "ready" ? {
        n: common_assets._imports_4$1
      } : {}, {
        o: common_vendor.t($options.getPlotInfoText(plot)),
        p: index,
        q: plot.status !== "empty" ? 1 : "",
        r: plot.position.top,
        s: plot.position.left,
        t: plot.position.right,
        v: common_vendor.o(($event) => $options.handlePlotClick(index), index)
      });
    }),
    c: common_assets._imports_1$3,
    d: common_assets._imports_5$2,
    e: common_vendor.o((...args) => $options.goBack && $options.goBack(...args)),
    f: common_assets._imports_11,
    g: common_assets._imports_7$2,
    h: common_assets._imports_11,
    i: $data.currentTool === "seed" ? 1 : "",
    j: common_vendor.o(($event) => $options.selectTool("seed")),
    k: common_assets._imports_12,
    l: $data.currentTool === "water" ? 1 : "",
    m: common_vendor.o(($event) => $options.selectTool("water")),
    n: common_assets._imports_10,
    o: $data.currentTool === "fertilizer" ? 1 : "",
    p: common_vendor.o(($event) => $options.selectTool("fertilizer")),
    q: common_assets._imports_11$1,
    r: $data.currentTool === "harvest" ? 1 : "",
    s: common_vendor.o(($event) => $options.selectTool("harvest")),
    t: common_assets._imports_12$1,
    v: common_vendor.o((...args) => $options.openMarket && $options.openMarket(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/game.js.map
