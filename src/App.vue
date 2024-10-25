<script>
import store from '@/store/index.js'
export default {
  onLaunch: function (options) {
    console.log('App Launch')
    this.initWindowSize();  
    const windowResizeCallback = (res) => {
      console.log('获取实时宽度')
      this.updateBodyStyles(res.size.windowHeight * 3 / 5)
      const scale = (res.size.windowHeight * 3 / 5) / 480
      const baseSize = 16
      document.documentElement.style.setProperty('--font-size-root', `${baseSize * Math.min(scale, 2)}px`);
    }
    uni.onWindowResize(windowResizeCallback)
    // this.getConfig(options)
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
  methods:{
    initWindowSize() {  
      const systemInfo = uni.getSystemInfoSync();  
      console.log('初始化窗口宽度:', systemInfo);  
      this.updateBodyStyles(systemInfo.windowHeight * 3 / 5)
      const scale = (systemInfo.windowHeight * 3 / 5) / 480
      const baseSize = 16
      // document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
      document.documentElement.style.setProperty('--font-size-root', `${baseSize * Math.min(scale, 2)}px`);
      console.log('页面缩放比例:', document.documentElement.style.fontSize);
      // 在这里根据窗口宽度进行初始化操作  
    }, 
    	// 通过传入高度按照比例实时改变页面的width
		async updateBodyStyles(width) {
			document.documentElement.style.setProperty('--body-width', `${width}px`);
			document.body.style.width = `${width}px`;
		},
    async getConfig(options) {
			console.log('options', options.query.isTest)
			const isTest = options.query.isTest
			const config = await this.$api.user.getConfig();
			store.dispatch('setConfig', config);
			if (isTest == 1) {
				return
			} 
			if (config.is_maintain === "1") {
					uni.redirectTo({
						url: '/pages/maintain/index'
					})
				} else {
					// uni.redirectTo({
					// 	url: '/pages/index/index'
					// })
				}

		},
  }
}
</script>

<style>
/*每个页面公共css */
@import "uview-plus/index.scss";
@import "./static/css/theme.scss";
</style>
