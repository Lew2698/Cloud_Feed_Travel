<template>
	<view class="page-container">
		<!-- 个人信息头部 -->
		<view class="profile-header">
			<!-- 已登录状态 -->
			<view v-if="isLoggedIn" class="profile-info">
				<image :src="currentUserInfo.avatar || '/static/static2/photo-1545167622-3a6ac756afa4.avif'" class="profile-avatar"></image>
				<view>
					<text class="profile-name">{{ currentUserInfo.nickname || currentUserInfo.username || '云养者' }}</text>
					<text class="profile-id">ID: {{ currentUserInfo.userId || '游客' }}</text>
					<view class="user-level">
						<text class="level-badge">Lv.{{ userLevel }}</text>
						<view class="level-progress">
							<view class="level-progress-bar" :style="{ width: userProgress + '%' }"></view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 未登录状态 -->
			<view v-else class="profile-info guest-info">
				<image src="/static/static2/photo-1545167622-3a6ac756afa4.avif" class="profile-avatar guest-avatar"></image>
				<view>
					<text class="profile-name">游客用户</text>
					<text class="profile-id">点击登录享受更多服务</text>
					<button class="login-button" @click="goToLogin">立即登录</button>
				</view>
			</view>
			
			<view class="profile-stats">
				<view class="profile-stat">
					<text class="stat-value">{{ isLoggedIn ? stats.claims : 0 }}</text>
					<text class="stat-label">我的认领</text>
				</view>
				<view class="profile-stat">
					<text class="stat-value">{{ isLoggedIn ? stats.orders : 0 }}</text>
					<text class="stat-label">累计订单</text>
				</view>
				<view class="profile-stat">
					<text class="stat-value">{{ isLoggedIn ? stats.points : 0 }}</text>
					<text class="stat-label">积分</text>
				</view>
			</view>
		</view>
		
		<view class="content">
			<!-- 会员卡 -->
			<view class="profile-vip" v-if="isLoggedIn">
				<view class="vip-info">
					<text class="vip-title">云养卡</text>
					<text class="vip-desc">享专属9折优惠及免运费特权</text>
				</view>
				<button class="vip-button">立即开通</button>
			</view>
			
			<!-- 未登录提示 -->
			<view class="login-prompt" v-if="!isLoggedIn">
				<view class="prompt-content">
					<text class="prompt-title">登录后享受更多服务</text>
					<text class="prompt-desc">• 查看订单状态和历史记录</text>
					<text class="prompt-desc">• 管理收货地址和个人信息</text>
					<text class="prompt-desc">• 获得积分奖励和专属优惠</text>
					<button class="prompt-login-btn" @click="goToLogin">立即登录</button>
				</view>
			</view>
			
			<!-- 订单管理 -->
			<view class="menu-section">
				<view class="menu-section-title">订单管理</view>
				<view class="menu-item" @click="handleMenuClick('orders', '全部订单')">
				  <image class="menu-icon" src="/static/icons/profile icon/shopping-bag (2).svg"></image>
				  <text class="menu-label">全部订单</text>
				  <text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('pending-payment', '待付款')">
					<image class="menu-icon" src="/static/icons/profile icon/credit card-fill.svg"></image>
					<text class="menu-label">待付款</text>
					<text class="notification-count" v-if="isLoggedIn">2</text>
				</view>
				<view class="menu-item" @click="handleMenuClick('pending-shipment', '待发货')">
					<image class="menu-icon" src="/static/icons/profile icon/truck.svg"></image>
					<text class="menu-label">待发货</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('pending-receipt', '待收货')">
					<image class="menu-icon" src="/static/icons/profile icon/history.svg"></image>
					<text class="menu-label">待收货</text>
					<text class="notification-count" v-if="isLoggedIn">1</text>
				</view>
				<view class="menu-item" @click="handleMenuClick('pending-review', '待评价')">
					<image class="menu-icon" src="/static/icons/profile icon/comment-alt.svg"></image>
					<text class="menu-label">待评价</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 我的服务 -->
			<view class="menu-section">
				<view class="menu-section-title">我的服务</view>
				<view class="menu-item" @click="handleMenuClick('favorites', '我的收藏')">
					<image class="menu-icon" src="/static/icons/profile icon/heart-fill.svg"></image>
					<text class="menu-label">我的收藏</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('address', '收货地址')">
					<image class="menu-icon" src="/static/icons/profile icon/定位.svg"></image>
					<text class="menu-label">收货地址</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('history', '浏览历史')">
					<image class="menu-icon" src="/static/icons/profile icon/history.svg"></image>
					<text class="menu-label">浏览历史</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('my-farm', '我的云养')">
					<image class="menu-icon" src="/static/icons/profile icon/leaf.svg"></image>
					<text class="menu-label">我的云养</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('coupons', '我的卡券')">
					<image class="menu-icon" src="/static/icons/profile icon/ticket-alt.svg"></image>
					<text class="menu-label">我的卡券</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 设置与帮助 -->
			<view class="menu-section">
				<view class="menu-item" @click="contactService">
					<image class="menu-icon" src="/static/icons/profile icon/headset-fill.svg"></image>
					<text class="menu-label">在线客服</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('help', '帮助中心')">
					<image class="menu-icon" src="/static/icons/profile icon/question-circle-fill.svg"></image>
					<text class="menu-label">帮助中心</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<view class="menu-item" @click="handleMenuClick('settings', '系统设置')">
					<image class="menu-icon" src="/static/icons/profile icon/cog-fill.svg"></image>
					<text class="menu-label">系统设置</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
				<!-- 测试功能入口 -->
				<view class="menu-item" @click="goToTest">
					<image class="menu-icon" src="/static/icons/profile icon/cog-fill.svg"></image>
					<text class="menu-label">购物车测试</text>
					<text class="iconfont icon-chevron-right menu-arrow"></text>
				</view>
			</view>
			
			<!-- 退出登录 -->
			<button v-if="isLoggedIn" class="logout-button" @click="logout">退出登录</button>
		</view>
	</view>
</template>

<script>
import cartStore from '@/store/cart.js'

export default {
	data() {
		return {
			isLoggedIn: false,
			currentUserInfo: {},
			userLevel: 3,
			userProgress: 60,
			stats: {
				claims: 12,
				orders: 43,
				points: 2064
			}
		}
	},
	onShow() {
		// 页面显示时检查登录状态
		this.checkLoginStatus()
	},
	methods: {
		// 检查登录状态
		checkLoginStatus() {
			try {
				const userToken = uni.getStorageSync('userToken')
				const userInfo = uni.getStorageSync('userInfo')
				
				if (userToken && userInfo) {
					this.isLoggedIn = true
					this.currentUserInfo = userInfo
					// 可以在这里调用API获取最新的用户数据
					this.loadUserData()
				} else {
					this.isLoggedIn = false
					this.currentUserInfo = {}
				}
			} catch (error) {
				console.error('检查登录状态失败:', error)
				this.isLoggedIn = false
				this.currentUserInfo = {}
			}
		},
		
		// 加载用户数据
		loadUserData() {
			// 这里可以调用API获取用户的最新数据
			// 暂时使用模拟数据
			if (this.isLoggedIn) {
				// 可以根据用户等级调整数据
				this.userLevel = 3
				this.userProgress = 60
				this.stats = {
					claims: 12,
					orders: 43,
					points: 2064
				}
			}
		},
		
		// 跳转到登录页面
		goToLogin() {
			uni.navigateTo({
				url: '/pages/login/login'
			});
		},
		
		// 处理菜单点击
		handleMenuClick(type, label) {
			if (!this.isLoggedIn) {
				// 未登录时提示登录
				uni.showModal({
					title: '提示',
					content: '请先登录后再使用此功能',
					confirmText: '去登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							this.goToLogin()
						}
					}
				})
				return
			}
			
			// 已登录时的处理逻辑
			switch (type) {
				case 'orders':
					uni.navigateTo({
						url: '/pages/profile/orders'
					})
					break
				case 'pending-payment':
					uni.navigateTo({
						url: '/pages/profile/orders?type=pending-payment'
					})
					break
				case 'pending-shipment':
					uni.navigateTo({
						url: '/pages/profile/orders?type=pending-shipment'
					})
					break
				case 'pending-receipt':
					uni.navigateTo({
						url: '/pages/profile/orders?type=pending-receipt'
					})
					break
				case 'pending-review':
					uni.navigateTo({
						url: '/pages/profile/orders?type=pending-review'
					})
					break
				case 'favorites':
					uni.navigateTo({
						url: '/pages/profile/favorites'
					})
					break
				case 'address':
					uni.navigateTo({
						url: '/pages/shopping/checkout/address'
					})
					break
				case 'history':
					uni.navigateTo({
						url: '/pages/profile/history'
					})
					break
				case 'my-farm':
					uni.switchTab({
						url: '/pages/farm/farm'
					})
					break
				case 'coupons':
					uni.navigateTo({
						url: '/pages/profile/coupons'
					})
					break
				case 'help':
					uni.navigateTo({
						url: '/pages/profile/help'
					})
					break
				case 'settings':
					uni.navigateTo({
						url: '/pages/profile/settings'
					})
					break
				default:
					uni.showToast({
						title: `${label}功能开发中`,
						icon: 'none'
					})
			}
		},
		
		// 跳转到测试页面
		goToTest() {
			uni.navigateTo({
				url: '/pages/test/cart-user-test'
			})
		},
		
		// 联系客服
		contactService() {
			uni.showToast({
				title: '正在连接客服...',
				icon: 'none'
			});
			// 实际项目中这里应该调用客服接口
		},
		
		// 退出登录
		async logout() {
			uni.showModal({
				title: '提示',
				content: '确定要退出登录吗？',
				success: async (res) => {
					if (res.confirm) {
						try {
							// 获取当前用户token
							const userToken = uni.getStorageSync('userToken');
							
							// 调用云函数退出登录
							if (userToken) {
								await uniCloud.callFunction({
									name: 'user-auth',
									data: {
										action: 'logout',
										token: userToken
									}
								});
							}
							
							// 清除本地存储的用户信息
							uni.removeStorageSync('userToken');
							uni.removeStorageSync('userInfo');
							
							// 通知购物车切换到游客模式
							cartStore.switchUser();
							
							// 更新页面状态
							this.isLoggedIn = false
							this.currentUserInfo = {}
							
							uni.showToast({
								title: '退出成功',
								icon: 'success'
							});
							
						} catch (error) {
							console.error('退出登录失败:', error);
							// 即使云函数调用失败，也要清除本地数据
							uni.removeStorageSync('userToken');
							uni.removeStorageSync('userInfo');
							cartStore.switchUser();
							
							this.isLoggedIn = false
							this.currentUserInfo = {}
							
							uni.showToast({
								title: '退出成功',
								icon: 'success'
							});
						}
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
	
	/* 游客状态样式 */
	.guest-info {
		opacity: 0.8;
	}
	
	.guest-avatar {
		filter: grayscale(50%);
	}
	
	.login-button {
		background: linear-gradient(135deg, $color-primary, $color-highlight);
		color: white;
		border: none;
		border-radius: 20rpx;
		padding: 8rpx 20rpx;
		font-size: 24rpx;
		margin-top: 10rpx;
	}
	
	/* 登录提示卡片 */
	.login-prompt {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		border-radius: 24rpx;
		margin-bottom: 40rpx;
		padding: 30rpx;
		box-shadow: 0 8rpx 20rpx rgba(102, 126, 234, 0.3);
	}
	
	.prompt-content {
		color: white;
	}
	
	.prompt-title {
		font-size: 32rpx;
		font-weight: 600;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.prompt-desc {
		font-size: 26rpx;
		margin-bottom: 10rpx;
		opacity: 0.9;
		display: block;
		line-height: 1.5;
	}
	
	.prompt-login-btn {
		background-color: white;
		color: #667eea;
		border: none;
		border-radius: 20rpx;
		padding: 16rpx 40rpx;
		font-size: 28rpx;
		font-weight: 600;
		margin-top: 20rpx;
		width: 200rpx;
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
	  width: 44rpx;  /* 图标宽度 */
	  height: 44rpx; /* 图标高度 */
	  object-fit: contain;  /* 保持图标比例 */
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