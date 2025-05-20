<template>
	<view class="page-container">
		<!-- 商城标题栏 -->
		<view class="shop-header">
			<text class="shop-title">瑶山好物</text>
			<text class="shop-slogan">源自山野，健康自然</text>
		</view>
		
		<view class="content">
			<!-- 搜索栏 -->
			<view class="search-bar">
				<text class="iconfont icon-search"></text>
				<input type="text" placeholder="搜索农产品、特产..." />
			</view>
			
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
				<!-- 商品1 -->
				<view class="product-wrapper" @click="goToProductDetail(1)">
					<view class="product-item">
						<image src="/static2/hCSyEZ4ptM_small.jpg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">瑶族野生鸡蛋 500g</text>
							<text class="product-item-price">¥12</text>
							<view class="product-item-meta">
								<text>销量 586</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.9</text>
								</view>
							</view>
						</view>
					</view>
					<text class="featured-badge">热销</text>
					<view class="add-to-cart" @click.stop="addToCart(1)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
				
				<!-- 商品2 -->
				<view class="product-wrapper" @click="goToProductDetail(2)">
					<view class="product-item">
						<image src="/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">香芋 250g</text>
							<text class="product-item-price">¥6</text>
							<view class="product-item-meta">
								<text>销量 412</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.8</text>
								</view>
							</view>
						</view>
					</view>
					<view class="add-to-cart" @click.stop="addToCart(2)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
				
				<!-- 商品3 -->
				<view class="product-wrapper" @click="goToProductDetail(3)">
					<view class="product-item">
						<image src="/static2/2121F888A69E6932BE26DF9029E_B6C725FA_128671.jpg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">瑶绣</text>
							<text class="product-item-price">¥68</text>
							<view class="product-item-meta">
								<text>销量 356</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.7</text>
								</view>
							</view>
						</view>
					</view>
					<view class="add-to-cart" @click.stop="addToCart(3)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
				
				<!-- 商品4 -->
				<view class="product-wrapper" @click="goToProductDetail(4)">
					<view class="product-item">
						<image src="/static2/90 (1).jpg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">马蹄 500g</text>
							<text class="product-item-price">¥12</text>
							<view class="product-item-meta">
								<text>销量 289</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.9</text>
								</view>
							</view>
						</view>
					</view>
					<text class="featured-badge">有机</text>
					<view class="add-to-cart" @click.stop="addToCart(4)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
				
				<!-- 商品5 -->
				<view class="product-wrapper" @click="goToProductDetail(5)">
					<view class="product-item">
						<image src="/static2/4250555339_919020146.jpg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">瑶族传统刺绣手帕</text>
							<text class="product-item-price">¥58</text>
							<view class="product-item-meta">
								<text>销量 203</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.6</text>
								</view>
							</view>
						</view>
					</view>
					<text class="featured-badge">手工</text>
					<view class="add-to-cart" @click.stop="addToCart(5)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
				
				<!-- 商品6 -->
				<view class="product-wrapper" @click="goToProductDetail(6)">
					<view class="product-item">
						<image src="/static2/3944.jpg_wh860.jpg" class="product-item-image" mode="aspectFill"></image>
						<view class="product-item-details">
							<text class="product-item-name">瑶山野生香菇 200g</text>
							<text class="product-item-price">¥78</text>
							<view class="product-item-meta">
								<text>销量 178</text>
								<view class="product-item-rating">
									<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
									<text>4.8</text>
								</view>
							</view>
						</view>
					</view>
					<view class="add-to-cart" @click.stop="addToCart(6)">
						<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
					</view>
				</view>
			</view>
		</view>
		
		<!-- 购物车浮动按钮 -->
		<view class="cart-fab" @click="goToCart()">
			<image src="/static/icons/shopping icon/shopping-cart-fill.svg"></image>
			<text class="badge">3</text>
		</view>
		
		<!-- 底部导航栏 -->
		<!-- <tab-bar active="shopping"></tab-bar> -->
	</view>
</template>

<script>
	// import TabBar from '@/components/TabBar.vue'
	
	export default {
		components: {
			// TabBar
		},
		data() {
			return {
				
			}
		},
		methods: {
			goToProductDetail(productId) {
				uni.navigateTo({
					url: `/pages/shopping/detail/detail?id=${productId}`
				});
			},
			addToCart(productId) {
				// 阻止事件冒泡，避免同时触发跳转详情页
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				});
			},
			goToCart() {
				uni.navigateTo({
					url: '/pages/shopping/cart/cart'
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page {
		background-color: $color-secondary;
	}
	
	/* 页面容器 */
	.page-container {
		padding-bottom: 50px; /* 为原生tabBar留出空间 */
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
	
	/* 搜索栏 */
	.search-bar {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 16rpx 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2px 5px rgba(56, 102, 65, 0.1);
	}
	
	.search-bar input {
		border: none;
		flex: 1;
		padding: 10rpx;
		font-size: 28rpx;
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
	
	.product-wrapper {
		position: relative;
	}
	
	.product-item {
		background-color: white;
		border-radius: 24rpx;
		overflow: hidden;
		box-shadow: 0 3px 10px rgba(94, 100, 114, 0.08);
		transition: all 0.3s ease;
	}
	
	.product-item-image {
		width: 100%;
		height: 240rpx;
		display: block;
	}
	
	.product-item-details {
		padding: 24rpx;
	}
	
	.product-item-name {
		font-size: 28rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		line-height: 1.3;
		color: $color-dark;
		height: 72rpx;
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.product-item-price {
		font-size: 32rpx;
		font-weight: 700;
		color: $color-primary;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.product-item-meta {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		color: #999;
	}
	
	.product-item-rating {
		display: flex;
		align-items: center;
		margin-right: 60rpx;
	}
	
	.product-item-rating .iconfont {
		color: #FFD700;
		margin-right: 4rpx;
		font-size: 22rpx;
	}
	
	.featured-badge {
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		background-color: $color-primary;
		color: white;
		font-size: 20rpx;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		z-index: 2;
	}
	
	.add-to-cart {
		width: 56rpx;
		height: 56rpx;
		background-color: $color-primary;
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		box-shadow: 0 2px 5px rgba(255, 166, 158, 0.3);
		z-index: 2;
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
</style>