<template>
	<view class="checkout-item">
		<view class="product-info">
			<image :src="item.image" class="product-image" mode="aspectFill"></image>
			<view class="product-details">
				<text class="product-name">{{ item.name }}</text>
				<text class="product-spec">{{ item.spec }}</text>
			</view>
		</view>
		<view class="price-info">
			<text class="product-price">¥{{ item.price }}</text>
			<text class="product-quantity">×{{ item.quantity }}</text>
		</view>
	</view>
</template>

<script setup>
import { defineProps } from 'vue';

// 定义属性
const props = defineProps({
	item: {
		type: Object,
		required: true,
		default: () => ({
			id: 0,
			name: '',
			spec: '',
			price: 0,
			quantity: 1,
			image: ''
		})
	}
});
</script>

<style lang="scss">
@import '@/uni.scss';

.checkout-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 20rpx 0;
	border-bottom: 1rpx solid rgba(0, 0, 0, 0.05);
}

.product-info {
	display: flex;
	align-items: center;
	flex: 1;
}

.product-image {
	width: 120rpx;
	height: 120rpx;
	border-radius: 12rpx;
	margin-right: 20rpx;
}

.product-details {
	flex: 1;
}

.product-name {
	font-size: 28rpx;
	font-weight: 500;
	color: $color-dark;
	display: block;
	margin-bottom: 8rpx;
	line-height: 1.3;
}

.product-spec {
	font-size: 24rpx;
	color: #999;
	display: block;
}

.price-info {
	text-align: right;
}

.product-price {
	font-size: 30rpx;
	font-weight: 600;
	color: $color-primary;
	display: block;
}

.product-quantity {
	font-size: 24rpx;
	color: #999;
}
</style> 