"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        name: "",
        price: 0,
        image: "",
        sales: 0,
        rating: 0,
        badge: ""
      })
    },
    // 是否显示添加到购物车按钮
    showAddToCart: {
      type: Boolean,
      default: true
    }
  },
  emits: ["click", "addToCart"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleProductClick = () => {
      emit("click", props.product.id);
    };
    const handleAddToCart = () => {
      emit("addToCart", props.product.id);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.product.image,
        b: common_vendor.t(__props.product.name),
        c: common_vendor.t(__props.product.price),
        d: common_vendor.t(__props.product.sales),
        e: common_assets._imports_0$1,
        f: common_vendor.t(__props.product.rating),
        g: __props.product.badge
      }, __props.product.badge ? {
        h: common_vendor.t(__props.product.badge)
      } : {}, {
        i: common_assets._imports_1$10,
        j: common_vendor.o(handleAddToCart),
        k: common_vendor.o(handleProductClick)
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ProductCard.js.map
