"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  (AddressItem + CheckoutItem)();
}
const AddressItem = () => "../../../components/AddressItem.js";
const CheckoutItem = () => "../../../components/CheckoutItem.js";
const _sfc_main = {
  __name: "checkout",
  setup(__props) {
    const orderItems = common_vendor.ref([]);
    const selectedAddress = common_vendor.ref({
      id: 1,
      name: "张三",
      phone: "13800138000",
      province: "广东省",
      city: "广州市",
      district: "天河区",
      detail: "瑶山农业科技园区A栋101",
      isDefault: true
    });
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
    const shippingFee = common_vendor.ref(10);
    const discountAmount = common_vendor.ref(5);
    const totalProductPrice = common_vendor.computed(() => {
      return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
    });
    const totalAmount = common_vendor.computed(() => {
      return totalProductPrice.value + shippingFee.value - discountAmount.value;
    });
    common_vendor.onMounted(() => {
      getCartItems();
      getDefaultAddress();
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
        common_vendor.index.__f__("error", "at pages/shopping/checkout/checkout.vue:177", "获取结算商品失败:", error);
        common_vendor.index.showToast({
          title: "获取商品信息失败",
          icon: "none"
        });
      }
    };
    const getDefaultAddress = () => {
      common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:188", "获取默认地址");
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
    const submitOrder = () => {
      if (!selectedAddress.value.id) {
        common_vendor.index.showToast({
          title: "请选择收货地址",
          icon: "none"
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
        discountAmount: discountAmount.value
      };
      common_vendor.index.__f__("log", "at pages/shopping/checkout/checkout.vue:238", "提交订单:", orderData);
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.removeStorageSync("checkout_items");
        common_vendor.index.showToast({
          title: "订单提交成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/order/detail/detail?orderId=123456"
          });
        }, 1500);
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$8,
        b: common_vendor.o(goBack),
        c: selectedAddress.value.id
      }, selectedAddress.value.id ? {
        d: common_vendor.p({
          address: selectedAddress.value,
          showActions: false
        })
      } : {
        e: common_assets._imports_3$8
      }, {
        f: common_vendor.o(navigateToAddress),
        g: common_vendor.f(orderItems.value, (item, index, i0) => {
          return {
            a: index,
            b: "b56a58da-1-" + i0,
            c: common_vendor.p({
              item
            })
          };
        }),
        h: common_vendor.t(totalProductPrice.value.toFixed(2)),
        i: common_vendor.t(shippingFee.value.toFixed(2)),
        j: common_vendor.t(discountAmount.value.toFixed(2)),
        k: common_vendor.t(totalAmount.value.toFixed(2)),
        l: common_vendor.f(paymentMethods.value, (method, index, i0) => {
          return {
            a: method.icon,
            b: common_vendor.t(method.name),
            c: method.id,
            d: method.id === selectedPayment.value,
            e: index
          };
        }),
        m: common_vendor.o(onPaymentChange),
        n: orderRemark.value,
        o: common_vendor.o(($event) => orderRemark.value = $event.detail.value),
        p: common_vendor.t(orderRemark.value.length),
        q: common_vendor.t(totalAmount.value.toFixed(2)),
        r: common_vendor.o(submitOrder)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/checkout/checkout.js.map
