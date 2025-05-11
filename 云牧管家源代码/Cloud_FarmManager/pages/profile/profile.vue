<template>
	<view class="page-container">
		<!-- 个人信息头部 -->
		<view class="profile-header">
			<view class="profile-info">
				<image src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" class="profile-avatar"></image>
				<view>
					<text class="profile-name">云养者</text>
					<text class="profile-id">ID: 1001583</text>
					<view class="user-level">
						<text class="level-badge">Lv.3</text>
						<view class="level-progress">
							<view class="level-progress-bar"></view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="profile-stats">
				<view class="profile-stat">
					<text class="stat-value">12</text>
					<text class="stat-label">我的认领</text>
				</view>
				<view class="profile-stat">
					<text class="stat-value">43</text>
					<text class="stat-label">累计订单</text>
				</view>
				<view class="profile-stat">
					<text class="stat-value">2064</text>
					<text class="stat-label">积分</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			<!-- 会员卡 -->
			<view class="profile-vip">
				<view class="vip-info">
					<text class="vip-title">云养卡</text>
					<text class="vip-desc">享专属9折优惠及免运费特权</text>
				</view>
				<button class="vip-button">立即开通</button>
			</view>
			
			<!-- 订单管理 -->
			<view class="menu-section">
				<view class="menu-section-title">订单管理</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/orders')">
					<text class="iconfont icon-shopping-bag menu-icon"></text>
					<text class="menu-label">全部订单</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/orders?type=unpaid')">
					<text class="iconfont icon-credit-card menu-icon"></text>
					<text class="menu-label">待付款</text>
					<text class="notification-count">2</text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/orders?type=unshipped')">
					<text class="iconfont icon-box menu-icon"></text>
					<text class="menu-label">待发货</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/orders?type=unreceived')">
					<text class="iconfont icon-truck menu-icon"></text>
					<text class="menu-label">待收货</text>
					<text class="notification-count">1</text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/orders?type=unreviewed')">
					<text class="iconfont icon-comment-alt menu-icon"></text>
					<text class="menu-label">待评价</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 我的服务 -->
			<view class="menu-section">
				<view class="menu-section-title">我的服务</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/favorites')">
					<text class="iconfont icon-heart menu-icon"></text>
					<text class="menu-label">我的收藏</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/address')">
					<text class="iconfont icon-map-marker-alt menu-icon"></text>
					<text class="menu-label">收货地址</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/history')">
					<text class="iconfont icon-history menu-icon"></text>
					<text class="menu-label">浏览历史</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/farm/my')">
					<text class="iconfont icon-leaf menu-icon"></text>
					<text class="menu-label">我的云养</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/coupons')">
					<text class="iconfont icon-ticket-alt menu-icon"></text>
					<text class="menu-label">我的卡券</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 设置与帮助 -->
			<view class="menu-section">
				<view class="menu-item" @click="contactService">
					<text class="iconfont icon-headset menu-icon"></text>
					<text class="menu-label">在线客服</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/help')">
					<text class="iconfont icon-question-circle menu-icon"></text>
					<text class="menu-label">帮助中心</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="navigateTo('/pages/profile/settings')">
					<text class="iconfont icon-cog menu-icon"></text>
					<text class="menu-label">系统设置</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 退出登录 -->
			<button class="logout-button" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo: {
					avatar: 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
					name: '云养者',
					id: '1001583',
					level: 3,
					progress: 60
				},
				stats: {
					claims: 12,
					orders: 43,
					points: 2064
				}
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			contactService() {
				uni.showToast({
					title: '正在连接客服...',
					icon: 'none'
				});
				// 实际项目中这里应该调用客服接口
			},
			logout() {
				uni.showModal({
					title: '提示',
					content: '确定要退出登录吗？',
					success: (res) => {
						if (res.confirm) {
							// 清除登录状态
							uni.showToast({
								title: '退出成功',
								icon: 'success'
							});
							// 这里应该跳转到登录页面
							setTimeout(() => {
								uni.reLaunch({
									url: '/pages/index/index'
								});
							}, 1500);
						}
					}
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
	
	.page-container {
		padding-bottom: 120rpx;
	}
	
	/* 个人信息头部 */
	.profile-header {
		background-color: $color-dark;
		color: white;
		padding: 50rpx 40rpx;
		border-radius: 0 0 50rpx 50rpx;
		margin-bottom: 40rpx;
	}
	
	.profile-info {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.profile-avatar {
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		border: 6rpx solid white;
		margin-right: 30rpx;
	}
	
	.profile-name {
		font-size: 40rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.profile-id {
		font-size: 28rpx;
		opacity: 0.8;
		display: block;
		margin-bottom: 10rpx;
	}
	
	.user-level {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}
	
	.level-badge {
		background-color: $color-accent;
		color: $color-dark;
		font-size: 24rpx;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
		margin-right: 20rpx;
		font-weight: 600;
	}
	
	.level-progress {
		height: 10rpx;
		background-color: rgba(255, 255, 255, 0.3);
		border-radius: 10rpx;
		width: 200rpx;
		overflow: hidden;
	}
	
	.level-progress-bar {
		height: 100%;
		width: 60%;
		background-color: $color-highlight;
		border-radius: 10rpx;
	}
	
	.profile-stats {
		display: flex;
		justify-content: space-around;
		padding-top: 20rpx;
	}
	
	.profile-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.stat-value {
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 6rpx;
	}
	
	.stat-label {
		font-size: 24rpx;
		opacity: 0.8;
	}
	
	.content {
		padding: 0 30rpx;
	}
	
	/* 会员卡 */
	.profile-vip {
		background: linear-gradient(135deg, $color-highlight, $color-primary);
		padding: 24rpx 30rpx;
		border-radius: 24rpx;
		margin-bottom: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 8rpx 20rpx rgba(188, 71, 73, 0.3);
	}
	
	.vip-info {
		flex: 1;
	}
	
	.vip-title {
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		color: white;
		display: block;
	}
	
	.vip-desc {
		font-size: 24rpx;
		color: white;
		opacity: 0.9;
	}
	
	.vip-button {
		background-color: white;
		color: $color-primary;
		padding: 12rpx 24rpx;
		border-radius: 40rpx;
		font-size: 24rpx;
		font-weight: 600;
		line-height: 1;
	}
	
	/* 菜单部分 */
	.menu-section {
		background-color: white;
		border-radius: 24rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(56, 102, 65, 0.1);
	}
	
	.menu-section-title {
		padding: 30rpx;
		font-size: 32rpx;
		font-weight: 600;
		color: $color-dark;
		border-bottom: 1px solid rgba(56, 102, 65, 0.1);
	}
	
	.menu-item {
		display: flex;
		align-items: center;
		padding: 30rpx;
		border-bottom: 1px solid rgba(56, 102, 65, 0.05);
	}
	
	.menu-item:last-child {
		border-bottom: none;
	}
	
	.menu-icon {
		margin-right: 30rpx;
		color: $color-primary;
		font-size: 36rpx;
		width: 44rpx;
		text-align: center;
	}
	
	.menu-label {
		flex: 1;
		font-size: 30rpx;
		color: $color-dark;
	}
	
	.menu-arrow {
		color: #aaa;
		font-size: 24rpx;
	}
	
	.notification-count {
		background-color: $color-primary;
		color: white;
		font-size: 24rpx;
		padding: 4rpx 16rpx;
		border-radius: 20rpx;
	}
	
	/* 退出按钮 */
	.logout-button {
		display: block;
		margin: 60rpx auto;
		background-color: white;
		color: $color-primary;
		border: 2rpx solid $color-primary;
		border-radius: 20rpx;
		padding: 24rpx 0;
		width: 90%;
		text-align: center;
		font-size: 32rpx;
		font-weight: 500;
	}
	
	/* 图标定义 */
	.iconfont.icon-shopping-bag:before {
		content: '\f290';
	}
	
	.iconfont.icon-credit-card:before {
		content: '\f09d';
	}
	
	.iconfont.icon-box:before {
		content: '\f466';
	}
	
	.iconfont.icon-truck:before {
		content: '\f0d1';
	}
	
	.iconfont.icon-comment-alt:before {
		content: '\f4b6';
	}
	
	.iconfont.icon-heart:before {
		content: '\f004';
	}
	
	.iconfont.icon-map-marker-alt:before {
		content: '\f3c5';
	}
	
	.iconfont.icon-history:before {
		content: '\f1da';
	}
	
	.iconfont.icon-leaf:before {
		content: '\f06c';
	}
	
	.iconfont.icon-ticket-alt:before {
		content: '\f3ff';
	}
	
	.iconfont.icon-headset:before {
		content: '\f590';
	}
	
	.iconfont.icon-question-circle:before {
		content: '\f059';
	}
	
	.iconfont.icon-cog:before {
		content: '\f013';
	}
	
	.iconfont.icon-chevron-right:before {
		content: '\f054';
	}
</style> 