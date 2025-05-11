<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/* 引入Font Awesome图标 */
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
	
	/* 定义图标字体类 */
	.iconfont {
		font-family: 'FontAwesome';
	}
	
	/* 定义实际使用的图标 */
	.icon-search:before { content: '\f002'; }
	.icon-home:before { content: '\f015'; }
	.icon-shopping-bag:before { content: '\f290'; }
	.icon-leaf:before { content: '\f06c'; }
	.icon-calendar-alt:before { content: '\f073'; }
	.icon-user:before { content: '\f007'; }
	.icon-seedling:before { content: '\f4d8'; }
	.icon-link:before { content: '\f0c1'; }
	.icon-video:before { content: '\f03d'; }
	.icon-chart-line:before { content: '\f201'; }
	.icon-star:before { content: '\f005'; }
	.icon-shopping-cart:before { content: '\f07a'; }
	.icon-plus:before { content: '\f067'; }
	.icon-chevron-down:before { content: '\f078'; }
	.icon-filter:before { content: '\f0b0'; }
	
	/* 全局主题变量 */
	page {
		--primary-color: #bc4749; /* 鲜红色 */
		--secondary-color: #f2e8cf; /* 浅米色 */
		--accent-color: #a7c957; /* 浅绿色 */
		--highlight-color: #6a994e; /* 中绿色 */
		--dark-color: #386641; /* 深绿色 */
	}
</style>
