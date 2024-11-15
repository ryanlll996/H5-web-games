<template>
    <view class="group-container" :class="[currentTheme + '-theme']">
        <c-navbar @toHome="toHome" @toBalance="toDeposit" @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view class="group-list" scroll-y @scrolltolower="loadMore">
            <view class="games">
                <view class="page-title" v-if="isSearch">
                    Search Results for: ’{{ gameParam.keyword }}’
                </view>
                <view class="page-title" v-else>
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M41.874 15.06C38.454 8.238 31.606 4 24 4C12.972 4 4 12.972 4 24C4 35.028 12.972 44 24 44C31.606 44 38.454 39.762 41.874 32.94C42.1032 32.4829 42.1486 31.9555 42.0009 31.466C41.8532 30.9764 41.5237 30.5621 41.08 30.308L30.034 24L41.078 17.694C42 17.166 42.35 16.01 41.874 15.06ZM25.008 22.264C24.7016 22.4386 24.4468 22.6912 24.2696 22.9961C24.0924 23.301 23.9991 23.6473 23.9991 24C23.9991 24.3527 24.0924 24.699 24.2696 25.0039C24.4468 25.3088 24.7016 25.5614 25.008 25.736L37.354 32.786C35.906 35.0065 33.9258 36.8296 31.5935 38.0895C29.2612 39.3495 26.6509 40.0062 24 40C15.178 40 8 32.822 8 24C8 15.178 15.178 8 24 8C26.6506 7.99375 29.2608 8.65026 31.593 9.90983C33.9253 11.1694 35.9057 12.992 37.354 15.212L25.008 22.264Z"
                            fill="#212227" />
                        <path
                            d="M20 15C20 15.394 20.0776 15.7841 20.2284 16.148C20.3791 16.512 20.6001 16.8427 20.8787 17.1213C21.1573 17.3999 21.488 17.6209 21.852 17.7716C22.2159 17.9224 22.606 18 23 18C23.394 18 23.7841 17.9224 24.148 17.7716C24.512 17.6209 24.8427 17.3999 25.1213 17.1213C25.3999 16.8427 25.6209 16.512 25.7716 16.148C25.9224 15.7841 26 15.394 26 15C26 14.2044 25.6839 13.4413 25.1213 12.8787C24.5587 12.3161 23.7956 12 23 12C22.2044 12 21.4413 12.3161 20.8787 12.8787C20.3161 13.4413 20 14.2044 20 15Z"
                            fill="#212227" />
                    </svg>
                    {{ categoryName }}
                </view>
                <view class="game-list">
                    <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                        <image mode="widthFix" :src="item.img"></image>
                        <view class="name">{{ item.name }}</view>
                    </view>
                </view>
            </view>
        </scroll-view>

        <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="categoryList" @close="isLeftMenu = false">
        </leftMenu>
        <Footer />
    </view>
</template>
<script>
import { mapGetters } from 'vuex'
import Footer from '../../components/common/footer.vue'
import leftMenu from '../../components/common/leftMenu/index.vue'

export default {
    name: 'Group',
    computed: {
        ...mapGetters(['isLogin', 'channelInfo', 'userInfo', 'currentTheme'])
    },
    components: {
        Footer,
        leftMenu
    },
    props: {
        chargeObj: {},
        dataList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isLeftMenu: false,
            gameParam: {
                page: 1,
                limit: 20,
                keyword: '',
                orderBy: '',
                tid: ''
            },
            hotParam: {
                page: 1,
                limit: 20,
                orderBy: 'hot_num desc',
                wid: ''
            },
            gameList: [],
            categoryList: [],
            categoryName: '',
            isSearch: false,
            scrollFlag: 0,
            status: 'loadMore'
        }
    },
    onLoad(options) {
        console.log(options)
        this.categoryName = options.name
        this.getTags()
        if (options.search == 0) {
            this.isSearch = true
            this.gameParam.keyword = options.searchValue
            this.scrollFlag = 0
            this.loadGame()
        }
        if (options.isHot == 1) {
            this.isSearch = false
            this.gameParam.tid = options.id
            this.scrollFlag = 0
            this.loadGame()
        }
        if(options.isNew == 0){
            this.isSearch = false
            this.hotParam.wid = this.channelInfo.wid
            this.hotParam.orderBy = 'id desc'
            this.categoryName = 'New Games'
            this.scrollFlag = 1
            this.getNewGames()
        }
        if (options.isHot == 0) {
            this.isSearch = false
            this.hotParam.wid = this.channelInfo.wid
            this.hotParam.orderBy = 'hot_num desc'
            this.categoryName = 'Hot Games'
            this.scrollFlag = 1
            this.getNewGames()
        }
        
    },
    mounted() {
    },
    methods: {
        toHotGame(game) {
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.gid}`
            })
        },
        async getTags() {
            const res = await this.$api.home.getTags({ wid: this.channelInfo.wid })
            console.log(res)
            this.categoryList = res
        },
        async loadGame() {
            const res = await this.$api.home.getGameList(this.gameParam);
            console.log('loadGame', res)
            this.gameList = res.data.concat(this.gameList)
            if (res.data.length < this.gameParam.limit) {
                this.status = 'nomore'
            }
        },
        async getNewGames() {
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.gameList = res.data.concat(this.gameList)
            if (res.data.length < this.hotParam.limit) {
                this.status = 'nomore'
            }
        },
        toGame(item) {
            if(this.scrollFlag == 0){
                    uni.redirectTo({
                    url: `/pages/gameDetail/index?id=${item.id}`
                })
            } else {
                this.toHotGame(item)
            }
            
        },
        openLeftMenu() {
            this.isLeftMenu = true
        },
        onCategoryClick(item) {
            this.gameParam.tid = item.id
            this.loadGame()
        },
        loadMore() {
            console.log('loadMore')
            if (this.status == 'nomore') {
                return
            }
            if (this.scrollFlag == 0) {
                this.gameParam.page++
                this.loadGame()
            } else if (this.scrollFlag == 1) {
                this.hotParam.page++
                this.getNewGames()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.group-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    background-color: #FFFFFF;

    .group-list {
        flex: 1;
        height: 0;
        padding: 1.34rem 0.625rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .games {
            flex: 1;

            .page-title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #212227;
                margin-bottom: 0.84rem;
                display: flex;
                align-items: center;
            }

            .game-list {
                display: flex;
                gap: 0.84rem;
                flex-wrap: wrap;
                .game-item {
                    width: calc(33.3% - 0.84rem);
                    // height: 6.56rem;
                    aspect-ratio: 210/210;
                    border-radius: 0.25rem;

                    image {
                        width: 100%;
                        border-radius: 0.25rem;
                    }

                    .name {
                        text-align: center;
                        font-family: Inter;
                        font-size: 0.8125rem;
                        font-weight: 400;
                        text-align: center;
                        color: #2565AF;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        white-space: nowrap;

                    }
                }
            }
        }

        .category {
            .category-title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #DD8400;
            }

            .category-list {
                display: grid;
                gap: 0.84rem;
                grid-template-columns: repeat(3, 1fr);
                margin-top: 0.84rem;

                .category-item {
                    width: 100%;
                    // height: 6.56rem;
                    aspect-ratio: 215/70;
                    border-radius: 0.25rem;
                    background-color: #FFEDDE;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: Inter;
                    font-size: 0.9375rem;
                    font-weight: 700;
                    text-align: center;
                    color: #FF9E0D;
                }
            }
        }
    }

}
</style>