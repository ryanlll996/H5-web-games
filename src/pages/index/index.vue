<template>
  <view class="index-wapper" :class="[currentTheme + '-theme']">
    <c-navbar 
      @openLeftMenu="openLeftMenu"></c-navbar>
    <scroll-view class="scroll-view" scroll-y scroll-with-animation="true" @scrolltolower="loadChargeListMore"
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
      console.log(res)
      this.$store.dispatch('setTags', res)
      // res.forEach((element, index) => {
      //   this.gameParam.limit = 4
      //   this.gameParam.tid = element.id
      //   this.loadGame(res, index)
      //   this.gameParam.tid = ''
      // });
    },
    async getHotGames() {
      this.hotParam.orderBy = 'hot_num desc'
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.hotGames = res.data
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
      this.getNewGames()
      this.getHotGames()
    },
  
    
    async loadBanner() {
      console.log('loadBanner')
      this.bannerList = await this.$api.home.getAd();
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
    toRecharge() {
      this.$store.dispatch('setTab', 2);
      this.$nextTick(() => {
        this.$refs.recharge.loadRechargeList()
        this.$refs.recharge.loadPayList()
      })
    },
    logout() {
      this.$store.dispatch('setTab', 0);
    },
   
    onHotGamesClick() {
      this.isLeftMenu = false
      this.$store.dispatch('setTab', 1);
    },
    onGamesClick(item) {
      
    },
    openLeftMenu() {
      this.isLeftMenu = true
    },
    onSwitch() {
      const { currentTab } = this
      switch (currentTab) {
        case 0:
          this.$nextTick(() => {
            this.$refs.home.getJackPot()
          })
          break
        case 1:
          this.dataList = []
          this.$nextTick(() => {
            this.$refs.group.getWages()
            this.$refs.group.loadGroupTotal()
            this.loadingChargeList()
          })

          break
        case 2:
          this.$nextTick(() => {
            this.$refs.recharge.loadRechargeList()
            this.$refs.recharge.loadPayList()
          })

          break
      }
    },
    async loadingChargeList() {
      const res = await this.$api.user.getChargeList(this.chargeObj);
      this.dataList = this.dataList.concat(res.data);
      this.status = res.data.length < this.chargeObj.limit ? 'nomore' : '';
    },
    loadMore() {
      const { currentTab } = this
      if (currentTab === 0) {
        this.gameParam.page++
        console.log('loadMore', this.gameParam.page)
        if (this.status !== 'nomore') {
          this.loadGame()
        }
      }
    },
    loadPGMore() {
      const { currentTab } = this
      if (currentTab === 0) {
        this.gamePGParam.page++
        if (this.listObj.pgStatus !== 'nomore') {
          this.loadPGGame()
        }
      }
    },
    loadJILIMore() {
      const { currentTab } = this
      if (currentTab === 0) {
        this.gameJILIParam.page++
        if (this.listObj.jiliStatus !== 'nomore') {
          this.loadJiliGame()
        }
      }
    },
    loadPPMore() {
      const { currentTab } = this
      if (currentTab === 0) {
        this.gamePPParam.page++
        if (this.listObj.ppStatus !== 'nomore') {
          this.loadPPGame()
        }
      }
    },
    loadChargeListMore() {
      if (this.currentTab === 1) {
        this.chargeObj.page++
        console.log('loadMore', this.chargeObj.page)
        if (this.status !== 'nomore') {
          this.loadingChargeList()
        }
      }
    },
    receive() {
      this.dataList = []
      this.loadingChargeList()
    },
    tabSwitch(index) {
      this.dataList = []
      this.chargeObj.page = 1
      this.chargeObj.type = index
      this.loadingChargeList()
    },
    onFilterConfirm(e) {
      this.chargeObj.page = 1
      this.dataList = []
      this.chargeObj.date = e.value[0].id
      this.loadingChargeList()
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
