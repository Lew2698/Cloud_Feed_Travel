<template>
	<view class="login-container">
		<!-- 头部 -->
		<view class="header">
			<view class="logo">
				<image src="/static/icons/logo.png" mode="aspectFit"></image>
			</view>
			<view class="title">云牧管家</view>
			<view class="subtitle">智慧养殖，云端管理</view>
		</view>

		<!-- 表单容器 -->
		<view class="form-container">
			<!-- 选项卡 -->
			<view class="tab-bar">
				<view class="tab-item" :class="{ active: currentTab === 'login' }" @click="currentTab = 'login'">
					登录
				</view>
				<view class="tab-item" :class="{ active: currentTab === 'register' }" @click="currentTab = 'register'">
					注册
				</view>
			</view>

			<!-- 登录表单 -->
			<view v-if="currentTab === 'login'" class="form">
				<view class="input-group">
					<view class="input-label">用户名</view>
					<input class="input-field" type="text" v-model="loginForm.username" placeholder="请输入用户名" />
				</view>
				<view class="input-group">
					<view class="input-label">密码</view>
					<input class="input-field" type="password" v-model="loginForm.password" placeholder="请输入密码" />
				</view>
				<button class="submit-button" :disabled="loginLoading" @click="handleLogin">
					{{ loginLoading ? '登录中...' : '登录' }}
				</button>
			</view>

			<!-- 注册表单 -->
			<view v-if="currentTab === 'register'" class="form">
				<view class="input-group">
					<view class="input-label">用户名</view>
					<input class="input-field" type="text" v-model="registerForm.username" placeholder="请输入用户名" />
				</view>
				<view class="input-group">
					<view class="input-label">密码</view>
					<input class="input-field" type="password" v-model="registerForm.password" placeholder="请输入密码" />
				</view>
				<view class="input-group">
					<view class="input-label">确认密码</view>
					<input class="input-field" type="password" v-model="registerForm.confirmPassword" placeholder="请再次输入密码" />
				</view>
				<view class="input-group">
					<view class="input-label">昵称</view>
					<input class="input-field" type="text" v-model="registerForm.nickname" placeholder="请输入昵称（可选）" />
				</view>
				<button class="submit-button" :disabled="registerLoading" @click="handleRegister">
					{{ registerLoading ? '注册中...' : '注册' }}
				</button>
			</view>
		</view>

		<!-- 跳过登录 -->
		<view class="skip-login" @click="skipLogin">
			暂不登录，继续浏览
		</view>
	</view>
</template>

<script>
import cartStore from '@/store/cart.js'

export default {
	data() {
		return {
			currentTab: 'login',
			loginForm: {
				username: '',
				password: ''
			},
			registerForm: {
				username: '',
				password: '',
				confirmPassword: '',
				nickname: ''
			},
			loginLoading: false,
			registerLoading: false
		}
	},
	methods: {
		async handleLogin() {
			if (!this.loginForm.username || !this.loginForm.password) {
				uni.showToast({
					title: '请填写完整信息',
					icon: 'none'
				});
				return;
			}

			this.loginLoading = true;

			try {
				const result = await uniCloud.callFunction({
					name: 'user-auth',
					data: {
						action: 'login',
						username: this.loginForm.username,
						password: this.loginForm.password
					}
				});

				console.log('登录云函数返回结果:', result.result);

				if (result.result.errCode === 0) {
					// 保存用户信息
					uni.setStorageSync('userToken', result.result.token);
					if (result.result.userInfo) {
						uni.setStorageSync('userInfo', result.result.userInfo);
					} else {
						uni.setStorageSync('userInfo', {
							username: this.loginForm.username,
							userId: result.result.userId || ''
						});
					}

					// 通知购物车切换用户
					cartStore.switchUser();

					uni.showToast({
						title: '登录成功',
						icon: 'success'
					});

					setTimeout(() => {
						uni.switchTab({
							url: '/pages/shopping/shopping'
						});
					}, 1500);
				} else {
					uni.showToast({
						title: result.result.errMsg,
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('登录失败:', error);
				uni.showToast({
					title: '登录失败，请重试',
					icon: 'none'
				});
			} finally {
				this.loginLoading = false;
			}
		},

		async handleRegister() {
			if (!this.registerForm.username || !this.registerForm.password || !this.registerForm.confirmPassword) {
				uni.showToast({
					title: '请填写完整信息',
					icon: 'none'
				});
				return;
			}

			if (this.registerForm.password !== this.registerForm.confirmPassword) {
				uni.showToast({
					title: '两次密码不一致',
					icon: 'none'
				});
				return;
			}

			if (this.registerForm.password.length < 6) {
				uni.showToast({
					title: '密码至少6位',
					icon: 'none'
				});
				return;
			}

			this.registerLoading = true;

			try {
				const result = await uniCloud.callFunction({
					name: 'user-auth',
					data: {
						action: 'register',
						username: this.registerForm.username,
						password: this.registerForm.password,
						nickname: this.registerForm.nickname || this.registerForm.username
					}
				});

				if (result.result.errCode === 0) {
					uni.showToast({
						title: '注册成功',
						icon: 'success'
					});

					// 清空注册表单
					Object.assign(this.registerForm, {
						username: '',
						password: '',
						confirmPassword: '',
						nickname: ''
					});

					// 切换到登录页面
					this.currentTab = 'login';
				} else {
					uni.showToast({
						title: result.result.errMsg,
						icon: 'none'
					});
				}
			} catch (error) {
				console.error('注册失败:', error);
				uni.showToast({
					title: '注册失败，请重试',
					icon: 'none'
				});
			} finally {
				this.registerLoading = false;
			}
		},

		skipLogin() {
			uni.switchTab({
				url: '/pages/shopping/shopping'
			});
		}
	}
}
</script>

<style scoped>
.login-container {
	min-height: 100vh;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	padding: 60rpx 40rpx;
	display: flex;
	flex-direction: column;
}

.header {
	text-align: center;
	margin-bottom: 80rpx;
}

.logo {
	width: 120rpx;
	height: 120rpx;
	margin: 0 auto 30rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}

.logo image {
	width: 80rpx;
	height: 80rpx;
}

.title {
	font-size: 48rpx;
	font-weight: bold;
	color: #fff;
	margin-bottom: 10rpx;
}

.subtitle {
	font-size: 28rpx;
	color: rgba(255, 255, 255, 0.8);
}

.form-container {
	background: rgba(255, 255, 255, 0.95);
	border-radius: 20rpx;
	padding: 40rpx;
	margin-bottom: 40rpx;
	backdrop-filter: blur(10px);
}

.tab-bar {
	display: flex;
	margin-bottom: 40rpx;
	background: #f5f5f5;
	border-radius: 10rpx;
	padding: 6rpx;
}

.tab-item {
	flex: 1;
	text-align: center;
	padding: 20rpx;
	border-radius: 8rpx;
	font-size: 32rpx;
	color: #666;
	transition: all 0.3s;
}

.tab-item.active {
	background: #667eea;
	color: #fff;
}

.form {
	margin-top: 20rpx;
}

.input-group {
	margin-bottom: 30rpx;
}

.input-label {
	font-size: 28rpx;
	color: #333;
	margin-bottom: 10rpx;
	font-weight: 500;
}

.input-field {
	width: 100%;
	height: 88rpx;
	border: 2rpx solid #e0e0e0;
	border-radius: 10rpx;
	padding: 0 20rpx;
	font-size: 30rpx;
	background: #fff;
	transition: border-color 0.3s;
}

.input-field:focus {
	border-color: #667eea;
}

.submit-button {
	width: 100%;
	height: 88rpx;
	background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	color: #fff;
	border: none;
	border-radius: 10rpx;
	font-size: 32rpx;
	font-weight: 500;
	margin-top: 20rpx;
}

.submit-button:disabled {
	opacity: 0.6;
}

.skip-login {
	text-align: center;
	color: rgba(255, 255, 255, 0.8);
	font-size: 28rpx;
	padding: 20rpx;
	text-decoration: underline;
}
</style> 