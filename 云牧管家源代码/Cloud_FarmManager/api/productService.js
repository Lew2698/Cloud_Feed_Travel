// 商品数据服务 - 云端版本
// 替代原来的 data/products.js

/**
 * 获取所有商品列表（简化版，用于商城页面）
 * @param {Object} options 查询选项
 * @returns {Promise<Array>} 商品列表
 */
export async function getAllProducts(options = {}) {
	try {
		const {
			pageSize = 20,
			pageNum = 1,
			category = null,
			isNew = null,
			isOrganic = null,
			sortBy = 'createTime',
			sortOrder = 'desc'
		} = options;
		
		const result = await uniCloud.callFunction({
			name: 'product-manager',
			data: {
				action: 'getProductList',
				data: {
					pageSize,
					pageNum,
					category,
					isNew,
					isOrganic,
					sortBy,
					sortOrder
				}
			}
		});
		
		if (result.result.code === 200) {
			// 转换数据格式以兼容原有代码
			const products = result.result.data.list.map(product => ({
				id: product._id, // 使用云数据库的_id作为id
				name: product.name,
				price: product.price,
				image: product.images && product.images[0] ? product.images[0] : '',
				sales: product.sales,
				rating: product.rating,
				badge: product.isNew ? '新品' : (product.isOrganic ? '有机' : ''),
				// 保留完整的商品信息
				...product
			}));
			
			return products;
		} else {
			console.error('获取商品列表失败:', result.result.message);
			return [];
		}
	} catch (error) {
		console.error('获取商品列表异常:', error);
		// 返回空数组，避免页面崩溃
		return [];
	}
}

/**
 * 根据商品ID获取商品详情
 * @param {String} id 商品ID
 * @returns {Promise<Object|null>} 商品详情
 */
export async function getProductById(id) {
	try {
		if (!id) {
			console.error('商品ID不能为空');
			return null;
		}
		
		const result = await uniCloud.callFunction({
			name: 'product-manager',
			data: {
				action: 'getProductById',
				data: {
					productId: id
				}
			}
		});
		
		if (result.result.code === 200) {
			const product = result.result.data;
			// 添加兼容性字段
			product.id = product._id;
			return product;
		} else if (result.result.code === 404) {
			console.warn('商品不存在:', id);
			return null;
		} else {
			console.error('获取商品详情失败:', result.result.message);
			return null;
		}
	} catch (error) {
		console.error('获取商品详情异常:', error);
		return null;
	}
}

/**
 * 搜索商品
 * @param {String} keyword 搜索关键词
 * @param {Object} options 搜索选项
 * @returns {Promise<Array>} 搜索结果
 */
export async function searchProducts(keyword, options = {}) {
	try {
		if (!keyword) {
			console.error('搜索关键词不能为空');
			return [];
		}
		
		const {
			pageSize = 20,
			pageNum = 1
		} = options;
		
		const result = await uniCloud.callFunction({
			name: 'product-manager',
			data: {
				action: 'searchProducts',
				data: {
					keyword,
					pageSize,
					pageNum
				}
			}
		});
		
		if (result.result.code === 200) {
			// 转换数据格式以兼容原有代码
			const products = result.result.data.list.map(product => ({
				id: product._id,
				name: product.name,
				price: product.price,
				image: product.images && product.images[0] ? product.images[0] : '',
				sales: product.sales,
				rating: product.rating,
				badge: product.isNew ? '新品' : (product.isOrganic ? '有机' : ''),
				...product
			}));
			
			return products;
		} else {
			console.error('搜索商品失败:', result.result.message);
			return [];
		}
	} catch (error) {
		console.error('搜索商品异常:', error);
		return [];
	}
}

/**
 * 获取商品分类列表
 * @returns {Promise<Array>} 分类列表
 */
export async function getProductCategories() {
	try {
		// 这里可以从云端获取分类数据，暂时返回固定分类
		return [
			{ value: 'food', label: '食品' },
			{ value: 'handicraft', label: '手工艺品' },
			{ value: 'other', label: '其他' }
		];
	} catch (error) {
		console.error('获取商品分类异常:', error);
		return [];
	}
}

// 缓存管理
const cache = {
	products: null,
	timestamp: 0,
	duration: 5 * 60 * 1000 // 5分钟缓存
};

/**
 * 获取缓存的商品列表
 * @param {Object} options 查询选项
 * @returns {Promise<Array>} 商品列表
 */
export async function getCachedProducts(options = {}) {
	const now = Date.now();
	
	// 检查缓存是否有效
	if (cache.products && (now - cache.timestamp) < cache.duration) {
		return cache.products;
	}
	
	// 获取新数据并缓存
	const products = await getAllProducts(options);
	cache.products = products;
	cache.timestamp = now;
	
	return products;
}

/**
 * 清除缓存
 */
export function clearCache() {
	cache.products = null;
	cache.timestamp = 0;
} 