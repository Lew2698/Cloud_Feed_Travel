'use strict';

const db = uniCloud.database();
const collection = db.collection('user_addresses');

exports.main = async (event, context) => {
	const { action, data } = event;
	
	try {
		switch (action) {
			case 'getAddressList':
				return await getAddressList(data);
			case 'addAddress':
				return await addAddress(data);
			case 'updateAddress':
				return await updateAddress(data);
			case 'deleteAddress':
				return await deleteAddress(data);
			case 'setDefaultAddress':
				return await setDefaultAddress(data);
			case 'getDefaultAddress':
				return await getDefaultAddress(data);
			default:
				return {
					code: 400,
					message: '不支持的操作类型'
				};
		}
	} catch (error) {
		console.error('地址管理云函数错误:', error);
		return {
			code: 500,
			message: '服务器内部错误',
			error: error.message
		};
	}
};

// 获取用户地址列表
async function getAddressList(data) {
	try {
		const { userId } = data;
		
		if (!userId) {
			return {
				code: 400,
				message: '用户ID不能为空'
			};
		}
		
		const result = await collection
			.where({
				userId: userId,
				isDeleted: false
			})
			.orderBy('isDefault', 'desc')
			.orderBy('updateTime', 'desc')
			.get();
		
		return {
			code: 200,
			message: '获取地址列表成功',
			data: {
				list: result.data,
				total: result.data.length
			}
		};
	} catch (error) {
		console.error('获取地址列表失败:', error);
		return {
			code: 500,
			message: '获取地址列表失败',
			error: error.message
		};
	}
}

// 添加地址
async function addAddress(data) {
	try {
		const { userId, address } = data;
		
		if (!userId) {
			return {
				code: 400,
				message: '用户ID不能为空'
			};
		}
		
		if (!address || !address.name || !address.phone || !address.detail) {
			return {
				code: 400,
				message: '地址信息不完整'
			};
		}
		
		// 如果是设置为默认地址，先取消其他默认地址
		if (address.isDefault) {
			await collection
				.where({
					userId: userId,
					isDeleted: false
				})
				.update({
					isDefault: false,
					updateTime: new Date()
				});
		}
		
		// 构建地址数据
		const addressData = {
			userId: userId,
			name: address.name,
			phone: address.phone,
			province: address.province || '',
			city: address.city || '',
			district: address.district || '',
			detail: address.detail,
			isDefault: address.isDefault || false,
			isDeleted: false,
			createTime: new Date(),
			updateTime: new Date()
		};
		
		const result = await collection.add(addressData);
		
		return {
			code: 200,
			message: '添加地址成功',
			data: {
				id: result.id,
				...addressData
			}
		};
	} catch (error) {
		console.error('添加地址失败:', error);
		return {
			code: 500,
			message: '添加地址失败',
			error: error.message
		};
	}
}

// 更新地址
async function updateAddress(data) {
	try {
		const { userId, addressId, address } = data;
		
		if (!userId || !addressId) {
			return {
				code: 400,
				message: '用户ID和地址ID不能为空'
			};
		}
		
		// 验证地址是否属于当前用户
		const addressResult = await collection
			.where({
				_id: addressId,
				userId: userId,
				isDeleted: false
			})
			.get();
		
		if (addressResult.data.length === 0) {
			return {
				code: 404,
				message: '地址不存在或无权限'
			};
		}
		
		// 如果要设置为默认地址，先取消其他默认地址
		if (address.isDefault) {
			await collection
				.where({
					userId: userId,
					isDeleted: false,
					_id: db.command.neq(addressId)
				})
				.update({
					isDefault: false,
					updateTime: new Date()
				});
		}
		
		// 更新地址
		const updateData = {
			...address,
			updateTime: new Date()
		};
		
		await collection.doc(addressId).update(updateData);
		
		return {
			code: 200,
			message: '更新地址成功',
			data: {
				id: addressId,
				...updateData
			}
		};
	} catch (error) {
		console.error('更新地址失败:', error);
		return {
			code: 500,
			message: '更新地址失败',
			error: error.message
		};
	}
}

// 删除地址
async function deleteAddress(data) {
	try {
		const { userId, addressId } = data;
		
		if (!userId || !addressId) {
			return {
				code: 400,
				message: '用户ID和地址ID不能为空'
			};
		}
		
		// 验证地址是否属于当前用户
		const addressResult = await collection
			.where({
				_id: addressId,
				userId: userId,
				isDeleted: false
			})
			.get();
		
		if (addressResult.data.length === 0) {
			return {
				code: 404,
				message: '地址不存在或无权限'
			};
		}
		
		// 软删除
		await collection.doc(addressId).update({
			isDeleted: true,
			updateTime: new Date()
		});
		
		return {
			code: 200,
			message: '删除地址成功'
		};
	} catch (error) {
		console.error('删除地址失败:', error);
		return {
			code: 500,
			message: '删除地址失败',
			error: error.message
		};
	}
}

// 设置默认地址
async function setDefaultAddress(data) {
	try {
		const { userId, addressId } = data;
		
		if (!userId || !addressId) {
			return {
				code: 400,
				message: '用户ID和地址ID不能为空'
			};
		}
		
		// 验证地址是否属于当前用户
		const addressResult = await collection
			.where({
				_id: addressId,
				userId: userId,
				isDeleted: false
			})
			.get();
		
		if (addressResult.data.length === 0) {
			return {
				code: 404,
				message: '地址不存在或无权限'
			};
		}
		
		// 先取消所有默认地址
		await collection
			.where({
				userId: userId,
				isDeleted: false
			})
			.update({
				isDefault: false,
				updateTime: new Date()
			});
		
		// 设置新的默认地址
		await collection.doc(addressId).update({
			isDefault: true,
			updateTime: new Date()
		});
		
		return {
			code: 200,
			message: '设置默认地址成功'
		};
	} catch (error) {
		console.error('设置默认地址失败:', error);
		return {
			code: 500,
			message: '设置默认地址失败',
			error: error.message
		};
	}
}

// 获取默认地址
async function getDefaultAddress(data) {
	try {
		const { userId } = data;
		
		if (!userId) {
			return {
				code: 400,
				message: '用户ID不能为空'
			};
		}
		
		const result = await collection
			.where({
				userId: userId,
				isDefault: true,
				isDeleted: false
			})
			.get();
		
		return {
			code: 200,
			message: '获取默认地址成功',
			data: result.data.length > 0 ? result.data[0] : null
		};
	} catch (error) {
		console.error('获取默认地址失败:', error);
		return {
			code: 500,
			message: '获取默认地址失败',
			error: error.message
		};
	}
} 