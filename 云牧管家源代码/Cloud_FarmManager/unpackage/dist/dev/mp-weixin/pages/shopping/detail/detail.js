"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      productId: null,
      indicatorActiveColor: "#FFFFFF",
      indicatorColor: "rgba(255, 255, 255, 0.5)",
      currentTab: "intro",
      detailTabs: [
        { id: "intro", name: "商品详情" },
        { id: "specs", name: "规格参数" },
        { id: "reviews", name: "用户评价" }
      ],
      isFavorite: false,
      cartCount: 3,
      // 模拟产品数据
      product: {
        id: 1,
        name: "瑶族野生鸡蛋 500g",
        slogan: "采自瑶山深处鸡所下的蛋，天然无添加",
        price: "12",
        originalPrice: "15",
        isNew: true,
        isOrganic: true,
        rating: "4.9",
        sales: "586",
        favorableRate: 98,
        images: [
          "/static2/hCSyEZ4ptM_small.jpg",
          "/static2/UWwPfXP2yh_small.jpg",
          "/static2/8380.jpg_wh860.jpg",
          "/static2/yuan_af14c2ee4fda89819c3cd58a234b8b68.jpeg"
        ],
        description: [
          "瑶族鸡蛋源自瑶族聚居的青山秀水间，瑶族同胞们在山林间散养当地特色土鸡。土鸡们自由穿梭于林间草地，啄食山间昆虫、草籽，饮用清冽山泉水。这些土鸡在天然生态环境中生长，所产鸡蛋完全遵循自然规律孕育。瑶族鸡蛋无激素、抗生素添加，外壳色泽温润，蛋黄紧实饱满、颜色橙红，富含蛋白质、多种维生素及矿物质等营养物质，以天然本真的品质，传递着瑶族聚居地独特的生态之美与自然馈赠 。",
          "瑶族鸡蛋外壳泛着柔和的浅褐色光泽，个头匀称饱满。蛋黄颜色鲜艳橙红，质地紧实，蛋清浓稠透亮。轻轻煮熟后，剥开蛋壳，浓郁的蛋香便扑鼻而来，入口细腻绵密，口感醇香浓郁，余味中带着淡淡的自然清甜。其富含优质蛋白质、卵磷脂、钙、铁等多种人体所需营养元素，无论是自家烹饪滋养，还是作为伴手礼馈赠亲友，都是充满瑶族特色与健康心意的优质之选。"
        ],
        farmId: 1,
        farmName: "瑶山养鸡合作社",
        farmLogo: "/static2/4378.jpg_wh860.jpg",
        farmLocation: "湘西瑶族自治县",
        specs: [
          { label: "品名", value: "瑶山野生鸡蛋" },
          { label: "净含量", value: "500g" },
          { label: "产地", value: "湘西瑶族自治县" },
          { label: "保质期", value: "20天" },
          { label: "储存方法", value: "常温密封保存，避免阳光直射" },
          { label: "认证", value: "有机认证、绿色食品认证" }
        ],
        detailImages: [
          "/static2/90.jpg",
          "/static2/215116ec82444d536ffc9db9894bd298.jpg",
          "https://img95.699pic.com/photo/50165/8380.jpg_wh860.jpg",
          "https://pic.52112.com/180606/JPG-180606_129/UWwPfXP2yh_small.jpg",
          "https://img95.699pic.com/photo/60014/8614.jpg_wh300.jpg!/fh/300/quality/90",
          "https://bpic.588ku.com/element_origin_min_pic/19/07/19/215116ec82444d536ffc9db9894bd298.jpg"
        ],
        comments: [
          {
            username: "张*红",
            avatar: "/static2/photo-1494790108377-be9c29b29330.avif",
            date: "2025-04-15",
            rating: 5,
            content: "收到瑶族鸡蛋超惊喜！包装严实又精致，防震设计让每一颗鸡蛋都完好无损。打开包装，就能感受到天然的气息，鸡蛋外壳带着山林间的质朴质感。煮熟后品尝，蛋香浓郁醇厚，口感细腻嫩滑，完全没有腥味。卖家介绍说这是瑶族同胞山林散养土鸡所产，无激素添加，吃得安心又健康，下次还会回购！",
            images: [
              "https://img95.699pic.com/photo/60082/7816.jpg_wh860.jpg",
              "https://pic.nximg.cn/file/20210520/21319742_210119474127_2.jpg"
            ]
          },
          {
            username: "王*生",
            avatar: "/static2/photo-1599566150163-29194dcaad36.avif",
            date: "2025-04-10",
            rating: 5,
            content: "第二次购买了，家里人都很喜欢。这个瑶山鸡蛋确实和超市里的不一样，有一种特别的香味，质量很好，而且通过App还可以查看鸡蛋的溯源信息，非常安心。"
          }
        ]
      }
    };
  },
  onLoad(options) {
    if (options.id) {
      this.productId = options.id;
    }
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url
      });
    },
    onSwiperChange(e) {
      const current = e.detail.current;
      common_vendor.index.__f__("log", "at pages/shopping/detail/detail.vue:260", "当前索引:", current);
    },
    toggleFavorite() {
      this.isFavorite = !this.isFavorite;
      if (this.isFavorite) {
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
    },
    addToCart() {
      this.cartCount++;
      common_vendor.index.showToast({
        title: "已加入购物车",
        icon: "success"
      });
    },
    buyNow() {
      common_vendor.index.navigateTo({
        url: "/pages/shopping/order/confirm?productId=" + this.product.id + "&quantity=1"
      });
    },
    shareProduct() {
      common_vendor.index.showActionSheet({
        itemList: ["分享给朋友", "分享到朋友圈", "复制链接"],
        success: (res) => {
          common_vendor.index.showToast({
            title: "分享成功",
            icon: "success"
          });
        }
      });
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        current: index,
        urls: this.product.detailImages
      });
    },
    previewCommentImage(images, index) {
      common_vendor.index.previewImage({
        current: index,
        urls: images
      });
    },
    fetchProductDetail() {
      common_vendor.index.showLoading({
        title: "加载中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_assets._imports_0$4,
    b: common_assets._imports_1$5,
    c: common_vendor.o((...args) => $options.shareProduct && $options.shareProduct(...args)),
    d: common_vendor.f($data.product.images, (image, index, i0) => {
      return {
        a: image,
        b: index
      };
    }),
    e: $data.indicatorActiveColor,
    f: $data.indicatorColor,
    g: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    h: common_vendor.t($data.product.price),
    i: $data.product.originalPrice
  }, $data.product.originalPrice ? {
    j: common_vendor.t($data.product.originalPrice)
  } : {}, {
    k: $data.product.isNew
  }, $data.product.isNew ? {} : {}, {
    l: $data.product.isOrganic
  }, $data.product.isOrganic ? {} : {}, {
    m: common_vendor.t($data.product.name),
    n: common_vendor.t($data.product.slogan),
    o: common_vendor.t($data.product.rating),
    p: common_vendor.t($data.product.sales),
    q: common_vendor.t($data.product.favorableRate),
    r: common_assets._imports_2$4,
    s: common_assets._imports_4$3,
    t: common_vendor.o(($event) => $options.navigateTo("/pages/shopping/detail/trace")),
    v: $data.product.farmLogo,
    w: common_vendor.t($data.product.farmName),
    x: common_assets._imports_4$3,
    y: common_vendor.t($data.product.farmLocation),
    z: common_vendor.o(($event) => $options.navigateTo("/pages/shopping/detail/farm?id=" + $data.product.farmId)),
    A: common_vendor.f($data.detailTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: $data.currentTab === tab.id ? 1 : "",
        d: common_vendor.o(($event) => $data.currentTab = tab.id, index)
      };
    }),
    B: $data.currentTab === "intro"
  }, $data.currentTab === "intro" ? {
    C: common_vendor.f($data.product.description, (desc, index, i0) => {
      return {
        a: common_vendor.t(desc),
        b: index
      };
    })
  } : {}, {
    D: $data.currentTab === "specs"
  }, $data.currentTab === "specs" ? {
    E: common_vendor.f($data.product.specs, (spec, index, i0) => {
      return {
        a: common_vendor.t(spec.label),
        b: common_vendor.t(spec.value),
        c: index
      };
    }),
    F: common_vendor.f($data.product.detailImages, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: index
      };
    })
  } : {}, {
    G: $data.currentTab === "reviews"
  }, $data.currentTab === "reviews" ? {
    H: common_vendor.t($data.product.comments.length),
    I: common_vendor.f($data.product.comments, (comment, index, i0) => {
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
            c: common_vendor.o(($event) => $options.previewCommentImage(comment.images, imgIndex), imgIndex)
          };
        })
      } : {}, {
        h: index
      });
    })
  } : {}, {
    J: common_vendor.n($data.isFavorite ? "icon-heart-solid" : "icon-heart"),
    K: common_vendor.o((...args) => $options.toggleFavorite && $options.toggleFavorite(...args)),
    L: $data.cartCount > 0
  }, $data.cartCount > 0 ? {
    M: common_vendor.t($data.cartCount)
  } : {}, {
    N: common_vendor.o(($event) => $options.navigateTo("/pages/shopping/cart/cart")),
    O: common_vendor.o((...args) => $options.addToCart && $options.addToCart(...args)),
    P: common_vendor.o((...args) => $options.buyNow && $options.buyNow(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/detail/detail.js.map
