// 购物车状态管理
class CartStore {
	constructor() {
		this.cartItems = [];
		this.loadCartFromStorage();
	}

	// 从本地存储加载购物车数据
	loadCartFromStorage() {
		try {
			const cartData = uni.getStorageSync('cart_items');
			if (cartData) {
				this.cartItems = JSON.parse(cartData);
			}
		} catch (error) {
			console.error('加载购物车数据失败:', error);
			this.cartItems = [];
		}
	}

	// 保存购物车数据到本地存储
	saveCartToStorage() {
		try {
			uni.setStorageSync('cart_items', JSON.stringify(this.cartItems));
		} catch (error) {
			console.error('保存购物车数据失败:', error);
		}
	}

	// 添加商品到购物车
	addToCart(product, quantity = 1, specs = '默认规格') {
		const existingItemIndex = this.cartItems.findIndex(item => 
			item.id === product.id && item.specs === specs
		);

		if (existingItemIndex !== -1) {
			// 如果商品已存在，增加数量
			this.cartItems[existingItemIndex].quantity += quantity;
		} else {
			// 如果商品不存在，添加新商品
			const cartItem = {
				id: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
				specs: specs,
				quantity: quantity,
				selected: true
			};
			this.cartItems.push(cartItem);
		}

		this.saveCartToStorage();
		this.notifyCartUpdate();
		
		return true;
	}

	// 更新商品数量
	updateQuantity(index, quantity) {
		if (index >= 0 && index < this.cartItems.length) {
			if (quantity <= 0) {
				this.removeItem(index);
			} else {
				this.cartItems[index].quantity = quantity;
				this.saveCartToStorage();
				this.notifyCartUpdate();
			}
		}
	}

	// 切换商品选中状态
	toggleItemSelect(index) {
		if (index >= 0 && index < this.cartItems.length) {
			this.cartItems[index].selected = !this.cartItems[index].selected;
			this.saveCartToStorage();
			this.notifyCartUpdate();
		}
	}

	// 移除商品
	removeItem(index) {
		if (index >= 0 && index < this.cartItems.length) {
			this.cartItems.splice(index, 1);
			this.saveCartToStorage();
			this.notifyCartUpdate();
		}
	}

	// 清空购物车
	clearCart() {
		this.cartItems = [];
		this.saveCartToStorage();
		this.notifyCartUpdate();
	}

	// 全选/取消全选
	toggleSelectAll() {
		const allSelected = this.cartItems.every(item => item.selected);
		this.cartItems.forEach(item => {
			item.selected = !allSelected;
		});
		this.saveCartToStorage();
		this.notifyCartUpdate();
	}

	// 获取购物车商品总数
	getTotalCount() {
		return this.cartItems.reduce((total, item) => total + item.quantity, 0);
	}

	// 获取选中商品总数
	getSelectedCount() {
		return this.cartItems
			.filter(item => item.selected)
			.reduce((total, item) => total + item.quantity, 0);
	}

	// 获取选中商品总价
	getSelectedTotalPrice() {
		return this.cartItems
			.filter(item => item.selected)
			.reduce((total, item) => total + item.price * item.quantity, 0);
	}

	// 获取选中的商品列表
	getSelectedItems() {
		return this.cartItems.filter(item => item.selected);
	}

	// 获取所有购物车商品
	getCartItems() {
		return this.cartItems;
	}

	// 检查是否全选
	isAllSelected() {
		return this.cartItems.length > 0 && this.cartItems.every(item => item.selected);
	}

	// 通知购物车更新（用于页面间通信）
	notifyCartUpdate() {
		// 发送自定义事件通知购物车更新
		uni.$emit('cartUpdated', {
			totalCount: this.getTotalCount(),
			selectedCount: this.getSelectedCount(),
			totalPrice: this.getSelectedTotalPrice(),
			items: this.cartItems
		});
	}

	// 根据商品ID查找商品
	findItemById(productId) {
		return this.cartItems.find(item => item.id === productId);
	}

	// 获取商品在购物车中的数量
	getItemQuantity(productId) {
		const item = this.findItemById(productId);
		return item ? item.quantity : 0;
	}
}

// 创建全局购物车实例
const cartStore = new CartStore();

export default cartStore; 