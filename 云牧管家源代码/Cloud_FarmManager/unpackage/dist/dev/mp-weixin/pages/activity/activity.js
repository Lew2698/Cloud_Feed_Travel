"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  ActivityCardVue();
}
const ActivityCardVue = () => "../../components/ActivityCard.js";
const _sfc_main = {
  __name: "activity",
  setup(__props) {
    const activityTabs = common_vendor.ref(["全部活动", "瑶族文化", "农事体验", "非遗传承", "田园采摘"]);
    common_vendor.ref(["全部活动"]);
    const countdownData = common_vendor.ref({
      days: 15,
      hours: 20,
      minutes: 45
    });
    const activities = common_vendor.ref([
      {
        id: 1,
        title: "瑶族长鼓舞表演",
        date: "2025-05-01 ~ 2025-05-07",
        location: "瑶山文化广场",
        description: "欣赏国家级非物质文化遗产瑶族长鼓舞，感受瑶族人民欢快奔放的民族精神。",
        price: "98",
        image: "/static/static2/dancers-1787812_1280.jpg",
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
        image: "/static/static2/photo-1531971589569-0d9370cbe1e5.avif",
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
        image: "/static/static2/photo-1515339760107-1952b7a08454.avif",
        badge: "限时",
        tags: ["民俗文化", "瑶族节日"],
        category: "瑶族文化"
      }
    ]);
    common_vendor.computed(() => {
      if (this.activeTab === "全部活动") {
        return this.activities;
      } else {
        return this.activities.filter((act) => act.category === this.activeTab || act.tags.includes(this.activeTab));
      }
    });
    const signupActivity = (activity) => {
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
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(countdownData.value.days),
        b: common_vendor.t(countdownData.value.hours),
        c: common_vendor.t(countdownData.value.minutes),
        d: common_vendor.f(activityTabs.value, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: _ctx.activeTab === tab ? 1 : "",
            d: common_vendor.o(($event) => _ctx.activeTab = tab, index)
          };
        }),
        e: common_vendor.f(activities.value, (acti, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(signupActivity, index),
            c: "ba61204c-0-" + i0,
            d: common_vendor.p({
              activity: acti
            })
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/activity/activity.js.map
