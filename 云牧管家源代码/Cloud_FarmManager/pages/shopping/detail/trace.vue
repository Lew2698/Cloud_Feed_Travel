<template>
	<view class="page-container">
		<!-- 区块链溯源头部 -->
		<view class="trace-header">
			<text class="trace-title">区块链溯源</text>
			<text class="trace-subtitle">透明可信的全生命周期记录</text>
		</view>
		
		<view class="content">
			<!-- 二维码溯源 -->
			<view class="qr-section">
				<image src="/static/images/二维码.svg" class="qr-code"></image>
				<text class="qr-tip">扫描二维码查看区块链上的完整溯源信息</text>
				
				<view class="product-info">
					<view class="product-header">
						<image src="/static2/3545.jpg_wh860.jpg" class="product-image"></image>
						<view>
							<view class="product-name">
								瑶山散养鸡 
								<view class="verify-badge">
									<image src="/static/icons/shopping icon/check-circle.svg" class="check-code"></image>
									<text>已认证</text>
								</view>
							</view>
							<text class="product-id">溯源ID: YSCK-A5831-2025</text>
						</view>
					</view>
					
					<view class="blockchain-info">
						<view class="info-row">
							<text class="info-label">区块高度</text>
							<text class="info-value">2,356,782</text>
						</view>
						<view class="info-row">
							<text class="info-label">上链时间</text>
							<text class="info-value">2025-03-15 14:32:15</text>
						</view>
						<view class="info-row">
							<text class="info-label">数据哈希值</text>
						</view>
						<view class="hash-value">
							0xf7c8d9e1b3a5c7f9e1d3b5a7c9e1d3b5a7c9e1d3b5a7c9
						</view>
					</view>
				</view>
				
				<view class="scan-button" @click="scanOtherProduct">
					<image src="/static/icons/shopping icon/icon_qrcode.svg" class="check-code"></image>
					<text>扫描其他产品</text>
				</view>
			</view>
			
			<!-- 溯源时间轴 -->
			<view class="timeline-section">
				<view class="timeline-header">
					<text class="timeline-title">全生命周期追溯</text>
					<view class="timeline-filter" @click="showFilterOptions">
						<image src="/static/icons/shopping icon/筛选.svg" class="check-code"></image>
						<text>筛选</text>
					</view>
				</view>
				
				<view class="timeline">
					<view class="timeline-line"></view>
					
					<!-- 时间轴事件列表 -->
					<view 
						class="timeline-item"
						:class="{ verified: event.verified }"
						v-for="(event, index) in traceEvents" 
						:key="index"
					>
						<view class="timeline-dot"></view>
						<text class="timeline-date">{{event.date}}</text>
						<view class="timeline-event">
							<view class="event-title">
								{{event.title}}
								<view class="verify-badge" v-if="event.verified">
									<image src="/static/icons/shopping icon/check-circle.svg" class="check-code"></image>
									<text>已认证</text>
								</view>
							</view>
							<text class="event-desc">{{event.description}}</text>
							<view class="event-data" v-if="event.data">
								<view class="data-row" v-for="(value, key, i) in event.data" :key="i">
									<text class="data-label">{{key}}</text>
									<text class="data-value">{{value}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 认证证书 -->
			<view class="certificate-section">
				<text class="section-title">认证证书</text>
				
				<view class="certificate-card">
					<text class="cert-icon iconfont icon-certificate"></text>
					<text class="cert-title">有机养殖认证</text>
					<text class="cert-desc">该产品全程采用有机饲料喂养，不使用抗生素及激素。</text>
					<view class="cert-meta">
						<view class="cert-issuer">
							<view class="cert-issuer-logo">
								<image src="/static/icons/shopping icon/leaf.svg" class="check-code"></image>
							</view>
							<text>中国有机认证中心</text>
						</view>
						<text>有效期至：2026-03-15</text>
					</view>
				</view>
				
				<view class="certificate-card green-card">
					<text class="cert-icon iconfont icon-award"></text>
					<text class="cert-title">绿色食品认证</text>
					<text class="cert-desc">符合绿色食品标准，无污染，健康安全。</text>
					<view class="cert-meta">
						<view class="cert-issuer">
							<view class="cert-issuer-logo">
								<image src="/static/icons/shopping icon/seeding.svg" class="check-code"></image>
							</view>
							<text>中国绿色食品发展中心</text>
						</view>
						<text>证书编号：GF85623</text>
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
				productId: null,
				traceEvents: [
					{
						date: '2025-03-15 08:30:25',
						title: '完成出栏检测',
						description: '由瑶山生态养殖基地认证兽医完成健康检测，各项指标达标。',
						verified: true,
						data: {
							'体重': '2.3 kg',
							'健康评分': '96/100',
							'检测人': '李医师（证号: YS20250315）'
						}
					},
					{
						date: '2025-02-26 10:15:42',
						title: '完成疫苗接种',
						description: '完成第三次疫苗接种，增强免疫力。',
						verified: true,
						data: {
							'疫苗名称': '家禽流感预防疫苗',
							'批次号': 'FLU20250226-07',
							'接种人': '王兽医（证号: YS20210532）'
						}
					},
					{
						date: '2025-01-10 16:22:08',
						title: '饲料更换记录',
						description: '根据生长阶段需求，更换为有机谷物混合饲料。',
						verified: false,
						data: {
							'饲料名称': '有机谷物混合饲料',
							'供应商': '瑶山有机农场',
							'成分': '有机玉米、小麦、大豆（无抗生素）'
						}
					},
					{
						date: '2024-12-05 09:48:36',
						title: '孵化记录',
						description: '家禽育雏中心成功孵化，纳入养殖计划。',
						verified: true,
						data: {
							'品种': '瑶山本地黑羽鸡',
							'批次号': 'YS-CHK-2024-12-1257',
							'孵化中心': '瑶山生态家禽孵化中心'
						}
					}
				]
			}
		},
		onLoad(options) {
			if (options.id) {
				this.productId = options.id;
				// 实际应用中应该根据ID从后端获取产品溯源信息
				// this.fetchTraceData(this.productId);
			}
		},
		methods: {
			// 扫描其他产品
			scanOtherProduct() {
				uni.scanCode({
					success: (res) => {
						// 解析扫描结果，获取产品ID
						console.log('扫描结果：', res);
						uni.showToast({
							title: '扫描成功',
							icon: 'success'
						});
					},
					fail: () => {
						uni.showToast({
							title: '扫描失败',
							icon: 'none'
						});
					}
				});
			},
			// 显示筛选选项
			showFilterOptions() {
				uni.showActionSheet({
					itemList: ['全部记录', '仅显示已认证', '按时间正序', '按时间倒序'],
					success: (res) => {
						// 根据用户选择筛选时间轴
						console.log('用户选择：', res.tapIndex);
					}
				});
			},
			// 获取溯源数据
			fetchTraceData(productId) {
				uni.showLoading({
					title: '加载中...'
				});
				
				// 模拟API请求
				setTimeout(() => {
					// 实际应用中应该使用uni.request调用API
					uni.hideLoading();
				}, 500);
			}
		}
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page {
		background-color: #f5f5f5;
	}
	
	.page-container {
		padding-bottom: 60rpx;
	}
	
	/* 区块链溯源头部 */
	.trace-header {
		background-color: $color-dark;
		color: white;
		padding: 40rpx 30rpx;
		border-radius: 0 0 40rpx 40rpx;
		margin-bottom: 30rpx;
	}
	
	.trace-title {
		font-size: 44rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.trace-subtitle {
		font-size: 28rpx;
		opacity: 0.9;
	}
	
	.content {
		padding: 0 30rpx;
	}
	
	/* 二维码溯源 */
	.qr-section {
		background-color: white;
		padding: 40rpx;
		border-radius: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 40rpx;
		box-shadow: 0 8rpx 20rpx rgba(94, 100, 114, 0.1);
	}
	
	.qr-code {
		width: 360rpx;
		height: 360rpx;
		margin-bottom: 30rpx;
		border: 2rpx solid #eee;
		padding: 20rpx;
		border-radius: 20rpx;
	}
	
	.qr-tip {
		font-size: 26rpx;
		color: #777;
		text-align: center;
		margin-bottom: 30rpx;
	}
	
	.product-info {
		width: 100%;
		background-color: $color-secondary;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-top: 20rpx;
	}
	
	.product-header {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.product-image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 20rpx;
		object-fit: cover;
		margin-right: 30rpx;
	}
	
	.product-name {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 6rpx;
		display: flex;
		align-items: center;
	}
	
	.verify-badge {
		display: inline-flex;
		align-items: center;
		background-color: $color-accent;
		color: $color-dark;
		padding: 6rpx 16rpx;
		border-radius: 30rpx;
		font-size: 22rpx;
		font-weight: 600;
		margin-left: 16rpx;
	}
	
	.iconfont.icon-check-circle:before {
		content: '\f058';
		margin-right: 8rpx;
		font-size: 20rpx;
	}
	
	.product-id {
		font-size: 24rpx;
		color: #777;
	}
	
	.blockchain-info {
		margin-top: 10rpx;
	}
	
	.info-row {
		display: flex;
		justify-content: space-between;
		font-size: 26rpx;
		margin-bottom: 16rpx;
	}
	
	.info-label {
		color: #777;
	}
	
	.info-value {
		font-weight: 600;
		color: $color-dark;
	}
	
	.hash-value {
		font-family: monospace;
		font-size: 22rpx;
		color: $color-dark;
		background-color: #f5f5f5;
		padding: 10rpx 16rpx;
		border-radius: 10rpx;
		margin-top: 10rpx;
		word-break: break-all;
	}
	
	.scan-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: $color-primary;
		color: white;
		padding: 24rpx;
		border-radius: 20rpx;
		font-weight: 600;
		margin-top: 30rpx;
		width: 100%;
	}
	
	.iconfont.icon-qrcode:before {
		content: '\f029';
		margin-right: 16rpx;
	}
	
	/* 溯源时间轴 */
	.timeline-section {
		margin-top: 50rpx;
	}
	
	.timeline-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.timeline-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
	}
	
	.timeline-filter {
		font-size: 26rpx;
		color: $color-highlight;
		display: flex;
		align-items: center;
	}
	
	.iconfont.icon-filter:before {
		content: '\f0b0';
		margin-right: 10rpx;
	}
	
	.timeline {
		position: relative;
		margin-left: 30rpx;
	}
	
	.timeline-line {
		position: absolute;
		left: 14rpx;
		top: 0;
		height: 100%;
		width: 4rpx;
		background-color: #ddd;
	}
	
	.timeline-item {
		position: relative;
		padding-left: 60rpx;
		padding-bottom: 40rpx;
	}
	
	.timeline-dot {
		position: absolute;
		left: 0;
		top: 0;
		width: 32rpx;
		height: 32rpx;
		background-color: $color-accent;
		border-radius: 50%;
		z-index: 1;
	}
	
	.timeline-item.verified .timeline-dot {
		background-color: $color-primary;
	}
	
	.timeline-date {
		font-size: 24rpx;
		color: #777;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.timeline-event {
		background-color: white;
		padding: 24rpx;
		border-radius: 20rpx;
		box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05);
	}
	
	.event-title {
		font-weight: 600;
		font-size: 30rpx;
		margin-bottom: 10rpx;
		color: $color-dark;
		display: flex;
		align-items: center;
	}
	
	.event-desc {
		font-size: 26rpx;
		color: #666;
		line-height: 1.4;
		display: block;
	}
	
	.event-data {
		margin-top: 16rpx;
		background-color: #f9f9f9;
		padding: 16rpx;
		border-radius: 16rpx;
		font-size: 24rpx;
	}
	
	.data-row {
		display: flex;
		margin-bottom: 10rpx;
	}
	
	.data-label {
		width: 160rpx;
		color: #777;
	}
	
	.data-value {
		flex: 1;
		font-weight: 500;
		color: $color-dark;
	}
	
	/* 认证证书 */
	.certificate-section {
		margin-top: 50rpx;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.certificate-card {
		background: linear-gradient(135deg, $color-accent, $color-highlight);
		padding: 30rpx;
		border-radius: 30rpx;
		margin-bottom: 30rpx;
		position: relative;
		overflow: hidden;
		box-shadow: 0 10rpx 30rpx rgba(106, 153, 78, 0.3);
	}
	
	.green-card {
		background: linear-gradient(135deg, $color-primary, $color-highlight);
	}
	
	.cert-icon {
		position: absolute;
		right: -30rpx;
		bottom: -30rpx;
		font-size: 200rpx;
		opacity: 0.1;
		color: white;
	}
	
	.iconfont.icon-certificate:before {
		content: '\f0a3';
	}
	
	.iconfont.icon-award:before {
		content: '\f559';
	}
	
	.cert-title {
		font-size: 36rpx;
		font-weight: 700;
		color: white;
		margin-bottom: 10rpx;
		z-index: 1;
		position: relative;
		display: block;
	}
	
	.cert-desc {
		font-size: 26rpx;
		color: white;
		opacity: 0.9;
		margin-bottom: 30rpx;
		z-index: 1;
		position: relative;
		display: block;
	}
	
	.cert-meta {
		display: flex;
		justify-content: space-between;
		font-size: 24rpx;
		color: white;
		z-index: 1;
		position: relative;
	}
	
	.cert-issuer {
		display: flex;
		align-items: center;
	}
	
	.cert-issuer-logo {
		width: 40rpx;
		height: 40rpx;
		background-color: white;
		border-radius: 50%;
		margin-right: 10rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.iconfont.icon-leaf:before {
		content: '\f06c';
		color: $color-highlight;
		font-size: 24rpx;
	}
	
	.iconfont.icon-seedling:before {
		content: '\f4d8';
		color: $color-highlight;
		font-size: 24rpx;
	}
	.check-code{
		width:30rpx;
		height:30rpx;
	}
</style> 