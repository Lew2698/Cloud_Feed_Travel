"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  __name: "CheckoutItem",
  props: {
    item: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        name: "",
        spec: "",
        price: 0,
        quantity: 1,
        image: ""
      })
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: __props.item.image,
        b: common_vendor.t(__props.item.name),
        c: common_vendor.t(__props.item.spec),
        d: common_vendor.t(__props.item.price),
        e: common_vendor.t(__props.item.quantity)
      };
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/CheckoutItem.js.map
