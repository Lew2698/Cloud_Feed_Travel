<template>
	<view class="page-container">
		<!-- 页面头部 -->
		<view class="page-header">
			<view class="back-btn" @click="goBack">
				<image src="/static/icons/shopping icon/icon-arrow-left备份.svg" class="icon-image"></image>
			</view>
			<text class="page-title">确认订单</text>
		</view>

		<!-- 收货地址 -->
		<view class="address-section" @click="navigateToAddress">
			<view class="section-content" v-if="selectedAddress && selectedAddress._id">
				<AddressItem :address="selectedAddress" :showActions="false" />
			</view>
			<view class="section-content no-address" v-else>
				<image src="/static/icons/shopping icon/location.svg" class="address-icon"></image>
				<text class="add-address-text">请选择收货地址</text>
				<image src="/static/icons/shopping icon/chevron-right.svg" class="icon-image"></image>
			</view>
		</view>

		<!-- 订单商品 -->
		<view class="order-section">
			<view class="section-title">订单商品</view>
			<view class="section-content">
				<CheckoutItem v-for="(item, index) in orderItems" :key="index" :item="item" />
			</view>
		</view>

		<!-- 金额详情 -->
		<view class="price-section">
			<view class="section-title">金额详情</view>
			<view class="section-content">
				<view class="price-item">
					<text class="price-label">商品金额</text>
					<text class="price-value">¥{{ totalProductPrice.toFixed(2) }}</text>
				</view>
				<view class="price-item">
					<text class="price-label">运费</text>
					<text class="price-value">¥{{ shippingFee.toFixed(2) }}</text>
				</view>
				<view class="price-item">
					<text class="price-label">优惠券</text>
					<text class="price-value">-¥{{ discountAmount.toFixed(2) }}</text>
				</view>
				<view class="price-item total">
					<text class="price-label">实付金额</text>
					<text class="price-value">¥{{ totalAmount.toFixed(2) }}</text>
				</view>
			</view>
		</view>

		<!-- 支付方式 -->
		<view class="payment-section">
			<view class="section-title">支付方式</view>
			<view class="section-content">
				<radio-group @change="onPaymentChange">
					<label class="payment-option" v-for="(method, index) in paymentMethods" :key="index">
						<view class="payment-option-info">
							<image :src="method.icon" class="payment-icon"></image>
							<text class="payment-name">{{ method.name }}</text>
						</view>
						<radio :value="method.id" :checked="method.id === selectedPayment" color="#bc4749" />
					</label>
				</radio-group>
			</view>
		</view>

		<!-- 订单备注 -->
		<view class="remark-section">
			<view class="section-title">订单备注</view>
			<view class="section-content">
				<textarea class="remark-input" placeholder="请输入订单备注（选填）" v-model="orderRemark" maxlength="100" />
				<text class="remark-count">{{ orderRemark.length }}/100</text>
			</view>
		</view>

		<!-- 底部结算栏 -->
		<view class="checkout-bar">
			<view class="total-price">
				<text class="total-price-label">合计：</text>
				<text class="total-price-value">¥{{ totalAmount.toFixed(2) }}</text>
			</view>
			<button class="checkout-btn" @click="submitOrder" :disabled="submitting">
				{{ submitting ? '提交中...' : '提交订单' }}
			</button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		computed,
		onMounted,
		onUnmounted
	} from 'vue';
	import { useCartStore } from '@/stores/cart.js';
	import AddressItem from '../../../components/AddressItem.vue';
	import CheckoutItem from '../../../components/CheckoutItem.vue';
	import { getDefaultAddress } from '@/api/addressService.js';
	
	// 使用Pinia store
	const cartStore = useCartStore();

	// 订单商品数据 - 从购物车获取
	const orderItems = ref([]);

	// 收货地址
	const selectedAddress = ref(null);
	const addressLoading = ref(false);

	// 支付方式
	const paymentMethods = ref([{
			id: 'wxpay',
			name: '微信支付',
			icon: '/static/icons/shopping icon/wechat-pay.svg'
		},
		{
			id: 'alipay',
			name: '支付宝',
			icon: '/static/icons/shopping icon/alipay.svg'
		}
	]);
	const selectedPayment = ref('wxpay');

	// 订单备注
	const orderRemark = ref('');

	// 提交状态
	const submitting = ref(false);

	// 费用计算
	const shippingFee = ref(10);
	const discountAmount = ref(5);

	// 计算商品总价
	const totalProductPrice = computed(() => {
		return orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
	});

	// 计算订单总金额
	const totalAmount = computed(() => {
		return totalProductPrice.value + shippingFee.value - discountAmount.value;
	});

	// 地址选择事件监听
	const handleAddressSelected = (address) => {
		selectedAddress.value = address;
		console.log('地址已选择:', address);
	};

	// 页面加载时执行
	onMounted(() => {
		// 获取购物车选中的商品和地址信息
		getCartItems();
		loadDefaultAddress();
		
		// 监听地址选择事件
		uni.$on('addressSelected', handleAddressSelected);
	});

	// 页面卸载时清理监听
	onUnmounted(() => {
		uni.$off('addressSelected', handleAddressSelected);
	});

	// 获取购物车选中商品
	const getCartItems = () => {
		try {
			// 从本地存储获取结算商品数据
			const checkoutItems = uni.getStorageSync('checkout_items');
			if (checkoutItems && checkoutItems.length > 0) {
				// 转换数据格式以适配结算页面
				orderItems.value = checkoutItems.map(item => ({
					id: item.id,
					name: item.name,
					spec: item.specs || '默认规格',
					price: item.price,
					quantity: item.quantity,
					image: item.image
				}));
			} else {
				// 如果没有选中商品，返回购物车页面
				uni.showToast({
					title: '请先选择商品',
					icon: 'none'
				});
				setTimeout(() => {
					uni.navigateBack();
				}, 1500);
			}
		} catch (error) {
			console.error('获取结算商品失败:', error);
			uni.showToast({
				title: '获取商品信息失败',
				icon: 'none'
			});
		}
	};

	// 获取默认地址
	const loadDefaultAddress = async () => {
		addressLoading.value = true;
		try {
			const result = await getDefaultAddress();
			
			if (result.code === 200 && result.data) {
				selectedAddress.value = result.data;
				console.log('默认地址已加载:', result.data);
			} else if (result.code === 401) {
				// 未登录，提示用户登录
				uni.showModal({
					title: '提示',
					content: '请先登录后再进行结算',
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
				// 没有默认地址，用户需要添加
				console.log('暂无默认地址');
			}
		} catch (error) {
			console.error('获取默认地址失败:', error);
			uni.showToast({
				title: '获取地址失败',
				icon: 'none'
			});
		} finally {
			addressLoading.value = false;
		}
	};

	// 导航到地址管理页面
	const navigateToAddress = () => {
		uni.navigateTo({
			url: '/pages/shopping/checkout/address'
		});
	};

	// 返回上一页
	const goBack = () => {
		uni.navigateBack();
	};

	// 支付方式变更
	const onPaymentChange = (e) => {
		selectedPayment.value = e.detail.value;
	};

	// 提交订单
	const submitOrder = async () => {
		// 验证必填信息
		if (!selectedAddress.value || !selectedAddress.value._id) {
			uni.showModal({
				title: '提示',
				content: '请选择收货地址',
				confirmText: '去选择',
				success: (res) => {
					if (res.confirm) {
						navigateToAddress();
					}
				}
			});
			return;
		}

		if (orderItems.value.length === 0) {
			uni.showToast({
				title: '购物车为空',
				icon: 'none'
			});
			return;
		}

		// 构建订单数据
		const orderData = {
			items: orderItems.value,
			address: selectedAddress.value,
			payment: selectedPayment.value,
			remark: orderRemark.value,
			totalAmount: totalAmount.value,
			shippingFee: shippingFee.value,
			discountAmount: discountAmount.value,
			createTime: new Date().toISOString()
		};

		console.log('提交订单:', orderData);

		// 提交订单
		submitting.value = true;
		uni.showLoading({
			title: '提交中...'
		});

		try {
			// 模拟提交订单 - 实际项目中应调用订单管理云函数
			await new Promise(resolve => setTimeout(resolve, 2000));
			
			// 从购物车中移除已结算的商品
			// 获取当前购物车商品
			const cartItems = cartStore.cartItems;
			
			// 找到已结算的商品并移除
			orderItems.value.forEach(orderItem => {
				const cartIndex = cartItems.findIndex(cartItem => 
					cartItem.id === orderItem.id && cartItem.selected
				);
				if (cartIndex !== -1) {
					cartStore.removeItem(cartIndex);
				}
			});
			
			// 清除结算商品缓存
			uni.removeStorageSync('checkout_items');
			
			uni.hideLoading();
			uni.showToast({
				title: '订单提交成功',
				icon: 'success'
			});

			// 跳转到订单详情或支付页面
			setTimeout(() => {
				uni.redirectTo({
					url: '/pages/order/detail/detail?orderId=123456'
				});
			}, 1500);

		} catch (error) {
			console.error('提交订单失败:', error);
			uni.hideLoading();
			uni.showToast({
				title: '提交失败，请重试',
				icon: 'error'
			});
		} finally {
			submitting.value = false;
		}
	};
</script>

<style lang="scss">
	@import '@/uni.scss';

	page {
		background-color: $color-secondary;
	}

	.page-container {
		padding-bottom: 120rpx;
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

	/* 通用节模块样式 */
	.address-section,
	.order-section,
	.price-section,
	.payment-section,
	.remark-section {
		background-color: white;
		border-radius: 16rpx;
		margin: 20rpx 30rpx;
		padding: 30rpx;
		box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	}

	.section-title {
		font-size: 30rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 20rpx;
	}

	/* 地址部分 */
	.no-address {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0;
		border: 2rpx dashed #e0e0e0;
		border-radius: 12rpx;
		padding: 30rpx 20rpx;
		background-color: #fafafa;
	}

	.address-icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 15rpx;
		opacity: 0.6;
	}

	.add-address-text {
		font-size: 30rpx;
		color: #666;
		flex: 1;
	}

	/* 金额详情 */
	.price-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16rpx 0;
	}

	.price-label {
		font-size: 28rpx;
		color: #666;
	}

	.price-value {
		font-size: 28rpx;
		color: #333;
	}

	.price-item.total {
		margin-top: 10rpx;
		padding-top: 20rpx;
		border-top: 1rpx dashed #eee;
	}

	.price-item.total .price-label {
		font-weight: 600;
		color: $color-dark;
	}

	.price-item.total .price-value {
		font-size: 32rpx;
		font-weight: 700;
		color: $color-primary;
	}

	/* 支付方式 */
	.payment-option {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.payment-option:last-child {
		border-bottom: none;
	}

	.payment-option-info {
		display: flex;
		align-items: center;
	}

	.payment-icon {
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}

	.payment-name {
		font-size: 28rpx;
		color: $color-dark;
	}

	/* 订单备注 */
	.remark-input {
		width: 100%;
		height: 120rpx;
		background-color: #f8f8f8;
		border-radius: 12rpx;
		padding: 20rpx;
		font-size: 28rpx;
		color: $color-dark;
		box-sizing: border-box;
		border: 1rpx solid #e0e0e0;
	}

	.remark-input:focus {
		border-color: $color-primary;
		background-color: white;
	}

	.remark-count {
		font-size: 24rpx;
		color: #999;
		text-align: right;
		padding: 10rpx 0;
	}

	/* 底部结算栏 */
	.checkout-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 0 30rpx;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.total-price {
		margin-right: 30rpx;
	}

	.total-price-label {
		font-size: 28rpx;
		color: $color-dark;
	}

	.total-price-value {
		font-size: 36rpx;
		font-weight: 700;
		color: $color-primary;
	}

	.checkout-btn {
		background: linear-gradient(135deg, $color-primary, $color-highlight);
		color: white;
		border: none;
		border-radius: 40rpx;
		padding: 0 60rpx;
		height: 72rpx;
		line-height: 72rpx;
		font-size: 28rpx;
		font-weight: 600;
		box-shadow: 0 4rpx 12rpx rgba(188, 71, 73, 0.3);
	}

	.checkout-btn[disabled] {
		opacity: 0.6;
		box-shadow: none;
	}
</style>