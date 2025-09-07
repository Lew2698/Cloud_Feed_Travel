<template>
	<view class="page-container">
		<!-- 购物车标题栏 -->
		<view class="cart-header">
			<navigator open-type="navigateBack" class="back-icon">
				<view class="back-icon">
					<image src="/static/icons/shopping icon/icon-arrow-left备份.svg" class="icon-svg"></image>
				</view>
			</navigator>
			<text class="header-title">购物车</text>
		</view>

		<view class="cart-container">
			<!-- 满减促销信息 -->
			<view class="promotion-bar">
				<view class="back-icon">
					<image src="/static/tabbar/shopping-bag (2).svg" class="icon-svg"></image>
				</view>
				<text>全场满199元立减30元，满299元立减50元</text>
			</view>

			<!-- 购物车有商品时显示 -->
			<block v-if="cartItems.length > 0">
				<!-- 购物车项目标题 -->
				<view class="cart-section-title">
					<view class="back-icon">
						<image src="/static/tabbar/shopping-bag (2).svg" class="icon-svg"></image>
					</view>
					<text>瑶山好物 ({{ cartItems.length }}件商品)</text>
				</view>

				<!-- 购物车商品列表 -->
				<CartItem v-for="(item, index) in cartItems" :key="item.id + '_' + index" :item="item" :index="index"
					@toggle-select="toggleItemSelect" @decrease-quantity="decreaseQuantity"
					@increase-quantity="increaseQuantity" @quantity-change="onQuantityChange"
					@remove-item="removeItem" />

				<!-- 猜你喜欢 -->
				<view class="cart-recommendations">
					<view class="recommendations-title">猜你喜欢</view>
					<view class="recommendations-grid">
						<view class="recommendation-item" v-for="(item, index) in recommendItems" :key="index"
							@click="addToCartFromRecommend(item)">
							<image :src="item.image" :alt="item.name" class="recommendation-image"></image>
							<text class="recommendation-name">{{ item.name }}</text>
							<text class="recommendation-price">¥{{ item.price }}</text>
						</view>
					</view>
				</view>
			</block>

			<!-- 空购物车状态 -->
			<view class="empty-cart" v-if="cartItems.length === 0">
				<text class="iconfont icon-shopping-cart empty-cart-icon"></text>
				<text class="empty-cart-text">购物车还是空的，去挑选心仪的商品吧~</text>
				<view class="go-shopping-btn" @click="goShopping">去购物</view>
			</view>
		</view>

		<!-- 底部结算栏 -->
		<view class="cart-footer" v-if="cartItems.length > 0">
			<view class="select-all" @click="toggleSelectAll">
				<view class="custom-checkbox" :class="{ checked: isAllSelected }">
					<image src="/static/icons/shopping icon/check.svg" v-if="isAllSelected"></image>
				</view>
				<text>全选</text>
			</view>
			<view class="cart-total">
				<text class="total-price">¥{{ totalPrice }}</text>
				<text class="price-details">总计: ¥{{ totalPrice }} · 已优惠: ¥{{ discount }}</text>
			</view>
			<view class="checkout-btn" @click="checkout">结算({{ selectedCount }})</view>
		</view>
	</view>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useCartStore } from '@/stores/cart.js'
import CartItem from '@/components/CartItem.vue'

// 使用Pinia store
const cartStore = useCartStore()

// 响应式数据
const cartItems = ref([])
const discount = ref(3)

const recommendItems = ref([
	{
		id: 4,
		name: '瑶山野生香菇',
		price: 78,
		image: '/static/static2/3944.jpg_wh860.jpg'
	},
	{
		id: 5,
		name: '瑶山古法山茶油',
		price: 188,
		image: '/static/static2/v2-a582c6ef03ee0473ff546458328c18b6_720w.png'
	},
	{
		id: 6,
		name: '瑶山有机稻米',
		price: 128,
		image: '/static/static2/photo-1515339760107-1952b7a08454.avif'
	}
])

// 计算属性 - 基于本地响应式数据计算
const selectedCount = computed(() => {
	return cartItems.value
		.filter(item => item.selected)
		.reduce((total, item) => total + item.quantity, 0)
})

const totalPrice = computed(() => {
	return cartItems.value
		.filter(item => item.selected)
		.reduce((total, item) => total + item.price * item.quantity, 0)
})

const isAllSelected = computed(() => {
	return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
})

// 加载购物车数据
const loadCartData = async () => {
	// 直接使用cartStore的响应式数据
	cartItems.value = JSON.parse(JSON.stringify(cartStore.cartItems)) // 深拷贝确保响应式
	await nextTick() // 确保DOM更新
}

// 处理购物车更新事件
const handleCartUpdate = async () => {
	await loadCartData()
}

// 切换商品选中状态
const toggleItemSelect = async (index) => {
	cartStore.toggleItemSelect(index)
	await loadCartData() // 立即更新本地数据
}

// 切换全选
const toggleSelectAll = async () => {
	cartStore.toggleSelectAll()
	await loadCartData() // 立即更新本地数据
}

// 减少商品数量
const decreaseQuantity = async (index) => {
	const item = cartItems.value[index]
	if (item.quantity > 1) {
		cartStore.updateQuantity(index, item.quantity - 1)
		await loadCartData() // 立即更新本地数据
	} else {
		uni.showModal({
			title: '提示',
			content: '确定要移除该商品吗？',
			success: async (res) => {
				if (res.confirm) {
					await removeItem(index)
				}
			}
		})
	}
}

// 增加商品数量
const increaseQuantity = async (index) => {
	const item = cartItems.value[index]
	cartStore.updateQuantity(index, item.quantity + 1)
	await loadCartData() // 立即更新本地数据
}

// 处理数量输入框变化
const onQuantityChange = async (index, newQuantity) => {
	if (newQuantity > 0) {
		cartStore.updateQuantity(index, newQuantity)
		await loadCartData() // 立即更新本地数据
	} else {
		await removeItem(index)
	}
}

// 移除商品
const removeItem = async (index) => {
	return new Promise((resolve) => {
		uni.showModal({
			title: '提示',
			content: '确定要移除该商品吗？',
			success: async (res) => {
				if (res.confirm) {
					cartStore.removeItem(index)
					await loadCartData() // 立即更新本地数据
				}
				resolve()
			}
		})
	})
}

// 从推荐添加商品
const addToCartFromRecommend = async (item) => {
	const success = cartStore.addToCart(item, 1)
	if (success) {
		await loadCartData() // 立即更新本地数据
		uni.showToast({
			title: '已加入购物车',
			icon: 'success'
		})
	}
}

// 跳转到商城页面
const goShopping = () => {
	uni.switchTab({
		url: '/pages/shopping/shopping'
	})
}

// 结算
const checkout = () => {
	if (selectedCount.value === 0) {
		uni.showToast({
			title: '请选择商品',
			icon: 'none'
		})
		return
	}

	// 获取选中的商品
	const selectedItems = cartStore.selectedItems
	console.log(selectedItems)

	// 将选中的商品数据传递到结算页面
	uni.setStorageSync('checkout_items', selectedItems)

	// 跳转到确认订单页面
	uni.navigateTo({
		url: '/pages/shopping/checkout/checkout'
	})
}

// 生命周期
onMounted(async () => {
	// 检查用户状态并切换购物车数据
	cartStore.switchUser()
	await loadCartData()
	// 监听购物车更新事件
	uni.$on('cartUpdated', handleCartUpdate)
})

onUnmounted(() => {
	// 移除事件监听
	uni.$off('cartUpdated', handleCartUpdate)
})

// 页面显示时刷新购物车数据
onShow(async () => {
	await loadCartData()
})
</script>

<style lang="scss">
@import '@/uni.scss';

page {
	background-color: #f5f5f5;
}

.page-container {
	padding-bottom: 120rpx;
}

/* 购物车标题栏 */
.cart-header {
	display: flex;
	align-items: center;
	padding: 30rpx;
	background-color: #FFFFFF;
	position: sticky;
	top: 0;
	z-index: 100;
}

.back-icon {
	margin-right: 20rpx;
	width: 60rpx;
	height: 60rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}

.iconfont.icon-arrow-left:before {
	content: '\f060';
	color: $color-dark;
	font-size: 32rpx;
}

.header-title {
	font-size: 36rpx;
	font-weight: 600;
	color: $color-dark;
	flex: 1;
	text-align: center;
	margin-right: 60rpx;
}

/* 购物车容器 */
.cart-container {
	min-height: calc(100vh - 300rpx);
}

/* 促销信息栏 */
.promotion-bar {
	background-color: #FFF2F0;
	color: $color-primary;
	padding: 20rpx 30rpx;
	font-size: 26rpx;
	display: flex;
	align-items: center;
}

.iconfont.icon-tags:before {
	content: '\f02c';
	margin-right: 10rpx;
}

/* 购物车分区标题 */
.cart-section-title {
	padding: 30rpx;
	font-size: 32rpx;
	font-weight: 500;
	color: $color-dark;
	display: flex;
	align-items: center;
}

.iconfont.icon-shopping-bag:before {
	content: '\f290';
	color: $color-primary;
	margin-right: 16rpx;
}

/* 购物车商品项 */
.cart-item {
	background-color: white;
	padding: 30rpx;
	margin-bottom: 20rpx;
	display: flex;
	position: relative;
}

.item-checkbox {
	margin-right: 20rpx;
	display: flex;
	align-items: center;
}

.custom-checkbox {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	border: 2rpx solid #ddd;
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
}

.custom-checkbox.checked {
	background-color: $color-primary;
	border-color: $color-primary;
}

.iconfont.icon-check:before {
	content: '\f00c';
	font-size: 24rpx;
}

.item-image {
	width: 160rpx;
	height: 160rpx;
	border-radius: 16rpx;
	margin-right: 30rpx;
	background-color: #f5f5f5;
}

.item-info {
	flex: 1;
}

.item-name {
	font-size: 32rpx;
	font-weight: 500;
	color: $color-dark;
	margin-bottom: 10rpx;
	display: block;
}

.item-specs {
	font-size: 24rpx;
	color: #777;
	margin-bottom: 16rpx;
	padding: 6rpx 16rpx;
	background-color: #f5f5f5;
	border-radius: 20rpx;
	display: inline-block;
}

.item-price-section {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.item-price {
	font-size: 32rpx;
	font-weight: 600;
	color: $color-primary;
}

.quantity-control {
	display: flex;
	align-items: center;
	border: 2rpx solid #eee;
	border-radius: 40rpx;
	overflow: hidden;
}

.quantity-btn {
	width: 56rpx;
	height: 56rpx;
	background-color: #f8f8f8;
	color: $color-dark;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 28rpx;
}

.quantity-input {
	width: 80rpx;
	height: 56rpx;
	border: none;
	text-align: center;
	font-size: 28rpx;
	color: $color-dark;
	background-color: white;
}

.item-actions {
	position: absolute;
	right: 30rpx;
	top: 30rpx;
	font-size: 36rpx;
	color: #ccc;
}

.iconfont.icon-trash-alt:before {
	content: '\f2ed';
}

/* 推荐商品 */
.cart-recommendations {
	background-color: white;
	padding: 30rpx;
	margin-top: 30rpx;
}

.recommendations-title {
	font-size: 32rpx;
	font-weight: 500;
	color: $color-dark;
	margin-bottom: 30rpx;
}

.recommendations-grid {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.recommendation-item {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.recommendation-image {
	width: 100%;
	aspect-ratio: 1;
	border-radius: 16rpx;
	object-fit: cover;
	margin-bottom: 10rpx;
	background-color: #f5f5f5;
}

.recommendation-name {
	font-size: 24rpx;
	color: $color-dark;
	text-align: center;
	margin-bottom: 10rpx;
	height: 72rpx;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.recommendation-price {
	font-size: 26rpx;
	color: $color-primary;
	font-weight: 600;
}

/* 底部结算栏 */
.cart-footer {
	display: flex;
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: white;
	padding: 24rpx 30rpx;
	box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.1);
	z-index: 100;
	align-items: center;
}

.select-all {
	display: flex;
	align-items: center;
	font-size: 28rpx;
	color: $color-dark;
	margin-right: 30rpx;
}

.select-all .custom-checkbox {
	margin-right: 10rpx;
}

.cart-total {
	flex: 1;
	text-align: right;
	padding-right: 30rpx;
}

.total-price {
	font-size: 36rpx;
	font-weight: 600;
	color: $color-primary;
	margin-bottom: 6rpx;
	display: block;
}

.price-details {
	font-size: 24rpx;
	color: #999;
}

.checkout-btn {
	width: 240rpx;
	height: 80rpx;
	background-color: $color-primary;
	color: white;
	border-radius: 40rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	font-weight: 500;
}

/* 空购物车 */
.empty-cart {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 120rpx 30rpx;
}

.empty-cart-icon {
	font-size: 120rpx;
	color: #ccc;
	margin-bottom: 40rpx;
}

.iconfont.icon-shopping-cart:before {
	content: '\f07a';
}

.empty-cart-text {
	font-size: 32rpx;
	color: #999;
	margin-bottom: 60rpx;
}

.go-shopping-btn {
	background-color: $color-primary;
	color: white;
	padding: 20rpx 50rpx;
	border-radius: 40rpx;
	font-size: 30rpx;
	font-weight: 500;
}

.icon-svg {
	width: 40rpx;
	height: 40rpx;
}

.back-icon {
	margin-left: -10rpx; // 或其他你需要的值
}
</style>