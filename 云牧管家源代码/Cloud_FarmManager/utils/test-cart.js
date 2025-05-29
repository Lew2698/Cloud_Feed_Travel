// 购物车功能测试脚本
import cartStore from '../store/cart.js';

// 测试商品数据
const testProducts = [
	{
		id: 1,
		name: '瑶族野生鸡蛋 500g',
		price: 12,
		image: '/static/static2/hCSyEZ4ptM_small.jpg'
	},
	{
		id: 2,
		name: '香芋 250g',
		price: 6,
		image: '/static/static2/ooYBAFcqrNSAZyqqAAOXFHCVQsE56.jpeg'
	}
];

// 测试购物车功能
export function testCartFunctions() {
	console.log('=== 开始测试购物车功能 ===');
	
	// 1. 测试添加商品
	console.log('1. 测试添加商品');
	cartStore.addToCart(testProducts[0], 2);
	cartStore.addToCart(testProducts[1], 1);
	console.log('购物车商品数量:', cartStore.getTotalCount());
	console.log('购物车商品:', cartStore.getCartItems());
	
	// 2. 测试更新数量
	console.log('2. 测试更新数量');
	cartStore.updateQuantity(0, 3);
	console.log('更新后商品数量:', cartStore.getTotalCount());
	
	// 3. 测试选中状态
	console.log('3. 测试选中状态');
	cartStore.toggleItemSelect(0);
	console.log('选中商品数量:', cartStore.getSelectedCount());
	console.log('选中商品总价:', cartStore.getSelectedTotalPrice());
	
	// 4. 测试全选
	console.log('4. 测试全选');
	cartStore.toggleSelectAll();
	console.log('全选后选中数量:', cartStore.getSelectedCount());
	
	// 5. 测试移除商品
	console.log('5. 测试移除商品');
	cartStore.removeItem(1);
	console.log('移除后商品数量:', cartStore.getTotalCount());
	
	console.log('=== 购物车功能测试完成 ===');
}

// 清空购物车测试数据
export function clearTestData() {
	cartStore.clearCart();
	console.log('测试数据已清空');
} 