<template>
	<view class="page-container">
		<!-- 欢迎栏 -->
		<view class="welcome-header">
			<text class="welcome-text">欢迎回来，云养者</text>
			<text class="subtitle">今天又是开心的一天</text>
		</view>

		<view class="content">
			<!-- 搜索栏 -->
			<SearchInputVue placeholderText="搜索农产品,活动,服务"></SearchInputVue>

			<!-- 轮播图 -->
			<view class="hero-banner">
				<view class="featured-tag" wx:if="{{true}}">热门</view>
				<image src="/static/static2/photo-1523741543316-beb7fc7023d8.avif" alt="生态农场"></image>
			</view>

			<!-- 快速功能访问 -->
			<view class="quick-access">
				<view class="quick-access-item">
					<view class="quick-access-icon" style="background-color: var(--accent-color);">
						<image src="/static/icons/home icon/seeding.svg" mode="aspectFit" style="width: 100rpx; height: 80rpx;">
						</image>
					</view>
					<text class="quick-access-label">我的认养</text>
				</view>
				<view class="quick-access-item">
					<view class="quick-access-icon" style="background-color: var(--accent-color);">
						<image src="/static/icons/home icon/link.svg" mode="aspectFit" style="width: 80rpx; height: 60rpx;"></image>
					</view>
					<text class="quick-access-label">区块链追溯</text>
				</view>
				<view class="quick-access-item">
					<view class="quick-access-icon" style="background-color: var(--accent-color);">
						<image src="/static/icons/home icon/video.svg" mode="aspectFit" style="width: 80rpx; height: 60rpx;">
						</image>
					</view>
					<text class="quick-access-label">实时监控</text>
				</view>
				<view class="quick-access-item">
					<view class="quick-access-icon" style="background-color: var(--accent-color);">
						<image src="/static/icons/home icon/chart-line.svg" mode="aspectFit" style="width: 80rpx; height: 60rpx;">
						</image>
					</view>
					<text class="quick-access-label">生长数据</text>
				</view>
			</view>

			<!-- 特色栏目 -->
			<view class="featured-section">
				<text class="section-title">瑶族特色文化</text>
				<view class="feature-cards">
					<view class="feature-card">
						<image src="/static/static2/photo-1533900298318-6b8da08a523e.avif" class="feature-image" mode="aspectFill">
						</image>
						<view class="feature-info">
							<text class="feature-title">瑶族服饰展</text>
							<text class="feature-desc">探索千年瑶族传统服饰文化</text>
						</view>
					</view>
					<view class="feature-card">
						<image src="/static/static2/R-C.jpg" class="feature-image" mode="aspectFill"></image>
						<view class="feature-info">
							<text class="feature-title">瑶族山寨游</text>
							<text class="feature-desc">体验原汁原味的瑶族生活</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 产品推荐 -->
			<view class="product-recommendations">
				<text class="section-title">热门农产品</text>
				<view class="product-card">
					<image src="/static/static2/photo-1457296898342-cdd24585d095.avif" class="product-image" mode="aspectFill">
					</image>
					<view class="product-details">
						<text class="product-name">有机水果礼盒</text>
						<text class="product-price">¥188</text>
						<view class="product-meta">
							<text>已售 342</text>
							<text>4.8 <image src="/static/icons/shopping icon/star.svg" class="star-icon"></image></text>
						</view>
					</view>
				</view>
				<view class="product-card">
					<image src="/static/static2/hCSyEZ4ptM_small.jpg" class="product-image" mode="aspectFill"></image>
					<view class="product-details">
						<text class="product-name">瑶族野生鸡蛋</text>
						<text class="product-price">¥128</text>
						<view class="product-meta">
							<text>已售 215</text>
							<text>4.8 <image src="/static/icons/shopping icon/star.svg" class="star-icon"></image></text>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 底部导航栏 -->
		<!-- <tab-bar active="home"></tab-bar> -->
	</view>
</template>

<script>
	// import TabBar from '@/components/TabBar.vue'
	import SearchInputVue from '../../components/SearchInput.vue';
	export default {
		components: {
			SearchInputVue
		},
		data() {

		},
		onLoad() {

		},
		methods: {

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
		padding-bottom: 50px;
		/* 为原生tabBar留出空间 */
		width: 100%;
		box-sizing: border-box;
	}

	/* 欢迎栏 */
	.welcome-header {
		background-color: $color-dark;
		padding: 30rpx;
		border-radius: 0 0 40rpx 40rpx;
	}

	.welcome-text {
		font-size: 40rpx;
		font-weight: 600;
		color: #fff;
		display: block;
	}

	.subtitle {
		font-size: 28rpx;
		color: rgba(255, 255, 255, 0.9);
		display: block;
	}

	/* 内容区域 */
	.content {
		padding: 30rpx;
	}

	/* 轮播图 */
	.hero-banner {
		width: 100%;
		height: 400rpx;
		position: relative;
		overflow: hidden;
		border-radius: 30rpx;
	}

	.hero-banner image {
		width: 100%;
		height: 100%;
	}

	.featured-tag {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		background-color: $color-primary;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		font-weight: 600;
	}

	/* 快速功能访问 */
	.quick-access {
		display: flex;
		justify-content: space-between;
		margin: 70rpx 0;
	}

	.quick-access-item {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.quick-access-icon {
		width: 100rpx;
		height: 100rpx;
		background-color: $color-highlight;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16rpx;
		color: white;
		font-size: 40rpx;
	}

	.quick-access-label {
		font-size: 24rpx;
		text-align: center;
	}

	/* 特色栏目 */
	.featured-section {
		margin: 50rpx 0;
	}

	.section-title {
		font-size: 40rpx;
		font-weight: 600;
		margin-bottom: 30rpx;
		color: $color-dark;
		display: block;
	}

	.feature-cards {
		display: flex;
		justify-content: space-between;
	}

	.feature-card {
		width: 48%;
		background-color: white;
		border-radius: 30rpx;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(94, 100, 114, 0.1);
	}

	.feature-image {
		width: 100%;
		height: 240rpx;
	}

	.feature-info {
		padding: 24rpx;
	}

	.feature-title {
		font-weight: 600;
		font-size: 32rpx;
		margin-bottom: 10rpx;
		color: $color-dark;
		display: block;
	}

	.feature-desc {
		font-size: 24rpx;
		color: #777;
		display: block;
	}

	/* 产品推荐 */
	.product-recommendations {
		margin-top: 50rpx;
	}

	.product-card {
		background-color: white;
		border-radius: 30rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		box-shadow: 0 3px 8px rgba(94, 100, 114, 0.1);
	}

	.product-image {
		width: 100%;
		height: 300rpx;
	}

	.product-details {
		padding: 24rpx;
	}

	.product-name {
		font-weight: 600;
		font-size: 32rpx;
		margin-bottom: 10rpx;
		display: block;
	}

	.product-price {
		font-size: 36rpx;
		color: $color-primary;
		margin-bottom: 10rpx;
		font-weight: 700;
		display: block;
	}

	.product-meta {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: #777;
	}

	.star-icon {
		width: 30rpx;
		height: 30rpx;
	}

	/* 颜色变量 */
	page {
		--primary-color: #{$color-primary};
		/* 鲜红色 */
		--secondary-color: #{$color-secondary};
		/* 浅米色 */
		--accent-color: #{$color-accent};
		/* 浅绿色 */
		--highlight-color: #{$color-highlight};
		/* 中绿色 */
		--dark-color: #{$color-dark};
		/* 深绿色 */
	}
</style>