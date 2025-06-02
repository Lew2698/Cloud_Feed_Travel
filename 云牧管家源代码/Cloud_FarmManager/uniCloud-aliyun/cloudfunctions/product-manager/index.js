'use strict';

const db = uniCloud.database();
const collection = db.collection('products');

exports.main = async (event, context) => {
	const { action, data } = event;
	
	try {
		switch (action) {
			case 'getProductList':
				return await getProductList(data);
			case 'getProductById':
				return await getProductById(data);
			case 'addProduct':
				return await addProduct(data);
			case 'updateProduct':
				return await updateProduct(data);
			case 'deleteProduct':
				return await deleteProduct(data);
			case 'searchProducts':
				return await searchProducts(data);
			default:
				return {
					code: 400,
					message: '不支持的操作类型'
				};
		}
	} catch (error) {
		console.error('商品管理云函数错误:', error);
		return {
			code: 500,
			message: '服务器内部错误',
			error: error.message
		};
	}
};

// 获取商品列表
async function getProductList(data = {}) {
	const { 
		pageSize = 20, 
		pageNum = 1, 
		category = null, 
		isNew = null, 
		isOrganic = null,
		sortBy = 'createTime',
		sortOrder = 'desc'
	} = data;
	
	try {
		let query = collection;
		
		// 添加筛选条件
		if (category) {
			query = query.where({
				category: category
			});
		}
		
		if (isNew !== null) {
			query = query.where({
				isNew: isNew
			});
		}
		
		if (isOrganic !== null) {
			query = query.where({
				isOrganic: isOrganic
			});
		}
		
		// 添加排序
		const orderBy = sortOrder === 'desc' ? 'desc' : 'asc';
		query = query.orderBy(sortBy, orderBy);
		
		// 分页查询
		const skip = (pageNum - 1) * pageSize;
		query = query.skip(skip).limit(pageSize);
		
		const result = await query.get();
		
		// 获取总数
		const countResult = await collection.count();
		
		return {
			code: 200,
			message: '获取商品列表成功',
			data: {
				list: result.data,
				total: countResult.total,
				pageNum: pageNum,
				pageSize: pageSize,
				totalPages: Math.ceil(countResult.total / pageSize)
			}
		};
	} catch (error) {
		console.error('获取商品列表失败:', error);
		return {
			code: 500,
			message: '获取商品列表失败',
			error: error.message
		};
	}
}

// 根据ID获取商品详情
async function getProductById(data) {
	const { productId } = data;
	
	if (!productId) {
		return {
			code: 400,
			message: '商品ID不能为空'
		};
	}
	
	try {
		const result = await collection.doc(productId).get();
		
		if (result.data.length === 0) {
			return {
				code: 404,
				message: '商品不存在'
			};
		}
		
		return {
			code: 200,
			message: '获取商品详情成功',
			data: result.data[0]
		};
	} catch (error) {
		console.error('获取商品详情失败:', error);
		return {
			code: 500,
			message: '获取商品详情失败',
			error: error.message
		};
	}
}

// 添加商品
async function addProduct(data) {
	const { product } = data;
	
	if (!product) {
		return {
			code: 400,
			message: '商品信息不能为空'
		};
	}
	
	try {
		// 添加创建时间和更新时间
		const now = new Date();
		product.createTime = now;
		product.updateTime = now;
		product.status = 1; // 1: 上架, 0: 下架
		
		const result = await collection.add(product);
		
		return {
			code: 200,
			message: '添加商品成功',
			data: {
				id: result.id,
				...product
			}
		};
	} catch (error) {
		console.error('添加商品失败:', error);
		return {
			code: 500,
			message: '添加商品失败',
			error: error.message
		};
	}
}

// 更新商品
async function updateProduct(data) {
	const { productId, product } = data;
	
	if (!productId || !product) {
		return {
			code: 400,
			message: '商品ID和商品信息不能为空'
		};
	}
	
	try {
		// 添加更新时间
		product.updateTime = new Date();
		
		const result = await collection.doc(productId).update(product);
		
		return {
			code: 200,
			message: '更新商品成功',
			data: result
		};
	} catch (error) {
		console.error('更新商品失败:', error);
		return {
			code: 500,
			message: '更新商品失败',
			error: error.message
		};
	}
}

// 删除商品
async function deleteProduct(data) {
	const { productId } = data;
	
	if (!productId) {
		return {
			code: 400,
			message: '商品ID不能为空'
		};
	}
	
	try {
		const result = await collection.doc(productId).remove();
		
		return {
			code: 200,
			message: '删除商品成功',
			data: result
		};
	} catch (error) {
		console.error('删除商品失败:', error);
		return {
			code: 500,
			message: '删除商品失败',
			error: error.message
		};
	}
}

// 搜索商品
async function searchProducts(data) {
	const { keyword, pageSize = 20, pageNum = 1 } = data;
	
	if (!keyword) {
		return {
			code: 400,
			message: '搜索关键词不能为空'
		};
	}
	
	try {
		// 使用正则表达式进行模糊搜索
		const regExp = new RegExp(keyword, 'i');
		
		const query = collection.where({
			$or: [
				{ name: regExp },
				{ slogan: regExp },
				{ farmName: regExp }
			]
		});
		
		// 分页查询
		const skip = (pageNum - 1) * pageSize;
		const result = await query.skip(skip).limit(pageSize).get();
		
		// 获取搜索结果总数
		const countResult = await collection.where({
			$or: [
				{ name: regExp },
				{ slogan: regExp },
				{ farmName: regExp }
			]
		}).count();
		
		return {
			code: 200,
			message: '搜索商品成功',
			data: {
				list: result.data,
				total: countResult.total,
				pageNum: pageNum,
				pageSize: pageSize,
				totalPages: Math.ceil(countResult.total / pageSize),
				keyword: keyword
			}
		};
	} catch (error) {
		console.error('搜索商品失败:', error);
		return {
			code: 500,
			message: '搜索商品失败',
			error: error.message
		};
	}
} 