"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      growthChartData: {},
      healthChartData: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
        padding: [15, 10, 0, 15],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          data: [{ tofix: 2 }],
          gridType: "dash",
          dashLength: 2
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow"
          }
        }
      },
      dataTabs: [
        {
          id: "chicken",
          name: "瑶山散养鸡 #A5831"
        },
        {
          id: "corn",
          name: "有机玉米"
        }
      ],
      activeTab: "chicken",
      detailData: [
        {
          label: "当前体重",
          value: "1.8kg",
          rate: "5%"
        },
        {
          label: "预计出栏体重",
          value: "2.3kg"
        },
        {
          label: "饲料消耗",
          value: "4.5kg"
        },
        {
          label: "饲料转化率",
          value: "2.5:1"
        },
        {
          label: "日均增重",
          value: "28g",
          rate: "3%"
        },
        {
          label: "健康评分",
          value: "92/100"
        },
        {
          label: "生长周期",
          value: "65天/90天"
        },
        {
          label: "预计收益",
          value: "￥210"
        }
      ]
    };
  },
  onReady() {
    this.initCharts();
    this.getServerData();
  },
  methods: {
    getServerData() {
      setTimeout(() => {
        let grows = {
          categories: ["7月", "8月", "9月", "10月"],
          series: [
            {
              name: "体重",
              data: [2, 2.5, 3.3, 4]
            },
            {
              name: "饲料消耗",
              data: [1, 1.5, 2.3, 3]
            }
          ]
        };
        let healths = {
          categories: ["7月", "8月", "9月", "10月"],
          series: [
            {
              name: "活动指数",
              data: [80, 85, 88, 90]
            },
            {
              name: "健康评分",
              data: [90, 92, 94, 95]
            }
          ]
        };
        this.growthChartData = JSON.parse(JSON.stringify(grows));
        this.healthChartData = JSON.parse(JSON.stringify(healths));
      }, 500);
    },
    initCharts() {
      setTimeout(() => {
        this.drawMockChart("growthChart", [0.5, 0.9, 1.4, 1.8], [1.2, 2.4, 3.6, 4.5]);
        this.drawMockChart("healthChart", [75, 82, 88, 85], [85, 90, 94, 92]);
      }, 300);
    },
    drawMockChart(canvasId, data1, data2) {
      const ctx = common_vendor.index.createCanvasContext(canvasId, this);
      const width = 300;
      const height = 180;
      ctx.clearRect(0, 0, width, height);
      ctx.setStrokeStyle("#f5f5f5");
      ctx.setLineWidth(1);
      for (let i = 0; i < 5; i++) {
        const y = 30 + i * 30;
        ctx.beginPath();
        ctx.moveTo(40, y);
        ctx.lineTo(width - 20, y);
        ctx.stroke();
      }
      const labels = ["7月", "8月", "9月", "10月"];
      ctx.setFillStyle("#777777");
      ctx.setTextAlign("center");
      ctx.setFontSize(10);
      const xStep = (width - 60) / (labels.length - 1);
      for (let i = 0; i < labels.length; i++) {
        ctx.fillText(labels[i], 40 + i * xStep, height - 10);
      }
      this.drawDataLine(ctx, data1, width, height, canvasId === "growthChart" ? "#6a994e" : "#bc4749");
      this.drawDataLine(ctx, data2, width, height, canvasId === "growthChart" ? "#a7c957" : "#386641");
      ctx.draw();
    },
    drawDataLine(ctx, data, width, height, color) {
      const max = Math.max(...data) * 1.2;
      const min = 0;
      const range = max - min;
      const xStep = (width - 60) / (data.length - 1);
      const yScale = 120 / range;
      ctx.beginPath();
      ctx.setStrokeStyle(color);
      ctx.setLineWidth(2);
      for (let i = 0; i < data.length; i++) {
        const x = 40 + i * xStep;
        const y = height - 30 - (data[i] - min) * yScale;
        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      for (let i = 0; i < data.length; i++) {
        const x = 40 + i * xStep;
        const y = height - 30 - (data[i] - min) * yScale;
        ctx.beginPath();
        ctx.setFillStyle(color);
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
};
if (!Array) {
  const _easycom_qiun_data_charts2 = common_vendor.resolveComponent("qiun-data-charts");
  _easycom_qiun_data_charts2();
}
const _easycom_qiun_data_charts = () => "../../uni_modules/qiun-data-charts/components/qiun-data-charts/qiun-data-charts.js";
if (!Math) {
  _easycom_qiun_data_charts();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$5,
    b: common_vendor.f($data.dataTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.activeTab === tab.id ? 1 : "",
        d: common_vendor.o(($event) => $data.activeTab = tab.id, index)
      };
    }),
    c: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.growthChartData
    }),
    d: common_vendor.p({
      type: "line",
      opts: $data.opts,
      chartData: $data.healthChartData
    }),
    e: common_vendor.f($data.detailData, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: item.rate
      }, item.rate ? {
        d: common_vendor.n(item.rate.includes("-") ? "icon-arrow-down" : "icon-arrow-up"),
        e: common_vendor.t(item.rate),
        f: item.rate.includes("-") ? 1 : ""
      } : {}, {
        g: index
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/data.js.map
