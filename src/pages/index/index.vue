<template>
  <view class="index-wapper" :class="[currentTheme + '-theme']">
    <c-navbar 
      @openLeftMenu="openLeftMenu"></c-navbar>
    <scroll-view class="scroll-view" scroll-y scroll-with-animation="true" @scrolltolower="loadMore"
      @scroll="onScroll" :scroll-into-view="scrollIntoViewId">
      <Home v-if="currentTab === 0" :gameTypes="gameTypes" :hotGames="hotGames" :newGames="newGames" ref="home"></Home>
    </scroll-view>

    <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="tags" @close="isLeftMenu = false"
      @onHotGamesClick="onHotGamesClick" @onGamesClick="onGamesClick">
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
      hotGames: [],
      newGames: [],
      hotParam: {
          page: 1,
          limit: 4,
          orderBy: 'hot_num desc',
          wid: ''
      },
      gameParam: {
        page: 1,
        limit: 9,
        keyword: '',
        orderBy: '',
        tid: ''
      }
    }
  },
  components: {
    Home,
    leftMenu,
    Footer
  },
  computed: {
    ...mapGetters(['isLogin', 'currentTab', 'currentTheme', 'channelInfo', 'tags'])
  },
  onLoad() {
    this.$store.dispatch('setTab', 0);
    this.getChannelByUrl()
    this.getTas()
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
      this.$store.dispatch('setTags', res)
    },
    async getHotGames() {
      this.hotParam.orderBy = 'hot_num desc'
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.hotGames = this.hotGames.concat(res.data)
            this.status = res.data.length < this.hotParam.limit ? 'nomore' : ''
      },
      async getNewGames() {
        this.hotParam.orderBy = 'id desc'
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.newGames = res.data
      },
    async loadGame(tags, index) {
      const res = await this.$api.home.getGameList(this.gameParam);
      tags[index].list = res.data
      this.gameTypes = tags
      console.log('loadGame', this.gameTypes)  

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
      this.hotParam.wid = res.wid
      // this.getNewGames()
      this.getHotGames()
    },
    async closeLogin() {
      this.isShowLogin = false
    },
    onGameTypeClick(item) {
      this.gameParam.page = 1
      this.currentGameType = item.id
      this.currentGameName = item.name
      this.currentGameImg = item.img
      this.gameParam.pid = item.id
      this.list = []
      this.status = 'loading'
      this.loadGame()
    },
    onHotGamesClick() {
      this.isLeftMenu = false
      this.$store.dispatch('setTab', 1);
    },
    openLeftMenu() {
      this.isLeftMenu = true
    },
    loadMore() {
      const { currentTab } = this
      if (currentTab === 0) {
        this.hotParam.page++
        if (this.status !== 'nomore') {
          this.getHotGames()
        }
      }
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
  background-color: #EFECEC;
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
