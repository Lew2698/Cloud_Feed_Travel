<template>
	<view class="activity-card">
		<view class="activity-badge" v-if="activity.badge">{{ activity.badge }}</view>
		<image :src="activity.image" class="activity-image" :alt="activity.title"></image>
		<view class="activity-content">
			<text class="activity-title">{{ activity.title }}</text>
			<view class="activity-meta">
				<view class="activity-date">
					<image src="/static/icons/activity icon/calendar-fill(2).svg" class="icon-image" mode="aspectFit"></image>
					<text>{{ activity.date }}</text>
				</view>
				<view class="activity-location">
					<image src="/static/icons/activity icon/定位.svg" class="icon-image" mode="aspectFit"></image>
					<text>{{ activity.location }}</text>
				</view>
			</view>
			<text class="activity-description">{{ activity.description }}</text>
			<view class="activity-tags">
				<text class="activity-tag" v-for="(tag, tagIndex) in activity.tags" :key="tagIndex">{{ tag }}</text>
			</view>
			<view class="activity-footer">
				<text class="activity-price">¥{{ activity.price }}</text>
				<button class="btn" @click="handleSignup">立即报名</button>
			</view>
		</view>
	</view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
	activity: {
		type: Object,
		required: true,
		default: () => ({
			id: 0,
			title: '',
			date: '',
			location: '',
			description: '',
			price: 0,
			image: '',
			badge: '',
			tags: [],
			category: ''
		})
	}
});

// 定义事件
const emit = defineEmits(['signup']);

// 处理报名点击
const handleSignup = () => {
	emit('signup', props.activity);
};
</script>

<style lang="scss">
@import '@/uni.scss';

/* 活动卡片 */
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

.activity-location {
	font-size: 26rpx;
	color: #777;
	display: flex;
	align-items: center;
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