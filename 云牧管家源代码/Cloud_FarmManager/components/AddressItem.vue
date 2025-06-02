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
				{{ formatAddress(address) }}
			</view>
		</view>
		<view class="address-actions" v-if="showActions">
			<view class="action-btn set-default-btn" @click.stop="handleSetDefault" v-if="!address.isDefault">
				<image src="/static/icons/shopping icon/star.svg" class="action-icon"></image>
				<text class="action-text">默认</text>
			</view>
			<view class="action-btn edit-btn" @click.stop="handleEdit">
				<image src="/static/icons/shopping icon/edit.svg" class="action-icon"></image>
				<text class="action-text">编辑</text>
			</view>
			<view class="action-btn delete-btn" @click.stop="handleDelete">
				<image src="/static/icons/shopping icon/trash.svg" class="action-icon"></image>
				<text class="action-text">删除</text>
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
			_id: '',
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
const emit = defineEmits(['select', 'edit', 'delete', 'setDefault']);

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

// 处理设置默认地址
const handleSetDefault = () => {
	emit('setDefault', props.address);
};

// 格式化手机号，中间部分用星号代替
const formatPhone = (phone) => {
	if (!phone) return '';
	return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

// 格式化地址显示
const formatAddress = (address) => {
	if (!address) return '';
	
	const parts = [];
	
	if (address.province) parts.push(address.province);
	if (address.city && address.city !== address.province) parts.push(address.city);
	if (address.district && address.district !== address.city) parts.push(address.district);
	if (address.detail) parts.push(address.detail);
	
	return parts.join(' ');
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
	transition: all 0.3s ease;
}

.address-item:active {
	transform: scale(0.98);
	box-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
}

.address-content {
	flex: 1;
	overflow: hidden;
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
	flex: 1;
	overflow: hidden;
}

.person-name {
	font-size: 32rpx;
	font-weight: 600;
	color: $color-dark;
	margin-right: 20rpx;
	white-space: nowrap;
}

.person-phone {
	font-size: 28rpx;
	color: #666;
	white-space: nowrap;
}

.default-tag {
	background: linear-gradient(135deg, $color-primary, $color-highlight);
	color: white;
	font-size: 22rpx;
	padding: 6rpx 12rpx;
	border-radius: 20rpx;
	font-weight: 500;
	box-shadow: 0 2rpx 6rpx rgba(188, 71, 73, 0.3);
}

.address-detail {
	font-size: 28rpx;
	color: #333;
	line-height: 1.5;
	word-break: break-all;
}

.address-actions {
	display: flex;
	flex-direction: column;
	justify-content: center;
	margin-left: 20rpx;
	gap: 10rpx;
}

.action-btn {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 8rpx;
	border-radius: 8rpx;
	min-width: 60rpx;
	transition: background-color 0.2s ease;
}

.action-btn:active {
	background-color: #f0f0f0;
}

.action-icon {
	width: 28rpx;
	height: 28rpx;
	margin-bottom: 4rpx;
}

.action-text {
	font-size: 20rpx;
	color: #666;
	white-space: nowrap;
}

.set-default-btn .action-icon {
	filter: none;
}

.set-default-btn .action-text {
	color: $color-primary;
}

.edit-btn .action-text {
	color: #0066cc;
}

.delete-btn .action-text {
	color: #ff4444;
}

.is-default {
	border-left: 6rpx solid $color-primary;
	background: linear-gradient(90deg, rgba(188, 71, 73, 0.02), white);
}

.is-default .address-content {
	margin-left: 10rpx;
}
</style> 