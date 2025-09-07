"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activeTab: "poultry",
      poultryTypes: ["全部", "散养鸡", "肉鸭", "土鹅", "土猪", "黑山羊"],
      cropTypes: ["全部", "有机大米", "时令蔬菜", "特色水果", "药材", "坚果"],
      activePType: "全部",
      activeCType: "全部",
      poultryProducts: [
        {
          id: "p1",
          name: "瑶山散养鸡",
          desc: "高山散养，纯粮喂食",
          price: "188/只",
          image: "/static/static2/3545.jpg_wh860.jpg",
          type: "散养鸡",
          isPopular: true
        },
        {
          id: "p2",
          name: "瑶山黑猪",
          desc: "散养山黑猪，肉质鲜美",
          price: "1288/只",
          image: "/static/static2/1529152636_835789403.jpg",
          type: "土猪"
        },
        {
          id: "p3",
          name: "瑶山肉鸭",
          desc: "水稻田放养，生态健康",
          price: "128/只",
          image: "/static/static2/jB0XxdPkTO.jpg",
          type: "肉鸭"
        },
        {
          id: "p4",
          name: "瑶山土鹅",
          desc: "湖边放养，肉质细嫩",
          price: "258/只",
          image: "/static/static2/23674369667344d4b28456a20e2c41ab_th.jpg",
          type: "土鹅"
        },
        {
          id: "p5",
          name: "瑶山山羊",
          desc: "山地放养，肉质鲜美",
          price: "888/只",
          image: "/static/static2/6367.jpg_wh300.jpg",
          type: "山羊"
        },
        {
          id: "p6",
          name: "瑶山黄牛",
          desc: "药材喂养，滋补养生",
          price: "2288/只",
          image: "/static/static2/12f4-fc24c76b7905f3767d147f7917580a69.jpg",
          type: "其他"
        }
      ],
      cropProducts: [
        {
          id: "c1",
          name: "有机稻米",
          desc: "无农药种植，生态健康",
          price: "158/袋",
          image: "/static/static2/t04154e11dec4b5a97b.jpg",
          type: "有机大米",
          isPopular: true
        },
        {
          id: "c2",
          name: "有机蔬菜",
          desc: "当季新鲜，绿色种植",
          price: "188/箱",
          image: "/static/static2/t011ed712751467b01c.jpg",
          type: "时令蔬菜"
        }
      ]
    };
  },
  computed: {
    activeProducts() {
      if (this.activeTab === "poultry") {
        if (this.activePType === "全部") {
          return this.poultryProducts;
        } else {
          return this.poultryProducts.filter((item) => item.type === this.activePType);
        }
      } else {
        if (this.activeCType === "全部") {
          return this.cropProducts;
        } else {
          return this.cropProducts.filter((item) => item.type === this.activeCType);
        }
      }
    }
  },
  methods: {
    claimProduct(product) {
      common_vendor.index.showModal({
        title: "认领确认",
        content: `确认认领 ${product.name}，价格：¥${product.price}？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "认领成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.navigateTo({
                url: "/pages/farm/my"
              });
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
    b: $data.activeTab === "poultry" ? 1 : "",
    c: common_vendor.o(($event) => $data.activeTab = "poultry"),
    d: $data.activeTab === "crops" ? 1 : "",
    e: common_vendor.o(($event) => $data.activeTab = "crops"),
    f: $data.activeTab === "poultry"
  }, $data.activeTab === "poultry" ? {
    g: common_vendor.f($data.poultryTypes, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: $data.activePType === item ? 1 : "",
        d: common_vendor.o(($event) => $data.activePType = item, index)
      };
    })
  } : {}, {
    h: $data.activeTab === "crops"
  }, $data.activeTab === "crops" ? {
    i: common_vendor.f($data.cropTypes, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: $data.activeCType === item ? 1 : "",
        d: common_vendor.o(($event) => $data.activeCType = item, index)
      };
    })
  } : {}, {
    j: common_vendor.f($options.activeProducts, (item, index, i0) => {
      return common_vendor.e({
        a: item.isPopular
      }, item.isPopular ? {} : {}, {
        b: item.image,
        c: item.name,
        d: common_vendor.t(item.name),
        e: common_vendor.t(item.desc),
        f: common_vendor.t(item.price),
        g: common_vendor.o(($event) => $options.claimProduct(item), index),
        h: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/farm/new.js.map
