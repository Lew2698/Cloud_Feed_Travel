"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "CartItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  emits: ["toggle-select", "decrease-quantity", "increase-quantity", "quantity-change", "remove-item"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const toggleSelect = () => {
      emit("toggle-select", props.index);
    };
    const decreaseQuantity = () => {
      emit("decrease-quantity", props.index);
    };
    const increaseQuantity = () => {
      emit("increase-quantity", props.index);
    };
    const onQuantityInput = (e) => {
      const newQuantity = parseInt(e.detail.value) || 1;
      if (newQuantity !== props.item.quantity) {
        emit("quantity-change", props.index, newQuantity);
      }
    };
    const removeItem = () => {
      emit("remove-item", props.index);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.item.selected
      }, __props.item.selected ? {
        b: common_assets._imports_0$8
      } : {}, {
        c: __props.item.selected ? 1 : "",
        d: common_vendor.o(toggleSelect),
        e: __props.item.image,
        f: __props.item.name,
        g: common_vendor.t(__props.item.name),
        h: common_vendor.t(__props.item.specs),
        i: common_vendor.t(__props.item.price),
        j: common_vendor.o(decreaseQuantity),
        k: __props.item.quantity,
        l: common_vendor.o(onQuantityInput),
        m: common_vendor.o(increaseQuantity),
        n: common_assets._imports_1$12,
        o: common_vendor.o(removeItem)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-29ea5ae9"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/CartItem.js.map
