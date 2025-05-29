<template>
	<view class="product-wrapper" @click="handleProductClick">
		<view class="product-item">
			<image :src="product.image" class="product-item-image" mode="aspectFill"></image>
			<view class="product-item-details">
				<text class="product-item-name">{{ product.name }}</text>
				<text class="product-item-price">¥{{ product.price }}</text>
				<view class="product-item-meta">
					<text>销量 {{ product.sales }}</text>
					<view class="product-item-rating">
						<image src="/static/icons/shopping icon/star.svg" class="icon-icon" mode="widthFix" />
						<text>{{ product.rating }}</text>
					</view>
				</view>
			</view>
		</view>
		<text v-if="product.badge" class="featured-badge">{{ product.badge }}</text>
		<view class="add-to-cart" @click.stop="handleAddToCart">
			<image src="/static/icons/shopping icon/plus.svg" class="icon-icon" mode="widthFix" />
		</view>
	</view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

// 定义属性
const props = defineProps({
	product: {
		type: Object,
		required: true,
		default: () => ({
			id: 0,
			name: '',
			price: 0,
			image: '',
			sales: 0,
			rating: 0,
			badge: ''
		})
	},
	// 是否显示添加到购物车按钮
	showAddToCart: {
		type: Boolean,
		default: true
	}
});

// 定义事件
const emit = defineEmits(['click', 'addToCart']);

// 处理商品点击
const handleProductClick = () => {
	emit('click', props.product.id);
};

// 处理添加到购物车
const handleAddToCart = () => {
	emit('addToCart', props.product.id);
};
</script>

<style lang="scss">
@import '@/uni.scss';

.product-wrapper {
	position: relative;
}

.product-item {
	background-color: white;
	border-radius: 24rpx;
	overflow: hidden;
	box-shadow: 0 3px 10px rgba(94, 100, 114, 0.08);
	transition: all 0.3s ease;
}

.product-item-image {
	width: 100%;
	height: 240rpx;
	display: block;
}

.product-item-details {
	padding: 24rpx;
}

.product-item-name {
	font-size: 28rpx;
	font-weight: 600;
	margin-bottom: 10rpx;
	line-height: 1.3;
	color: $color-dark;
	height: 72rpx;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	line-clamp: 2;
	-webkit-box-orient: vertical;
}

.product-item-price {
	font-size: 32rpx;
	font-weight: 700;
	color: $color-primary;
	margin-bottom: 10rpx;
	display: block;
}

.product-item-meta {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24rpx;
	color: #999;
}

.product-item-rating {
	display: flex;
	align-items: center;
	margin-right: 60rpx;
}

.product-item-rating .icon-icon {
	width: 32rpx;
	height: 32rpx;
	display: inline-block;
}

.featured-badge {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	background-color: $color-primary;
	color: white;
	font-size: 20rpx;
	padding: 6rpx 16rpx;
	border-radius: 20rpx;
	z-index: 2;
}

.add-to-cart {
	width: 56rpx;
	height: 56rpx;
	background-color: $color-primary;
	color: white;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	position: absolute;
	bottom: 20rpx;
	right: 20rpx;
	box-shadow: 0 2px 5px rgba(255, 166, 158, 0.3);
	z-index: 2;
}

.add-to-cart .icon-icon {
	width: 32rpx;
	height: 32rpx;
}
</style>