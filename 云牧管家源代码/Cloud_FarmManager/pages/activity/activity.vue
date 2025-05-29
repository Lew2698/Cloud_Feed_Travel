<template>
	<view class="page-container">
		<!-- 活动页头部 -->
		<view class="activity-header">
			<text class="activity-header-title">活动中心</text>
			<text class="activity-header-subtitle">探索瑶山风情，体验非遗文化</text>
		</view>

		<view class="content">
			<!-- 节日倒计时 -->
			<view class="festival-countdown">
				<view class="countdown-info">
					<text class="countdown-title">瑶族盘王节</text>
					<text class="countdown-date">2025年10月28日</text>
				</view>
				<view class="countdown-timer">
					<view class="countdown-unit">
						<text class="countdown-number">{{countdownData.days}}</text>
						<text class="countdown-label">天</text>
					</view>
					<view class="countdown-unit">
						<text class="countdown-number">{{countdownData.hours}}</text>
						<text class="countdown-label">时</text>
					</view>
					<view class="countdown-unit">
						<text class="countdown-number">{{countdownData.minutes}}</text>
						<text class="countdown-label">分</text>
					</view>
				</view>
			</view>

			<!-- 活动标签筛选 -->
			<scroll-view scroll-x class="activity-tabs">
				<view v-for="(tab, index) in activityTabs" :key="index" class="activity-tab"
					:class="{ active: activeTab === tab }" @click="activeTab = tab">{{tab}}</view>
			</scroll-view>

			<!-- 活动列表 -->
			<view class="activity-list">
				<!-- 活动项目 -->
				<ActivityCardVue v-for="(acti,index) in activities" :activity="acti" :key="index" @signup="signupActivity" />
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		computed,
		onMounted,
		onUnmounted,
		ref
	} from 'vue';
	import ActivityCardVue from '../../components/ActivityCard.vue';
	const activityTabs = ref(['全部活动', '瑶族文化', '农事体验', '非遗传承', '田园采摘'])
	const activityTab = ref(['全部活动'])
	const countdownData = ref({
		days: 15,
		hours: 20,
		minutes: 45
	})
	const activities = ref([{
			id: 1,
			title: '瑶族长鼓舞表演',
			date: '2025-05-01 ~ 2025-05-07',
			location: '瑶山文化广场',
			description: '欣赏国家级非物质文化遗产瑶族长鼓舞，感受瑶族人民欢快奔放的民族精神。',
			price: '98',
			image: '/static/static2/dancers-1787812_1280.jpg',
			badge: '热门',
			tags: ['非遗文化', '瑶族舞蹈'],
			category: '瑶族文化'
		},
		{
			id: 2,
			title: '瑶山采茶体验',
			date: '2025-04-25 ~ 2025-05-10',
			location: '瑶山生态茶园',
			description: '亲手采摘高山有机茶，学习传统制茶工艺，体验茶农生活，品尝新鲜茶汤。',
			price: '128',
			image: '/static/static2/photo-1531971589569-0d9370cbe1e5.avif',
			tags: ['农事体验', '茶文化'],
			category: '农事体验'
		},
		{
			id: 3,
			title: '瑶族民俗文化节',
			date: '2025-06-01 ~ 2025-06-07',
			location: '瑶山民族村',
			description: '参与瑶族盘王节庆典，体验瑶族传统婚礼，品尝瑶族美食，欣赏民族歌舞表演。',
			price: '258',
			image: '/static/static2/photo-1515339760107-1952b7a08454.avif',
			badge: '限时',
			tags: ['民俗文化', '瑶族节日'],
			category: '瑶族文化'
		}
	])
	const filteredActivities = computed(() => {
		if (this.activeTab === '全部活动') {
			return this.activities;
		} else {
			return this.activities.filter(act => act.category === this.activeTab || act.tags.includes(this.activeTab));
		}
	})
	// const startCountdownTimer = () => {
	// 	// 实际项目中应该使用真实日期计算倒计时
	// 	// 这里仅作展示，使用模拟数据
	// 	this.timer = setInterval(() => {
	// 		this.countdownData.minutes--;
	// 		if (this.countdownData.minutes < 0) {
	// 			this.countdownData.minutes = 59;
	// 			this.countdownData.hours--;
	// 			if (this.countdownData.hours < 0) {
	// 				this.countdownData.hours = 23;
	// 				this.countdownData.days--;
	// 				if (this.countdownData.days < 0) {
	// 					clearInterval(this.timer);
	// 					this.countdownData = {
	// 						days: 0,
	// 						hours: 0,
	// 						minutes: 0
	// 					}
	// 				}
	// 			}
	// 		}
	// 	}, 60000) // 每分钟更新一次
	// }
	const signupActivity = (activity) => {
		uni.showModal({
			title: '活动报名',
			content: `确认报名参加"${activity.title}"活动吗？费用：¥${activity.price}`,
			success: (res) => {
				if (res.confirm) {
					uni.showToast({
						title: '报名成功',
						icon: 'success'
					})
				}
			}
		})
	}
	// onMounted(() => {
	// 	// 启动计时器以更新倒计时
	// 	this.startCountdownTimer();
	// })
	// onUnmounted(() => {
	// 	// 清除计时器
	// 	if (this.timer) {
	// 		clearInterval(this.timer);
	// 	}
	// })
</script>

<style lang="scss">
	@import '@/uni.scss';

	page {
		background-color: $color-secondary;
	}

	.page-container {
		padding-bottom: 120rpx;
	}

	/* 活动页头部 */
	.activity-header {
		background-color: $color-primary;
		color: white;
		padding: 40rpx 30rpx;
		border-radius: 0 0 40rpx 40rpx;
		margin-bottom: 30rpx;
	}

	.activity-header-title {
		font-size: 48rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		display: block;
	}

	.activity-header-subtitle {
		font-size: 28rpx;
		opacity: 0.9;
	}

	.content {
		padding: 0 30rpx;
	}

	/* 节日倒计时 */
	.festival-countdown {
		background-color: $color-highlight;
		padding: 30rpx;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.countdown-info {
		flex: 1;
	}

	.countdown-title {
		font-size: 32rpx;
		font-weight: 600;
		color: white;
		margin-bottom: 10rpx;
		display: block;
	}

	.countdown-date {
		font-size: 26rpx;
		color: white;
		opacity: 0.9;
	}

	.countdown-timer {
		display: flex;
		align-items: center;
	}

	.countdown-unit {
		width: 80rpx;
		height: 80rpx;
		background-color: white;
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-left: 10rpx;
	}

	.countdown-number {
		font-size: 28rpx;
		font-weight: 600;
		color: $color-dark;
	}

	.countdown-label {
		font-size: 20rpx;
		color: #777;
	}

	/* 活动标签筛选 */
	.activity-tabs {
		display: flex;
		white-space: nowrap;
		background-color: white;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 4rpx 16rpx rgba(94, 100, 114, 0.1);
		padding: 10rpx;
	}

	.activity-tab {
		display: inline-block;
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		font-weight: 500;
		white-space: nowrap;
		color: $color-dark;
		position: relative;
	}

	.activity-tab.active {
		color: $color-primary;
	}

	.activity-tab.active::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 20%;
		width: 60%;
		height: 6rpx;
		background-color: $color-primary;
		border-radius: 10rpx;
	}

	/* 活动列表 */
	.activity-card {
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
		margin-bottom: 30rpx;
		box-shadow: 0 6rpx 20rpx rgba(94, 100, 114, 0.1);
		position: relative;
	}

	.activity-image {
		width: 100%;
		height: 360rpx;
		object-fit: cover;
	}

	.activity-content {
		padding: 30rpx;
	}

	.activity-title {
		font-size: 36rpx;
		font-weight: 600;
		margin-bottom: 10rpx;
		color: $color-dark;
		display: block;
	}

	.activity-meta {
		display: flex;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.activity-date {
		font-size: 26rpx;
		color: #777;
		margin-right: 30rpx;
		display: flex;
		align-items: center;
	}

	.iconfont.icon-calendar:before {
		content: '\f133';
		margin-right: 10rpx;
		color: $color-primary;
	}

	.activity-location {
		font-size: 26rpx;
		color: #777;
		display: flex;
		align-items: center;
	}

	.iconfont.icon-location:before {
		content: '\f3c5';
		margin-right: 10rpx;
		color: $color-primary;
	}

	.activity-description {
		font-size: 28rpx;
		color: #555;
		line-height: 1.5;
		margin-bottom: 20rpx;
		display: block;
	}

	.activity-tags {
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 20rpx;
	}

	.activity-tag {
		font-size: 24rpx;
		margin-right: 16rpx;
		background-color: rgba(174, 217, 224, 0.2);
		color: $color-highlight;
		padding: 6rpx 20rpx;
		border-radius: 30rpx;
	}

	.activity-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.activity-price {
		font-size: 40rpx;
		font-weight: 700;
		color: $color-primary;
	}

	.activity-badge {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		background-color: $color-primary;
		color: white;
		padding: 10rpx 20rpx;
		border-radius: 30rpx;
		font-size: 24rpx;
		font-weight: 500;
		z-index: 1;
	}

	.icon-image {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.btn {
		margin: 0;
		background-color: $color-primary;
		color: white;
		border: none;
		border-radius: 10rpx;
		padding: 5rpx 40rpx;
		font-size: 32rpx;
		font-weight: 600;
	}
</style>