<template>
	<view class="test-container">
		<view class="test-header">
			<text class="test-title">购物车用户隔离测试</text>
		</view>

		<!-- 当前用户信息 -->
		<view class="user-info-section">
			<view class="section-title">当前用户信息</view>
			<view class="info-item">
				<text class="info-label">用户ID:</text>
				<text class="info-value">{{ currentUserInfo.userId }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">存储Key:</text>
				<text class="info-value">{{ currentUserInfo.cartKey }}</text>
			</view>
			<view class="info-item">
				<text class="info-label">购物车商品数:</text>
				<text class="info-value">{{ currentUserInfo.itemCount }}</text>
			</view>
		</view>

		<!-- 用户切换测试 -->
		<view class="user-switch-section">
			<view class="section-title">用户切换测试</view>
			<button class="test-button" @click="loginAsUser1">登录为用户1</button>
			<button class="test-button" @click="loginAsUser2">登录为用户2</button>
			<button class="test-button" @click="loginAsGuest">切换为游客</button>
		</view>

		<!-- 购物车操作测试 -->
		<view class="cart-test-section">
			<view class="section-title">购物车操作测试</view>
			<button class="test-button" @click="addTestProduct">添加测试商品</button>
			<button class="test-button" @click="clearCurrentCart">清空当前购物车</button>
			<button class="test-button" @click="viewCartItems">查看购物车商品</button>
		</view>

		<!-- 购物车商品列表 -->
		<view class="cart-items-section" v-if="cartItems.length > 0">
			<view class="section-title">当前购物车商品</view>
			<view class="cart-item" v-for="(item, index) in cartItems" :key="index">
				<text class="item-name">{{ item.name }}</text>
				<text class="item-quantity">数量: {{ item.quantity }}</text>
				<text class="item-price">¥{{ item.price }}</text>
			</view>
		</view>

		<!-- 测试结果 -->
		<view class="test-result-section">
			<view class="section-title">测试结果</view>
			<text class="test-result">{{ testResult }}</text>
		</view>

		<!-- 返回按钮 -->
		<view class="back-section">
			<button class="back-button" @click="goBack">返回</button>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const currentUserInfo = ref({
	userId: '',
	cartKey: '',
	itemCount: 0
})

const cartItems = ref([])
const testResult = ref('等待测试...')

// 更新用户信息显示
const updateUserInfo = () => {
	const userInfo = proxy.$cartStore.getCurrentUserInfo()
	currentUserInfo.value = userInfo
	cartItems.value = proxy.$cartStore.getCartItems()
}

// 模拟登录为用户1
const loginAsUser1 = () => {
	uni.setStorageSync('userInfo', {
		userId: 'user_001',
		username: 'testuser1',
		nickname: '测试用户1'
	})
	uni.setStorageSync('userToken', 'token_user_001')
	
	proxy.$cartStore.switchUser()
	updateUserInfo()
	testResult.value = '已切换到用户1'
}

// 模拟登录为用户2
const loginAsUser2 = () => {
	uni.setStorageSync('userInfo', {
		userId: 'user_002',
		username: 'testuser2',
		nickname: '测试用户2'
	})
	uni.setStorageSync('userToken', 'token_user_002')
	
	proxy.$cartStore.switchUser()
	updateUserInfo()
	testResult.value = '已切换到用户2'
}

// 切换为游客
const loginAsGuest = () => {
	uni.removeStorageSync('userInfo')
	uni.removeStorageSync('userToken')
	
	proxy.$cartStore.switchUser()
	updateUserInfo()
	testResult.value = '已切换到游客模式'
}

// 添加测试商品
const addTestProduct = () => {
	const testProduct = {
		id: Date.now(),
		name: `测试商品_${Date.now()}`,
		price: Math.floor(Math.random() * 100) + 10,
		image: '/static/static2/3944.jpg_wh860.jpg'
	}
	
	const success = proxy.$cartStore.addToCart(testProduct, 1)
	if (success) {
		updateUserInfo()
		testResult.value = `已添加商品: ${testProduct.name}`
	}
}

// 清空当前购物车
const clearCurrentCart = () => {
	proxy.$cartStore.clearCart()
	updateUserInfo()
	testResult.value = '已清空当前用户的购物车'
}

// 查看购物车商品
const viewCartItems = () => {
	updateUserInfo()
	testResult.value = `当前购物车有 ${cartItems.value.length} 件商品`
}

// 返回
const goBack = () => {
	uni.navigateBack()
}

onMounted(() => {
	updateUserInfo()
})
</script>

<style scoped>
.test-container {
	padding: 30rpx;
	background-color: #f5f5f5;
	min-height: 100vh;
}

.test-header {
	text-align: center;
	margin-bottom: 40rpx;
}

.test-title {
	font-size: 36rpx;
	font-weight: bold;
	color: #333;
}

.user-info-section,
.user-switch-section,
.cart-test-section,
.cart-items-section,
.test-result-section,
.back-section {
	background-color: white;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: 600;
	color: #333;
	margin-bottom: 20rpx;
	border-bottom: 2rpx solid #eee;
	padding-bottom: 10rpx;
}

.info-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10rpx 0;
	border-bottom: 1rpx solid #f5f5f5;
}

.info-label {
	font-size: 28rpx;
	color: #666;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.test-button {
	width: 100%;
	height: 80rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: white;
	border: none;
	border-radius: 10rpx;
	font-size: 28rpx;
	margin-bottom: 20rpx;
}

.cart-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx;
	background-color: #f9f9f9;
	border-radius: 10rpx;
	margin-bottom: 10rpx;
}

.item-name {
	font-size: 28rpx;
	color: #333;
	flex: 1;
}

.item-quantity {
	font-size: 24rpx;
	color: #666;
	margin: 0 20rpx;
}

.item-price {
	font-size: 28rpx;
	color: #e74c3c;
	font-weight: 600;
}

.test-result {
	font-size: 28rpx;
	color: #333;
	line-height: 1.6;
	padding: 20rpx;
	background-color: #f0f8ff;
	border-radius: 10rpx;
	border-left: 4rpx solid #667eea;
}

.back-button {
	width: 100%;
	height: 80rpx;
	background-color: #95a5a6;
	color: white;
	border: none;
	border-radius: 10rpx;
	font-size: 28rpx;
}
</style> 