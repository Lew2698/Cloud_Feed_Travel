"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      productId: null,
      traceEvents: [
        {
          date: "2025-03-15 08:30:25",
          title: "完成出栏检测",
          description: "由瑶山生态养殖基地认证兽医完成健康检测，各项指标达标。",
          verified: true,
          data: {
            "体重": "2.3 kg",
            "健康评分": "96/100",
            "检测人": "李医师（证号: YS20250315）"
          }
        },
        {
          date: "2025-02-26 10:15:42",
          title: "完成疫苗接种",
          description: "完成第三次疫苗接种，增强免疫力。",
          verified: true,
          data: {
            "疫苗名称": "家禽流感预防疫苗",
            "批次号": "FLU20250226-07",
            "接种人": "王兽医（证号: YS20210532）"
          }
        },
        {
          date: "2025-01-10 16:22:08",
          title: "饲料更换记录",
          description: "根据生长阶段需求，更换为有机谷物混合饲料。",
          verified: false,
          data: {
            "饲料名称": "有机谷物混合饲料",
            "供应商": "瑶山有机农场",
            "成分": "有机玉米、小麦、大豆（无抗生素）"
          }
        },
        {
          date: "2024-12-05 09:48:36",
          title: "孵化记录",
          description: "家禽育雏中心成功孵化，纳入养殖计划。",
          verified: true,
          data: {
            "品种": "瑶山本地黑羽鸡",
            "批次号": "YS-CHK-2024-12-1257",
            "孵化中心": "瑶山生态家禽孵化中心"
          }
        }
      ]
    };
  },
  onLoad(options) {
    if (options.id) {
      this.productId = options.id;
    }
  },
  methods: {
    // 扫描其他产品
    scanOtherProduct() {
      common_vendor.index.scanCode({
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/shopping/detail/trace.vue:200", "扫描结果：", res);
          common_vendor.index.showToast({
            title: "扫描成功",
            icon: "success"
          });
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "扫描失败",
            icon: "none"
          });
        }
      });
    },
    // 显示筛选选项
    showFilterOptions() {
      common_vendor.index.showActionSheet({
        itemList: ["全部记录", "仅显示已认证", "按时间正序", "按时间倒序"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/shopping/detail/trace.vue:220", "用户选择：", res.tapIndex);
        }
      });
    },
    // 获取溯源数据
    fetchTraceData(productId) {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$9,
    b: common_assets._imports_1$9,
    c: common_assets._imports_5$4,
    d: common_assets._imports_3$7,
    e: common_vendor.o((...args) => $options.scanOtherProduct && $options.scanOtherProduct(...args)),
    f: common_assets._imports_4$1,
    g: common_vendor.o((...args) => $options.showFilterOptions && $options.showFilterOptions(...args)),
    h: common_vendor.f($data.traceEvents, (event, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(event.date),
        b: common_vendor.t(event.title),
        c: event.verified
      }, event.verified ? {
        d: common_assets._imports_5$4
      } : {}, {
        e: common_vendor.t(event.description),
        f: event.data
      }, event.data ? {
        g: common_vendor.f(event.data, (value, key, i) => {
          return {
            a: common_vendor.t(key),
            b: common_vendor.t(value),
            c: i
          };
        })
      } : {}, {
        h: event.verified ? 1 : "",
        i: index
      });
    }),
    i: common_assets._imports_6$2,
    j: common_assets._imports_7$1
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/detail/trace.js.map
