import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// 购物车状态管理 - 使用Pinia组合式API
export const useCartStore = defineStore('cart', () => {
  // 状态定义
  const cartItems = ref([])
  const currentUserId = ref(null)

  // 获取当前用户ID
  const getCurrentUserId = () => {
    try {
      const userInfo = uni.getStorageSync('userInfo')
      return userInfo && userInfo.userId ? userInfo.userId : 'guest'
    } catch (error) {
      console.error('获取用户ID失败:', error)
      return 'guest'
    }
  }

  // 获取用户专属的存储key
  const getUserCartKey = (userId = null) => {
    const uid = userId || getCurrentUserId()
    return `cart_items_${uid}`
  }

  // 从本地存储加载购物车数据
  const loadCartFromStorage = () => {
    try {
      const newUserId = getCurrentUserId()
      
      // 如果用户发生变化，清空当前购物车数据
      if (currentUserId.value && currentUserId.value !== newUserId) {
        cartItems.value = []
      }
      
      currentUserId.value = newUserId
      const cartKey = getUserCartKey(newUserId)
      const cartData = uni.getStorageSync(cartKey)
      
      if (cartData) {
        cartItems.value = JSON.parse(cartData)
       
      } else {
        cartItems.value = []
      }
    } catch (error) {
      console.error('加载购物车数据失败:', error)
      cartItems.value = []
    }
  }

  // 保存购物车数据到本地存储
  const saveCartToStorage = () => {
    try {
      const userId = getCurrentUserId()
      const cartKey = getUserCartKey(userId)
      uni.setStorageSync(cartKey, JSON.stringify(cartItems.value))
    } catch (error) {
      console.error('保存购物车数据失败:', error)
    }
  }

  // 切换用户时调用此方法
  const switchUser = () => {
    const newUserId = getCurrentUserId()
    if (currentUserId.value !== newUserId) {
      currentUserId.value = newUserId
      loadCartFromStorage()
      notifyCartUpdate()
    }
  }

  // 清除指定用户的购物车数据
  const clearUserCart = (userId = null) => {
    try {
      const uid = userId || getCurrentUserId()
      const cartKey = getUserCartKey(uid)
      uni.removeStorageSync(cartKey)
      
      // 如果清除的是当前用户的数据，也清空内存中的数据
      if (uid === currentUserId.value) {
        cartItems.value = []
        notifyCartUpdate()
      }
    } catch (error) {
      console.error('清除用户购物车数据失败:', error)
    }
  }

  // 通知购物车更新（用于页面间通信）
  const notifyCartUpdate = () => {
    // 发送自定义事件通知购物车更新
    uni.$emit('cartUpdated', {
      totalCount: totalCount.value,
      selectedCount: selectedCount.value,
      totalPrice: selectedTotalPrice.value,
      items: cartItems.value,
      userId: currentUserId.value
    })
  }

  // 添加商品到购物车
  const addToCart = (product, quantity = 1, specs = '默认规格') => {
    // 确保使用当前用户的数据
    switchUser()
    
    const existingItemIndex = cartItems.value.findIndex(item => 
      item.id === product.id && item.specs === specs
    )

    if (existingItemIndex !== -1) {
      // 如果商品已存在，增加数量
      cartItems.value[existingItemIndex].quantity += quantity
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
      }
      cartItems.value.push(cartItem)
    }

    saveCartToStorage()
    notifyCartUpdate()
    
    return true
  }

  // 更新商品数量
  const updateQuantity = (index, quantity) => {
    switchUser()
    
    if (index >= 0 && index < cartItems.value.length) {
      if (quantity <= 0) {
        removeItem(index)
      } else {
        cartItems.value[index].quantity = quantity
        saveCartToStorage()
        notifyCartUpdate()
      }
    }
  }

  // 切换商品选中状态
  const toggleItemSelect = (index) => {
    switchUser()
    
    if (index >= 0 && index < cartItems.value.length) {
      cartItems.value[index].selected = !cartItems.value[index].selected
      saveCartToStorage()
      notifyCartUpdate()
    }
  }

  // 移除商品
  const removeItem = (index) => {
    switchUser()
    
    if (index >= 0 && index < cartItems.value.length) {
      cartItems.value.splice(index, 1)
      saveCartToStorage()
      notifyCartUpdate()
    }
  }

  // 清空购物车
  const clearCart = () => {
    switchUser()
    
    cartItems.value = []
    saveCartToStorage()
    notifyCartUpdate()
  }

  // 全选/取消全选
  const toggleSelectAll = () => {
    switchUser()
    
    const allSelected = cartItems.value.every(item => item.selected)
    cartItems.value.forEach(item => {
      item.selected = !allSelected
    })
    saveCartToStorage()
    notifyCartUpdate()
  }

  // 根据商品ID查找商品
  const findItemById = (productId) => {
    switchUser()
    return cartItems.value.find(item => item.id === productId)
  }

  // 获取商品在购物车中的数量
  const getItemQuantity = (productId) => {
    switchUser()
    const item = findItemById(productId)
    return item ? item.quantity : 0
  }

  // 获取当前用户信息（用于调试）
  const getCurrentUserInfo = () => {
    return {
      userId: currentUserId.value,
      cartKey: getUserCartKey(),
      itemCount: cartItems.value.length
    }
  }

  // 计算属性
  const totalCount = computed(() => {
    return cartItems.value.reduce((total, item) => total + item.quantity, 0)
  })

  const selectedCount = computed(() => {
    return cartItems.value
      .filter(item => item.selected)
      .reduce((total, item) => total + item.quantity, 0)
  })

  const selectedTotalPrice = computed(() => {
    return cartItems.value
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0)
  })

  const selectedItems = computed(() => {
    return cartItems.value.filter(item => item.selected)
  })

  const isAllSelected = computed(() => {
    return cartItems.value.length > 0 && cartItems.value.every(item => item.selected)
  })
 
  // 初始化时加载数据
  loadCartFromStorage()

  // 返回状态和方法
  return {
    // 状态
    cartItems,
    currentUserId,
    
    // 计算属性
    totalCount,
    selectedCount,
    selectedTotalPrice,
    selectedItems,
    isAllSelected,
    
    // 方法
    switchUser,
    clearUserCart,
    addToCart,
    updateQuantity,
    toggleItemSelect,
    removeItem,
    clearCart,
    toggleSelectAll,
    findItemById,
    getItemQuantity,
    getCurrentUserInfo,
    loadCartFromStorage,
    saveCartToStorage
  }
})