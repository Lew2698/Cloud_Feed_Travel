"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const stores_cart = require("../../../stores/cart.js");
const api_productService = require("../../../api/productService.js");
const _sfc_main = {
  __name: "detail",
  setup(__props) {
    const cartStore = stores_cart.useCartStore();
    const productId = common_vendor.ref(null);
    const indicatorActiveColor = common_vendor.ref("#FFFFFF");
    const indicatorColor = common_vendor.ref("rgba(255, 255, 255, 0.5)");
    const currentTab = common_vendor.ref("intro");
    const detailTabs = common_vendor.ref([
      { id: "intro", name: "商品详情" },
      { id: "specs", name: "规格参数" },
      { id: "reviews", name: "用户评价" }
    ]);
    const isFavorite = common_vendor.ref(false);
    const cartCount = common_vendor.ref(0);
    const loading = common_vendor.ref(true);
    const product = common_vendor.ref({
      id: 0,
      name: "",
      slogan: "",
      price: "0",
      originalPrice: "",
      isNew: false,
      isOrganic: false,
      rating: "0",
      sales: "0",
      favorableRate: 0,
      images: [],
      description: [],
      farmId: 0,
      farmName: "",
      farmLogo: "",
      farmLocation: "",
      specs: [],
      detailImages: [],
      comments: []
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/shopping/detail/detail.vue:211", "onLoad options:", options);
      if (options.id) {
        productId.value = options.id;
        common_vendor.index.__f__("log", "at pages/shopping/detail/detail.vue:214", "productId.value:", productId.value);
        loadProductDetail();
      }
    });
    common_vendor.onMounted(() => {
      updateCartCount();
    });
    const loadProductDetail = async () => {
      try {
        loading.value = true;
        const productData = await api_productService.getProductById(productId.value);
        if (productData) {
          product.value = productData;
        } else {
          common_vendor.index.showToast({
            title: "商品不存在",
            icon: "none"
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 1500);
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/detail/detail.vue:241", "加载商品详情失败:", error);
        common_vendor.index.showToast({
          title: "加载商品失败",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } finally {
        loading.value = false;
      }
    };
    const updateCartCount = () => {
      cartCount.value = cartStore.getTotalCount();
    };
    const onSwiperChange = (e) => {
      const current = e.detail.current;
      common_vendor.index.__f__("log", "at pages/shopping/detail/detail.vue:262", "当前索引:", current);
    };
    const toggleFavorite = () => {
      isFavorite.value = !isFavorite.value;
      if (isFavorite.value) {
        common_vendor.index.showToast({
          title: "已加入收藏",
          icon: "success"
        });
      } else {
        common_vendor.index.showToast({
          title: "已取消收藏",
          icon: "none"
        });
      }
    };
    const addToCart = () => {
      const success = cartStore.addToCart(product.value, 1);
      if (success) {
        updateCartCount();
        common_vendor.index.showToast({
          title: "已加入购物车",
          icon: "success"
        });
      }
    };
    const buyNow = () => {
      common_vendor.index.navigateTo({
        url: `/pages/shopping/order/confirm?productId=${product.value.id}&quantity=1`
      });
    };
    const shareProduct = () => {
      common_vendor.index.showActionSheet({
        itemList: ["分享给朋友", "分享到朋友圈", "复制链接"],
        success: (res) => {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success"
          });
        }
      });
    };
    const previewImage = (index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: product.value.detailImages
      });
    };
    const previewCommentImage = (images, index) => {
      common_vendor.index.previewImage({
        current: index,
        urls: images
      });
    };
    const navigateToTrace = () => {
      common_vendor.index.navigateTo({
        url: `/pages/shopping/detail/trace?id=${productId.value}`
      });
    };
    const navigateToFarm = () => {
      common_vendor.index.navigateTo({
        url: `/pages/shopping/detail/farm?id=${product.value.farmId}`
      });
    };
    const navigateToCart = () => {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/cart/cart"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$7,
        b: common_assets._imports_1$8,
        c: common_vendor.o(shareProduct),
        d: common_vendor.f(product.value.images, (image, index, i0) => {
          return {
            a: image,
            b: index
          };
        }),
        e: indicatorActiveColor.value,
        f: indicatorColor.value,
        g: common_vendor.o(onSwiperChange),
        h: common_vendor.t(product.value.price),
        i: product.value.originalPrice
      }, product.value.originalPrice ? {
        j: common_vendor.t(product.value.originalPrice)
      } : {}, {
        k: product.value.isNew
      }, product.value.isNew ? {} : {}, {
        l: product.value.isOrganic
      }, product.value.isOrganic ? {} : {}, {
        m: common_vendor.t(product.value.name),
        n: common_vendor.t(product.value.slogan),
        o: common_vendor.t(product.value.rating),
        p: common_vendor.t(product.value.sales),
        q: common_vendor.t(product.value.favorableRate),
        r: common_assets._imports_2$5,
        s: common_assets._imports_1$7,
        t: common_vendor.o(navigateToTrace),
        v: product.value.farmLogo,
        w: common_vendor.t(product.value.farmName),
        x: common_assets._imports_1$7,
        y: common_vendor.t(product.value.farmLocation),
        z: common_vendor.o(navigateToFarm),
        A: common_vendor.f(detailTabs.value, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab.name),
            b: index,
            c: currentTab.value === tab.id ? 1 : "",
            d: common_vendor.o(($event) => currentTab.value = tab.id, index)
          };
        }),
        B: currentTab.value === "intro"
      }, currentTab.value === "intro" ? {
        C: common_vendor.f(product.value.description, (desc, index, i0) => {
          return {
            a: common_vendor.t(desc),
            b: index
          };
        })
      } : {}, {
        D: currentTab.value === "specs"
      }, currentTab.value === "specs" ? {
        E: common_vendor.f(product.value.specs, (spec, index, i0) => {
          return {
            a: common_vendor.t(spec.label),
            b: common_vendor.t(spec.value),
            c: index
          };
        }),
        F: common_vendor.f(product.value.detailImages, (image, index, i0) => {
          return {
            a: image,
            b: common_vendor.o(($event) => previewImage(index), index),
            c: index
          };
        })
      } : {}, {
        G: currentTab.value === "reviews"
      }, currentTab.value === "reviews" ? {
        H: common_vendor.t(product.value.comments.length),
        I: common_vendor.f(product.value.comments, (comment, index, i0) => {
          return common_vendor.e({
            a: comment.avatar,
            b: common_vendor.t(comment.username),
            c: common_vendor.t(comment.date),
            d: common_vendor.f(5, (i, k1, i1) => {
              return {
                a: i,
                b: i <= comment.rating ? 1 : ""
              };
            }),
            e: common_vendor.t(comment.content),
            f: comment.images && comment.images.length
          }, comment.images && comment.images.length ? {
            g: common_vendor.f(comment.images, (img, imgIndex, i1) => {
              return {
                a: imgIndex,
                b: img,
                c: common_vendor.o(($event) => previewCommentImage(comment.images, imgIndex), imgIndex)
              };
            })
          } : {}, {
            h: index
          });
        })
      } : {}, {
        J: common_vendor.n(isFavorite.value ? "icon-heart-solid" : "icon-heart"),
        K: common_vendor.o(toggleFavorite),
        L: cartCount.value > 0
      }, cartCount.value > 0 ? {
        M: common_vendor.t(cartCount.value)
      } : {}, {
        N: common_vendor.o(navigateToCart),
        O: common_vendor.o(addToCart),
        P: common_vendor.o(buyNow)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/detail/detail.js.map
