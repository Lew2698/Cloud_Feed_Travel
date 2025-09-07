<template>
	<view class="page-container">
		<!-- 返回按钮和标题 -->
		<view class="header">
			<navigator open-type="navigateBack" class="back-btn">
				<image src="/static/icons/shopping icon/左箭头2.svg" class="arrow-icon"></image>
			</navigator>
			<text class="header-title">生长数据分析</text>
		</view>

		<view class="content">
			<!-- 数据摘要 -->
			<view class="data-stats">
				<view class="stat-card">
					<text class="stat-value">8只</text>
					<text class="stat-label">总认领数量</text>
				</view>
				<view class="stat-card highlight-card">
					<text class="stat-value">75%</text>
					<text class="stat-label">平均生长进度</text>
				</view>
			</view>

			<!-- 数据选择 -->
			<view class="data-tab-headers">
				<view v-for="(tab, index) in dataTabs" :key="index" class="data-tab"
					:class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">{{ tab.name }}</view>
			</view>

			<!-- 生长趋势图 -->
			<view class="chart-container">
				<view class="chart-header">
					<text class="chart-title">生长趋势</text>
				</view>
				<view class="charts-box">
				<qiun-data-charts type="line" :opts="opts" :chartData="growthChartData" />
			</view>
			</view>

			<!-- 健康指标图 -->
			<view class="chart-container">
				<view class="chart-header">
					<text class="chart-title">健康指标</text>
				</view>
				<view class="charts-box">
				<qiun-data-charts type="line" :opts="opts" :chartData="healthChartData" />
			</view>
			</view>

			<!-- 详细数据 -->
			<view class="data-card">
				<text class="card-title">详细数据</text>
				<view class="data-detail">
					<view class="detail-row" v-for="(item, index) in detailData" :key="index">
						<text class="detail-label">{{ item.label }}</text>
						<view class="detail-value-wrapper">
							<text class="detail-value">{{ item.value }}</text>
							<text class="rate-badge" v-if="item.rate" :class="{ 'rate-down': item.rate.includes('-') }">
								<text class="iconfont"
									:class="item.rate.includes('-') ? 'icon-arrow-down' : 'icon-arrow-up'"></text>
								{{ item.rate }}
							</text>
						</view>
					</view>
				</view>
			</view>
			
			
			<!-- 养殖建议 -->
			<view class="data-card">
				<text class="card-title">智能养殖建议</text>
				<view class="advice-list">
					<text class="advice-item">根据当前生长数据，您的瑶山散养鸡生长状况良好，预计按时出栏。</text>
					<text class="advice-item">已为您的散养鸡安排了12月初的疫苗接种计划，将提升其健康水平。</text>
					<text class="advice-item">本月气温下降，建议调整饲料配方，增加能量摄入。</text>
					<text class="advice-item">提高活动区的光照时间，有助于提升鸡只的活动量和生长速度。</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			growthChartData: {},
			healthChartData: {},
			//您可以通过修改 config-ucharts.js 文件中下标为 ['line'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
			opts: {
				color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
				padding: [15, 10, 0, 15],
				enableScroll: false,
				legend: {},
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					data: [{ tofix: 2 }],
					gridType: "dash",
					dashLength: 2
				},
				extra: {
					line: {
						type: "straight",
						width: 2,
						activeType: "hollow"
					}
				}
			},
			dataTabs: [{
				id: 'chicken',
				name: '瑶山散养鸡 #A5831'
			},
			{
				id: 'corn',
				name: '有机玉米'
			}
			],
			activeTab: 'chicken',
			detailData: [{
				label: '当前体重',
				value: '1.8kg',
				rate: '5%'
			},
			{
				label: '预计出栏体重',
				value: '2.3kg'
			},
			{
				label: '饲料消耗',
				value: '4.5kg'
			},
			{
				label: '饲料转化率',
				value: '2.5:1'
			},
			{
				label: '日均增重',
				value: '28g',
				rate: '3%'
			},
			{
				label: '健康评分',
				value: '92/100'
			},
			{
				label: '生长周期',
				value: '65天/90天'
			},
			{
				label: '预计收益',
				value: '￥210'
			}
			]
		}
	},
	onReady() {
		this.initCharts();
		this.getServerData();
	},
	methods: {
		getServerData() {
			//模拟从服务器获取数据时的延时
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let grows = {
					categories: ["7月", "8月", "9月", "10月"],
					series: [
						{
							name: "体重",
							data: [2, 2.5, 3.3, 4]
						},
						{
							name: "饲料消耗",
							data: [1, 1.5, 2.3, 3]
						},
					]
				};
				let healths = {
					categories: ["7月", "8月", "9月", "10月"],
					series: [
						{
							name: "活动指数",
							data: [80,85,88,90]
						},
						{
							name: "健康评分",
							data: [90,92,94,95]
						},
					]
				}
				this.growthChartData = JSON.parse(JSON.stringify(grows));
				this.healthChartData = JSON.parse(JSON.stringify(healths));
			}, 500);
		},

		initCharts() {
			setTimeout(() => {
				// 这里应该使用真实的图表库，这里只是模拟
				this.drawMockChart('growthChart', [0.5, 0.9, 1.4, 1.8], [1.2, 2.4, 3.6, 4.5]);
				this.drawMockChart('healthChart', [75, 82, 88, 85], [85, 90, 94, 92]);
			}, 300);
		},
		drawMockChart(canvasId, data1, data2) {
			const ctx = uni.createCanvasContext(canvasId, this);
			const width = 300;
			const height = 180;

			// 清空画布
			ctx.clearRect(0, 0, width, height);

			// 绘制背景网格
			ctx.setStrokeStyle('#f5f5f5');
			ctx.setLineWidth(1);
			for (let i = 0; i < 5; i++) {
				const y = 30 + i * 30;
				ctx.beginPath();
				ctx.moveTo(40, y);
				ctx.lineTo(width - 20, y);
				ctx.stroke();
			}

			// 绘制X轴标签
			const labels = ['7月', '8月', '9月', '10月'];
			ctx.setFillStyle('#777777');
			ctx.setTextAlign('center');
			ctx.setFontSize(10);

			const xStep = (width - 60) / (labels.length - 1);
			for (let i = 0; i < labels.length; i++) {
				ctx.fillText(labels[i], 40 + i * xStep, height - 10);
			}

			// 绘制第一条数据线
			this.drawDataLine(ctx, data1, width, height, canvasId === 'growthChart' ? '#6a994e' : '#bc4749');

			// 绘制第二条数据线
			this.drawDataLine(ctx, data2, width, height, canvasId === 'growthChart' ? '#a7c957' : '#386641');

			// 绘制
			ctx.draw();
		},
		drawDataLine(ctx, data, width, height, color) {
			const max = Math.max(...data) * 1.2;
			const min = 0;
			const range = max - min;

			const xStep = (width - 60) / (data.length - 1);
			const yScale = 120 / range;

			// 绘制线条
			ctx.beginPath();
			ctx.setStrokeStyle(color);
			ctx.setLineWidth(2);

			for (let i = 0; i < data.length; i++) {
				const x = 40 + i * xStep;
				const y = height - 30 - (data[i] - min) * yScale;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				}
			}

			ctx.stroke();

			// 绘制数据点
			for (let i = 0; i < data.length; i++) {
				const x = 40 + i * xStep;
				const y = height - 30 - (data[i] - min) * yScale;

				ctx.beginPath();
				ctx.setFillStyle(color);
				ctx.arc(x, y, 3, 0, Math.PI * 2);
				ctx.fill();
			}
		}
	}
}
</script>

<style lang="scss">
@import '@/uni.scss';

.charts-box {
	width: 100%;
	height: 300px;
}

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

/* 数据摘要 */
.data-stats {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.stat-card {
	background: linear-gradient(135deg, $color-accent, $color-highlight);
	border-radius: 20rpx;
	padding: 30rpx;
	color: white;
}

.highlight-card {
	background: linear-gradient(135deg, $color-primary, $color-highlight);
}

.stat-value {
	font-size: 48rpx;
	font-weight: 700;
	margin-bottom: 10rpx;
	display: block;
}

.stat-label {
	font-size: 24rpx;
	opacity: 0.8;
}

/* 数据选择标签 */
.data-tab-headers {
	display: flex;
	margin-bottom: 30rpx;
	border-bottom: 1px solid #eee;
	background-color: white;
	border-radius: 20rpx 20rpx 0 0;
	padding: 0 20rpx;
}

.data-tab {
	padding: 20rpx 30rpx;
	font-size: 28rpx;
	cursor: pointer;
	transition: all 0.3s ease;
	border-bottom: 4rpx solid transparent;
}

.data-tab.active {
	color: $color-highlight;
	border-bottom: 4rpx solid $color-highlight;
	font-weight: 600;
}

/* 图表容器 */
.chart-container {
	background-color: white;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
}

.chart-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.chart-title {
	font-weight: 600;
	font-size: 32rpx;
	color: $color-dark;
}

.chart-options {
	display: flex;
	gap: 10rpx;
}

.chart-option {
	background-color: #f5f5f5;
	border-radius: 40rpx;
	padding: 10rpx 20rpx;
	font-size: 24rpx;
	transition: all 0.3s ease;
}

.chart-option.active {
	background-color: $color-accent;
	color: $color-dark;
	font-weight: 600;
}

.chart-content {
	height: 360rpx;
	width: 100%;
}

.chart-canvas {
	width: 100%;
	height: 100%;
}

.chart-legend {
	display: flex;
	justify-content: center;
	gap: 30rpx;
	margin-top: 20rpx;
	font-size: 24rpx;
}

.legend-item {
	display: flex;
	align-items: center;
}

.legend-color {
	width: 24rpx;
	height: 24rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}

.highlight-color {
	background-color: $color-highlight;
}

.accent-color {
	background-color: $color-accent;
}

.primary-color {
	background-color: $color-primary;
}

.dark-color {
	background-color: $color-dark;
}

/* 数据卡片 */
.data-card {
	background-color: white;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
}

.card-title {
	font-weight: 600;
	font-size: 32rpx;
	color: $color-dark;
	margin-bottom: 20rpx;
	display: block;
}

.data-detail {
	margin-top: 20rpx;
}

.detail-row {
	padding: 16rpx 0;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
	border-bottom: none;
}

.detail-label {
	font-size: 28rpx;
	color: #666;
}

.detail-value {
	font-weight: 600;
	color: $color-dark;
	font-size: 28rpx;
}

.detail-value-wrapper {
	display: flex;
	align-items: center;
}

.rate-badge {
	display: inline-flex;
	align-items: center;
	background-color: #e8f5e9;
	color: #2e7d32;
	padding: 4rpx 12rpx;
	border-radius: 20rpx;
	font-size: 22rpx;
	font-weight: 600;
	margin-left: 10rpx;
}

.iconfont.icon-arrow-up:before {
	content: '\f062';
	margin-right: 4rpx;
}

.iconfont.icon-arrow-down:before {
	content: '\f063';
	margin-right: 4rpx;
}

.rate-down {
	background-color: #ffebee;
	color: #c62828;
}

/* 建议列表 */
.advice-list {
	display: flex;
	flex-direction: column;
}

.advice-item {
	font-size: 28rpx;
	color: #666;
	margin-bottom: 10rpx;
	padding-left: 30rpx;
	position: relative;
	line-height: 1.4;

	&:before {
		content: '•';
		position: absolute;
		left: 10rpx;
		top: 0;
	}

	&:last-child {
		margin-bottom: 0;
	}
}
</style>