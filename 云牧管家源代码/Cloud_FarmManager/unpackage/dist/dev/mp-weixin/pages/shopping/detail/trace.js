"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_productService = require("../../../api/productService.js");
const _sfc_main = {
  __name: "trace",
  setup(__props) {
    const productId = common_vendor.ref(null);
    const loading = common_vendor.ref(true);
    const traceInfo = common_vendor.ref({
      productName: "",
      productImage: "",
      traceId: "",
      blockHeight: "",
      chainTime: "",
      hashValue: "",
      events: []
    });
    const traceEvents = common_vendor.computed(() => {
      return traceInfo.value.events || [];
    });
    common_vendor.onLoad((options) => {
      if (options.id) {
        productId.value = options.id;
        loadTraceData();
      }
    });
    const loadTraceData = async () => {
      try {
        loading.value = true;
        const productData = await api_productService.getProductById(productId.value);
        if (productData && productData.traceInfo) {
          traceInfo.value = productData.traceInfo;
        } else {
          common_vendor.index.showToast({
            title: "溯源信息不存在",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/detail/trace.vue:184", "加载溯源数据失败:", error);
        common_vendor.index.showToast({
          title: "加载溯源失败",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } finally {
        loading.value = false;
      }
    };
    const scanOtherProduct = () => {
      common_vendor.index.scanCode({
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/shopping/detail/trace.vue:202", "扫描结果：", res);
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
    };
    const showFilterOptions = () => {
      common_vendor.index.showActionSheet({
        itemList: ["全部记录", "仅显示已认证", "按时间正序", "按时间倒序"],
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/shopping/detail/trace.vue:223", "用户选择：", res.tapIndex);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$10,
        b: traceInfo.value.productImage,
        c: common_vendor.t(traceInfo.value.productName),
        d: common_assets._imports_4$4,
        e: common_vendor.t(traceInfo.value.traceId),
        f: common_vendor.t(traceInfo.value.blockHeight),
        g: common_vendor.t(traceInfo.value.chainTime),
        h: common_vendor.t(traceInfo.value.hashValue),
        i: common_assets._imports_2$7,
        j: common_vendor.o(scanOtherProduct),
        k: common_assets._imports_3$2,
        l: common_vendor.o(showFilterOptions),
        m: common_vendor.f(traceEvents.value, (event, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(event.date),
            b: common_vendor.t(event.title),
            c: event.verified
          }, event.verified ? {
            d: common_assets._imports_4$4
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
        n: common_assets._imports_5$4,
        o: common_assets._imports_6$1
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/detail/trace.js.map
