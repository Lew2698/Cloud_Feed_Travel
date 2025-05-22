<template>
	<view class="page-container">
		<!-- 返回按钮和标题 -->
		<view class="header">
			<navigator open-type="navigateBack" class="back-btn">
				<image src="/static/icons/shopping icon/左箭头2.svg" class="arrow-icon"></image>
			</navigator>
			<text class="header-title">实时监控</text>
		</view>
		
		<view class="content">
			<!-- 标签切换 -->
			<view class="monitor-tabs">
				<view class="monitor-tab" :class="{ active: activeTab === 'poultry' }" @click="activeTab = 'poultry'">家禽监控</view>
				<view class="monitor-tab" :class="{ active: activeTab === 'crops' }" @click="activeTab = 'crops'">农作物监控</view>
			</view>
			
			<!-- 监控选择 -->
			<scroll-view scroll-x class="monitor-selection">
				<view 
					v-for="(item, index) in monitorItems" 
					:key="index"
					class="monitor-item"
					:class="{ active: activeItemId === item.id }"
					@click="activeItemId = item.id"
				>
					<view class="monitor-icon">
						<image :src="item.icon" class="icon-img" mode="widthFix" />
					</view>
					<text class="monitor-name">{{item.name}}</text>
					<text class="monitor-id">{{item.id}}</text>
				</view>
			</scroll-view>
			
			<!-- 视频监控 -->
			<view class="video-container">
				<view class="video-header">
					<text class="video-title">{{currentItem.fullName}}</text>
					<view class="video-status">
						<view class="status-dot"></view>
						<text>实时直播中</text>
					</view>
				</view>
				<image :src="currentItem.liveImage" class="video-feed"></image>
				<view class="video-controls">
					<view class="video-control">
						<text class="iconfont icon-image"></text>
					</view>
					<view class="video-control">
						<text class="iconfont icon-volume-mute"></text>
					</view>
					<view class="video-control">
						<text class="iconfont icon-expand"></text>
					</view>
				</view>
			</view>
			
			<view class="timestamp">最后更新: {{currentTime}}</view>
			
			<!-- 环境信息 -->
			<view class="info-card">
				<view class="info-header">
					<text class="info-title">环境信息</text>
					<view class="info-refresh" @click="refreshData">
						<text class="iconfont icon-sync-alt"></text>
						<text>刷新</text>
					</view>
				</view>
				<view class="info-grid">
					<view class="info-item" v-for="(item, index) in environmentData" :key="index">
						<text class="info-label">{{item.label}}</text>
						<text class="info-value">{{item.value}}</text>
					</view>
				</view>
			</view>
			
			<!-- 养殖信息 -->
			<view class="info-card">
				<view class="info-header">
					<text class="info-title">养殖状况</text>
					<view class="info-refresh" @click="refreshData">
						<text class="iconfont icon-sync-alt"></text>
						<text>刷新</text>
					</view>
				</view>
				<view class="info-grid">
					<view class="info-item" v-for="(item, index) in farmingData" :key="index">
						<text class="info-label">{{item.label}}</text>
						<text class="info-value">{{item.value}}</text>
					</view>
				</view>
			</view>
			
			<!-- 饲养记录 -->
			<text class="section-title">今日饲养记录</text>
			<view class="card">
				<view class="list-item" v-for="(item, index) in feedingRecords" :key="index">
					<image :src="item.icon" class="icon-img" mode="widthFix" />
					<view class="list-content">
						<text class="list-title">{{item.title}}</text>
						<text class="list-time">{{item.time}} | {{item.desc}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 'poultry',
				activeItemId: '#A5831',
				monitorItems: [
					{
						id: '#A5831',
						name: '散养鸡',
						fullName: '瑶山散养鸡 #A5831',
						icon: '/static/icons/monitor icon/kiwi-bird.svg',
						liveImage: '/static/static2/3545.jpg_wh860.jpg',
						type: 'poultry'
					},
					{
						id: '#P3492',
						name: '黑猪',
						fullName: '瑶山黑猪 #P3492',
						icon: '/static/icons/monitor icon/piggy-bank.svg',
						liveImage: '/static/static2/1529152636_835789403.jpg',
						type: 'poultry'
					},
					{
						id: '#G1205',
						name: '土鹅',
						fullName: '瑶山土鹅 #G1205',
						icon: '/static/icons/monitor icon/Swan.svg',
						liveImage: '/static/static2/23674369667344d4b28456a20e2c41ab_th.jpg',
						type: 'poultry'
					},
					{
						id: '#C1001',
						name: '有机玉米',
						fullName: '有机玉米 #C1001',
						icon: '/static/icons/monitor icon/玉米.svg',
						liveImage: '/static/static2/67a2cfed4e91e1a411bbb1ff591cafdc.jpg',
						type: 'crops'
					}
				],
				environmentData: [
					{ label: '温度', value: '23°C' },
					{ label: '湿度', value: '65%' },
					{ label: '光照', value: '良好' },
					{ label: '空气质量', value: '优' }
				],
				farmingData: [
					{ label: '当前体重', value: '1.8kg' },
					{ label: '活动量', value: '正常' },
					{ label: '饮食情况', value: '良好' },
					{ label: '生长状态', value: '健康' }
				],
				feedingRecords: [
					{ 
						icon: '/static/icons/monitor icon/fas fa-utensils 2.svg',
						title: '早间投喂',
						time: '07:30',
						desc: '有机谷物饲料'
					},
					{
						icon: "/static/icons/monitor icon/broom-ball-solid.svg",
						title: '环境清理',
						time: '09:15',
						desc: '养殖区清洁'
					},
					{
						icon: '/static/icons/monitor icon/fas fa-utensils 2.svg',
						title: '午间投喂',
						time: '13:00',
						desc: '蔬菜混合饲料'
					}
				]
			}
		},
		computed: {
			currentTime() {
				const now = new Date();
				const year = now.getFullYear();
				const month = String(now.getMonth() + 1).padStart(2, '0');
				const day = String(now.getDate()).padStart(2, '0');
				const hours = String(now.getHours()).padStart(2, '0');
				const minutes = String(now.getMinutes()).padStart(2, '0');
				const seconds = String(now.getSeconds()).padStart(2, '0');
				
				return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
			},
			currentItem() {
				return this.monitorItems.find(item => item.id === this.activeItemId) || this.monitorItems[0];
			},
			filteredMonitorItems() {
				return this.monitorItems.filter(item => item.type === this.activeTab);
			}
		},
		watch: {
			activeTab(newVal) {
				// 当切换标签时，自动选择该类别的第一个监控项
				const firstItem = this.monitorItems.find(item => item.type === newVal);
				if (firstItem) {
					this.activeItemId = firstItem.id;
				}
			}
		},
		methods: {
			refreshData() {
				uni.showLoading({
					title: '更新中...'
				});
				
				setTimeout(() => {
					// 模拟数据更新
					if (this.activeTab === 'poultry') {
						this.environmentData = [
							{ label: '温度', value: (22 + Math.random() * 3).toFixed(1) + '°C' },
							{ label: '湿度', value: (60 + Math.random() * 10).toFixed(0) + '%' },
							{ label: '光照', value: '良好' },
							{ label: '空气质量', value: '优' }
						];
						
						this.farmingData = [
							{ label: '当前体重', value: (1.7 + Math.random() * 0.3).toFixed(1) + 'kg' },
							{ label: '活动量', value: '正常' },
							{ label: '饮食情况', value: '良好' },
							{ label: '生长状态', value: '健康' }
						];
					} else {
						this.environmentData = [
							{ label: '温度', value: (22 + Math.random() * 3).toFixed(1) + '°C' },
							{ label: '湿度', value: (60 + Math.random() * 10).toFixed(0) + '%' },
							{ label: '土壤湿度', value: (70 + Math.random() * 10).toFixed(0) + '%' },
							{ label: '光照', value: '充足' }
						];
						
						this.farmingData = [
							{ label: '当前高度', value: (80 + Math.random() * 10).toFixed(0) + 'cm' },
							{ label: '叶片数量', value: (12 + Math.random() * 4).toFixed(0) + '片' },
							{ label: '生长状态', value: '良好' },
							{ label: '预计产量', value: '高' }
						];
					}
					
					uni.hideLoading();
					uni.showToast({
						title: '数据已更新',
						icon: 'success'
					});
				}, 1000);
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
		padding-bottom: 100rpx;
	}
	
	.header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
	}
	
	.back-btn {
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
	}
	
	.content {
		padding: 30rpx;
	}
	
	/* 监控标签 */
	.monitor-tabs {
		display: flex;
		margin-bottom: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.monitor-tab {
		flex: 1;
		text-align: center;
		padding: 24rpx;
		transition: all 0.3s ease;
	}
	
	.monitor-tab.active {
		background-color: $color-highlight;
		color: white;
		font-weight: 600;
	}
	
	/* 监控选择栏 */
	.monitor-selection {
		display: flex;
		white-space: nowrap;
		margin-bottom: 30rpx;
	}
	
	.monitor-item {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 200rpx;
		background-color: white;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-right: 20rpx;
		transition: all 0.3s ease;
	}
	
	.monitor-item.active {
		background-color: $color-highlight;
		color: white;
	}
	
	.monitor-icon {
		width: 80rpx;
		height: 80rpx;
		background-color: $color-secondary;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 16rpx;
	}
	
	.monitor-item.active .monitor-icon {
		background-color: white;
	}
	
	.monitor-icon .iconfont {
		font-size: 40rpx;
		color: $color-dark;
	}
	
	.monitor-name {
		font-size: 24rpx;
		font-weight: 600;
		margin-bottom: 4rpx;
	}
	
	.monitor-id {
		font-size: 20rpx;
		color: #777;
	}
	
	.monitor-item.active .monitor-id {
		color: rgba(255, 255, 255, 0.7);
	}
	
	/* 视频监控 */
	.video-container {
		position: relative;
		width: 100%;
		height: 440rpx;
		background-color: #000;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 20rpx;
	}
	
	.video-feed {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.video-header {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), transparent);
		color: white;
		display: flex;
		justify-content: space-between;
		align-items: center;
		z-index: 1;
	}
	
	.video-title {
		font-weight: 600;
		font-size: 32rpx;
	}
	
	.video-status {
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
	
	.status-dot {
		width: 16rpx;
		height: 16rpx;
		background-color: #4CAF50;
		border-radius: 50%;
		margin-right: 10rpx;
	}
	
	.video-controls {
		position: absolute;
		bottom: 30rpx;
		left: 0;
		right: 0;
		display: flex;
		justify-content: center;
		gap: 30rpx;
		z-index: 1;
	}
	
	.video-control {
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(255, 255, 255, 0.3);
		backdrop-filter: blur(5px);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		transition: all 0.3s ease;
	}
	
	.iconfont.icon-image:before {
		content: '\f03e';
	}
	
	.iconfont.icon-volume-mute:before {
		content: '\f6a9';
	}
	
	.iconfont.icon-expand:before {
		content: '\f065';
	}
	
	.timestamp {
		text-align: center;
		font-size: 24rpx;
		color: #777;
		margin-bottom: 30rpx;
	}
	
	/* 信息卡片 */
	.info-card {
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
	}
	
	.info-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}
	
	.info-title {
		font-weight: 600;
		font-size: 32rpx;
		color: $color-dark;
	}
	
	.info-refresh {
		color: $color-highlight;
		font-size: 24rpx;
		display: flex;
		align-items: center;
	}
	
	.iconfont.icon-sync-alt:before {
		content: '\f2f1';
		margin-right: 10rpx;
	}
	
	.info-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
	}
	
	.info-item {
		display: flex;
		flex-direction: column;
	}
	
	.info-label {
		font-size: 24rpx;
		color: #777;
		margin-bottom: 10rpx;
	}
	
	.info-value {
		font-weight: 700;
		color: $color-dark;
		font-size: 28rpx;
	}
	
	/* 饲养记录 */
	.section-title {
		font-size: 32rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.card {
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
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
	
	.list-item .iconfont {
		margin-right: 20rpx;
		font-size: 40rpx;
	}
	
	.iconfont.icon-utensils {
		color: $color-primary;
	}
	
	.iconfont.icon-utensils:before {
		content: '\f2e7';
	}
	
	.iconfont.icon-broom {
		color: $color-highlight;
	}
	
	.iconfont.icon-broom:before {
		content: '\f51a';
	}
	
	.list-content {
		flex: 1;
		margin-left: 20rpx;
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
		margin-top: 4rpx;
	}
	
	/* 图标定义 */
	.iconfont.icon-kiwi-bird:before {
		content: '\f535';
	}
	
	.iconfont.icon-piggy-bank:before {
		content: '\f4d3';
	}
	
	.iconfont.icon-drumstick-bite:before {
		content: '\f6d7';
	}
	
	.iconfont.icon-seedling:before {
		content: '\f4d8';
	}
	.arrow-icon{
		width:60rpx;
		height:50rpx;
		margin-top: 10rpx;
	}
	.icon-img {
		width: 40rpx;
		height: 40rpx;
	}
</style> 