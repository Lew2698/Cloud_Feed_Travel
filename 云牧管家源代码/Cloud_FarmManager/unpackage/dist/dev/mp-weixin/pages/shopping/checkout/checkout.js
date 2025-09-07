"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const stores_cart = require("../../../stores/cart.js");
const api_addressService = require("../../../api/addressService.js");
if (!Math) {
  (AddressItem + CheckoutItem)();
}
const AddressItem = () => "../../../components/AddressItem.js";
const CheckoutItem = () => "../../../components/CheckoutItem.js";
const _sfc_main = {
  __name: "checkout",
  setup(__props) {
    const cartStore = stores_cart.useCartStore();
    const orderItems = common_vendor.ref([]);
    const selectedAddress = common_vendor.ref(null);
    const addressLoading = common_vendor.ref(false);
    const paymentMethods = common_vendor.ref([
      {
        id: "wxpay",
        name: "微信支付",
        icon: "/static/icons/shopping icon/wechat-pay.svg"
      },
      {
        id: "alipay",
        name: "支付宝",
        icon: "/static/icons/shopping icon/alipay.svg"
      }
    ]);
    const selectedPayment = common_vendor.ref("wxpay");
    const orderRemark = common_vendor.ref("");
    const submitting = common_vendor.ref(false);
    const shippingFee = common_vendor.ref(10);
    const discountAmount = common_vendor.ref(5);
    const totalProductPrice = common_vendor.computed(() => {
      return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
    const totalAmount = common_vendor.computed(() => {
      return totalProductPrice.value + shippingFee.value - discountAmount.value;
    });
    const handleAddressSelected = (address) => {
      selectedAddress.value = address;
      common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:151", "地址已选择:", address);
    };
    common_vendor.onMounted(() => {
      getCartItems();
      loadDefaultAddress();
      common_vendor.index.$on("addressSelected", handleAddressSelected);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("addressSelected", handleAddressSelected);
    });
    const getCartItems = () => {
      try {
        const checkoutItems = common_vendor.index.getStorageSync("checkout_items");
        if (checkoutItems && checkoutItems.length > 0) {
          orderItems.value = checkoutItems.map((item) => ({
            id: item.id,
            name: item.name,
            spec: item.specs || "默认规格",
            price: item.price,
            quantity: item.quantity,
            image: item.image
          }));
        } else {
          common_vendor.index.showToast({
            title: "请先选择商品",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/checkout.vue:195", "获取结算商品失败:", error);
        common_vendor.index.showToast({
          title: "获取商品信息失败",
          icon: "none"
        });
      }
    };
    const loadDefaultAddress = async () => {
      addressLoading.value = true;
      try {
        const result = await api_addressService.getDefaultAddress();
        if (result.code === 200 && result.data) {
          selectedAddress.value = result.data;
          common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:211", "默认地址已加载:", result.data);
        } else if (result.code === 401) {
          common_vendor.index.showModal({
            title: "提示",
            content: "请先登录后再进行结算",
            confirmText: "去登录",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
              } else {
                common_vendor.index.navigateBack();
              }
            }
          });
        } else {
          common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:230", "暂无默认地址");
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/checkout.vue:233", "获取默认地址失败:", error);
        common_vendor.index.showToast({
          title: "获取地址失败",
          icon: "none"
        });
      } finally {
        addressLoading.value = false;
      }
    };
    const navigateToAddress = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/checkout/address"
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const onPaymentChange = (e) => {
      selectedPayment.value = e.detail.value;
    };
    const submitOrder = async () => {
      if (!selectedAddress.value || !selectedAddress.value._id) {
        common_vendor.index.showModal({
          title: "提示",
          content: "请选择收货地址",
          confirmText: "去选择",
          success: (res) => {
            if (res.confirm) {
              navigateToAddress();
            }
          }
        });
        return;
      }
      if (orderItems.value.length === 0) {
        common_vendor.index.showToast({
          title: "购物车为空",
          icon: "none"
        });
        return;
      }
      const orderData = {
        items: orderItems.value,
        address: selectedAddress.value,
        payment: selectedPayment.value,
        remark: orderRemark.value,
        totalAmount: totalAmount.value,
        shippingFee: shippingFee.value,
        discountAmount: discountAmount.value,
        createTime: (/* @__PURE__ */ new Date()).toISOString()
      };
      common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:297", "提交订单:", orderData);
      submitting.value = true;
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      try {
        await new Promise((resolve) => setTimeout(resolve, 2e3));
        const cartItems = cartStore.cartItems;
        orderItems.value.forEach((orderItem) => {
          const cartIndex = cartItems.findIndex(
            (cartItem) => cartItem.id === orderItem.id && cartItem.selected
          );
          if (cartIndex !== -1) {
            cartStore.removeItem(cartIndex);
          }
        });
        common_vendor.index.removeStorageSync("checkout_items");
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "订单提交成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/order/detail/detail?orderId=123456"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/checkout.vue:340", "提交订单失败:", error);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "提交失败，请重试",
          icon: "error"
        });
      } finally {
        submitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$9,
        b: common_vendor.o(goBack),
        c: selectedAddress.value && selectedAddress.value._id
      }, selectedAddress.value && selectedAddress.value._id ? {
        d: common_vendor.p({
          address: selectedAddress.value,
          showActions: false
        })
      } : {
        e: common_assets._imports_1$9,
        f: common_assets._imports_3$8
      }, {
        g: common_vendor.o(navigateToAddress),
        h: common_vendor.f(orderItems.value, (item, index, i0) => {
          return {
            a: index,
            b: "f08faf66-1-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        i: common_vendor.t(totalProductPrice.value.toFixed(2)),
        j: common_vendor.t(shippingFee.value.toFixed(2)),
        k: common_vendor.t(discountAmount.value.toFixed(2)),
        l: common_vendor.t(totalAmount.value.toFixed(2)),
        m: common_vendor.f(paymentMethods.value, (method, index, i0) => {
          return {
            a: method.icon,
            b: common_vendor.t(method.name),
            c: method.id,
            d: method.id === selectedPayment.value,
            e: index
          };
        }),
        n: common_vendor.o(onPaymentChange),
        o: orderRemark.value,
        p: common_vendor.o(($event) => orderRemark.value = $event.detail.value),
        q: common_vendor.t(orderRemark.value.length),
        r: common_vendor.t(totalAmount.value.toFixed(2)),
        s: common_vendor.t(submitting.value ? "提交中..." : "提交订单"),
        t: common_vendor.o(submitOrder),
        v: submitting.value
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/checkout/checkout.js.map
