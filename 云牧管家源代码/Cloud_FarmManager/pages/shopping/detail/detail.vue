<template>
	<view class="page-container">
		<!-- 产品图片画廊 -->
		<view class="gallery-container">
			<navigator open-type="navigateBack" class="back-button">
				<image src="/static/icons/shopping icon/左箭头.svg" class="icon-svg"></image>
			</navigator>
			<view class="share-button" @click="shareProduct">
				<image src="/static/icons/shopping icon/share-alt.svg" class="icon-svg"></image>
			</view>
			<swiper 
				class="gallery-swiper" 
				circular 
				indicator-dots 
				:indicator-active-color="indicatorActiveColor"
				:indicator-color="indicatorColor"
				@change="onSwiperChange"
			>
				<swiper-item v-for="(image, index) in product.images" :key="index">
					<image :src="image" mode="aspectFill" class="product-image"></image>
				</swiper-item>
			</swiper>
		</view>
		
		<!-- 产品信息部分 -->
		<view class="product-info-section">
			<view class="price-section">
				<text class="current-price">¥{{product.price}}</text>
				<text class="original-price" v-if="product.originalPrice">¥{{product.originalPrice}}</text>
				<text class="label-new" v-if="product.isNew">新品</text>
				<text class="organic-badge" v-if="product.isOrganic">有机认证</text>
			</view>
			
			<text class="product-name">{{product.name}}</text>
			<text class="product-slogan">{{product.slogan}}</text>
			
			<view class="product-stats">
				<view class="product-stat">
					<text class="stat-number">{{product.rating}}</text>
					<text class="stat-label">评分</text>
				</view>
				<view class="product-stat">
					<text class="stat-number">{{product.sales}}</text>
					<text class="stat-label">销量</text>
				</view>
				<view class="product-stat">
					<text class="stat-number">{{product.favorableRate}}%</text>
					<text class="stat-label">好评率</text>
				</view>
			</view>
			
			<!-- 区块链溯源 -->
			<view class="blockchain-trace" @click="navigateToTrace">
			  <view class="blockchain-icon">
				<image class="trace-icon" src="/static/icons/shopping icon/link.svg"></image>
			  </view>
			  <view class="blockchain-info">
				<text class="blockchain-title">区块链溯源</text>
				<text class="blockchain-desc">可追溯采集、加工、检验、物流全过程</text>
			  </view>
			  <image class="trace-icon" src="/static/icons/activity icon/定位.svg"></image>
			</view>
			
			<!-- 养殖户信息 -->
			<view class="farm-info" @click="navigateToFarm">
				<image :src="product.farmLogo" class="farm-logo"></image>
				<view>
					<text class="farm-name">{{product.farmName}}</text>
					<view class="farm-location">
						<image class="trace-icons" src="/static/icons/activity icon/定位.svg"></image>
						<text>{{product.farmLocation}}</text>
					</view>
				</view>
			</view>
			
			<!-- 产品详情标签 -->
			<view class="product-detail-tabs">
				<view 
					v-for="(tab, index) in detailTabs" 
					:key="index"
					class="product-detail-tab"
					:class="{ active: currentTab === tab.id }"
					@click="currentTab = tab.id"
				>{{tab.name}}</view>
			</view>
			
			<!-- 内容区域 - 商品介绍 -->
			<block v-if="currentTab === 'intro'">
				<view class="section-title">商品介绍</view>
				<text class="product-description" v-for="(desc, index) in product.description" :key="index">{{desc}}</text>
			</block>
			
			<!-- 内容区域 - 产品规格 -->
			<block v-if="currentTab === 'specs'">
				<view class="section-title">产品规格</view>
				<view class="product-specs">
					<view class="spec-item" v-for="(spec, index) in product.specs" :key="index">
						<text class="spec-label">{{spec.label}}</text>
						<text class="spec-value">{{spec.value}}</text>
					</view>
				</view>
				
				<view class="section-title">产品图片</view>
				<view class="product-gallery">
					<view class="gallery-item" v-for="(image, index) in product.detailImages" :key="index">
						<image :src="image" mode="aspectFill" @click="previewImage(index)"></image>
					</view>
				</view>
			</block>
			
			<!-- 内容区域 - 用户评价 -->
			<block v-if="currentTab === 'reviews'">
				<view class="section-title">用户评价 ({{product.comments.length}})</view>
				<view class="comments-section">
					<view class="comment-item" v-for="(comment, index) in product.comments" :key="index">
						<view class="comment-header">
							<image :src="comment.avatar" class="comment-avatar"></image>
							<view>
								<text class="comment-user">{{comment.username}}</text>
								<text class="comment-date">{{comment.date}}</text>
								<view class="comment-rating">
									<text class="iconfont icon-star" v-for="i in 5" :key="i" :class="{ 'active': i <= comment.rating }"></text>
								</view>
							</view>
						</view>
						<text class="comment-content">{{comment.content}}</text>
						<view class="comment-images" v-if="comment.images && comment.images.length">
							<image 
								v-for="(img, imgIndex) in comment.images" 
								:key="imgIndex" 
								:src="img" 
								class="comment-image"
								@click="previewCommentImage(comment.images, imgIndex)"
							></image>
						</view>
					</view>
				</view>
			</block>
			
			<!-- 底部占位，确保内容不被底部操作栏遮挡 -->
			<view style="height: 150rpx;"></view>
		</view>
		
		<!-- 底部操作栏 -->
		<view class="product-actions">
			<view class="action-favorite" @click="toggleFavorite">
				<text class="iconfont" :class="isFavorite ? 'icon-heart-solid' : 'icon-heart'"></text>
				<text>收藏</text>
			</view>
			<view class="action-cart" @click="navigateToCart">
				<text class="iconfont icon-shopping-cart"></text>
				<text>购物车</text>
				<text class="badge" v-if="cartCount > 0">{{cartCount}}</text>
			</view>
			<view class="action-buttons">
				<button class="btn-add-cart" @click="addToCart">加入购物车</button>
				<button class="btn btn-buy-now" @click="buyNow">立即购买</button>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted, getCurrentInstance } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getProductById } from '../../../data/products.js'
	
	const { proxy } = getCurrentInstance()
	
	// 响应式数据
	const productId = ref(null)
	const indicatorActiveColor = ref('#FFFFFF')
	const indicatorColor = ref('rgba(255, 255, 255, 0.5)')
	const currentTab = ref('intro')
	const detailTabs = ref([
		{ id: 'intro', name: '商品详情' },
		{ id: 'specs', name: '规格参数' },
		{ id: 'reviews', name: '用户评价' }
	])
	const isFavorite = ref(false)
	const cartCount = ref(0)
	
	// 商品信息 - 默认空对象，避免模板渲染错误
	const product = ref({
		id: 0,
		name: '',
		slogan: '',
		price: '0',
		originalPrice: '',
		isNew: false,
		isOrganic: false,
		rating: '0',
		sales: '0',
		favorableRate: 0,
		images: [],
		description: [],
		farmId: 0,
		farmName: '',
		farmLogo: '',
		farmLocation: '',
		specs: [],
		detailImages: [],
		comments: []
	})
	
	// 页面加载时获取商品信息
	onLoad((options) => {
		if (options.id) {
			productId.value = parseInt(options.id)
			loadProductDetail()
		}
	})
	
	// 页面显示时更新购物车数量
	onMounted(() => {
		updateCartCount()
	})
	
	// 加载商品详情
	const loadProductDetail = () => {
		const productData = getProductById(productId.value)
		if (productData) {
			product.value = productData
		} else {
			uni.showToast({
				title: '商品不存在',
				icon: 'none'
			})
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}
	}
	
	// 更新购物车数量
	const updateCartCount = () => {
		cartCount.value = proxy.$cartStore.getTotalCount()
	}
	
	// 轮播图切换事件
	const onSwiperChange = (e) => {
		const current = e.detail.current
		console.log('当前索引:', current)
	}
	
	// 切换收藏状态
	const toggleFavorite = () => {
		isFavorite.value = !isFavorite.value
		if (isFavorite.value) {
			uni.showToast({
				title: '已加入收藏',
				icon: 'success'
			})
		} else {
			uni.showToast({
				title: '已取消收藏',
				icon: 'none'
			})
		}
	}
	
	// 加入购物车
	const addToCart = () => {
		const success = proxy.$cartStore.addToCart(product.value, 1)
		if (success) {
			updateCartCount()
			uni.showToast({
				title: '已加入购物车',
				icon: 'success'
			})
		}
	}
	
	// 立即购买
	const buyNow = () => {
		uni.navigateTo({
			url: `/pages/shopping/order/confirm?productId=${product.value.id}&quantity=1`
		})
	}
	
	// 分享产品
	const shareProduct = () => {
		uni.showActionSheet({
			itemList: ['分享给朋友', '分享到朋友圈', '复制链接'],
			success: (res) => {
				uni.showToast({
					title: '分享成功',
					icon: 'success'
				})
			}
		})
	}
	
	// 预览产品详情图片
	const previewImage = (index) => {
		uni.previewImage({
			current: index,
			urls: product.value.detailImages
		})
	}
	
	// 预览评论图片
	const previewCommentImage = (images, index) => {
		uni.previewImage({
			current: index,
			urls: images
		})
	}
	
	// 跳转到区块链溯源页面
	const navigateToTrace = () => {
		uni.navigateTo({
			url: `/pages/shopping/detail/trace?id=${productId.value}`
		})
	}
	
	// 跳转到养殖户页面
	const navigateToFarm = () => {
		uni.navigateTo({
			url: `/pages/shopping/detail/farm?id=${product.value.farmId}`
		})
	}
	
	// 跳转到购物车
	const navigateToCart = () => {
		uni.navigateTo({
			url: '/pages/shopping/cart/cart'
		})
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page {
		background-color: #f5f5f5;
	}
	
	.page-container {
		padding-bottom: 120rpx;
	}
	
	/* 产品图片轮播 */
	.gallery-container {
		position: relative;
		height: 700rpx;
		background-color: #f5f5f5;
		overflow: hidden;
	}
	
	.gallery-swiper {
		width: 100%;
		height: 100%;
	}
	
	.product-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	.back-button {
		position: absolute;
		top: 30rpx;
		left: 30rpx;
		width: 72rpx;
		height: 72rpx;
		background-color: rgba(0, 0, 0, 0.3);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	
	.iconfont.icon-arrow-left:before {
		content: '\f060';
		font-size: 36rpx;
	}
	
	.share-button {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
		width: 72rpx;
		height: 72rpx;
		background-color: rgba(0, 0, 0, 0.3);
		color: white;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10;
	}
	
	.iconfont.icon-share-alt:before {
		content: '\f1e0';
		font-size: 36rpx;
	}
	
	/* 产品信息部分 */
	.product-info-section {
		padding: 40rpx 30rpx;
		background-color: white;
		border-radius: 40rpx 40rpx 0 0;
		margin-top: -40rpx;
		position: relative;
		z-index: 5;
	}
	
	.product-name {
		font-size: 44rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 20rpx;
		line-height: 1.3;
		display: block;
	}
	
	.product-slogan {
		font-size: 28rpx;
		color: #777;
		margin-bottom: 30rpx;
		display: block;
	}
	
	.price-section {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.current-price {
		font-size: 48rpx;
		font-weight: 700;
		color: $color-primary;
		margin-right: 20rpx;
	}
	
	.original-price {
		font-size: 28rpx;
		color: #999;
		text-decoration: line-through;
	}
	
	.label-new {
		background-color: $color-primary;
		color: white;
		font-size: 24rpx;
		padding: 4rpx 16rpx;
		border-radius: 6rpx;
		margin-left: 20rpx;
	}
	
	.organic-badge {
		background-color: #8BC34A;
		color: white;
		font-size: 24rpx;
		padding: 6rpx 20rpx;
		border-radius: 30rpx;
		margin-left: 20rpx;
		font-weight: 500;
	}
	
	.product-stats {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		border-top: 1px solid #f0f0f0;
		border-bottom: 1px solid #f0f0f0;
		margin-bottom: 40rpx;
	}
	
	.product-stat {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.stat-number {
		font-size: 30rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 10rpx;
	}
	
	.stat-label {
		font-size: 24rpx;
		color: #999;
	}
	
	.section-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
		margin: 50rpx 0 30rpx;
		display: flex;
		align-items: center;
	}
	
	.section-title::before {
		content: '';
		width: 8rpx;
		height: 36rpx;
		background-color: $color-primary;
		margin-right: 20rpx;
		border-radius: 4rpx;
	}
	
	.product-description {
		font-size: 28rpx;
		color: #555;
		line-height: 1.6;
		margin-bottom: 30rpx;
		display: block;
	}
	
	/* 区块链溯源 */
	.blockchain-trace {
		margin-top: 30rpx;
		background-color: rgba(94, 100, 114, 0.1);
		padding: 30rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}
	
	.blockchain-icon {
		width: 80rpx;
		height: 80rpx;
		background-color: $color-dark;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 30rpx;
		color: white;
	}
	
	.iconfont.icon-link:before {
		content: '\f0c1';
		font-size: 36rpx;
	}
	
	.blockchain-info {
		flex: 1;
	}
	
	.blockchain-title {
		font-size: 28rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.blockchain-desc {
		font-size: 24rpx;
		color: #777;
	}
	
	/* 养殖户信息 */
	.farm-info {
		display: flex;
		align-items: center;
		background-color: rgba(174, 217, 224, 0.2);
		padding: 30rpx;
		border-radius: 20rpx;
		margin-bottom: 40rpx;
	}
	
	.farm-logo {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		margin-right: 30rpx;
		object-fit: cover;
	}
	
	.farm-name {
		font-size: 32rpx;
		font-weight: 600;
		color: $color-dark;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.farm-location {
		font-size: 24rpx;
		color: #777;
		display: flex;
		align-items: center;
	}
	
	.iconfont.icon-map-marker-alt:before {
		content: '\f3c5';
		margin-right: 10rpx;
		color: $color-primary;
	}
	
	/* 产品详情标签 */
	.product-detail-tabs {
		display: flex;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		overflow: hidden;
	}
	
	.product-detail-tab {
		flex: 1;
		text-align: center;
		padding: 24rpx 0;
		font-size: 28rpx;
		color: $color-dark;
	}
	
	.product-detail-tab.active {
		background-color: $color-primary;
		color: white;
		font-weight: 500;
	}
	
	/* 产品规格 */
	.spec-item {
		display: flex;
		padding: 20rpx 0;
		border-bottom: 1px solid #f0f0f0;
	}
	
	.spec-label {
		width: 200rpx;
		font-size: 28rpx;
		color: #777;
	}
	
	.spec-value {
		flex: 1;
		font-size: 28rpx;
		color: $color-dark;
	}
	
	/* 产品图片 */
	.product-gallery {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
		margin-bottom: 50rpx;
	}
	
	.gallery-item {
		width: calc(33.33% - 14rpx);
		aspect-ratio: 1 / 1;
		overflow: hidden;
		border-radius: 16rpx;
		background-color: #f5f5f5;
	}
	
	.gallery-item image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	
	/* 评论部分 */
	.comments-section {
		margin-bottom: 60rpx;
	}
	
	.comment-item {
		margin-bottom: 40rpx;
	}
	
	.comment-header {
		display: flex;
		margin-bottom: 20rpx;
	}
	
	.comment-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}
	
	.comment-user {
		font-size: 28rpx;
		font-weight: 500;
		color: $color-dark;
		margin-bottom: 6rpx;
		display: block;
	}
	
	.comment-date {
		font-size: 24rpx;
		color: #999;
		display: block;
	}
	
	.comment-rating {
		display: flex;
		margin-top: 6rpx;
	}
	
	.iconfont.icon-star:before {
		content: '\f005';
		color: #ccc;
		font-size: 24rpx;
		margin-right: 4rpx;
	}
	
	.iconfont.icon-star.active:before {
		color: #FFD700;
	}
	
	.comment-content {
		font-size: 28rpx;
		color: #555;
		line-height: 1.5;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.comment-images {
		display: flex;
		flex-wrap: wrap;
		gap: 16rpx;
		margin-top: 20rpx;
	}
	
	.comment-image {
		width: 140rpx;
		height: 140rpx;
		border-radius: 10rpx;
		object-fit: cover;
	}
	
	/* 底部操作栏 */
	.product-actions {
		display: flex;
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: white;
		padding: 24rpx 30rpx;
		box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.1);
		z-index: 100;
	}
	
	.action-favorite {
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
		color: $color-dark;
		margin-right: 20rpx;
	}
	
	.iconfont.icon-heart:before {
		content: '\f004';
		font-size: 40rpx;
		margin-bottom: 6rpx;
	}
	
	.iconfont.icon-heart-solid:before {
		content: '\f004';
		font-size: 40rpx;
		margin-bottom: 6rpx;
		color: $color-primary;
	}
	
	.action-cart {
		width: 100rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
		color: $color-dark;
		margin-right: 30rpx;
		position: relative;
	}
	
	.iconfont.icon-shopping-cart:before {
		content: '\f07a';
		font-size: 40rpx;
		margin-bottom: 6rpx;
	}
	
	.badge {
		position: absolute;
		top: -10rpx;
		right: 0;
		background-color: $color-primary;
		color: white;
		font-size: 20rpx;
		padding: 0 10rpx;
		border-radius: 20rpx;
		min-width: 36rpx;
		text-align: center;
	}
	
	.action-buttons {
		display: flex;
		flex: 1;
	}
	
	.btn-add-cart {
		flex: 1;
		margin-right: 20rpx;
		border-radius: 50rpx;
		font-size: 28rpx;
		background-color: rgba(255, 166, 158, 0.2);
		color: $color-primary;
		border: 2rpx solid $color-primary;
	}
	
	.btn-buy-now {
		flex: 1;
		border-radius: 50rpx;
		font-size: 28rpx;
		background-color: $color-primary;
		color: white;
	}
	
	/* 修复菜单箭头 */
	.menu-arrow {
		color: #aaa;
		font-size: 24rpx;
	}
	
	.iconfont.icon-chevron-right:before {
		content: '\f054';
	}
	.icon-svg {
	  width: 40rpx;
	  height: 40rpx;
	}
	.trace-icon {
	  width: 45rpx;
	  height: 45rpx;
	}
	.trace-icons {
	  width: 30rpx;
	  height: 30rpx;
	}
</style> 