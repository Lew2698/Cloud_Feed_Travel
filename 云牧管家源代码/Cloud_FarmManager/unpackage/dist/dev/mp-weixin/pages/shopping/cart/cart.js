"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      cartItems: [
        {
          id: 1,
          name: "瑶族野生鸡蛋",
          specs: "500g",
          price: 12,
          quantity: 1,
          selected: true,
          image: "/static2/hCSyEZ4ptM_small.jpg"
        },
        {
          id: 2,
          name: "香芋",
          specs: "500g",
          price: 12,
          quantity: 2,
          selected: true,
          image: "/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg"
        },
        {
          id: 3,
          name: "瑶绣",
          specs: "单个装",
          price: 68,
          quantity: 1,
          selected: true,
          image: "/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg"
        }
      ],
      recommendItems: [
        {
          id: 4,
          name: "瑶山野生香菇",
          price: 78,
          image: "/static2/3944.jpg_wh860.jpg"
        },
        {
          id: 5,
          name: "瑶山古法山茶油",
          price: 188,
          image: "/static2/v2-a582c6ef03ee0473ff546458328c18b6_720w.png"
        },
        {
          id: 6,
          name: "瑶山有机稻米",
          price: 128,
          image: "/static2/photo-1515339760107-1952b7a08454.avif"
        }
      ],
      discount: 3
    };
  },
  computed: {
    // 计算选中的商品数量
    selectedCount() {
      return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
    },
    // 计算总价
    totalPrice() {
      return this.cartItems.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
    },
    // 是否全选
    isAllSelected() {
      return this.cartItems.length > 0 && this.cartItems.every((item) => item.selected);
    }
  },
  methods: {
    // 切换商品选中状态
    toggleItemSelect(index) {
      this.cartItems[index].selected = !this.cartItems[index].selected;
    },
    // 切换全选
    toggleSelectAll() {
      const newStatus = !this.isAllSelected;
      this.cartItems.forEach((item) => {
        item.selected = newStatus;
      });
    },
    // 减少商品数量
    decreaseQuantity(index) {
      if (this.cartItems[index].quantity > 1) {
        this.cartItems[index].quantity--;
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要移除该商品吗？",
          success: (res) => {
            if (res.confirm) {
              this.removeItem(index);
            }
          }
        });
      }
    },
    // 增加商品数量
    increaseQuantity(index) {
      this.cartItems[index].quantity++;
    },
    // 移除商品
    removeItem(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要移除该商品吗？",
        success: (res) => {
          if (res.confirm) {
            this.cartItems.splice(index, 1);
          }
        }
      });
    },
    // 从推荐添加商品
    addToCartFromRecommend(item) {
      const existingItemIndex = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
      if (existingItemIndex !== -1) {
        this.cartItems[existingItemIndex].quantity++;
      } else {
        this.cartItems.push({
          id: item.id,
          name: item.name,
          specs: "默认规格",
          price: item.price,
          quantity: 1,
          selected: true,
          image: item.image
        });
      }
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    },
    // 跳转到商城页面
    goShopping() {
      common_vendor.index.switchTab({
        url: "/pages/shopping/shopping"
      });
    },
    // 结算
    checkout() {
      if (this.selectedCount === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      this.cartItems.filter((item) => item.selected);
      common_vendor.index.navigateTo({
        url: "/pages/shopping/order/confirm"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$5,
    b: common_assets._imports_2$5,
    c: $data.cartItems.length > 0
  }, $data.cartItems.length > 0 ? {
    d: common_assets._imports_2$5,
    e: common_vendor.t($data.cartItems.length),
    f: common_vendor.f($data.cartItems, (item, index, i0) => {
      return common_vendor.e({
        a: item.selected
      }, item.selected ? {
        b: common_assets._imports_5$3
      } : {}, {
        c: item.selected ? 1 : "",
        d: common_vendor.o(($event) => $options.toggleItemSelect(index), index),
        e: item.image,
        f: item.name,
        g: common_vendor.t(item.name),
        h: common_vendor.t(item.specs),
        i: common_vendor.t(item.price),
        j: common_vendor.o(($event) => $options.decreaseQuantity(index), index),
        k: item.quantity,
        l: common_vendor.o(($event) => item.quantity = $event.detail.value, index),
        m: common_vendor.o(($event) => $options.increaseQuantity(index), index),
        n: common_vendor.o(($event) => $options.removeItem(index), index),
        o: index
      });
    }),
    g: common_assets._imports_4$4,
    h: common_vendor.f($data.recommendItems, (item, index, i0) => {
      return {
        a: item.image,
        b: item.name,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.price),
        e: index,
        f: common_vendor.o(($event) => $options.addToCartFromRecommend(item), index)
      };
    })
  } : {}, {
    i: $data.cartItems.length === 0
  }, $data.cartItems.length === 0 ? {
    j: common_vendor.o((...args) => $options.goShopping && $options.goShopping(...args))
  } : {}, {
    k: $data.cartItems.length > 0
  }, $data.cartItems.length > 0 ? common_vendor.e({
    l: $options.isAllSelected
  }, $options.isAllSelected ? {
    m: common_assets._imports_5$3
  } : {}, {
    n: $options.isAllSelected ? 1 : "",
    o: common_vendor.o((...args) => $options.toggleSelectAll && $options.toggleSelectAll(...args)),
    p: common_vendor.t($options.totalPrice),
    q: common_vendor.t($options.totalPrice),
    r: common_vendor.t($data.discount),
    s: common_vendor.t($options.selectedCount),
    t: common_vendor.o((...args) => $options.checkout && $options.checkout(...args))
  }) : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/cart/cart.js.map
