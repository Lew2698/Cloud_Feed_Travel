"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  CartItem();
}
const CartItem = () => "../../../components/CartItem.js";
const _sfc_main = {
  __name: "cart",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const cartItems = common_vendor.ref([]);
    const discount = common_vendor.ref(3);
    const recommendItems = common_vendor.ref([
      {
        id: 4,
        name: "瑶山野生香菇",
        price: 78,
        image: "/static/static2/3944.jpg_wh860.jpg"
      },
      {
        id: 5,
        name: "瑶山古法山茶油",
        price: 188,
        image: "/static/static2/v2-a582c6ef03ee0473ff546458328c18b6_720w.png"
      },
      {
        id: 6,
        name: "瑶山有机稻米",
        price: 128,
        image: "/static/static2/photo-1515339760107-1952b7a08454.avif"
      }
    ]);
    const selectedCount = common_vendor.computed(() => {
      return cartItems.value.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
    });
    const totalPrice = common_vendor.computed(() => {
      return cartItems.value.filter((item) => item.selected).reduce((total, item) => total + item.price * item.quantity, 0);
    });
    const isAllSelected = common_vendor.computed(() => {
      return cartItems.value.length > 0 && cartItems.value.every((item) => item.selected);
    });
    const loadCartData = async () => {
      const newCartItems = proxy.$cartStore.getCartItems();
      cartItems.value = JSON.parse(JSON.stringify(newCartItems));
      await common_vendor.nextTick$1();
    };
    const handleCartUpdate = async () => {
      await loadCartData();
    };
    const toggleItemSelect = async (index) => {
      proxy.$cartStore.toggleItemSelect(index);
      await loadCartData();
    };
    const toggleSelectAll = async () => {
      proxy.$cartStore.toggleSelectAll();
      await loadCartData();
    };
    const decreaseQuantity = async (index) => {
      const item = cartItems.value[index];
      if (item.quantity > 1) {
        proxy.$cartStore.updateQuantity(index, item.quantity - 1);
        await loadCartData();
      } else {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要移除该商品吗？",
          success: async (res) => {
            if (res.confirm) {
              await removeItem(index);
            }
          }
        });
      }
    };
    const increaseQuantity = async (index) => {
      const item = cartItems.value[index];
      proxy.$cartStore.updateQuantity(index, item.quantity + 1);
      await loadCartData();
    };
    const onQuantityChange = async (index, newQuantity) => {
      if (newQuantity > 0) {
        proxy.$cartStore.updateQuantity(index, newQuantity);
        await loadCartData();
      } else {
        await removeItem(index);
      }
    };
    const removeItem = async (index) => {
      return new Promise((resolve) => {
        common_vendor.index.showModal({
          title: "提示",
          content: "确定要移除该商品吗？",
          success: async (res) => {
            if (res.confirm) {
              proxy.$cartStore.removeItem(index);
              await loadCartData();
            }
            resolve();
          }
        });
      });
    };
    const addToCartFromRecommend = async (item) => {
      const success = proxy.$cartStore.addToCart(item, 1);
      if (success) {
        await loadCartData();
        common_vendor.index.showToast({
          title: "已加入购物车",
          icon: "success"
        });
      }
    };
    const goShopping = () => {
      common_vendor.index.switchTab({
        url: "/pages/shopping/shopping"
      });
    };
    const checkout = () => {
      if (selectedCount.value === 0) {
        common_vendor.index.showToast({
          title: "请选择商品",
          icon: "none"
        });
        return;
      }
      const selectedItems = proxy.$cartStore.getSelectedItems();
      common_vendor.index.setStorageSync("checkout_items", selectedItems);
      common_vendor.index.navigateTo({
        url: "/pages/shopping/checkout/checkout"
      });
    };
    common_vendor.onMounted(async () => {
      await loadCartData();
      common_vendor.index.$on("cartUpdated", handleCartUpdate);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("cartUpdated", handleCartUpdate);
    });
    common_vendor.onShow(async () => {
      await loadCartData();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$8,
        b: common_assets._imports_2$6,
        c: cartItems.value.length > 0
      }, cartItems.value.length > 0 ? {
        d: common_assets._imports_2$6,
        e: common_vendor.t(cartItems.value.length),
        f: common_vendor.f(cartItems.value, (item, index, i0) => {
          return {
            a: item.id + "_" + index,
            b: common_vendor.o(toggleItemSelect, item.id + "_" + index),
            c: common_vendor.o(decreaseQuantity, item.id + "_" + index),
            d: common_vendor.o(increaseQuantity, item.id + "_" + index),
            e: common_vendor.o(onQuantityChange, item.id + "_" + index),
            f: common_vendor.o(removeItem, item.id + "_" + index),
            g: "3227d75a-0-" + i0,
            h: common_vendor.p({
              item,
              index
            })
          };
        }),
        g: common_vendor.f(recommendItems.value, (item, index, i0) => {
          return {
            a: item.image,
            b: item.name,
            c: common_vendor.t(item.name),
            d: common_vendor.t(item.price),
            e: index,
            f: common_vendor.o(($event) => addToCartFromRecommend(item), index)
          };
        })
      } : {}, {
        h: cartItems.value.length === 0
      }, cartItems.value.length === 0 ? {
        i: common_vendor.o(goShopping)
      } : {}, {
        j: cartItems.value.length > 0
      }, cartItems.value.length > 0 ? common_vendor.e({
        k: isAllSelected.value
      }, isAllSelected.value ? {
        l: common_assets._imports_0$7
      } : {}, {
        m: isAllSelected.value ? 1 : "",
        n: common_vendor.o(toggleSelectAll),
        o: common_vendor.t(totalPrice.value),
        p: common_vendor.t(totalPrice.value),
        q: common_vendor.t(discount.value),
        r: common_vendor.t(selectedCount.value),
        s: common_vendor.o(checkout)
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/cart/cart.js.map
