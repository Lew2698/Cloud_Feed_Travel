"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const products = common_vendor.ref([
      {
        id: 1,
        name: "瑶族野生鸡蛋 500g",
        price: 12,
        image: "/static/static2/hCSyEZ4ptM_small.jpg",
        sales: 586,
        rating: 4.9,
        badge: "热销"
      },
      {
        id: 2,
        name: "香芋 250g",
        price: 6,
        image: "/static/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg",
        sales: 412,
        rating: 4.8,
        badge: ""
      },
      {
        id: 3,
        name: "瑶绣",
        price: 68,
        image: "/static/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg",
        sales: 356,
        rating: 4.7,
        badge: ""
      },
      {
        id: 4,
        name: "马蹄 500g",
        price: 12,
        image: "/static/static2/90 (1).jpg",
        sales: 289,
        rating: 4.9,
        badge: "有机"
      },
      {
        id: 5,
        name: "瑶族传统刺绣手帕",
        price: 58,
        image: "/static/static2/4250555339_919020146.jpg",
        sales: 203,
        rating: 4.6,
        badge: "手工"
      },
      {
        id: 6,
        name: "瑶山野生香菇 200g",
        price: 78,
        image: "/static/static2/3944.jpg_wh860.jpg",
        sales: 178,
        rating: 4.8,
        badge: ""
      }
    ]);
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
        d: common_assets._imports_4$1,
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
        f: common_assets._imports_3$1,
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
