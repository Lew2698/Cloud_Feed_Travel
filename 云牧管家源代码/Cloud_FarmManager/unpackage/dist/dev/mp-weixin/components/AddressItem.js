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
        _id: "",
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
  emits: ["select", "edit", "delete", "setDefault"],
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
    const handleSetDefault = () => {
      emit("setDefault", props.address);
    };
    const formatPhone = (phone) => {
      if (!phone)
        return "";
      return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    };
    const formatAddress = (address) => {
      if (!address)
        return "";
      const parts = [];
      if (address.province)
        parts.push(address.province);
      if (address.city && address.city !== address.province)
        parts.push(address.city);
      if (address.district && address.district !== address.city)
        parts.push(address.district);
      if (address.detail)
        parts.push(address.detail);
      return parts.join(" ");
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(__props.address.name),
        b: common_vendor.t(formatPhone(__props.address.phone)),
        c: __props.address.isDefault
      }, __props.address.isDefault ? {} : {}, {
        d: common_vendor.t(formatAddress(__props.address)),
        e: __props.showActions
      }, __props.showActions ? common_vendor.e({
        f: !__props.address.isDefault
      }, !__props.address.isDefault ? {
        g: common_assets._imports_0$1,
        h: common_vendor.o(handleSetDefault)
      } : {}, {
        i: common_assets._imports_1$13,
        j: common_vendor.o(handleEdit),
        k: common_assets._imports_2$9,
        l: common_vendor.o(handleDelete)
      }) : {}, {
        m: __props.address.isDefault ? 1 : "",
        n: common_vendor.o(handleSelect)
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/AddressItem.js.map
