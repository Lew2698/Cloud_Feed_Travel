<template>
    <view class="game-container">
        <!-- 游戏背景场景 -->
        <view class="game-bg">
            <!-- 农田地块 -->
            <view v-for="(plot, index) in farmPlots" :key="index" class="farm-plot"
                :class="{ 'has-crop': plot.status !== 'empty' }"
                :style="{ top: plot.position.top, left: plot.position.left }" @click="handlePlotClick(index)">

                <!-- 根据地块状态显示不同内容 -->
                <image v-if="plot.status === 'empty'" src="/static/game/farm/plus.png" class="empty-image"></image>

                <image v-else-if="plot.status === 'child'" :src="plot.cropImage" class="child-image">
                </image> 

                <image v-else-if="plot.status === 'adult'" :src="plot.cropImage" class="crop-image">
                </image>

                <image v-else-if="plot.status === 'ready'" :src="plot.cropImage" class="crop-image"></image>

                <!-- 状态指示器 -->
                <view v-if="plot.status !== 'empty' && plot.needsWater" class="plot-status">
                    <image src="/static/game/farm/need-water.svg" class="status-icon"></image>
                </view>
                <view v-if="plot.status !== 'empty' && plot.status !== 'seed' && plot.needsFertilizer"
                    class="plot-status">
                    <image src="/static/game/farm/need-fertilizer.svg" class="status-icon"></image>
                </view>
                <view v-if="plot.status === 'ready'" class="plot-status">
                    <image src="/static/game/farm/ready.svg" class="status-icon"></image>
                </view>

                <!-- 悬浮信息 -->
                <view class="floating-info">
                    <text>{{ getPlotInfoText(plot) }}</text>
                </view>
            </view>
        </view>

        <!-- 顶部控制栏 -->
        <view class="game-header">
            <view class="return-btn" @click="goBack">
                <image src="/static/game/farm/arrow-left.svg" class="icon-image"></image>
            </view>
            <view class="player-info">
                <image src="/static/icons/monitor icon/kiwi-bird.svg" class="energy-icon-img"></image>
                <text class="energy-value">258</text>
                <image src="/static/game/farm/coin.svg" class="coin-icon-img"></image>
                <text class="coin-value">1,568</text>
            </view>
        </view>

        <!-- 底部工具栏 -->
        <view class="game-toolbar">
            <view class="tool-btn" :class="{ active: currentTool === 'seed' }" @click="selectTool('seed')">
                <image src="/static/icons/monitor icon/kiwi-bird.svg" class="tool-icon-img"></image>
                <text class="tool-name">养殖</text>
            </view>
			<view class="tool-btn" :class="{ active: currentTool === 'water' }" @click="selectTool('water')">
			    <image src="/static/game/ranch/bucket.2.svg" class="tool-icon-img"></image>
			    <text class="tool-name">喝水</text>
			</view>
            <view class="tool-btn" :class="{ active: currentTool === 'fertilizer' }" @click="selectTool('fertilizer')">
                <image src="/static/game/farm/a-005-fertilizer.png" class="tool-icon-img"></image>
                <text class="tool-name">投喂</text>
            </view>
            <view class="tool-btn" :class="{ active: currentTool === 'harvest' }" @click="selectTool('harvest')">
                <image src="/static/game/farm/a-047-gloves.png" class="tool-icon-img"></image>
                <text class="tool-name">收获</text>
            </view>
            <view class="tool-btn" @click="openMarket">
                <image src="/static/game/farm/market.svg" class="tool-icon-img"></image>
                <text class="tool-name">市场</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            // 游戏状态
            currentTool: '',

            // 农田地块数据
            farmPlots: [
                {
                    id: 'plot1',
                    position: { top: '45%', left: '20%' },
                    status: 'child',
                    cropType: 'chicken',
                    cropImage: '/static/game/ranch/028-hen.svg',
                    needsWater: true,
                    needsFertilizer: true,
                    growthStage: 1,
                    growthTime: 30,
                    harvestTime: null
                },
                {
                    id: 'plot2',
                    position: { top: '45%', left: '42%' },
                    status: 'ready',
                    cropType: 'horse',
                    cropImage: '/static/game/ranch/007-horse.svg',
                    needsWater: false,
                    needsFertilizer: false,
                    growthStage: 3,
                    growthTime: 100,
                    harvestTime: new Date()
                },
                {
                    id: 'plot3',
                    position: { top: '55%', left: '20%' },
                    status: 'child',
                    cropType: 'pig',
                    cropImage: '/static/game/ranch/035-pig.svg',
                    needsWater: true,
                    needsFertilizer: false,
                    growthStage: 0,
                    growthTime: 10,
                    harvestTime: null
                },
                {
                    id: 'plot4',
                    position: { top: '55%', left: '42%' },
                    status: 'adult',
                    cropType: 'cow',
                    cropImage: '/static/game/ranch/056-cow.svg',
                    needsWater: false,
                    needsFertilizer: true,
                    growthStage: 1,
                    growthTime: 20,
                    harvestTime: null
                },
                {
                    id: 'plot5',
                    position: { top: '65%', left: '20%' },
                    status: 'ready',
                    cropType: 'chicken',
                    cropImage: '/static/game/ranch/028-hen.svg',
                    needsWater: true,
                    needsFertilizer: false,
                    growthStage: 3,
                    growthTime: 100,
                    harvestTime: new Date()
                },
                {
                    id: 'plot6',
                    position: { top: '65%', left: '42%' },
                    status: 'empty',
                    cropType: '',
                    cropImage: '',
                    needsWater: false,
                    growthStage: 0,
                    growthTime: 0,
                    harvestTime: null
                },
				{
                    id: 'plot7',
                    position: { top: '45%', left: '65%' },
                    status: 'empty',
                    cropType: '',
                    cropImage: '',
                    needsWater: false,
                    growthStage: 0,
                    growthTime: 0,
                    harvestTime: null
                },
				{
                    id: 'plot8',
                    position: { top: '55%', left: '65%' },
                    status: 'empty',
                    cropType: '',
                    cropImage: '',
                    needsWater: false,
                    growthStage: 0,
                    growthTime: 0,
                    harvestTime: null
                },
				{
                    id: 'plot9',
                    position: { top: '65%', left: '65%' },
                    status: 'empty',
                    cropType: '',
                    cropImage: '',
                    needsWater: false,
                    growthStage: 0,
                    growthTime: 0,
                    harvestTime: null
                }
            ],
        }
    },
    methods: {
        // 工具选择
        selectTool(tool) {
            this.currentTool = tool;
        },

        // 返回上一页
        goBack() {
            // 直接使用switchTab跳转到farm页面
            uni.switchTab({
                url: '/pages/farm/farm',
            });
        },

        // 打开市场
        openMarket() {
            uni.showToast({
                title: '市场功能即将上线',
                icon: 'none'
            });
        },

        // 处理地块点击
        handlePlotClick(index) {
            const plot = this.farmPlots[index];

            if (this.currentTool === '') {
                // 没有选择工具时，显示作物详情
                this.showCropDetail(plot);
            } else if (this.currentTool === 'seed' && plot.status === 'empty') {
                // 选择种子工具，并且地块为空
                this.showCropSelector(index);
            } else if (this.currentTool === 'water' && plot.needsWater) {
                // 浇水
                this.waterCrop(index);
            } else if (this.currentTool === 'fertilizer') {
                // 施肥
                this.fertilizeCrop(index);
            } else if (this.currentTool === 'harvest' && plot.status === 'ready') {
                // 收获
                this.harvestCrop(index);
            } else {
                // 工具不匹配当前地块状态
                uni.showToast({
                    title: '无法对此地块使用该工具',
                    icon: 'none'
                });
            }
        },

        // 显示作物选择器
        showCropSelector(plotIndex) {
            // 这里可以调用实际的选择器弹窗
            // 暂时使用简单的交互
            uni.showActionSheet({
                itemList: ['猪', '牛', '鸡','马'],
                success: (res) => {
                    let cropType;
                    let cropImage;

                    switch (res.tapIndex) {
                        case 0:
                            cropType = 'pig';
                            cropImage = '/static/game/ranch/035-pig.svg';
                            break;
                        case 1:
                            cropType = 'cow';
                            cropImage = '/static/game/ranch/056-cow.svg';
                            break;
                        case 2:
							cropType = 'chicken';
                            cropImage = '/static/game/ranch/028-hen.svg';
                            break; 
						case 3:
                            cropType = 'horse';
                            cropImage = '/static/game/ranch/007-horse.svg';
                            break;
                    }

                    // 更新地块状态
                    this.farmPlots[plotIndex].status = 'child';
                    this.farmPlots[plotIndex].cropType = cropType;
                    this.farmPlots[plotIndex].cropImage = cropImage;
                    this.farmPlots[plotIndex].needsWater = true;
                    this.farmPlots[plotIndex].growthStage = 0;
                    this.farmPlots[plotIndex].growthTime = 0;

                    uni.showToast({
                        title: '养殖成功',
                        icon: 'success'
                    });
                }
            });
        },

        // 浇水
        waterCrop(index) {
            this.farmPlots[index].needsWater = false;

            // 增加生长时间
            this.farmPlots[index].growthTime += 10;

            // 如果生长时间达到阈值，进入下一阶段
            if (this.farmPlots[index].growthTime >= 50 && this.farmPlots[index].status !== 'ready') {
                this.farmPlots[index].status = 'ready';
                this.farmPlots[index].growthStage = 3;
                this.farmPlots[index].harvestTime = new Date();
            } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === 'child') {
                this.farmPlots[index].status = 'adult';
                this.farmPlots[index].growthStage = 1;
            }

            uni.showToast({
                title: '喝水成功',
                icon: 'success'
            });
        },

        // 施肥
        fertilizeCrop(index) {
            // 增加生长时间
            this.farmPlots[index].growthTime += 20;

            // 如果生长时间达到阈值，进入下一阶段
            if (this.farmPlots[index].growthTime >= 50 && this.farmPlots[index].status !== 'ready') {
                this.farmPlots[index].status = 'ready';
                this.farmPlots[index].growthStage = 3;
                this.farmPlots[index].harvestTime = new Date();
            } else if (this.farmPlots[index].growthTime >= 20 && this.farmPlots[index].status === 'child') {
                this.farmPlots[index].status = 'adult';
                this.farmPlots[index].growthStage = 1;
            }

            uni.showToast({
                title: '投喂成功',
                icon: 'success'
            });
        },

        // 收获
        harvestCrop(index) {
            // 收获后，地块恢复到空状态
            const cropType = this.farmPlots[index].cropType;

            this.farmPlots[index].status = 'empty';
            this.farmPlots[index].cropType = '';
            this.farmPlots[index].cropImage = '';
            this.farmPlots[index].needsWater = false;
            this.farmPlots[index].growthStage = 0;
            this.farmPlots[index].growthTime = 0;
            this.farmPlots[index].harvestTime = null;

            // 显示收获信息
            uni.showToast({
                title: `已收获${this.getCropName(cropType)}`,
                icon: 'success'
            });
        },

        // 显示作物详情
        showCropDetail(plot) {
            if (plot.status === 'empty') {
                uni.showToast({
                    title: '这块地还没有养殖动物',
                    icon: 'none'
                });
                return;
            }

            // 这里可以实现一个更详细的详情弹窗
            // 暂时使用简单的提示
            const cropName = this.getCropName(plot.cropType);
            const growthStage = this.getGrowthStageName(plot.status);
            const needsWater = plot.needsWater ? '需要喝水' : '水分充足';

            uni.showModal({
                title: `有机${cropName}`,
                content: `生长阶段: ${growthStage}\n水分状态: ${needsWater}\n生长进度: ${plot.growthTime}%`,
                showCancel: false
            });
        },

        // 获取作物信息文本
        getPlotInfoText(plot) {
            if (plot.status === 'empty') {
                return '点击养殖';
            } else if (plot.status === 'ready') {
                return `${this.getCropName(plot.cropType)}  可以收获`;
            } else if (plot.needsWater) {
                return `${this.getCropName(plot.cropType)}  需要喝水`;
            } else {
                return `${this.getCropName(plot.cropType)}  生长中`;
            }
        },

        // 获取作物名称
        getCropName(cropType) {
            switch (cropType) {
                case 'chicken': return '鸡';
                case 'pig': return '猪';
                case 'cow': return '牛';
				case 'horse': return '马';
                default: return '';
            }
        },

        // 获取生长阶段名称
        getGrowthStageName(status) {
            switch (status) {
                case 'child': return '幼年期';
                case 'adult': return '成年期';
                case 'ready': return '成熟期';
                default: return '';
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/uni.scss';

page {
    background-color: $color-secondary;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

/* 游戏容器 */
.game-container {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}

/* 游戏背景 */
.game-bg {
    position: absolute;
    width: 150%;
    height: 150%;
    top: -25%;
    left: -25%;
    background: url('/static/game/ranch/ac01d661ded8b6d9ce46fbb3b65683d.jpg') no-repeat;
    background-size: cover;
    background-position: center;
}

/* 顶部控制栏 */
.game-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 90%;
    padding: 30rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;
}

.return-btn {
    width: 72rpx;
    height: 72rpx;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-dark;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.player-info {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 36rpx;
    padding: 10rpx 20rpx;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.energy-icon-img {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
}

.energy-value {
    font-weight: 600;
    margin-right: 20rpx;
}

.coin-icon-img {
    width: 30rpx;
    height: 30rpx;
    margin-right: 10rpx;
}

.coin-value {
    font-weight: 600;
}

/* 农田地块 */
.farm-plot {
    position: absolute;
    width: 160rpx;
    height: 160rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;
}

.plot-bg {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0.8;
}

.crop-image {
    position: absolute;
    width: 70%;
    height: 70%;
    top: -10rpx;
    left: 15%;
    object-fit: contain;
    pointer-events: none;
}

.empty-image {
    position: absolute;
    width: 50%;
    height: 50%;
    height: 50%;
    top: 16%;
    left: 24%;
    opacity: 0.5;
    object-fit: contain;
}

.floating-info {
    position: absolute;
    bottom: -60rpx;
    left: 0;
    width: 100%;
    text-align: center;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20rpx;
    padding: 10rpx;
    font-size: 24rpx;
    opacity: 0;
    transition: all 0.2s ease;
    pointer-events: none;
    transform: translateY(10rpx);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.farm-plot:hover .floating-info {
    opacity: 1;
    transform: translateY(0);
}

.plot-status {
    position: absolute;
    top: -16rpx;
    right: -16rpx;
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.status-icon {
    width: 20rpx;
    height: 20rpx;
}

/* 底部工具栏 */
.game-toolbar {
    position: absolute;
    bottom: 30rpx;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50rpx;
    padding: 20rpx;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    z-index: 10;
}

.tool-btn {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin: 0 10rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
}

.tool-btn.active {
    background: $color-accent;
}

.tool-icon-img {
    width: 40rpx;
    height: 40rpx;
    margin-bottom: 6rpx;
}

.tool-name {
    font-size: 20rpx;
    text-align: center;
}

.icon-image {
    width: 30rpx;
    height: 30rpx;
}
.child-image {
    position: absolute;
    width: 30%;
    height: 30%;
    top: -10rpx;
    left: 15%;
    object-fit: contain;
    pointer-events: none;
}

/* 状态指示器动画 */
.status-indicator {
    position: absolute;
    z-index: 2;
    width: 60rpx;
    height: 60rpx;
    top: -40rpx;
    left: 50%;
    transform: translateX(-50%);
    animation: floating 2s infinite ease-in-out;
}

@keyframes floating {

    0%,
    100% {
        transform: translateX(-50%) translateY(0);
    }

    50% {
        transform: translateX(-50%) translateY(-16rpx);
    }
}
</style>