"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  AddressItem();
}
const AddressItem = () => "../../../components/AddressItem.js";
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const addresses = common_vendor.ref([
      {
        id: 1,
        name: "张三",
        phone: "13800138000",
        province: "广东省",
        city: "广州市",
        district: "天河区",
        detail: "瑶山农业科技园区A栋101",
        isDefault: true
      },
      {
        id: 2,
        name: "李四",
        phone: "13900139000",
        province: "广东省",
        city: "深圳市",
        district: "南山区",
        detail: "科技园南区B2栋3楼301",
        isDefault: false
      }
    ]);
    const showForm = common_vendor.ref(false);
    const isEditMode = common_vendor.ref(false);
    const currentEditId = common_vendor.ref(null);
    const formData = common_vendor.reactive({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      isDefault: false
    });
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const selectAddress = (address) => {
      common_vendor.index.showToast({
        title: "已选择该地址",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1e3);
    };
    const showAddressForm = (address) => {
      if (address) {
        isEditMode.value = true;
        currentEditId.value = address.id;
        formData.name = address.name;
        formData.phone = address.phone;
        formData.province = address.province;
        formData.city = address.city;
        formData.district = address.district;
        formData.detail = address.detail;
        formData.isDefault = address.isDefault;
      } else {
        isEditMode.value = false;
        currentEditId.value = null;
        formData.name = "";
        formData.phone = "";
        formData.province = "";
        formData.city = "";
        formData.district = "";
        formData.detail = "";
        formData.isDefault = false;
      }
      showForm.value = true;
    };
    const cancelForm = () => {
      showForm.value = false;
    };
    const editAddress = (address) => {
      showAddressForm(address);
    };
    const confirmDeleteAddress = (address) => {
      common_vendor.index.showModal({
        title: "删除地址",
        content: "确定要删除该收货地址吗？",
        success: (res) => {
          if (res.confirm) {
            deleteAddress(address.id);
          }
        }
      });
    };
    const deleteAddress = (id) => {
      const index = addresses.value.findIndex((item) => item.id === id);
      if (index !== -1) {
        addresses.value.splice(index, 1);
        common_vendor.index.showToast({
          title: "删除成功",
          icon: "success"
        });
      }
    };
    const saveAddress = () => {
      if (!formData.name) {
        common_vendor.index.showToast({
          title: "请输入收货人姓名",
          icon: "none"
        });
        return;
      }
      if (!formData.phone) {
        common_vendor.index.showToast({
          title: "请输入手机号码",
          icon: "none"
        });
        return;
      }
      if (!/^1\d{10}$/.test(formData.phone)) {
        common_vendor.index.showToast({
          title: "手机号码格式不正确",
          icon: "none"
        });
        return;
      }
      if (!formData.province || !formData.city || !formData.district) {
        common_vendor.index.showToast({
          title: "请选择所在地区",
          icon: "none"
        });
        return;
      }
      if (!formData.detail) {
        common_vendor.index.showToast({
          title: "请输入详细地址",
          icon: "none"
        });
        return;
      }
      if (formData.isDefault) {
        addresses.value.forEach((item) => {
          item.isDefault = false;
        });
      }
      if (isEditMode.value) {
        const index = addresses.value.findIndex((item) => item.id === currentEditId.value);
        if (index !== -1) {
          addresses.value[index] = {
            ...addresses.value[index],
            name: formData.name,
            phone: formData.phone,
            province: formData.province,
            city: formData.city,
            district: formData.district,
            detail: formData.detail,
            isDefault: formData.isDefault
          };
        }
      } else {
        const newId = addresses.value.length > 0 ? Math.max(...addresses.value.map((item) => item.id)) + 1 : 1;
        addresses.value.push({
          id: newId,
          name: formData.name,
          phone: formData.phone,
          province: formData.province,
          city: formData.city,
          district: formData.district,
          detail: formData.detail,
          isDefault: formData.isDefault
        });
      }
      showForm.value = false;
      common_vendor.index.showToast({
        title: isEditMode.value ? "编辑成功" : "添加成功",
        icon: "success"
      });
    };
    const onRegionChange = (e) => {
      const [province, city, district] = e.detail.value;
      formData.province = province;
      formData.city = city;
      formData.district = district;
    };
    const onDefaultChange = (e) => {
      formData.isDefault = e.detail.value;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$8,
        b: common_vendor.o(goBack),
        c: addresses.value.length > 0
      }, addresses.value.length > 0 ? {
        d: common_vendor.f(addresses.value, (address, index, i0) => {
          return {
            a: index,
            b: common_vendor.o(selectAddress, index),
            c: common_vendor.o(editAddress, index),
            d: common_vendor.o(confirmDeleteAddress, index),
            e: "5dc82337-0-" + i0,
            f: common_vendor.p({
              address
            })
          };
        })
      } : {
        e: common_assets._imports_1$10
      }, {
        f: common_vendor.o(($event) => showAddressForm(null)),
        g: showForm.value
      }, showForm.value ? common_vendor.e({
        h: common_vendor.o(cancelForm),
        i: common_vendor.t(isEditMode.value ? "编辑地址" : "新增地址"),
        j: common_assets._imports_2$7,
        k: common_vendor.o(cancelForm),
        l: formData.name,
        m: common_vendor.o(($event) => formData.name = $event.detail.value),
        n: formData.phone,
        o: common_vendor.o(($event) => formData.phone = $event.detail.value),
        p: formData.province
      }, formData.province ? {
        q: common_vendor.t(formData.province),
        r: common_vendor.t(formData.city),
        s: common_vendor.t(formData.district)
      } : {}, {
        t: common_assets._imports_3$8,
        v: common_vendor.o(onRegionChange),
        w: [formData.province, formData.city, formData.district],
        x: formData.detail,
        y: common_vendor.o(($event) => formData.detail = $event.detail.value),
        z: formData.isDefault,
        A: common_vendor.o(onDefaultChange),
        B: common_vendor.o(saveAddress)
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/checkout/address.js.map
