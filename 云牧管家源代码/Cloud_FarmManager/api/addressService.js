// 地址管理服务
// 提供用户地址的增删改查功能

/**
 * 获取当前用户ID
 * @returns {String|null} 用户ID
 */
function getCurrentUserId() {
	try {
		const userInfo = uni.getStorageSync('userInfo');
		return userInfo && userInfo.userId ? userInfo.userId : null;
	} catch (error) {
		console.error('获取用户ID失败:', error);
		return null;
	}
}

/**
 * 获取用户地址列表
 * @returns {Promise<Array>} 地址列表
 */
export async function getAddressList() {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录',
				data: []
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'getAddressList',
				data: { userId }
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('获取地址列表失败:', error);
		return {
			code: 500,
			message: '获取地址列表失败',
			data: []
		};
	}
}

/**
 * 添加新地址
 * @param {Object} address 地址信息
 * @returns {Promise<Object>} 操作结果
 */
export async function addAddress(address) {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录'
			};
		}
		
		// 验证地址信息
		if (!address.name || !address.phone || !address.detail) {
			return {
				code: 400,
				message: '请填写完整的地址信息'
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'addAddress',
				data: {
					userId,
					address
				}
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('添加地址失败:', error);
		return {
			code: 500,
			message: '添加地址失败'
		};
	}
}

/**
 * 更新地址
 * @param {String} addressId 地址ID
 * @param {Object} address 地址信息
 * @returns {Promise<Object>} 操作结果
 */
export async function updateAddress(addressId, address) {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录'
			};
		}
		
		if (!addressId) {
			return {
				code: 400,
				message: '地址ID不能为空'
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'updateAddress',
				data: {
					userId,
					addressId,
					address
				}
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('更新地址失败:', error);
		return {
			code: 500,
			message: '更新地址失败'
		};
	}
}

/**
 * 删除地址
 * @param {String} addressId 地址ID
 * @returns {Promise<Object>} 操作结果
 */
export async function deleteAddress(addressId) {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录'
			};
		}
		
		if (!addressId) {
			return {
				code: 400,
				message: '地址ID不能为空'
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'deleteAddress',
				data: {
					userId,
					addressId
				}
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('删除地址失败:', error);
		return {
			code: 500,
			message: '删除地址失败'
		};
	}
}

/**
 * 设置默认地址
 * @param {String} addressId 地址ID
 * @returns {Promise<Object>} 操作结果
 */
export async function setDefaultAddress(addressId) {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录'
			};
		}
		
		if (!addressId) {
			return {
				code: 400,
				message: '地址ID不能为空'
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'setDefaultAddress',
				data: {
					userId,
					addressId
				}
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('设置默认地址失败:', error);
		return {
			code: 500,
			message: '设置默认地址失败'
		};
	}
}

/**
 * 获取默认地址
 * @returns {Promise<Object>} 默认地址信息
 */
export async function getDefaultAddress() {
	try {
		const userId = getCurrentUserId();
		
		if (!userId) {
			return {
				code: 401,
				message: '请先登录',
				data: null
			};
		}
		
		const result = await uniCloud.callFunction({
			name: 'address-manager',
			data: {
				action: 'getDefaultAddress',
				data: { userId }
			}
		});
		
		return result.result;
	} catch (error) {
		console.error('获取默认地址失败:', error);
		return {
			code: 500,
			message: '获取默认地址失败',
			data: null
		};
	}
}

/**
 * 地址表单验证
 * @param {Object} address 地址信息
 * @returns {Object} 验证结果
 */
export function validateAddress(address) {
	const errors = [];
	
	if (!address.name || address.name.trim() === '') {
		errors.push('请输入收货人姓名');
	}
	
	if (!address.phone || address.phone.trim() === '') {
		errors.push('请输入手机号码');
	} else if (!/^1[3-9]\d{9}$/.test(address.phone)) {
		errors.push('请输入正确的手机号码');
	}
	
	if (!address.detail || address.detail.trim() === '') {
		errors.push('请输入详细地址');
	}
	
	return {
		isValid: errors.length === 0,
		errors: errors
	};
}

/**
 * 格式化地址显示
 * @param {Object} address 地址信息
 * @returns {String} 格式化后的地址
 */
export function formatAddress(address) {
	if (!address) return '';
	
	const parts = [];
	
	if (address.province) parts.push(address.province);
	if (address.city && address.city !== address.province) parts.push(address.city);
	if (address.district && address.district !== address.city) parts.push(address.district);
	if (address.detail) parts.push(address.detail);
	
	return parts.join(' ');
}

/**
 * 地址选择器数据 (中国省市区数据，这里简化为几个主要城市)
 * 实际项目中建议使用完整的省市区数据或调用地址选择API
 */
export const addressPickerData = [
	{
		name: '北京市',
		children: [
			{
				name: '北京市',
				children: [
					{ name: '东城区' },
					{ name: '西城区' },
					{ name: '朝阳区' },
					{ name: '丰台区' },
					{ name: '海淀区' }
				]
			}
		]
	},
	{
		name: '上海市',
		children: [
			{
				name: '上海市',
				children: [
					{ name: '黄浦区' },
					{ name: '徐汇区' },
					{ name: '长宁区' },
					{ name: '静安区' },
					{ name: '浦东新区' }
				]
			}
		]
	},
	{
		name: '广东省',
		children: [
			{
				name: '广州市',
				children: [
					{ name: '越秀区' },
					{ name: '荔湾区' },
					{ name: '海珠区' },
					{ name: '天河区' },
					{ name: '白云区' }
				]
			},
			{
				name: '深圳市',
				children: [
					{ name: '福田区' },
					{ name: '罗湖区' },
					{ name: '南山区' },
					{ name: '宝安区' },
					{ name: '龙岗区' }
				]
			}
		]
	},
	{
		name: '湖南省',
		children: [
			{
				name: '长沙市',
				children: [
					{ name: '岳麓区' },
					{ name: '芙蓉区' },
					{ name: '天心区' },
					{ name: '开福区' },
					{ name: '雨花区' }
				]
			},
			{
				name: '湘西土家族苗族自治州',
				children: [
					{ name: '吉首市' },
					{ name: '泸溪县' },
					{ name: '凤凰县' },
					{ name: '花垣县' },
					{ name: '保靖县' }
				]
			}
		]
	}
]; 