<template>
	<view class="page-container">
		<!-- 返回按钮和标题 -->
		<view class="header">
			<navigator open-type="navigateBack" class="back-btn">
				<image src="/static/icons/shopping icon/左箭头2.svg" class="arrow-icon"></image>
			</navigator>
			<text class="header-title">我的认领</text>
		</view>
		
		<view class="content">
			<!-- 标签切换 -->
			<view class="claim-tabs">
				<view 
					v-for="(tab, index) in tabs" 
					:key="index" 
					class="claim-tab" 
					:class="{ active: activeTab === tab.id }" 
					@click="activeTab = tab.id"
				>{{tab.name}}</view>
			</view>
			
			<!-- 已认领项目列表 -->
			<view v-if="myClaimItems.length > 0">
				<view class="claim-card" v-for="(item, index) in myClaimItems" :key="index">
					<view class="claim-header">
						<image :src="item.image" :alt="item.name" class="claim-image"></image>
						<view class="claim-info">
							<text class="claim-name">{{item.name}}</text>
							<view class="claim-meta">
								<text>认领日期: {{item.claimDate}}</text>
								<text>预计{{item.type === 'poultry' ? '出栏' : '收获'}}: {{item.expectedDate}}</text>
							</view>
							<view>
								<text class="claim-status" :class="getStatusClass(item)">
									{{item.status === 'growing' ? '成长中 ' + item.growthPercent : '可收获'}}
								</text>
							</view>
						</view>
					</view>
					<view class="claim-body">
						<view class="progress-section">
							<view class="progress-label">
								<text>生长进度</text>
								<text>{{item.growthPercent}}</text>
							</view>
							<view class="progress-bar">
								<view class="progress-fill growth-fill" :style="{width: item.growthPercent}"></view>
							</view>
						</view>
						<view class="progress-section">
							<view class="progress-label">
								<text>健康状况</text>
								<text>{{item.healthStatus}} ({{item.healthPercent}})</text>
							</view>
							<view class="progress-bar">
								<view class="progress-fill health-fill" :style="{width: item.healthPercent}"></view>
							</view>
						</view>
						<view class="claim-milestone">
							<view class="milestone-icon">
								<image src="/static/icons/cloud-farm icon/ic_tick.svg" class="tick-icon"></image>
							</view>
							<view class="milestone-content">
								<text class="milestone-date">{{item.lastUpdateDate}}</text>
								<text class="milestone-title">{{item.milestoneTitle}}</text>
								<text class="milestone-desc">{{item.milestoneDesc}}</text>
							</view>
							<view class="milestone-line" v-if="index < myClaimItems.length - 1"></view>
						</view>
						<view class="claim-actions">
							<button class="action-btn btn-monitor" @click="navigateTo('/pages/farm/monitor')">
								<image src="/static/icons/cloud-farm icon/video.svg" class="video-icon"></image>
								查看监控
							</button>
							<button class="action-btn btn-details" @click="navigateTo('/pages/farm/data')" v-if="item.status === 'growing'">
								<image src="/static/icons/cloud-farm icon/chart-line.svg" class="video-icon"></image>
								生长详情
							</button>
							<button class="action-btn btn-harvest" @click="harvestProduct(item)" v-else>
								<image src="/static/icons/cloud-farm icon/leaf2.svg" class="video-icon"></image>
								立即收获
							</button>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 空状态 -->
			<view class="empty-state" v-else>
				<text class="iconfont icon-seedling empty-icon"></text>
				<text class="empty-text">您还没有认领任何家禽/农作物</text>
				<button class="action-btn btn-monitor" @click="navigateTo('/pages/farm/new')">去认领</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabs: [
					{id: 'all', name: '全部认领'},
					{id: 'poultry', name: '家禽'},
					{id: 'crops', name: '农作物'}
				],
				activeTab: 'all',
				claimItems: [
					{
						id: 'c1',
						name: '瑶山散养鸡 #A5831',
						type: 'poultry',
						claimDate: '2023-04-26',
						expectedDate: '2023-05-26',
						status: 'growing',
						growthPercent: '75%',
						healthStatus: '良好',
						healthPercent: '90%',
						lastUpdateDate: '2023-05-10',
						milestoneTitle: '已完成疫苗接种',
						milestoneDesc: '完成了所有必要疫苗的接种，健康状况良好',
						image: '/static/static2/3799.jpg_wh1200.jpg'
					},
					{
						id: 'c2',
						name: '有机玉米 50㎡',
						type: 'crops',
						claimDate: '2023-04-26',
						expectedDate: '2023-05-26',
						status: 'ready',
						growthPercent: '100%',
						healthStatus: '优秀',
						healthPercent: '95%',
						lastUpdateDate: '2023-05-10',
						milestoneTitle: '已成熟',
						milestoneDesc: '玉米已成熟，随时可以收获',
						image: '/static/static2/67a2cfed4e91e1a411bbb1ff591cafdc.jpg'
					},
					{
						id: 'c3',
						name: '瑶山蜜桃树 #T2391',
						type: 'crops',
						claimDate: '2023-04-26',
						expectedDate: '2023-05-26',
						status: 'growing',
						growthPercent: '80%',
						healthStatus: '优秀',
						healthPercent: '98%',
						lastUpdateDate: '2023-05-10',
						milestoneTitle: '进入挂果期',
						milestoneDesc: '蜜桃已开始挂果，生长状况良好',
						image: '/static/static2/3397.jpg_wh860.jpg'
					}
				]
			}
		},
		computed: {
			myClaimItems() {
				if (this.activeTab === 'all') {
					return this.claimItems;
				} else {
					return this.claimItems.filter(item => item.type === this.activeTab);
				}
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			getStatusClass(item) {
				return item.status === 'growing' ? 'status-growing' : 'status-ready';
			},
			harvestProduct(product) {
				uni.showModal({
					title: '收获确认',
					content: `确认收获 ${product.name}？`,
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '收获成功',
								icon: 'success'
							});
							// 在实际应用中，这里应该调用API更新收获状态
							setTimeout(() => {
								const index = this.claimItems.findIndex(item => item.id === product.id);
								if (index !== -1) {
									this.claimItems.splice(index, 1);
								}
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
	
	/* 标签切换 */
	.claim-tabs {
		display: flex;
		margin-bottom: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.claim-tab {
		flex: 1;
		text-align: center;
		padding: 24rpx;
		transition: all 0.3s ease;
	}
	
	.claim-tab.active {
		background-color: $color-highlight;
		color: white;
		font-weight: 600;
	}
	
	/* 认领卡片 */
	.claim-card {
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 8rpx 20rpx rgba(94, 100, 114, 0.1);
		margin-bottom: 30rpx;
	}
	
	.claim-header {
		display: flex;
		padding: 30rpx;
		border-bottom: 1px solid rgba(0,0,0,0.05);
	}
	
	.claim-image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 20rpx;
		object-fit: cover;
		margin-right: 30rpx;
	}
	
	.claim-info {
		flex: 1;
	}
	
	.claim-name {
		font-weight: 700;
		font-size: 32rpx;
		margin-bottom: 10rpx;
		color: $color-dark;
		display: block;
	}
	
	.claim-meta {
		display: flex;
		flex-direction: column;
		margin-bottom: 10rpx;
	}
	
	.claim-meta text {
		font-size: 24rpx;
		color: #777;
		margin-bottom: 6rpx;
	}
	
	.claim-status {
		display: inline-block;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		font-size: 22rpx;
		font-weight: 600;
	}
	
	.status-growing {
		background-color: $color-accent;
		color: $color-dark;
	}
	
	.status-ready {
		background-color: $color-primary;
		color: white;
	}
	
	.claim-body {
		padding: 30rpx;
	}
	
	/* 进度条 */
	.progress-section {
		margin-bottom: 20rpx;
	}
	
	.progress-label {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10rpx;
		font-size: 24rpx;
	}
	
	.progress-bar {
		width: 100%;
		height: 16rpx;
		background-color: #eee;
		border-radius: 10rpx;
		overflow: hidden;
	}
	
	.progress-fill {
		height: 100%;
		border-radius: 10rpx;
	}
	
	.growth-fill {
		background-color: $color-highlight;
	}
	
	.health-fill {
		background-color: $color-accent;
	}
	
	/* 里程碑 */
	.claim-milestone {
		display: flex;
		margin-bottom: 30rpx;
		position: relative;
	}
	
	.milestone-icon {
		width: 60rpx;
		height: 60rpx;
		background-color: $color-highlight;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 24rpx;
		position: relative;
		z-index: 2;
	}
	
	.iconfont.icon-check:before {
		content: '\f00c';
	}
	
	.milestone-content {
		flex: 1;
		padding-left: 30rpx;
	}
	
	.milestone-date {
		font-size: 22rpx;
		color: #777;
		margin-bottom: 4rpx;
		display: block;
	}
	
	.milestone-title {
		font-weight: 600;
		font-size: 28rpx;
		margin-bottom: 6rpx;
		color: $color-dark;
		display: block;
	}
	
	.milestone-desc {
		font-size: 24rpx;
		color: #666;
		display: block;
	}
	
	.milestone-line {
		position: absolute;
		left: 30rpx;
		top: 60rpx;
		width: 2rpx;
		height: calc(100% - 30rpx);
		background-color: #ddd;
	}
	
	/* 按钮 */
	.claim-actions {
		display: flex;
		justify-content: space-between;
	}
	
	.action-btn {
		padding: 16rpx 24rpx;
		border-radius: 16rpx;
		font-size: 24rpx;
		font-weight: 600;
		display: flex;
		align-items: center;
		transition: all 0.3s ease;
		line-height: 1;
	}
	
	.action-btn .iconfont {
		margin-right: 10rpx;
	}
	
	.iconfont.icon-video:before {
		content: '\f03d';
	}
	
	.iconfont.icon-chart-line:before {
		content: '\f201';
	}
	
	.iconfont.icon-leaf:before {
		content: '\f06c';
	}
	
	.btn-monitor {
		background-color: $color-highlight;
		color: white;
	}
	
	.btn-details {
		background-color: #f0f0f0;
		color: $color-dark;
	}
	
	.btn-harvest {
		background-color: $color-primary;
		color: white;
	}
	
	/* 空状态 */
	.empty-state {
		padding: 80rpx 40rpx;
		text-align: center;
	}
	
	.empty-icon {
		font-size: 100rpx;
		color: #ddd;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.iconfont.icon-seedling:before {
		content: '\f4d8';
	}
	
	.empty-text {
		color: #999;
		margin-bottom: 40rpx;
		display: block;
	}
	.arrow-icon{
		width:60rpx;
		height:50rpx;
		margin-top: 10rpx;
	}
	.tick-icon{
		width:30rpx;
		height:30rpx;
	}
	.video-icon {
	  width: 25rpx;
	  height: 25rpx;
	  margin-right: 10rpx; /* 增加图标与文字间距 */
	  vertical-align: middle; /* 保持垂直居中 */
	}
</style> 