<template>
	<view class="page-container">
		<!-- 页面头部 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<image src="/static/icons/shopping icon/icon-arrow-left备份.svg" class="icon-image"></image>
			</view>
			<text class="page-title">收货地址</text>
		</view>

		<!-- 加载状态 -->
		<view class="loading-container" v-if="loading">
			<text class="loading-text">加载中...</text>
		</view>

		<!-- 地址列表 -->
		<view class="address-list" v-else-if="addresses.length > 0">
			<AddressItem 
				v-for="(address, index) in addresses" 
				:key="address._id || index" 
				:address="address" 
				@select="selectAddress"
				@edit="editAddress" 
				@delete="confirmDeleteAddress"
				@setDefault="setDefaultAddress" />
		</view>

		<!-- 空状态 -->
		<view class="empty-state" v-else-if="!loading">
			<image src="/static/icons/shopping icon/address-empty.svg" class="empty-icon"></image>
			<text class="empty-text">暂无收货地址</text>
			<text class="empty-desc">点击下方按钮添加收货地址</text>
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
						<input 
							type="text" 
							class="form-input" 
							placeholder="请输入收货人姓名" 
							v-model="formData.name" 
							maxlength="20" />
					</view>

					<view class="form-item">
						<text class="form-label">手机号码</text>
						<input 
							type="tel" 
							class="form-input" 
							placeholder="请输入手机号码" 
							v-model="formData.phone" 
							maxlength="11" />
					</view>

					<view class="form-item">
						<text class="form-label">所在地区</text>
						<picker 
							mode="region" 
							@change="onRegionChange"
							:value="[formData.province, formData.city, formData.district]">
							<view class="picker-view">
								<text v-if="formData.province">
									{{ formData.province }} {{ formData.city }} {{ formData.district }}
								</text>
								<text v-else class="placeholder">请选择所在地区</text>
								<image src="/static/icons/shopping icon/chevron-right.svg" class="icon-image"></image>
							</view>
						</picker>
					</view>

					<view class="form-item">
						<text class="form-label">详细地址</text>
						<textarea 
							class="form-textarea" 
							placeholder="街道、楼牌号等详细信息" 
							v-model="formData.detail" 
							maxlength="100" />
					</view>

					<view class="form-item switch-item">
						<text class="form-label">设为默认地址</text>
						<switch :checked="formData.isDefault" @change="onDefaultChange" color="#bc4749" />
					</view>

					<!-- 表单验证错误提示 -->
					<view class="form-errors" v-if="formErrors.length > 0">
						<text class="error-text" v-for="(error, index) in formErrors" :key="index">
							{{ error }}
						</text>
					</view>
				</view>

				<view class="form-footer">
					<button class="submit-btn" @click="saveAddress" :disabled="saving">
						{{ saving ? '保存中...' : '保存' }}
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from 'vue';
	import AddressItem from '../../../components/AddressItem.vue';
	import { 
		getAddressList, 
		addAddress, 
		updateAddress, 
		deleteAddress, 
		setDefaultAddress as setDefault,
		validateAddress 
	} from '@/api/addressService.js';

	// 响应式数据
	const addresses = ref([]);
	const loading = ref(false);
	const saving = ref(false);
	
	// 表单相关状态
	const showForm = ref(false);
	const isEditMode = ref(false);
	const currentEditId = ref(null);
	const formErrors = ref([]);
	
	const formData = reactive({
		name: '',
		phone: '',
		province: '',
		city: '',
		district: '',
		detail: '',
		isDefault: false
	});

	// 页面加载时获取地址列表
	onMounted(() => {
		loadAddressList();
	});

	// 获取地址列表
	const loadAddressList = async () => {
		loading.value = true;
		try {
			const result = await getAddressList();
			
			if (result.code === 200) {
				addresses.value = result.data.list;
			} else if (result.code === 401) {
				// 未登录
				uni.showModal({
					title: '提示',
					content: '请先登录后再管理收货地址',
					confirmText: '去登录',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login'
							});
						} else {
							uni.navigateBack();
						}
					}
				});
			} else {
				uni.showToast({
					title: result.message || '获取地址失败',
					icon: 'error'
				});
			}
		} catch (error) {
			console.error('获取地址列表失败:', error);
			uni.showToast({
				title: '网络错误',
				icon: 'error'
			});
		} finally {
			loading.value = false;
		}
	};

	// 返回上一页
	const goBack = () => {
		uni.navigateBack();
	};

	// 选择地址
	const selectAddress = (address) => {
		// 将选中的地址保存到页面参数或全局状态
		const pages = getCurrentPages();
		const prevPage = pages[pages.length - 2];
		
		if (prevPage) {
			// 通过全局事件传递选中的地址
			uni.$emit('addressSelected', address);
		}

		uni.showToast({
			title: '已选择该地址',
			icon: 'success'
		});

		// 返回上一页
		setTimeout(() => {
			uni.navigateBack();
		}, 800);
	};

	// 显示地址表单
	const showAddressForm = (address) => {
		formErrors.value = [];
		
		if (address) {
			// 编辑模式
			isEditMode.value = true;
			currentEditId.value = address._id;

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
		formErrors.value = [];
	};

	// 编辑地址
	const editAddress = (address) => {
		showAddressForm(address);
	};

	// 地区选择改变
	const onRegionChange = (e) => {
		const [province, city, district] = e.detail.value;
		formData.province = province;
		formData.city = city;
		formData.district = district;
	};

	// 默认地址开关改变
	const onDefaultChange = (e) => {
		formData.isDefault = e.detail.value;
	};

	// 保存地址
	const saveAddress = async () => {
		// 表单验证
		const validation = validateAddress(formData);
		if (!validation.isValid) {
			formErrors.value = validation.errors;
			return;
		}

		formErrors.value = [];
		saving.value = true;

		try {
			let result;
			
			if (isEditMode.value) {
				// 更新地址
				result = await updateAddress(currentEditId.value, formData);
			} else {
				// 新增地址
				result = await addAddress(formData);
			}

			if (result.code === 200) {
				uni.showToast({
					title: isEditMode.value ? '更新成功' : '添加成功',
					icon: 'success'
				});

				showForm.value = false;
				// 重新加载地址列表
				await loadAddressList();
			} else {
				uni.showToast({
					title: result.message || '操作失败',
					icon: 'error'
				});
			}
		} catch (error) {
			console.error('保存地址失败:', error);
			uni.showToast({
				title: '网络错误',
				icon: 'error'
			});
		} finally {
			saving.value = false;
		}
	};

	// 确认删除地址
	const confirmDeleteAddress = (address) => {
		uni.showModal({
			title: '删除地址',
			content: '确定要删除该收货地址吗？',
			success: async (res) => {
				if (res.confirm) {
					await handleDeleteAddress(address._id);
				}
			}
		});
	};

	// 删除地址
	const handleDeleteAddress = async (addressId) => {
		try {
			const result = await deleteAddress(addressId);
			
			if (result.code === 200) {
				uni.showToast({
					title: '删除成功',
					icon: 'success'
				});
				
				// 重新加载地址列表
				await loadAddressList();
			} else {
				uni.showToast({
					title: result.message || '删除失败',
					icon: 'error'
				});
			}
		} catch (error) {
			console.error('删除地址失败:', error);
			uni.showToast({
				title: '网络错误',
				icon: 'error'
			});
		}
	};

	// 设置默认地址
	const setDefaultAddress = async (address) => {
		if (address.isDefault) {
			return; // 已经是默认地址
		}

		try {
			const result = await setDefault(address._id);
			
			if (result.code === 200) {
				uni.showToast({
					title: '设置成功',
					icon: 'success'
				});
				
				// 重新加载地址列表
				await loadAddressList();
			} else {
				uni.showToast({
					title: result.message || '设置失败',
					icon: 'error'
				});
			}
		} catch (error) {
			console.error('设置默认地址失败:', error);
			uni.showToast({
				title: '网络错误',
				icon: 'error'
			});
		}
	};
</script>

<style lang="scss">
	@import '@/uni.scss';

	.page-container {
		padding-bottom: 160rpx;
		background-color: $color-secondary;
		min-height: 100vh;
	}

	/* 页面头部 */
	.page-header {
		display: flex;
		align-items: center;
		padding: 30rpx;
		background-color: white;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
	}

	.back-btn {
		margin-right: 20rpx;
	}

	.icon-image {
		width: 40rpx;
		height: 40rpx;
	}

	.page-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
	}

	/* 加载状态 */
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 100rpx 0;
	}

	.loading-text {
		font-size: 28rpx;
		color: #999;
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
		padding: 120rpx 30rpx;
	}

	.empty-icon {
		width: 120rpx;
		height: 120rpx;
		margin-bottom: 30rpx;
		opacity: 0.6;
	}

	.empty-text {
		font-size: 32rpx;
		color: #999;
		margin-bottom: 10rpx;
	}

	.empty-desc {
		font-size: 26rpx;
		color: #ccc;
	}

	/* 新增地址按钮 */
	.add-address-btn {
		position: fixed;
		bottom: 60rpx;
		left: 30rpx;
		right: 30rpx;
		background: linear-gradient(135deg, $color-primary, $color-highlight);
		border-radius: 20rpx;
		padding: 32rpx;
		text-align: center;
		box-shadow: 0 8rpx 20rpx rgba(188, 71, 73, 0.3);
	}

	.btn-text {
		color: white;
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
		z-index: 1000;
		display: flex;
		align-items: flex-end;
	}

	.form-overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.form-container {
		background-color: white;
		width: 100%;
		max-height: 80vh;
		border-radius: 30rpx 30rpx 0 0;
		position: relative;
		overflow-y: auto;
	}

	.form-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 30rpx 20rpx;
		border-bottom: 1px solid #f0f0f0;
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
		padding: 30rpx;
	}

	.form-item {
		margin-bottom: 40rpx;
	}

	.form-label {
		display: block;
		font-size: 28rpx;
		color: $color-dark;
		margin-bottom: 15rpx;
		font-weight: 500;
	}

	.form-input {
		width: 100%;
		padding: 24rpx;
		border: 1px solid #e0e0e0;
		border-radius: 12rpx;
		font-size: 28rpx;
		color: $color-dark;
		background-color: #fafafa;
	}

	.form-input:focus {
		border-color: $color-primary;
		background-color: white;
	}

	.picker-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 24rpx;
		border: 1px solid #e0e0e0;
		border-radius: 12rpx;
		background-color: #fafafa;
	}

	.placeholder {
		color: #999;
	}

	.form-textarea {
		width: 100%;
		min-height: 120rpx;
		padding: 24rpx;
		border: 1px solid #e0e0e0;
		border-radius: 12rpx;
		font-size: 28rpx;
		color: $color-dark;
		background-color: #fafafa;
		resize: none;
	}

	.form-textarea:focus {
		border-color: $color-primary;
		background-color: white;
	}

	.switch-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.switch-item .form-label {
		margin-bottom: 0;
	}

	/* 表单验证错误 */
	.form-errors {
		margin-top: 20rpx;
		padding: 20rpx;
		background-color: #fef2f2;
		border-radius: 12rpx;
		border-left: 4rpx solid #ef4444;
	}

	.error-text {
		display: block;
		color: #ef4444;
		font-size: 24rpx;
		line-height: 1.5;
		margin-bottom: 5rpx;
	}

	.error-text:last-child {
		margin-bottom: 0;
	}

	/* 表单底部 */
	.form-footer {
		padding: 30rpx;
		border-top: 1px solid #f0f0f0;
	}

	.submit-btn {
		width: 100%;
		background: linear-gradient(135deg, $color-primary, $color-highlight);
		color: white;
		border: none;
		border-radius: 16rpx;
		padding: 32rpx;
		font-size: 32rpx;
		font-weight: 600;
	}

	.submit-btn[disabled] {
		opacity: 0.6;
	}
</style>