<template>
	<view class="cart-item">
		<view class="item-checkbox" @click="toggleSelect">
			<view class="custom-checkbox" :class="{ checked: item.selected }">
				<view class="custom-checkbox">
				  <image src="/static/icons/shopping icon/check.svg" v-if="item.selected"></image>
				</view>
			</view>
		</view>
		<image :src="item.image" :alt="item.name" class="item-image"></image>
		<view class="item-info">
			<text class="item-name">{{item.name}}</text>
			<text class="item-specs">{{item.specs}}</text>
			<view class="item-price-section">
				<text class="item-price">¥{{item.price}}</text>
				<view class="quantity-control">
					<view class="quantity-btn" @click="decreaseQuantity">-</view>
					<input type="number" :value="item.quantity" @input="onQuantityInput" class="quantity-input" />
					<view class="quantity-btn" @click="increaseQuantity">+</view>
				</view>
			</view>
		</view>
		<view class="item-actions">
			<image src="/static/icons/shopping icon/icon_trash_alt.svg" class="icon-svg" @click="removeItem"></image>
		</view>
	</view>
</template>

<script setup>
	import { defineProps, defineEmits } from 'vue'
	
	// 定义属性
	const props = defineProps({
		item: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			required: true
		}
	})
	
	// 定义事件
	const emit = defineEmits(['toggle-select', 'decrease-quantity', 'increase-quantity', 'quantity-change', 'remove-item'])
	
	// 切换商品选中状态
	const toggleSelect = () => {
		emit('toggle-select', props.index)
	}
	
	// 减少商品数量
	const decreaseQuantity = () => {
		emit('decrease-quantity', props.index)
	}
	
	// 增加商品数量
	const increaseQuantity = () => {
		emit('increase-quantity', props.index)
	}
	
	// 处理数量输入
	const onQuantityInput = (e) => {
		const newQuantity = parseInt(e.detail.value) || 1
		if (newQuantity !== props.item.quantity) {
			emit('quantity-change', props.index, newQuantity)
		}
	}
	
	// 移除商品
	const removeItem = () => {
		emit('remove-item', props.index)
	}
</script>

<style lang="scss" scoped>
	@import '@/uni.scss';
	
	/* 购物车商品项 */
	.cart-item {
		background-color: white;
		padding: 30rpx;
		margin-bottom: 20rpx;
		display: flex;
		position: relative;
	}
	
	.item-checkbox {
		margin-right: 20rpx;
		display: flex;
		align-items: center;
	}
	
	.custom-checkbox {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		border: 2rpx solid #ddd;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
	}
	
	.custom-checkbox.checked {
		background-color: $color-primary;
		border-color: $color-primary;
	}
	
	.item-image {
		width: 160rpx;
		height: 160rpx;
		border-radius: 16rpx;
		margin-right: 30rpx;
		background-color: #f5f5f5;
	}
	
	.item-info {
		flex: 1;
	}
	
	.item-name {
		font-size: 32rpx;
		font-weight: 500;
		color: $color-dark;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.item-specs {
		font-size: 24rpx;
		color: #777;
		margin-bottom: 16rpx;
		padding: 6rpx 16rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		display: inline-block;
	}
	
	.item-price-section {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.item-price {
		font-size: 32rpx;
		font-weight: 600;
		color: $color-primary;
	}
	
	.quantity-control {
		display: flex;
		align-items: center;
		border: 2rpx solid #eee;
		border-radius: 40rpx;
		overflow: hidden;
	}
	
	.quantity-btn {
		width: 56rpx;
		height: 56rpx;
		background-color: #f8f8f8;
		color: $color-dark;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 28rpx;
	}
	
	.quantity-input {
		width: 80rpx;
		height: 56rpx;
		border: none;
		text-align: center;
		font-size: 28rpx;
		color: $color-dark;
		background-color: white;
	}
	
	.item-actions {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
		font-size: 36rpx;
		color: #ccc;
	}
	
	.icon-svg {
		width: 40rpx;
		height: 40rpx;
	}
</style> 