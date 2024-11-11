<template>
  <view class="index-wapper" :class="[currentTheme + '-theme']">
    <c-navbar @toHome="toHome"
      @openLeftMenu="openLeftMenu"></c-navbar>
    <scroll-view class="scroll-view" scroll-y scroll-with-animation="true" @scrolltolower="loadChargeListMore"
      @scroll="onScroll" :scroll-into-view="scrollIntoViewId">
      <Home v-if="currentTab === 0" :gameTypes="gameTypes" :hotGames="hotGames" :newGames="newGames" ref="home"></Home>
    </scroll-view>

    <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="cates" @close="isLeftMenu = false"
      @onHotGamesClick="onHotGamesClick">
    </leftMenu>
    <Footer/>
  </view>
</template>

<script>
import Home from '../home/index.vue'
import Footer from '../../components/common/footer.vue'
import leftMenu from '../../components/common/leftMenu/index.vue'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      title: 'Hello',
      isLeftMenu: false,
      scrollIntoViewId: '',
      gameTypes: [],
      tags: [],
      hotGames: [],
      newGames: [],
      gameParam: {
        page: 1,
        limit: 4,
        orderBy: '',
        wid: ''
      },
    }
  },
  components: {
    Home,
    leftMenu,
    Footer,
  },
  computed: {
    ...mapGetters(['isLogin', 'currentTab', 'currentTheme', 'channelInfo', 'cates'])
  },
  onLoad() {
    this.$store.dispatch('setTab', 0);
    this.getChannelByUrl()
    this.getTas()
    this.getCategoryGame()
  },
  onShow() {
    
  },
  methods: {
    async getCategoryGame() {
      const res = await this.$api.home.getCatGame({num: 4})
      console.log(res)
      this.gameTypes = res
    },
    async getTas(){
      const res = await this.$api.home.getTags({wid: this.channelInfo.wid})
      this.tags = res
      this.$store.dispatch('setCates', res)
    },
    async loadHotGames() {
      const res = await this.$api.home.getNewGame(this.gameParam);
      this.gameParam.orderBy = 'hot_num desc'
      this.hotGames = res.data
    },
    async loadNewGames() {
      this.gameParam.orderBy = 'id desc'
      const res = await this.$api.home.getNewGame(this.gameParam);
      this.newGames = res.data
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&'); // Escape brackets for regex
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    async getChannelByUrl() {
      // const { origin, pathname } = location;
      // const baseUrl = origin + pathname.replace(/\/\d+\/?$/, '');
      // const currentPath = baseUrl === 'http://localhost:5174/' ? 'http://top3.game' : baseUrl.slice(0, -1);
      const currentPath = 'pgnovo777.com';
      const res = await this.$api.home.getWebsite({ url: currentPath })
      this.$store.dispatch('setChannelInfo', res);
      this.gameParam.wid = res.wid
      this.loadHotGames()
      this.loadNewGames()
    },
  
    
    async loadBanner() {
      console.log('loadBanner')
      this.bannerList = await this.$api.home.getAd();
    },
   
    async closeLogin() {
      this.isShowLogin = false
    },
    
   
   
    toHome() {
      this.$store.dispatch('setTab', 0);
    },
    onHotGamesClick() {
      this.isLeftMenu = false
      this.$store.dispatch('setTab', 1);
    },
   
    openLeftMenu() {
      this.isLeftMenu = true
    },
    onScroll(e) {
      console.log(e.detail.scrollHeight)
    },
    toRank() {
      if (!this.isLogin) {
        return
      }
      uni.navigateTo({
        url: '/pages/rank/index'
      })
    },
    refresh() {
    },
    toUrl(item) {
      window.open(this.ensureHttpOrHttps(item.url), '_blank');
    },
    ensureHttpOrHttps(str) {
      const pattern = /^(https?:\/\/)/i;
      if (!pattern.test(str)) {
        str = 'https://' + str;
      }

      return str;
    },
    scrollTo(item) {
      console.log(item)
      if (item.id === 0) {
        this.scrollIntoViewId = 'home__list';
      } else if (item.id === 1) {
        this.scrollIntoViewId = 'PG';
      } else if (item.id === 9) {
        this.scrollIntoViewId = 'PP';
      } else if (item.id === 8) {
        this.scrollIntoViewId = 'JILI';
      }

      // 延迟一定时间后清除scrollIntoViewId，以便在滚动完成后恢复默认状态
      setTimeout(() => {
        this.scrollIntoViewId = '';
      }, 500); // 假设滚动时间为500ms
    }
  },
}
</script>

<style lang="scss" scoped>
.index-wapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  position: absolute;
  width: 100%;
  background-color: #FFFFFF;

  // background-size: 100% 100%;
  .rank-import {
    position: absolute;
    right: 0.44rem;
    bottom: 14.31rem;
    width: 4.06rem;
    height: 4.06rem;
    z-index: 10;
    cursor: pointer;

    image {
      width: 100%;
      height: 100%;
    }
  }

  .scroll-view {
    flex: 1;
    height: 0;
  }

}
</style>
