<template>
    <view class="group-container" :class="[currentTheme + '-theme']">
        <c-navbar @toHome="toHome" @toBalance="toDeposit" @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view class="group-list" scroll-y>
            <view class="games">
                <view class="page-title" v-if="isSearch">
                    Search Results for: ’{{ gameParam.keyword }}’
                </view>
                <view class="page-title" v-else>
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
            isSearch: false
        }
    },
    onLoad(options) {
        console.log(options)
        this.categoryName = options.name
        this.gameParam.tid = options.id
        this.getTags()
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
            this.getNewGames()
        }

    },
    mounted() {
    },
    methods: {
        async getTags() {
            const res = await this.$api.home.getTags()
            console.log(res)
            this.categoryList = res
        },
        async loadGame() {
            const res = await this.$api.home.getGameList(this.gameParam);
            console.log('loadGame', res)
            this.gameList = res.data
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
    background-color: #EBF4FF;

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
                color: #2565AF;
                margin-bottom: 0.84rem;
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