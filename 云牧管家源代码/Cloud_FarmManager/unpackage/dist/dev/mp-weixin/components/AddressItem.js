"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "AddressItem",
  props: {
    address: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        name: "",
        phone: "",
        province: "",
        city: "",
        district: "",
        detail: "",
        isDefault: false
      })
    },
    showActions: {
      type: Boolean,
      default: true
    }
  },
  emits: ["select", "edit", "delete"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleSelect = () => {
      emit("select", props.address);
    };
    const handleEdit = () => {
      emit("edit", props.address);
    };
    const handleDelete = () => {
      emit("delete", props.address);
    };
    const formatPhone = (phone) => {
      if (!phone)
        return "";
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.address.name),
        b: common_vendor.t(formatPhone(__props.address.phone)),
        c: __props.address.isDefault
      }, __props.address.isDefault ? {} : {}, {
        d: common_vendor.t(__props.address.province),
        e: common_vendor.t(__props.address.city),
        f: common_vendor.t(__props.address.district),
        g: common_vendor.t(__props.address.detail),
        h: __props.showActions
      }, __props.showActions ? {
        i: common_assets._imports_0$12,
        j: common_vendor.o(handleEdit),
        k: common_assets._imports_1$13,
        l: common_vendor.o(handleDelete)
      } : {}, {
        m: __props.address.isDefault ? 1 : "",
        n: common_vendor.o(handleSelect)
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/AddressItem.js.map
