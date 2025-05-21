"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      activityTabs: ["全部活动", "瑶族文化", "农事体验", "非遗传承", "田园采摘"],
      activeTab: "全部活动",
      countdownData: {
        days: 15,
        hours: 20,
        minutes: 45
      },
      activities: [
        {
          id: 1,
          title: "瑶族长鼓舞表演",
          date: "2025-05-01 ~ 2025-05-07",
          location: "瑶山文化广场",
          description: "欣赏国家级非物质文化遗产瑶族长鼓舞，感受瑶族人民欢快奔放的民族精神。",
          price: "98",
          image: "/static2/dancers-1787812_1280.jpg",
          badge: "热门",
          tags: ["非遗文化", "瑶族舞蹈"],
          category: "瑶族文化"
        },
        {
          id: 2,
          title: "瑶山采茶体验",
          date: "2025-04-25 ~ 2025-05-10",
          location: "瑶山生态茶园",
          description: "亲手采摘高山有机茶，学习传统制茶工艺，体验茶农生活，品尝新鲜茶汤。",
          price: "128",
          image: "/static2/photo-1531971589569-0d9370cbe1e5.avif",
          tags: ["农事体验", "茶文化"],
          category: "农事体验"
        },
        {
          id: 3,
          title: "瑶族民俗文化节",
          date: "2025-06-01 ~ 2025-06-07",
          location: "瑶山民族村",
          description: "参与瑶族盘王节庆典，体验瑶族传统婚礼，品尝瑶族美食，欣赏民族歌舞表演。",
          price: "258",
          image: "/static2/photo-1515339760107-1952b7a08454.avif",
          badge: "限时",
          tags: ["民俗文化", "瑶族节日"],
          category: "瑶族文化"
        }
      ]
    };
  },
  computed: {
    filteredActivities() {
      if (this.activeTab === "全部活动") {
        return this.activities;
      } else {
        return this.activities.filter((act) => act.category === this.activeTab || act.tags.includes(this.activeTab));
      }
    }
  },
  onLoad() {
    this.startCountdownTimer();
  },
  onUnload() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    startCountdownTimer() {
      this.timer = setInterval(() => {
        this.countdownData.minutes--;
        if (this.countdownData.minutes < 0) {
          this.countdownData.minutes = 59;
          this.countdownData.hours--;
          if (this.countdownData.hours < 0) {
            this.countdownData.hours = 23;
            this.countdownData.days--;
            if (this.countdownData.days < 0) {
              clearInterval(this.timer);
              this.countdownData = { days: 0, hours: 0, minutes: 0 };
            }
          }
        }
      }, 6e4);
    },
    signupActivity(activity) {
      common_vendor.index.showModal({
        title: "活动报名",
        content: `确认报名参加"${activity.title}"活动吗？费用：¥${activity.price}`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "报名成功",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.countdownData.days),
    b: common_vendor.t($data.countdownData.hours),
    c: common_vendor.t($data.countdownData.minutes),
    d: common_vendor.f($data.activityTabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab),
        b: index,
        c: $data.activeTab === tab ? 1 : "",
        d: common_vendor.o(($event) => $data.activeTab = tab, index)
      };
    }),
    e: common_vendor.f($options.filteredActivities, (activity, index, i0) => {
      return common_vendor.e({
        a: activity.badge
      }, activity.badge ? {
        b: common_vendor.t(activity.badge)
      } : {}, {
        c: activity.image,
        d: activity.title,
        e: common_vendor.t(activity.title),
        f: common_vendor.t(activity.date),
        g: common_vendor.t(activity.location),
        h: common_vendor.t(activity.description),
        i: common_vendor.f(activity.tags, (tag, tagIndex, i1) => {
          return {
            a: common_vendor.t(tag),
            b: tagIndex
          };
        }),
        j: common_vendor.t(activity.price),
        k: common_vendor.o(($event) => $options.signupActivity(activity), index),
        l: index
      });
    }),
    f: common_assets._imports_0$2,
    g: common_assets._imports_4$3
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activity/activity.js.map
