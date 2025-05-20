<template>
	<view class="page-container">
		<!-- 标题栏 -->
		<view class="welcome-header">
			<text class="welcome-text">云养空间</text>
			<text class="subtitle">你的每一次点击，都在参与真实养殖</text>
		</view>
		
		<view class="content">
			<!-- 能量值和进度 -->
			<view class="energy-bar">
				<view class="flex justify-between items-center">
					<view>
						<view class="flex items-center">
							<text class="energy-value">258</text>
							<text class="badge">+25</text>
						</view>
						<text class="energy-desc">今日云养能量</text>
					</view>
					<view class="energy-icon">
						<image src="/static/icons/shopping icon/seeding.svg" class="seeding-icon"></image>
					</view>
				</view>
				<view class="energy-progress">
					<view class="energy-fill"></view>
				</view>
				<text class="energy-next">距离下一级: 72能量</text>
			</view>
			
			<!-- 农场数据 -->
			<view class="farm-footer">
				<view class="farm-stats">
					<text class="stats-value">8</text>
					<text class="stats-label">已认领</text>
				</view>
				<view class="farm-stats">
					<text class="stats-value">3</text>
					<text class="stats-label">待收获</text>
				</view>
				<view class="farm-stats">
					<text class="stats-value">12kg</text>
					<text class="stats-label">总收益</text>
				</view>
				<view class="farm-stats">
					<text class="stats-value">35天</text>
					<text class="stats-label">平均周期</text>
				</view>
			</view>
			
			<!-- 四个功能模块 -->
			<view class="farm-modules">
				<view class="farm-module" @click="navigateTo('/pages/farm/new')">
					<image src="/static/icons/cloud-farm icon/fas fa-plus-circle (1).svg" class="icon-icon" mode="widthFix" />
					<text class="module-title">认领新家禽农作物</text>
				</view>
				<view class="farm-module" @click="navigateTo('/pages/farm/my')">
					<image src="/static/icons/cloud-farm icon/ticket-alt.svg" class="icon-icon" mode="widthFix" />
					<text class="module-title">查看我的认领</text>
				</view>
				<view class="farm-module" @click="navigateTo('/pages/farm/monitor')">
					<image src="/static/icons/cloud-farm icon/video-fill.svg" class="icon-icon" mode="widthFix" />
					<text class="module-title">实时养殖监控</text>
				</view>
				<view class="farm-module" @click="navigateTo('/pages/farm/data')">
					<image src="/static/icons/cloud-farm icon/chart-line.svg" class="icon-icon" mode="widthFix" />
					<text class="module-title">生长数据分析</text>
				</view>
			</view>
			
			<!-- 农场记录 -->
			<text class="section-title">最近动态</text>
			<view class="card">
				<view class="list-item">
					<image src="/static/icons/cloud-farm icon/egg.svg" class="else-icon"></image>
					<view class="list-content">
						<text class="list-title">您的散养鸡下蛋了</text>
						<text class="list-time">今天 09:24</text>
					</view>
					<text class="iconfont icon-angle-right list-arrow"></text>
				</view>
				<view class="list-item">
					<image src="/static/icons/cloud-farm icon/seeding.svg" style="width: 35rpx; height: 50rpx;" class="else-icon"></image>
					<view class="list-content">
						<text class="list-title">有机水稻进入抽穗期</text>
						<text class="list-time">昨天 15:30</text>
					</view>
					<text class="iconfont icon-angle-right list-arrow"></text>
				</view>
				<view class="list-item">
					<image src="/static/icons/cloud-farm icon/Apple.svg" class="else-icon"></image>
					<view class="list-content">
						<text class="list-title">果树开始挂果</text>
						<text class="list-time">前天 12:15</text>
					</view>
					<text class="iconfont icon-angle-right list-arrow"></text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
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
	
	/* 欢迎栏 */
	.welcome-header {
		background-color: $color-accent;
		padding: 30rpx;
		border-radius: 0 0 30rpx 30rpx;
		margin-bottom: 30rpx;
	}
	
	.welcome-text {
		font-weight: 600;
		font-size: 36rpx;
		color: $color-dark;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.subtitle {
		font-size: 28rpx;
		color: $color-dark;
		opacity: 0.8;
		display: block;
	}
	
	/* 内容区域 */
	.content {
		padding: 0 30rpx 30rpx;
	}
	
	/* 能量条 */
	.energy-bar {
		background-color: white;
		border-radius: 30rpx;
		padding: 30rpx;
		box-shadow: 0 4px 10px rgba(94, 100, 114, 0.1);
		margin-bottom: 30rpx;
	}
	
	.energy-value {
		font-size: 48rpx;
		font-weight: 700;
		color: $color-primary;
	}
	
	.badge {
		display: inline-block;
		background-color: $color-primary;
		color: white;
		font-size: 24rpx;
		font-weight: 600;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		margin-left: 10rpx;
	}
	
	.energy-desc {
		font-size: 24rpx;
		color: #777;
		display: block;
		margin-top: 6rpx;
	}
	
	.energy-icon {
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(167, 201, 87, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.energy-icon .iconfont {
		font-size: 40rpx;
		color: $color-highlight;
	}
	
	.energy-progress {
		width: 100%;
		height: 20rpx;
		background-color: #eee;
		border-radius: 20rpx;
		overflow: hidden;
		margin-top: 20rpx;
	}
	
	.energy-fill {
		height: 100%;
		background-color: $color-accent;
		width: 70%;
		border-radius: 20rpx;
	}
	
	.energy-next {
		font-size: 24rpx;
		color: #777;
		text-align: right;
		display: block;
		margin-top: 10rpx;
	}
	
	/* 农场数据 */
	.farm-footer {
		display: flex;
		justify-content: space-between;
		padding: 30rpx;
		background-color: white;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4px 10px rgba(94, 100, 114, 0.1);
	}
	
	.farm-stats {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.stats-value {
		font-weight: 700;
		color: $color-dark;
		font-size: 36rpx;
		line-height: 1.2;
	}
	
	.stats-label {
		font-size: 24rpx;
		color: #777;
		margin-top: 6rpx;
	}
	
	/* 功能模块 */
	.farm-modules {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 30rpx;
		margin-bottom: 40rpx;
	}
	
	.farm-module {
		background-color: white;
		border-radius: 30rpx;
		padding: 30rpx;
		box-shadow: 0 4px 10px rgba(94, 100, 114, 0.1);
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition: all 0.3s ease;
		height: 240rpx;
	}
	
	.module-icon {
		font-size: 56rpx;
		margin-bottom: 20rpx;
	}
	
	.farm-module:nth-child(1) .module-icon {
		color: $color-primary;
	}
	
	.farm-module:nth-child(2) .module-icon {
		color: $color-highlight;
	}
	
	.farm-module:nth-child(3) .module-icon {
		color: $color-accent;
	}
	
	.farm-module:nth-child(4) .module-icon {
		color: $color-dark;
	}
	
	.module-title {
		font-weight: 600;
		font-size: 28rpx;
		color: $color-dark;
		line-height: 1.4;
	}
	
	/* 动态列表 */
	.section-title {
		font-size: 36rpx;
		font-weight: 600;
		margin: 20rpx 0;
		color: $color-dark;
		display: block;
	}
	
	.card {
		background-color: white;
		border-radius: 30rpx;
		overflow: hidden;
		box-shadow: 0 4px 10px rgba(94, 100, 114, 0.1);
	}
	
	.list-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1px solid rgba(0, 0, 0, 0.05);
	}
	
	.list-item:last-child {
		border-bottom: none;
	}
	
	.list-icon {
		margin-right: 20rpx;
		font-size: 40rpx;
	}
	
	.list-item:nth-child(1) .list-icon {
		color: $color-primary;
	}
	
	.list-item:nth-child(2) .list-icon {
		color: $color-accent;
	}
	
	.list-item:nth-child(3) .list-icon {
		color: $color-highlight;
	}
	
	.list-content {
		margin-left: 10rpx;
	}
	
	.list-title {
		font-weight: 600;
		font-size: 28rpx;
		color: $color-dark;
		display: block;
	}
	
	.list-time {
		font-size: 24rpx;
		color: #777;
		display: block;
		margin-top: 6rpx;
	}
	
	.list-arrow {
		color: #ccc;
		font-size: 32rpx;
	}
	
	.flex {
		display: flex;
	}
	
	.justify-between {
		justify-content: space-between;
	}
	
	.items-center {
		align-items: center;
	}
	.icon-icon {
	  width: 60rpx;
	  height: 60rpx;
	  display: inline-block;
	  transform: translateY(-10rpx);
	}
	.seeding-icon{
		width:50rpx;
		height:50rpx;
	}
	.else-icon{
		width:30rpx;
		height:30rpx;
	}
</style> 