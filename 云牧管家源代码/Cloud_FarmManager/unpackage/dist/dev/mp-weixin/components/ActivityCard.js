"use strict";
const common_vendor = require("../common/vendor.js");
const common_assets = require("../common/assets.js");
const _sfc_main = {
  __name: "ActivityCard",
  props: {
    activity: {
      type: Object,
      required: true,
      default: () => ({
        id: 0,
        title: "",
        date: "",
        location: "",
        description: "",
        price: 0,
        image: "",
        badge: "",
        tags: [],
        category: ""
      })
    }
  },
  emits: ["signup"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const handleSignup = () => {
      emit("signup", props.activity);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.activity.badge
      }, __props.activity.badge ? {
        b: common_vendor.t(__props.activity.badge)
      } : {}, {
        c: __props.activity.image,
        d: __props.activity.title,
        e: common_vendor.t(__props.activity.title),
        f: common_assets._imports_0$12,
        g: common_vendor.t(__props.activity.date),
        h: common_assets._imports_1$7,
        i: common_vendor.t(__props.activity.location),
        j: common_vendor.t(__props.activity.description),
        k: common_vendor.f(__props.activity.tags, (tag, tagIndex, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        l: common_vendor.t(__props.activity.price),
        m: common_vendor.o(handleSignup)
      });
    };
  }
};
wx.createComponent(_sfc_main);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/ActivityCard.js.map
