<template>
	<view class="page-container">
		<!-- 页面头部 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<image src="/static/icons/shopping icon/icon-arrow-left备份.svg" class="icon-image"></image>
			</view>
			<text class="page-title">收货地址</text>
		</view>

		<!-- 地址列表 -->
		<view class="address-list" v-if="addresses.length > 0">
			<AddressItem v-for="(address, index) in addresses" :key="index" :address="address" @select="selectAddress"
				@edit="editAddress" @delete="confirmDeleteAddress" />
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-else>
			<image src="/static/icons/shopping icon/address-empty.svg" class="empty-icon"></image>
			<text class="empty-text">暂无收货地址</text>
		</view>

		<!-- 新增地址按钮 -->
		<view class="add-address-btn" @click="showAddressForm(null)">
			<text class="btn-text">新增收货地址</text>
		</view>

		<!-- 地址表单弹窗 -->
		<view class="address-form-popup" v-if="showForm">
			<view class="form-overlay" @click="cancelForm"></view>
			<view class="form-container">
				<view class="form-header">
					<text class="form-title">{{ isEditMode ? '编辑地址' : '新增地址' }}</text>
					<view class="close-btn" @click="cancelForm">
						<image src="/static/icons/shopping icon/X.svg" class="icon-image"></image>
					</view>
				</view>

				<view class="form-content">
					<view class="form-item">
						<text class="form-label">收货人</text>
						<input type="text" class="form-input" placeholder="请输入收货人姓名" v-model="formData.name" />
					</view>

					<view class="form-item">
						<text class="form-label">手机号码</text>
						<input type="number" class="form-input" placeholder="请输入手机号码" v-model="formData.phone" maxlength="11" />
					</view>

					<view class="form-item">
						<text class="form-label">所在地区</text>
						<picker mode="region" @change="onRegionChange"
							:value="[formData.province, formData.city, formData.district]">
							<view class="picker-view">
								<text v-if="formData.province">{{ formData.province }} {{ formData.city }}
									{{ formData.district }}</text>
								<text v-else class="placeholder">请选择所在地区</text>
								<image src="/static/icons/shopping icon/chevron-right.svg" class="icon-image"></image>
							</view>
						</picker>
					</view>

					<view class="form-item">
						<text class="form-label">详细地址</text>
						<textarea class="form-textarea" placeholder="请输入详细地址" v-model="formData.detail" />
					</view>

					<view class="form-item switch-item">
						<text class="form-label">设为默认地址</text>
						<switch :checked="formData.isDefault" @change="onDefaultChange" color="#bc4749" />
					</view>
				</view>

				<view class="form-footer">
					<button class="submit-btn" @click="saveAddress">保存</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import AddressItem from '../../../components/AddressItem.vue';

	// 地址列表
	const addresses = ref([{
			id: 1,
			name: '张三',
			phone: '13800138000',
			province: '广东省',
			city: '广州市',
			district: '天河区',
			detail: '瑶山农业科技园区A栋101',
			isDefault: true
		},
		{
			id: 2,
			name: '李四',
			phone: '13900139000',
			province: '广东省',
			city: '深圳市',
			district: '南山区',
			detail: '科技园南区B2栋3楼301',
			isDefault: false
		}
	]);

	// 表单相关状态
	const showForm = ref(false);
	const isEditMode = ref(false);
	const currentEditId = ref(null);
	const formData = reactive({
		name: '',
		phone: '',
		province: '',
		city: '',
		district: '',
		detail: '',
		isDefault: false
	});

	// 返回上一页
	const goBack = () => {
		uni.navigateBack();
	};

	// 选择地址
	const selectAddress = (address) => {
		// 在实际项目中，应该将选中的地址保存到全局状态或本地存储
		uni.showToast({
			title: '已选择该地址',
			icon: 'success'
		});

		// 返回上一页
		setTimeout(() => {
			uni.navigateBack();
		}, 1000);
	};

	// 显示地址表单
	const showAddressForm = (address) => {
		if (address) {
			// 编辑模式
			isEditMode.value = true;
			currentEditId.value = address.id;

			// 填充表单数据
			formData.name = address.name;
			formData.phone = address.phone;
			formData.province = address.province;
			formData.city = address.city;
			formData.district = address.district;
			formData.detail = address.detail;
			formData.isDefault = address.isDefault;
		} else {
			// 新增模式
			isEditMode.value = false;
			currentEditId.value = null;

			// 重置表单数据
			formData.name = '';
			formData.phone = '';
			formData.province = '';
			formData.city = '';
			formData.district = '';
			formData.detail = '';
			formData.isDefault = false;
		}

		showForm.value = true;
	};

	// 取消表单
	const cancelForm = () => {
		showForm.value = false;
	};

	// 编辑地址
	const editAddress = (address) => {
		showAddressForm(address);
	};

	// 确认删除地址
	const confirmDeleteAddress = (address) => {
		uni.showModal({
			title: '删除地址',
			content: '确定要删除该收货地址吗？',
			success: (res) => {
				if (res.confirm) {
					deleteAddress(address.id);
				}
			}
		});
	};

	// 删除地址
	const deleteAddress = (id) => {
		const index = addresses.value.findIndex(item => item.id === id);
		if (index !== -1) {
			addresses.value.splice(index, 1);
			uni.showToast({
				title: '删除成功',
				icon: 'success'
			});
		}
	};

	// 保存地址
	const saveAddress = () => {
		// 表单验证
		if (!formData.name) {
			uni.showToast({
				title: '请输入收货人姓名',
				icon: 'none'
			});
			return;
		}

		if (!formData.phone) {
			uni.showToast({
				title: '请输入手机号码',
				icon: 'none'
			});
			return;
		}

		if (!/^1\d{10}$/.test(formData.phone)) {
			uni.showToast({
				title: '手机号码格式不正确',
				icon: 'none'
			});
			return;
		}

		if (!formData.province || !formData.city || !formData.district) {
			uni.showToast({
				title: '请选择所在地区',
				icon: 'none'
			});
			return;
		}

		if (!formData.detail) {
			uni.showToast({
				title: '请输入详细地址',
				icon: 'none'
			});
			return;
		}

		// 处理默认地址
		if (formData.isDefault) {
			addresses.value.forEach(item => {
				item.isDefault = false;
			});
		}

		if (isEditMode.value) {
			// 编辑模式
			const index = addresses.value.findIndex(item => item.id === currentEditId.value);
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
			// 新增模式
			const newId = addresses.value.length > 0 ? Math.max(...addresses.value.map(item => item.id)) + 1 : 1;
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

		// 关闭表单
		showForm.value = false;

		// 提示成功
		uni.showToast({
			title: isEditMode.value ? '编辑成功' : '添加成功',
			icon: 'success'
		});
	};

	// 地区选择器变更
	const onRegionChange = (e) => {
		const [province, city, district] = e.detail.value;
		formData.province = province;
		formData.city = city;
		formData.district = district;
	};

	// 默认地址开关变更
	const onDefaultChange = (e) => {
		formData.isDefault = e.detail.value;
	};
</script>

<style lang="scss">
	@import '@/uni.scss';

	page {
		background-color: $color-secondary;
	}

	.page-container {
		padding-bottom: 160rpx;
	}

	/* 页面头部 */
	.page-header {
		position: relative;
		height: 90rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: white;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.back-btn {
		position: absolute;
		left: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.page-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $color-dark;
	}

	.icon-image {
		width: 36rpx;
		height: 36rpx;
	}

	/* 地址列表 */
	.address-list {
		padding: 30rpx;
	}

	/* 空状态 */
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 100rpx 0;
	}

	.empty-icon {
		width: 180rpx;
		height: 180rpx;
		margin-bottom: 30rpx;
	}

	.empty-text {
		font-size: 28rpx;
		color: #999;
	}

	/* 新增地址按钮 */
	.add-address-btn {
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		right: 30rpx;
		height: 90rpx;
		background-color: $color-primary;
		color: white;
		border-radius: 45rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-text {
		font-size: 32rpx;
		font-weight: 600;
	}

	/* 地址表单弹窗 */
	.address-form-popup {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 100;
	}

	.form-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1;
	}

	.form-container {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
		border-radius: 40rpx 40rpx 0 0;
		padding: 30rpx;
		z-index: 2;
		max-height: 80vh;
		overflow-y: auto;
	}

	.form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.form-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
	}

	.close-btn {
		padding: 10rpx;
	}

	.form-content {
		margin-bottom: 30rpx;
	}

	.form-item {
		margin-bottom: 30rpx;
	}

	.form-label {
		font-size: 28rpx;
		color: $color-dark;
		margin-bottom: 16rpx;
		display: block;
	}

	.form-input,
	.form-textarea,
	.picker-view {
		background-color: #f8f8f8;
		border-radius: 12rpx;
		padding: 20rpx;
		font-size: 28rpx;
		color: $color-dark;
		width: 100%;
		box-sizing: border-box;
	}

	.form-textarea {
		height: 150rpx;
		line-height: 1.5;
	}

	.picker-view {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.placeholder {
		color: #999;
	}

	.switch-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.switch-item .form-label {
		margin-bottom: 0;
	}

	.form-footer {
		padding-top: 30rpx;
	}

	.submit-btn {
		background-color: $color-primary;
		color: white;
		border: none;
		border-radius: 40rpx;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
</style>