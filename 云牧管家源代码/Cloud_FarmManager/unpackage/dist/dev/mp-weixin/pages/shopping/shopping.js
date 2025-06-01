"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const data_products = require("../../data/products.js");
if (!Array) {
  const _component_tab_bar = common_vendor.resolveComponent("tab-bar");
  _component_tab_bar();
}
if (!Math) {
  (SearchInputVue + ProductCardVue)();
}
const SearchInputVue = () => "../../components/SearchInput.js";
const ProductCardVue = () => "../../components/ProductCard.js";
const _sfc_main = {
  __name: "shopping",
  setup(__props) {
    const { proxy } = common_vendor.getCurrentInstance();
    const cartTotalCount = common_vendor.ref(0);
    const products = common_vendor.ref(data_products.getAllProducts());
    common_vendor.onMounted(() => {
      updateCartCount();
      common_vendor.index.$on("cartUpdated", handleCartUpdate);
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("cartUpdated", handleCartUpdate);
    });
    const handleCartUpdate = (cartData) => {
      cartTotalCount.value = cartData.totalCount;
    };
    const updateCartCount = () => {
      cartTotalCount.value = proxy.$cartStore.getTotalCount();
    };
    const goToProductDetail = (productId) => {
      common_vendor.index.navigateTo({
        url: `/pages/shopping/detail/detail?id=${productId}`
      });
    };
    const addToCart = (productId) => {
      const product = products.value.find((p) => p.id === productId);
      if (product) {
        const success = proxy.$cartStore.addToCart(product, 1);
        if (success) {
          common_vendor.index.showToast({
            title: "已加入购物车",
            icon: "success"
          });
        }
      }
    };
    const goToCart = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/cart/cart"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          placeholderText: "搜索农产品,瑶族特产"
        }),
        b: common_assets._imports_1$1,
        c: common_assets._imports_1$1,
        d: common_assets._imports_3$1,
        e: common_vendor.f(products.value, (product, k0, i0) => {
          return {
            a: product.id,
            b: common_vendor.o(goToProductDetail, product.id),
            c: common_vendor.o(addToCart, product.id),
            d: "0e423c18-1-" + i0,
            e: common_vendor.p({
              product
            })
          };
        }),
        f: common_assets._imports_3$2,
        g: cartTotalCount.value > 0
      }, cartTotalCount.value > 0 ? {
        h: common_vendor.t(cartTotalCount.value)
      } : {}, {
        i: common_vendor.o(($event) => goToCart()),
        j: common_vendor.p({
          active: "shopping"
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/shopping/shopping.js.map
