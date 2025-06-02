<template>
	<view class="page-container">
		<!-- 商城标题栏 -->
		<view class="shop-header">
			<text class="shop-title">瑶山好物</text>
			<text class="shop-slogan">源自山野，健康自然</text>
		</view>

		<view class="content">
			<!-- 搜索栏 -->
			<SearchInputVue placeholderText="搜索农产品,瑶族特产"></SearchInputVue>

			<!-- 分类标签 -->
			<scroll-view class="category-tabs" scroll-x="true" show-scrollbar="false">
				<view class="category-tab active">全部</view>
				<view class="category-tab">农产品</view>
				<view class="category-tab">瑶族特产</view>
				<view class="category-tab">手工艺品</view>
				<view class="category-tab">礼品套装</view>
				<view class="category-tab">茶饮</view>
			</scroll-view>

			<!-- 筛选栏 -->
			<view class="filter-bar">
				<view class="filter-option">
					<text>综合排序</text>
					<image src="/static/icons/shopping icon/chevron-down.svg"></image>
				</view>
				<view class="filter-option">
					<text>销量优先</text>
					<image src="/static/icons/shopping icon/chevron-down.svg"></image>
				</view>
				<view class="filter-option">
					<text>筛选</text>
					<image src="/static/icons/shopping icon/筛选.svg"></image>
				</view>
			</view>

			<!-- 商品列表 -->
			<view class="product-grid">
				<!-- 加载状态 -->
				<view v-if="loading" class="loading-container">
					<text class="loading-text">正在加载商品...</text>
				</view>
				
				<!-- 商品 -->
				<ProductCardVue v-for="product in products" :key="product.id" :product="product" @click="goToProductDetail"
					@addToCart="addToCart"></ProductCardVue>
				
				<!-- 空状态 -->
				<view v-if="!loading && products.length === 0" class="empty-container">
					<text class="empty-text">暂无商品</text>
				</view>

				<!-- 购物车浮动按钮 -->
				<view class="cart-fab" @click="goToCart()">
					<image src="/static/icons/shopping icon/shopping-cart-fill.svg"></image>
					<text class="badge" v-if="cartTotalCount > 0">{{cartTotalCount}}</text>
				</view>

				<!-- 底部导航栏 -->
				<tab-bar active="shopping"></tab-bar>
			</view>
		</view>
	</view>
</template>

<script setup>
	import SearchInputVue from '../../components/SearchInput.vue';
	import ProductCardVue from '../../components/ProductCard.vue';
	import { ref, onMounted, onUnmounted, getCurrentInstance } from 'vue';
	import { getAllProducts } from '../../api/productService.js';
	
	const { proxy } = getCurrentInstance();
	const cartTotalCount = ref(0);
	
	// 使用新的商品数据管理系统 - 改为异步加载
	const products = ref([]);
	const loading = ref(true);

	// 页面加载时初始化购物车数量和商品数据
	onMounted(async () => {
		// 检查用户状态并切换购物车数据
		proxy.$cartStore.switchUser();
		updateCartCount();
		// 监听购物车更新事件
		uni.$on('cartUpdated', handleCartUpdate);
		
		// 异步加载商品数据
		await loadProducts();
	});

	// 加载商品数据
	const loadProducts = async () => {
		try {
			loading.value = true;
			const productList = await getAllProducts();
			products.value = productList;
		} catch (error) {
			console.error('加载商品数据失败:', error);
			uni.showToast({
				title: '加载商品失败',
				icon: 'none'
			});
		} finally {
			loading.value = false;
		}
	};

	// 页面卸载时移除事件监听
	onUnmounted(() => {
		uni.$off('cartUpdated', handleCartUpdate);
	});

	// 处理购物车更新事件
	const handleCartUpdate = (cartData) => {
		cartTotalCount.value = cartData.totalCount;
	};

	// 更新购物车数量显示
	const updateCartCount = () => {
		cartTotalCount.value = proxy.$cartStore.getTotalCount();
	};

	const goToProductDetail = (productId) => {
		uni.navigateTo({
			url: `/pages/shopping/detail/detail?id=${productId}`
		});
	};

	const addToCart = (productId) => {
		// 根据商品ID找到商品信息
		const product = products.value.find(p => p.id === productId);
		if (product) {
			// 添加到购物车
			const success = proxy.$cartStore.addToCart(product, 1);
			if (success) {
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				});
			}
		}
	};

	const goToCart = () => {
		uni.navigateTo({
			url: '/pages/shopping/cart/cart'
		});
	};
</script>

<style lang="scss">
	@import '@/uni.scss';

	page {
		background-color: $color-secondary;
	}

	/* 页面容器 */
	.page-container {
		padding-bottom: 50px;
		/* 为原生tabBar留出空间 */
		width: 100%;
		box-sizing: border-box;
	}

	/* 商城标题栏 */
	.shop-header {
		background-color: $color-accent;
		padding: 30rpx;
		margin-bottom: 30rpx;
		border-radius: 0 0 30rpx 30rpx;
	}

	.shop-title {
		font-weight: 600;
		font-size: 36rpx;
		color: $color-dark;
		display: block;
		margin-bottom: 10rpx;
	}

	.shop-slogan {
		font-size: 28rpx;
		color: $color-dark;
		opacity: 0.8;
		display: block;
	}

	/* 内容区域 */
	.content {
		padding: 0 30rpx 30rpx;
	}

	/* 分类标签 */
	.category-tabs {
		display: flex;
		white-space: nowrap;
		border-bottom: 1px solid rgba(94, 100, 114, 0.1);
		margin-bottom: 30rpx;
		padding: 0 10rpx;
	}

	.category-tab {
		padding: 24rpx 30rpx;
		margin: 0 10rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: $color-dark;
		display: inline-block;
		border-bottom: 6rpx solid transparent;
		transition: all 0.3s ease;
	}

	.category-tab.active {
		color: $color-primary;
		border-bottom-color: $color-primary;
	}

	/* 筛选栏 */
	.filter-bar {
		display: flex;
		justify-content: space-between;
		margin-bottom: 30rpx;
		padding: 10rpx 0;
	}

	.filter-option {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		color: $color-dark;
	}

	.filter-option image {
		width: 24rpx;
		height: 24rpx;
		margin-left: 10rpx;
		vertical-align: middle;
	}

	.filter-option .iconfont {
		margin-left: 6rpx;
		font-size: 24rpx;
	}

	.icon-icon {
		width: 32rpx;
		height: 32rpx;
		display: inline-block;
	}

	/* 商品网格 */
	.product-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30rpx;
		padding-bottom: 40rpx;
	}

	/* 购物车浮动按钮 */
	.cart-fab {
		position: fixed;
		bottom: 160rpx;
		right: 40rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: $color-primary;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 3px 10px rgba(255, 166, 158, 0.4);
		z-index: 10;
		font-size: 40rpx;
	}

	.cart-fab image {
		width: 48rpx;
		height: 48rpx;
	}

	.cart-fab .badge {
		position: absolute;
		top: -10rpx;
		right: -10rpx;
		background-color: $color-dark;
		color: white;
		font-size: 20rpx;
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/* 加载状态 */
	.loading-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.loading-text {
		font-size: 28rpx;
		color: $color-dark;
	}

	/* 空状态 */
	.empty-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}

	.empty-text {
		font-size: 28rpx;
		color: $color-dark;
	}
</style>