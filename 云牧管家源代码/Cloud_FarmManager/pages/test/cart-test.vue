<template>
	<view class="test-container">
		<view class="test-header">
			<text class="test-title">购物车功能测试</text>
		</view>
		
		<view class="test-section">
			<text class="section-title">当前购物车状态</text>
			<view class="status-info">
				<text>商品总数: {{cartTotalCount}}</text>
				<text>选中数量: {{selectedCount}}</text>
				<text>选中总价: ¥{{selectedTotalPrice}}</text>
			</view>
		</view>
		
		<view class="test-section">
			<text class="section-title">测试商品</text>
			<view class="product-list">
				<view class="test-product" v-for="product in testProducts" :key="product.id">
					<image :src="product.image" class="product-image"></image>
					<view class="product-info">
						<text class="product-name">{{product.name}}</text>
						<text class="product-price">¥{{product.price}}</text>
					</view>
					<button class="add-btn" @click="addToCart(product)">添加到购物车</button>
				</view>
			</view>
		</view>
		
		<view class="test-section">
			<text class="section-title">操作按钮</text>
			<view class="button-group">
				<button class="test-btn" @click="goToCart">查看购物车</button>
				<button class="test-btn" @click="clearCart">清空购物车</button>
				<button class="test-btn" @click="runTest">运行测试</button>
			</view>
		</view>
		
		<view class="test-section">
			<text class="section-title">测试日志</text>
			<scroll-view class="log-container" scroll-y="true">
				<text class="log-item" v-for="(log, index) in logs" :key="index">{{log}}</text>
			</scroll-view>
		</view>
	</view>
</template>

<script setup>
	import { ref, computed, onMounted, onUnmounted, getCurrentInstance } from 'vue'
	
	const { proxy } = getCurrentInstance()
	
	// 响应式数据
	const cartTotalCount = ref(0)
	const selectedCount = ref(0)
	const selectedTotalPrice = ref(0)
	const logs = ref([])
	
	const testProducts = ref([
		{
			id: 1,
			name: '瑶族野生鸡蛋 500g',
			price: 12,
			image: '/static/static2/hCSyEZ4ptM_small.jpg'
		},
		{
			id: 2,
			name: '香芋 250g',
			price: 6,
			image: '/static/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg'
		}
	])
	
	// 添加日志
	const addLog = (message) => {
		const timestamp = new Date().toLocaleTimeString()
		logs.value.unshift(`[${timestamp}] ${message}`)
		if (logs.value.length > 20) {
			logs.value.pop()
		}
	}
	
	// 更新购物车状态显示
	const updateCartStatus = () => {
		cartTotalCount.value = proxy.$cartStore.getTotalCount()
		selectedCount.value = proxy.$cartStore.getSelectedCount()
		selectedTotalPrice.value = proxy.$cartStore.getSelectedTotalPrice()
	}
	
	// 处理购物车更新事件
	const handleCartUpdate = (cartData) => {
		updateCartStatus()
		addLog(`购物车更新: 总数${cartData.totalCount}, 选中${cartData.selectedCount}`)
	}
	
	// 添加商品到购物车
	const addToCart = (product) => {
		const success = proxy.$cartStore.addToCart(product, 1)
		if (success) {
			addLog(`添加商品: ${product.name}`)
			uni.showToast({
				title: '已加入购物车',
				icon: 'success'
			})
		}
	}
	
	// 跳转到购物车
	const goToCart = () => {
		uni.navigateTo({
			url: '/pages/shopping/cart/cart'
		})
	}
	
	// 清空购物车
	const clearCart = () => {
		proxy.$cartStore.clearCart()
		addLog('购物车已清空')
		uni.showToast({
			title: '购物车已清空',
			icon: 'success'
		})
	}
	
	// 运行测试
	const runTest = () => {
		addLog('开始运行测试...')
		
		// 清空购物车
		proxy.$cartStore.clearCart()
		addLog('1. 清空购物车')
		
		// 添加商品
		testProducts.value.forEach((product, index) => {
			proxy.$cartStore.addToCart(product, index + 1)
			addLog(`2.${index + 1} 添加商品: ${product.name} x${index + 1}`)
		})
		
		// 测试选中状态
		proxy.$cartStore.toggleItemSelect(0)
		addLog('3. 取消选中第一个商品')
		
		// 测试全选
		proxy.$cartStore.toggleSelectAll()
		addLog('4. 执行全选操作')
		
		// 测试数量更新
		proxy.$cartStore.updateQuantity(0, 5)
		addLog('5. 更新第一个商品数量为5')
		
		addLog('测试完成!')
	}
	
	// 生命周期
	onMounted(() => {
		updateCartStatus()
		uni.$on('cartUpdated', handleCartUpdate)
		addLog('测试页面已加载')
	})
	
	onUnmounted(() => {
		uni.$off('cartUpdated', handleCartUpdate)
	})
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';
	
	.test-container {
		padding: 30rpx;
		background-color: #f5f5f5;
		min-height: 100vh;
	}
	
	.test-header {
		background-color: white;
		padding: 30rpx;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
		text-align: center;
	}
	
	.test-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
	}
	
	.test-section {
		background-color: white;
		padding: 30rpx;
		border-radius: 16rpx;
		margin-bottom: 30rpx;
	}
	
	.section-title {
		font-size: 32rpx;
		font-weight: 500;
		color: $color-dark;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.status-info {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
	}
	
	.status-info text {
		font-size: 28rpx;
		color: #666;
	}
	
	.product-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}
	
	.test-product {
		display: flex;
		align-items: center;
		padding: 20rpx;
		background-color: #f8f8f8;
		border-radius: 12rpx;
	}
	
	.product-image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 8rpx;
		margin-right: 20rpx;
	}
	
	.product-info {
		flex: 1;
	}
	
	.product-name {
		font-size: 28rpx;
		color: $color-dark;
		display: block;
		margin-bottom: 5rpx;
	}
	
	.product-price {
		font-size: 26rpx;
		color: $color-primary;
		font-weight: 600;
	}
	
	.add-btn {
		background-color: $color-primary;
		color: white;
		border: none;
		border-radius: 20rpx;
		padding: 10rpx 20rpx;
		font-size: 24rpx;
	}
	
	.button-group {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}
	
	.test-btn {
		background-color: $color-primary;
		color: white;
		border: none;
		border-radius: 20rpx;
		padding: 15rpx 30rpx;
		font-size: 28rpx;
	}
	
	.log-container {
		height: 400rpx;
		background-color: #f8f8f8;
		border-radius: 8rpx;
		padding: 20rpx;
	}
	
	.log-item {
		font-size: 24rpx;
		color: #666;
		display: block;
		margin-bottom: 10rpx;
		line-height: 1.4;
	}
</style> 