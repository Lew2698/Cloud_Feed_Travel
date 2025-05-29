<template>
	<view class="address-item" :class="{ 'is-default': address.isDefault }" @click="handleSelect">
		<view class="address-content">
			<view class="address-header">
				<view class="person-info">
					<text class="person-name">{{ address.name }}</text>
					<text class="person-phone">{{ formatPhone(address.phone) }}</text>
				</view>
				<view v-if="address.isDefault" class="default-tag">默认</view>
			</view>
			<view class="address-detail">
				{{ address.province }} {{ address.city }} {{ address.district }} {{ address.detail }}
			</view>
		</view>
		<view class="address-actions" v-if="showActions">
			<view class="action-btn edit-btn" @click.stop="handleEdit">
				<image src="/static/icons/shopping icon/edit.svg" class="action-icon"></image>
			</view>
			<view class="action-btn delete-btn" @click.stop="handleDelete">
				<image src="/static/icons/shopping icon/trash.svg" class="action-icon"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
	address: {
		type: Object,
		required: true,
		default: () => ({
			id: 0,
			name: '',
			phone: '',
			province: '',
			city: '',
			district: '',
			detail: '',
			isDefault: false
		})
	},
	showActions: {
		type: Boolean,
		default: true
	}
});

// 定义事件
const emit = defineEmits(['select', 'edit', 'delete']);

// 处理选择地址
const handleSelect = () => {
	emit('select', props.address);
};

// 处理编辑地址
const handleEdit = () => {
	emit('edit', props.address);
};

// 处理删除地址
const handleDelete = () => {
	emit('delete', props.address);
};

// 格式化手机号，中间部分用星号代替
const formatPhone = (phone) => {
	if (!phone) return '';
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};
</script>

<style lang="scss">
@import '@/uni.scss';

.address-item {
	background-color: white;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
	display: flex;
	justify-content: space-between;
}

.address-content {
	flex: 1;
}

.address-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 16rpx;
}

.person-info {
	display: flex;
	align-items: center;
}

.person-name {
	font-size: 32rpx;
	font-weight: 600;
	color: $color-dark;
	margin-right: 20rpx;
}

.person-phone {
	font-size: 28rpx;
	color: #666;
}

.default-tag {
	background-color: $color-primary;
	color: white;
	font-size: 24rpx;
	padding: 4rpx 16rpx;
	border-radius: 20rpx;
}

.address-detail {
	font-size: 28rpx;
	color: #333;
	line-height: 1.4;
}

.address-actions {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20rpx;
}

.action-btn {
	width: 50rpx;
	height: 50rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 8rpx 0;
}

.action-icon {
	width: 32rpx;
	height: 32rpx;
}

.is-default {
	border-left: 6rpx solid $color-primary;
}
</style> 