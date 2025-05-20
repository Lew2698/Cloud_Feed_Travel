<template>
	<view class="page-container">
		<!-- 返回按钮和标题 -->
		<view class="header">
			<navigator open-type="navigateBack" class="back-btn">
				<text class="iconfont icon-arrow-left"></text>
			</navigator>
			<text class="header-title">认领新的家禽/农作物</text>
		</view>
		
		<view class="content">
			<!-- 标签切换 -->
			<view class="claim-tabs">
				<view class="claim-tab" :class="{ active: activeTab === 'poultry' }" @click="activeTab = 'poultry'">家禽</view>
				<view class="claim-tab" :class="{ active: activeTab === 'crops' }" @click="activeTab = 'crops'">农作物</view>
			</view>
			
			<!-- 家禽分类筛选 -->
			<view class="filtered-section" v-if="activeTab === 'poultry'">
				<scroll-view scroll-x class="filter-chips">
					<view 
						v-for="(item, index) in poultryTypes" 
						:key="index" 
						class="filter-chip" 
						:class="{ active: activePType === item }"
						@click="activePType = item"
					>{{item}}</view>
				</scroll-view>
			</view>
			
			<!-- 农作物分类筛选 -->
			<view class="filtered-section" v-if="activeTab === 'crops'">
				<scroll-view scroll-x class="filter-chips">
					<view 
						v-for="(item, index) in cropTypes" 
						:key="index" 
						class="filter-chip" 
						:class="{ active: activeCType === item }"
						@click="activeCType = item"
					>{{item}}</view>
				</scroll-view>
			</view>
			
			<!-- 产品展示网格 -->
			<view class="product-grid">
				<!-- 产品项目 -->
				<view class="product-item" v-for="(item, index) in activeProducts" :key="index">
					<view class="popular-badge" v-if="item.isPopular">热门</view>
					<image :src="item.image" :alt="item.name" class="product-image"></image>
					<view class="product-info">
						<text class="product-name">{{item.name}}</text>
						<text class="product-desc">{{item.desc}}</text>
						<text class="product-price">¥{{item.price}}</text>
						<button class="product-btn" @click="claimProduct(item)">立即认领</button>
					</view>
				</view>
			</view>
			
			<!-- 认领说明 -->
			<view class="card">
				<text class="card-title">认领须知</text>
				<view class="notice-list">
					<text class="notice-item">认领后您可以获得该家禽的所有权</text>
					<text class="notice-item">我们提供专业养殖服务直至出栏</text>
					<text class="notice-item">您可随时通过监控查看养殖情况</text>
					<text class="notice-item">出栏后可选择配送到家或自取</text>
					<text class="notice-item">认领可获得相应云养能量值</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				activeTab: 'poultry',
				poultryTypes: ['全部', '散养鸡', '肉鸭', '土鹅', '土猪', '黑山羊'],
				cropTypes: ['全部', '有机大米', '时令蔬菜', '特色水果', '药材', '坚果'],
				activePType: '全部',
				activeCType: '全部',
				poultryProducts: [
					{
						id: 'p1',
						name: '瑶山散养鸡',
						desc: '高山散养，纯粮喂食',
						price: '188/只',
						image: '/static2/3545.jpg_wh860.jpg',
						type: '散养鸡',
						isPopular: true
					},
					{
						id: 'p2',
						name: '瑶山黑猪',
						desc: '散养山黑猪，肉质鲜美',
						price: '1288/只',
						image: '/static2/1529152636_835789403.jpg',
						type: '土猪'
					},
					{
						id: 'p3',
						name: '瑶山肉鸭',
						desc: '水稻田放养，生态健康',
						price: '128/只',
						image: '/static2/jB0XxdPkTO.jpg',
						type: '肉鸭'
					},
					{
						id: 'p4',
						name: '瑶山土鹅',
						desc: '湖边放养，肉质细嫩',
						price: '258/只',
						image: '/static2/23674369667344d4b28456a20e2c41ab_th.jpg',
						type: '土鹅'
					},
					{
						id: 'p5',
						name: '瑶山山羊',
						desc: '山地放养，肉质鲜美',
						price: '888/只',
						image: '/static2/6367.jpg_wh300.jpg',
						type: '山羊'
					},
					{
						id: 'p6',
						name: '瑶山黄牛',
						desc: '药材喂养，滋补养生',
						price: '2288/只',
						image: '/static2/12f4-fc24c76b7905f3767d147f7917580a69.jpg',
						type: '其他'
					}
				],
				cropProducts: [
					{
						id: 'c1',
						name: '有机稻米',
						desc: '无农药种植，生态健康',
						price: '158/袋',
						image: '/static2/t04154e11dec4b5a97b.jpg',
						type: '有机大米',
						isPopular: true
					},
					{
						id: 'c2',
						name: '有机蔬菜',
						desc: '当季新鲜，绿色种植',
						price: '188/箱',
						image: '/static2/t011ed712751467b01c.jpg',
						type: '时令蔬菜'
					}
				]
			}
		},
		computed: {
			activeProducts() {
				if (this.activeTab === 'poultry') {
					if (this.activePType === '全部') {
						return this.poultryProducts;
					} else {
						return this.poultryProducts.filter(item => item.type === this.activePType);
					}
				} else {
					if (this.activeCType === '全部') {
						return this.cropProducts;
					} else {
						return this.cropProducts.filter(item => item.type === this.activeCType);
					}
				}
			}
		},
		methods: {
			claimProduct(product) {
				uni.showModal({
					title: '认领确认',
					content: `确认认领 ${product.name}，价格：¥${product.price}？`,
					success: (res) => {
						if (res.confirm) {
							uni.showToast({
								title: '认领成功',
								icon: 'success'
							});
							setTimeout(() => {
								uni.navigateTo({
									url: '/pages/farm/my'
								});
							}, 1500);
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	
	page {
		background-color: $color-secondary;
	}
	
	.page-container {
		padding-bottom: 100rpx;
	}
	
	.header {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx;
		background-color: #FFFFFF;
		position: sticky;
		top: 0;
		z-index: 100;
		box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
	}
	
	.back-btn {
		margin-right: 20rpx;
		width: 60rpx;
		height: 60rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.iconfont.icon-arrow-left:before {
		content: '\f060';
		color: $color-dark;
		font-size: 32rpx;
	}
	
	.header-title {
		font-size: 36rpx;
		font-weight: 600;
		color: $color-dark;
	}
	
	.content {
		padding: 30rpx;
	}
	
	/* 标签切换 */
	.claim-tabs {
		display: flex;
		margin-bottom: 30rpx;
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
	}
	
	.claim-tab {
		flex: 1;
		text-align: center;
		padding: 24rpx;
		transition: all 0.3s ease;
	}
	
	.claim-tab.active {
		background-color: $color-highlight;
		color: white;
		font-weight: 600;
	}
	
	/* 过滤筛选 */
	.filtered-section {
		margin-bottom: 30rpx;
	}
	
	.filter-chips {
		display: flex;
		white-space: nowrap;
		margin-bottom: 20rpx;
	}
	
	.filter-chip {
		display: inline-block;
		background-color: white;
		border-radius: 40rpx;
		padding: 16rpx 30rpx;
		font-size: 26rpx;
		margin-right: 20rpx;
		transition: all 0.3s ease;
	}
	
	.filter-chip.active {
		background-color: $color-dark;
		color: white;
	}
	
	/* 产品网格 */
	.product-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 20rpx;
		margin-bottom: 30rpx;
	}
	
	.product-item {
		background-color: white;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
		position: relative;
	}
	
	.popular-badge {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		background-color: $color-primary;
		color: white;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		font-size: 20rpx;
		font-weight: 600;
		z-index: 1;
	}
	
	.product-image {
		width: 100%;
		height: 240rpx;
		object-fit: cover;
	}
	
	.product-info {
		padding: 20rpx;
	}
	
	.product-name {
		font-weight: 600;
		font-size: 30rpx;
		color: $color-dark;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.product-desc {
		font-size: 24rpx;
		color: #777;
		margin-bottom: 10rpx;
		display: block;
	}
	
	.product-price {
		font-weight: 700;
		color: $color-primary;
		font-size: 32rpx;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.product-btn {
		background-color: $color-highlight;
		color: white;
		border: none;
		border-radius: 40rpx;
		padding: 12rpx 24rpx;
		font-size: 24rpx;
		font-weight: 600;
		line-height: 1;
	}
	
	/* 认领须知卡片 */
	.card {
		background-color: white;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 4rpx 10rpx rgba(94, 100, 114, 0.1);
	}
	
	.card-title {
		font-weight: 600;
		font-size: 32rpx;
		color: $color-dark;
		margin-bottom: 20rpx;
		display: block;
	}
	
	.notice-list {
		display: flex;
		flex-direction: column;
	}
	
	.notice-item {
		font-size: 26rpx;
		color: #666;
		margin-bottom: 10rpx;
		padding-left: 20rpx;
		position: relative;
		line-height: 1.4;
		
		&:before {
			content: '';
			width: 8rpx;
			height: 8rpx;
			background-color: $color-highlight;
			border-radius: 50%;
			position: absolute;
			left: 0;
			top: 14rpx;
		}
		
		&:last-child {
			margin-bottom: 0;
		}
	}
</style> 