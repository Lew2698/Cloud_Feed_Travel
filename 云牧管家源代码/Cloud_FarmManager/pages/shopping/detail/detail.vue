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
			<view class="blockchain-trace" @click="navigateTo('/pages/shopping/detail/trace')">
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
			<view class="farm-info" @click="navigateTo('/pages/shopping/detail/farm?id=' + product.farmId)">
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
			<view class="action-cart" @click="navigateTo('/pages/shopping/cart/cart')">
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

<script>
	export default {
		data() {
			return {
				productId: null,
				indicatorActiveColor: '#FFFFFF',
				indicatorColor: 'rgba(255, 255, 255, 0.5)',
				currentTab: 'intro',
				detailTabs: [
					{ id: 'intro', name: '商品详情' },
					{ id: 'specs', name: '规格参数' },
					{ id: 'reviews', name: '用户评价' }
				],
				isFavorite: false,
				cartCount: 3,
				// 模拟产品数据
				product: {
					id: 1,
					name: '瑶族野生鸡蛋 500g',
					slogan: '采自瑶山深处鸡所下的蛋，天然无添加',
					price: '12',
					originalPrice: '15',
					isNew: true,
					isOrganic: true,
					rating: '4.9',
					sales: '586',
					favorableRate: 98,
					images: [
						'/static2/hCSyEZ4ptM_small.jpg',
						'/static2/UWwPfXP2yh_small.jpg',
						'/static2/8380.jpg_wh860.jpg',
						'/static2/yuan_af14c2ee4fda89819c3cd58a234b8b68.jpeg'
					],
					description: [
						'瑶族鸡蛋源自瑶族聚居的青山秀水间，瑶族同胞们在山林间散养当地特色土鸡。土鸡们自由穿梭于林间草地，啄食山间昆虫、草籽，饮用清冽山泉水。这些土鸡在天然生态环境中生长，所产鸡蛋完全遵循自然规律孕育。瑶族鸡蛋无激素、抗生素添加，外壳色泽温润，蛋黄紧实饱满、颜色橙红，富含蛋白质、多种维生素及矿物质等营养物质，以天然本真的品质，传递着瑶族聚居地独特的生态之美与自然馈赠 。',
						'瑶族鸡蛋外壳泛着柔和的浅褐色光泽，个头匀称饱满。蛋黄颜色鲜艳橙红，质地紧实，蛋清浓稠透亮。轻轻煮熟后，剥开蛋壳，浓郁的蛋香便扑鼻而来，入口细腻绵密，口感醇香浓郁，余味中带着淡淡的自然清甜。其富含优质蛋白质、卵磷脂、钙、铁等多种人体所需营养元素，无论是自家烹饪滋养，还是作为伴手礼馈赠亲友，都是充满瑶族特色与健康心意的优质之选。'
					],
					farmId: 1,
					farmName: '瑶山养鸡合作社',
					farmLogo: '/static2/4378.jpg_wh860.jpg',
					farmLocation: '湘西瑶族自治县',
					specs: [
						{ label: '品名', value: '瑶山野生鸡蛋' },
						{ label: '净含量', value: '500g' },
						{ label: '产地', value: '湘西瑶族自治县' },
						{ label: '保质期', value: '20天' },
						{ label: '储存方法', value: '常温密封保存，避免阳光直射' },
						{ label: '认证', value: '有机认证、绿色食品认证' }
					],
					detailImages: [
						'/static2/90.jpg',
						'/static2/215116ec82444d536ffc9db9894bd298.jpg',
						'https://img95.699pic.com/photo/50165/8380.jpg_wh860.jpg',
						'https://pic.52112.com/180606/JPG-180606_129/UWwPfXP2yh_small.jpg',
						'https://img95.699pic.com/photo/60014/8614.jpg_wh300.jpg!/fh/300/quality/90',
						'https://bpic.588ku.com/element_origin_min_pic/19/07/19/215116ec82444d536ffc9db9894bd298.jpg'
					],
					comments: [
						{
							username: '张*红',
							avatar: '/static2/photo-1494790108377-be9c29b29330.avif',
							date: '2025-04-15',
							rating: 5,
							content: '收到瑶族鸡蛋超惊喜！包装严实又精致，防震设计让每一颗鸡蛋都完好无损。打开包装，就能感受到天然的气息，鸡蛋外壳带着山林间的质朴质感。煮熟后品尝，蛋香浓郁醇厚，口感细腻嫩滑，完全没有腥味。卖家介绍说这是瑶族同胞山林散养土鸡所产，无激素添加，吃得安心又健康，下次还会回购！',
							images: [
								'https://img95.699pic.com/photo/60082/7816.jpg_wh860.jpg',
								'https://pic.nximg.cn/file/20210520/21319742_210119474127_2.jpg'
							]
						},
						{
							username: '王*生',
							avatar: '/static2/photo-1599566150163-29194dcaad36.avif',
							date: '2025-04-10',
							rating: 5,
							content: '第二次购买了，家里人都很喜欢。这个瑶山鸡蛋确实和超市里的不一样，有一种特别的香味，质量很好，而且通过App还可以查看鸡蛋的溯源信息，非常安心。'
						}
					]
				}
			}
		},
		onLoad(options) {
			// 从URL参数获取产品ID
			if (options.id) {
				this.productId = options.id;
				// 实际应用中应该根据ID从后端获取产品信息
				// this.fetchProductDetail();
			}
		},
		methods: {
			navigateTo(url) {
				uni.navigateTo({
					url: url
				});
			},
			onSwiperChange(e) {
				// 轮播图切换事件
				const current = e.detail.current;
				console.log('当前索引:', current);
			},
			toggleFavorite() {
				this.isFavorite = !this.isFavorite;
				if (this.isFavorite) {
					uni.showToast({
						title: '已加入收藏',
						icon: 'success'
					});
				} else {
					uni.showToast({
						title: '已取消收藏',
						icon: 'none'
					});
				}
			},
			addToCart() {
				// 加入购物车逻辑
				this.cartCount++;
				uni.showToast({
					title: '已加入购物车',
					icon: 'success'
				});
			},
			buyNow() {
				// 立即购买逻辑，跳转到确认订单页面
				uni.navigateTo({
					url: '/pages/shopping/order/confirm?productId=' + this.product.id + '&quantity=1'
				});
			},
			shareProduct() {
				// 分享产品
				uni.showActionSheet({
					itemList: ['分享给朋友', '分享到朋友圈', '复制链接'],
					success: (res) => {
						uni.showToast({
							title: '分享成功',
							icon: 'success'
						});
					}
				});
			},
			previewImage(index) {
				// 预览产品详情图片
				uni.previewImage({
					current: index,
					urls: this.product.detailImages
				});
			},
			previewCommentImage(images, index) {
				// 预览评论图片
				uni.previewImage({
					current: index,
					urls: images
				});
			},
			fetchProductDetail() {
				// 实际应用中应该调用API获取产品详情
				uni.showLoading({
					title: '加载中...'
				});
				
				// 模拟API请求
				setTimeout(() => {
					// 实际应用中应该使用uni.request调用API
					uni.hideLoading();
				}, 500);
			}
		}
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