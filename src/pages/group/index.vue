<template>
    <view class="group-container" :class="[currentTheme + '-theme']">
        <c-navbar @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view class="group-list" scroll-y>
            <view class="ad" v-if="!isSearch">

            </view>
            <view class="games">
                <view class="page-title" v-if="isSearch">
                    Search Results for: ’{{ gameParam.keyword }}’
                </view>
                <view class="page-title" v-else>
                    <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                            fill="#D71E3C" />
                    </svg>
                    {{ categoryName }}
                </view>
                <view class="game-list" v-if="!isSearch">
                    <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                        <image :src="item.img" mode="widthFix"></image>
                        <view class="game-name">{{ item.name }}</view>
                    </view>
                </view>
                <view class="search" v-if="isSearch">
                    <view class="search-list">
                        <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                            <image :src="item.img"></image>
                            <view class="desc">
                                <view class="name">{{ item.name }}</view>
                                <view class="text" v-html="item.pot_desc"></view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="related" v-if="!isSearch">
                    <view class="title">
                        <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                                fill="#D71E3C" />
                        </svg>
                        Related Games
                    </view>
                    <view class="related-list">
                        <view class="game-item" v-for="(item, index) in gameList" :key="index" @click="toGame(item)">
                            <image :src="item.img"></image>
                            <view class="desc">
                                <view class="name">{{ item.name }}</view>
                                <view class="text" v-html="item.pot_desc"></view>
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
                orderBy: 'hot_num desc',
                wid: ''
            },
            gameList: [],
            categoryName: '',
            isSearch: false,
            relatedList: []

        }
    },
    onLoad(options) {
        console.log(options)
        this.categoryName = options.name
        this.gameParam.tid = options.id
        this.getGameList()
        if (options.isNew == 0) {
            this.isSearch = false
            this.hotParam.wid = this.channelInfo.wid
            this.hotParam.orderBy = 'id desc'
            this.getNewGames()
        }
        if (options.search == 0) {
            this.isSearch = true
            this.gameParam.keyword = options.searchValue
            this.loadGame()
        }
        if (options.isHot == 1) {
            this.isSearch = false
            this.hotParam.wid = options.id
            this.loadGame()
        }

        if (options.isHot == 0) {
            this.isSearch = false
            this.hotParam.wid = this.channelInfo.wid
            this.hotParam.orderBy = 'hot_num desc'
            this.getNewGames()
        }

    },

    methods: {
        async loadGame() {
            const res = await this.$api.home.getGameList(this.gameParam);
            console.log('loadGame', res)
            this.gameList = res.data
        },
        async getGameList() {
            const res = await this.$api.home.getGameList(this.gameParam);
            this.relatedList = res.data
        },
        async getNewGames() {
            const res = await this.$api.home.getNewGame(this.hotParam);
            this.gameList = res.data
        },
        toGame(item) {
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${item.id}`
            })
        },
        openLeftMenu() {
            this.isLeftMenu = true
        },
        onCategoryClick(item) {
            this.gameParam.tid = item.id
            this.loadGame()
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

        .ad {
            width: 100%;
            height: 16rem;
            background-color: antiquewhite;
        }

        .games {
            flex: 1;

            .page-title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #D71E3C;
                padding: 0.625rem;
                margin-bottom: 1.66rem;
            }

            .game-list {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                gap: 0.72rem;

                .game-item {
                    width: calc(33.3% - 0.72rem);
                    border: 4px solid #D71E3C;
                    background-color: #FFFEFE;
                    border-radius: 0.25rem;
                    box-shadow: 0px 4px 4px 2px #D71E3C4D;

                    image {
                        width: 100%;
                    }

                    .game-name {
                        font-family: Inter;
                        font-size: 0.8125rem;
                        font-weight: 400;
                        text-align: center;
                        color: #D71E3C;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        padding: 0.4375rem 0.22rem;
                    }
                }
            }

            .search {
                margin-top: 2rem;

                .title {
                    font-family: Inter;
                    font-size: 1.25rem;
                    font-weight: 700;
                    text-align: left;
                    color: #D71E3C;
                    padding: 0.625rem;
                }

                .search-list {

                    .game-item {
                        width: 100%;
                        display: flex;
                        margin-bottom: 0.625rem;

                        image {
                            width: 6.19rem;
                            height: 6.19rem;
                            border: 4px solid #D71E3C;
                            border-radius: 0.25rem;
                        }

                        .desc {
                            padding: 0.625rem 0.9375rem;

                            .name {
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 700;
                                text-align: left;
                                color: #D71E3C;
                            }

                            .text {
                                color: #46484E;
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 400;
                                text-align: left;
                            }
                        }
                    }
                }
            }
        }
        .related {
                margin-top: 2rem;

                .title {
                    font-family: Inter;
                    font-size: 1.25rem;
                    font-weight: 700;
                    text-align: left;
                    color: #D71E3C;
                    padding: 0.625rem;
                }

                .related-list {

                    .game-item {
                        width: 100%;
                        display: flex;
                        margin-bottom: 0.625rem;

                        image {
                            width: 6.19rem;
                            height: 6.19rem;
                            border: 4px solid #D71E3C;
                            border-radius: 0.25rem;
                        }

                        .desc {
                            padding: 0.625rem 0.9375rem;

                            .name {
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 700;
                                text-align: left;
                                color: #D71E3C;
                            }

                            .text {
                                color: #46484E;
                                font-family: Inter;
                                font-size: 0.78rem;
                                font-weight: 400;
                                text-align: left;
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