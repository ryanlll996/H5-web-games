<template>
    <view class="group-container" :class="[currentTheme + '-theme']">
        <c-navbar @toHome="toHome" @toBalance="toDeposit" @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view class="group-list" scroll-y @scrolltolower="loadMore">
            <view class="games">
                <view class="search-page-title" v-if="isSearch">
                    Search Results for: ’{{ gameParam.keyword }}’
                </view>
                <view class="page-title" v-else>
                    <view class="top-left">
                        <svg width="1.625rem" height="0.91rem" viewBox="0 0 52 29" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.284 16.1434V12.7148C22.284 12.2331 21.9086 11.8577 21.4269 11.8577H16.284V6.71484C16.284 6.23313 15.9086 5.8577 15.4269 5.8577H11.9983C11.5166 5.8577 11.1411 6.23313 11.1411 6.71484V11.8577H5.99829C5.51657 11.8577 5.14114 12.2331 5.14114 12.7148V16.1434C5.14114 16.6251 5.51657 17.0006 5.99829 17.0006H11.1411V22.1434C11.1411 22.6251 11.5166 23.0006 11.9983 23.0006H15.4269C15.9086 23.0006 16.284 22.6251 16.284 22.1434V17.0006H21.4269C21.9086 17.0006 22.284 16.6251 22.284 16.1434ZM37.7126 17.8577C37.7126 15.9566 36.1851 14.4291 34.284 14.4291C32.3829 14.4291 30.8554 15.9566 30.8554 17.8577C30.8554 19.7588 32.3829 21.2863 34.284 21.2863C36.1851 21.2863 37.7126 19.7588 37.7126 17.8577ZM44.5697 11.0006C44.5697 9.09941 43.0423 7.57199 41.1411 7.57199C39.24 7.57199 37.7126 9.09941 37.7126 11.0006C37.7126 12.9017 39.24 14.4291 41.1411 14.4291C43.0423 14.4291 44.5697 12.9017 44.5697 11.0006ZM51.4269 14.4291C51.4269 22.0097 45.2931 28.1434 37.7126 28.1434C34.378 28.1416 31.1587 26.9224 28.6594 24.7148H22.7674C20.2681 26.9224 17.0489 28.1416 13.7143 28.1434C6.13371 28.1434 0 22.0097 0 14.4291C0 6.84856 6.13371 0.714844 13.7143 0.714844H37.7143C45.2949 0.714844 51.4286 6.84856 51.4286 14.4291H51.4269Z"
                                fill="#E8BFA7" />
                        </svg>

                        <view class="title">{{ categoryName }}</view>
                    </view>
                    <view class="top-right">

                    </view>
                </view>
                <view class="game-list" v-if="!isSearch">
                    <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                        <image :src="item.img" mode="aspectFill"></image>
                        <view class="game-name">{{ item.name }}</view>
                    </view>
                </view>
                <view class="result" v-if="isSearch">
                    <view class="related-list">
                        <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                            <image :src="item.img"></image>
                            <view class="content">
                                <view class="name">{{ item.name }}</view>
                                <view class="desc" v-html="item.en_desc"></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
        </scroll-view>
        <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="cates" @close="isLeftMenu = false">
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
        ...mapGetters(['isLogin', 'channelInfo', 'userInfo', 'currentTheme', 'cates'])
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
                limit: 9,
                keyword: '',
                orderBy: '',
                tid: ''
            },
            hotParam: {
                page: 1,
                limit: 9,
                orderBy: 'id desc',
                wid: ''
            },
            gameList: [],
            categoryName: '',
            isSearch: false,
            isNew: false,
            status: ''
        }
    },
    onLoad(options) {
        console.log(options)
        this.categoryName = options.name
        this.gameParam.tid = options.id
        if (options.search == 0) {
            this.isSearch = true
            this.isNew = false
            this.gameParam.keyword = options.searchValue
            this.loadGame()
        }
        if (options.isHot == 1) {
            this.isSearch = false
            this.isNew = false
            this.hotParam.wid = options.id
            this.loadGame()
        }

        if (options.isNew == 0) {
            this.isNew = true
            this.isSearch = false
            this.hotParam.wid = this.channelInfo.wid
            this.getNewGames()
        }

    },

    methods: {
        async loadGame() {
            const res = await this.$api.home.getGameList(this.gameParam);
            console.log('loadGame', res)
            this.gameList = this.gameList.concat(res.data)
            this.status = res.data.length < this.gameParam.limit ? 'nomore' : ''
        },
        async getNewGames() {
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.gameList = this.gameList.concat(res.data)
            this.status = res.data.length < this.gameParam.limit ? 'nomore' : ''

        },
        toGame(item) {
            if (this.isNew) {
                uni.redirectTo({
                    url: `/pages/gameDetail/index?id=${item.gid}`
                })
                return
            } else {
                uni.redirectTo({
                    url: `/pages/gameDetail/index?id=${item.id}`
                })
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
            if (this.isNew) {
                this.hotParam.page++
                if (this.status !== 'nomore') {
                    this.getNewGames()
                }
                return
            } else {
                this.gameParam.page++
                if (this.status !== 'nomore') {
                    this.loadGame()
                }
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
    background-color: #18253F;

    .group-list {
        flex: 1;
        height: 0;
        padding: 1.34rem 0.625rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .games {
            flex: 1;

            .search-page-title {
                border: 2px solid #E8BFA7;
                border-radius: 0.5rem;
                padding: 0.56rem 0.625rem;
                font-family: Inter;
                font-size: 0.9375rem;
                font-weight: 400;
                text-align: left;
                color: #E8BFA7;
                margin-bottom: 1.78125rem;
            }

            .page-title {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 1.9rem 0.625rem;

                .top-left {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #E8BFA7;
                        margin-left: 0.44rem;
                    }
                }
            }

            .game-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                gap: 0.8125rem;

                .game-item {
                    width: calc(33.3% - 0.8125rem);
                    aspect-ratio: 210/286;
                    border-radius: 0.5rem;
                    position: relative;

                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 0.5rem;
                    }

                    .game-name {
                        width: 100%;
                        font-family: Inter;
                        font-size: 0.75rem;
                        font-weight: 400;
                        text-align: center;
                        color: #FFFFFF;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        position: absolute;
                        bottom: 0.8125rem;
                    }
                }
            }

            .result {
                margin-top: 2rem;

                .title {
                    font-family: Inter;
                    font-size: 1.25rem;
                    font-weight: 700;
                    text-align: left;
                    color: #E8BFA7;
                    margin-bottom: 2rem;
                }

                .related-list {
                    .game-item {
                        width: 100%;
                        // height: 6.56rem;
                        display: flex;
                        margin-bottom: 1.25rem;

                        image {
                            width: 6.19rem;
                            height: 6.19rem;
                            border-radius: 0.5rem;
                        }

                        .content {
                            padding: 0.5rem 1rem;
                            width: calc(100% - 6.19rem);

                            .name {
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 700;
                                text-align: left;
                                color: #E8BFA7;
                            }

                            .desc {
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 400;
                                text-align: left;
                                color: #E8BFA7;
                                text-overflow: ellipsis;
                                display: -webkit-box;
                                margin-top: 1.66rem;
                                -webkit-line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }

        .category {
            margin-top: 1.66rem;

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