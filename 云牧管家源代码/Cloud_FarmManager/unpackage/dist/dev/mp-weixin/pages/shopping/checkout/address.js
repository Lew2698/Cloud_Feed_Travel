"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const api_addressService = require("../../../api/addressService.js");
if (!Math) {
  AddressItem();
}
const AddressItem = () => "../../../components/AddressItem.js";
const _sfc_main = {
  __name: "address",
  setup(__props) {
    const addresses = common_vendor.ref([]);
    const loading = common_vendor.ref(false);
    const saving = common_vendor.ref(false);
    const showForm = common_vendor.ref(false);
    const isEditMode = common_vendor.ref(false);
    const currentEditId = common_vendor.ref(null);
    const formErrors = common_vendor.ref([]);
    const formData = common_vendor.reactive({
      name: "",
      phone: "",
      province: "",
      city: "",
      district: "",
      detail: "",
      isDefault: false
    });
    common_vendor.onMounted(() => {
      loadAddressList();
    });
    const loadAddressList = async () => {
      loading.value = true;
      try {
        const result = await api_addressService.getAddressList();
        if (result.code === 200) {
          addresses.value = result.data.list;
        } else if (result.code === 401) {
          common_vendor.index.showModal({
            title: "提示",
            content: "请先登录后再管理收货地址",
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
          common_vendor.index.showToast({
            title: result.message || "获取地址失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/address.vue:189", "获取地址列表失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "error"
        });
      } finally {
        loading.value = false;
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const selectAddress = (address) => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      if (prevPage) {
        common_vendor.index.$emit("addressSelected", address);
      }
      common_vendor.index.showToast({
        title: "已选择该地址",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 800);
    };
    const showAddressForm = (address) => {
      formErrors.value = [];
      if (address) {
        isEditMode.value = true;
        currentEditId.value = address._id;
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
      formErrors.value = [];
    };
    const editAddress = (address) => {
      showAddressForm(address);
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
    const saveAddress = async () => {
      const validation = api_addressService.validateAddress(formData);
      if (!validation.isValid) {
        formErrors.value = validation.errors;
        return;
      }
      formErrors.value = [];
      saving.value = true;
      try {
        let result;
        if (isEditMode.value) {
          result = await api_addressService.updateAddress(currentEditId.value, formData);
        } else {
          result = await api_addressService.addAddress(formData);
        }
        if (result.code === 200) {
          common_vendor.index.showToast({
            title: isEditMode.value ? "更新成功" : "添加成功",
            icon: "success"
          });
          showForm.value = false;
          await loadAddressList();
        } else {
          common_vendor.index.showToast({
            title: result.message || "操作失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/address.vue:324", "保存地址失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "error"
        });
      } finally {
        saving.value = false;
      }
    };
    const confirmDeleteAddress = (address) => {
      common_vendor.index.showModal({
        title: "删除地址",
        content: "确定要删除该收货地址吗？",
        success: async (res) => {
          if (res.confirm) {
            await handleDeleteAddress(address._id);
          }
        }
      });
    };
    const handleDeleteAddress = async (addressId) => {
      try {
        const result = await api_addressService.deleteAddress(addressId);
        if (result.code === 200) {
          common_vendor.index.showToast({
            title: "删除成功",
            icon: "success"
          });
          await loadAddressList();
        } else {
          common_vendor.index.showToast({
            title: result.message || "删除失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/address.vue:367", "删除地址失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "error"
        });
      }
    };
    const setDefaultAddress = async (address) => {
      if (address.isDefault) {
        return;
      }
      try {
        const result = await api_addressService.setDefaultAddress(address._id);
        if (result.code === 200) {
          common_vendor.index.showToast({
            title: "设置成功",
            icon: "success"
          });
          await loadAddressList();
        } else {
          common_vendor.index.showToast({
            title: result.message || "设置失败",
            icon: "error"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/shopping/checkout/address.vue:399", "设置默认地址失败:", error);
        common_vendor.index.showToast({
          title: "网络错误",
          icon: "error"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$9,
        b: common_vendor.o(goBack),
        c: loading.value
      }, loading.value ? {} : addresses.value.length > 0 ? {
        e: common_vendor.f(addresses.value, (address, index, i0) => {
          return {
            a: address._id || index,
            b: common_vendor.o(selectAddress, address._id || index),
            c: common_vendor.o(editAddress, address._id || index),
            d: common_vendor.o(confirmDeleteAddress, address._id || index),
            e: common_vendor.o(setDefaultAddress, address._id || index),
            f: "5dc82337-0-" + i0,
            g: common_vendor.p({
              address
            })
          };
        })
      } : !loading.value ? {
        g: common_assets._imports_1$10
      } : {}, {
        d: addresses.value.length > 0,
        f: !loading.value,
        h: common_vendor.o(($event) => showAddressForm(null)),
        i: showForm.value
      }, showForm.value ? common_vendor.e({
        j: common_vendor.o(cancelForm),
        k: common_vendor.t(isEditMode.value ? "编辑地址" : "新增地址"),
        l: common_assets._imports_2$8,
        m: common_vendor.o(cancelForm),
        n: formData.name,
        o: common_vendor.o(($event) => formData.name = $event.detail.value),
        p: formData.phone,
        q: common_vendor.o(($event) => formData.phone = $event.detail.value),
        r: formData.province
      }, formData.province ? {
        s: common_vendor.t(formData.province),
        t: common_vendor.t(formData.city),
        v: common_vendor.t(formData.district)
      } : {}, {
        w: common_assets._imports_3$8,
        x: common_vendor.o(onRegionChange),
        y: [formData.province, formData.city, formData.district],
        z: formData.detail,
        A: common_vendor.o(($event) => formData.detail = $event.detail.value),
        B: formData.isDefault,
        C: common_vendor.o(onDefaultChange),
        D: formErrors.value.length > 0
      }, formErrors.value.length > 0 ? {
        E: common_vendor.f(formErrors.value, (error, index, i0) => {
          return {
            a: common_vendor.t(error),
            b: index
          };
        })
      } : {}, {
        F: common_vendor.t(saving.value ? "保存中..." : "保存"),
        G: common_vendor.o(saveAddress),
        H: saving.value
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/shopping/checkout/address.js.map
