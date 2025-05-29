<template>
	<!-- 搜索栏 -->
	<view class="search-bar">
		<image src="/static/icons/home icon/serach.svg" class="search-icon"></image>
		<input type="text" :placeholder="placeholderText" />
	</view>
</template>
<script>
	export default {
		props: {
			placeholderText: {
				type: String
			}
		}
	}
</script>
<style lang="scss" scoped>
	/* 搜索栏 */
	.search-bar {
		display: flex;
		align-items: center;
		background-color: #fff;
		border-radius: 16rpx;
		padding: 16rpx 30rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2px 5px rgba(56, 102, 65, 0.1);
	}

	.search-bar input {
		border: none;
		flex: 1;
		padding: 10rpx;
		font-size: 28rpx;
	}

	.search-icon {
		width: 30rpx;
		height: 30rpx;
	}
</style>