<template>
    <view class="game-detail" :class="[currentTheme + '-theme']">
        <c-navbar @toHome="toHome" @toBalance="toDeposit" @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view scroll-y class="game-detail__wrapper">
            <view class="game-detail__wrapper__content">
                <!-- <view class="ad">

                </view> -->
                <view class="game-info">
                    <view class="game-img">
                        <view class="img">
                            <image :src="gameDetail.img"></image>
                        </view>
                        <view class="game-name">
                            <view class="name">{{ gameDetail.name }}</view>
                            <view class="rate">
                                <svg width="1.56rem" height="1.56rem" viewBox="0 0 50 50" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.1008 1.18791L33.1553 15.807L48.9521 18.155C49.952 18.304 50.3556 19.5526 49.6309 20.27L38.1915 31.6652L40.8885 47.7471C41.0628 48.7627 40.0079 49.5361 39.1089 49.0516L24.9908 41.4672L10.8728 49.0516C9.97377 49.5361 8.92799 48.7627 9.09311 47.7471L11.7901 31.6652L0.36909 20.2607C-0.355619 19.5433 0.0480164 18.2947 1.04793 18.1456L16.8447 15.7976L23.9083 1.18791C24.3579 0.265487 25.6605 0.265487 26.1008 1.18791Z"
                                        fill="#F8AE06" />
                                </svg>
                                <text>{{ gameDetail.rate }}</text>
                            </view>
                        </view>
                    </view>
                    <view class="play-btn">
                        <view class="btn" @click="playGame(gameDetail)">
                            PLAY NOW
                        </view>
                    </view>
                    <view class="desc" v-if="gameDetail.pot_desc">
                        <view class="title">
                            {{ gameDetail.name }}
                        </view>
                        <view class="desc-line"></view>
                        <view class="desc-content" v-html="gameDetail.pot_desc">

                        </view>
                    </view>

                </view>
                <view class="related">
                    <view class="title">
                        <svg width="1.625rem" height="0.91rem" viewBox="0 0 52 29" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M22.284 16.1434V12.7148C22.284 12.2331 21.9086 11.8577 21.4269 11.8577H16.284V6.71484C16.284 6.23313 15.9086 5.8577 15.4269 5.8577H11.9983C11.5166 5.8577 11.1411 6.23313 11.1411 6.71484V11.8577H5.99829C5.51657 11.8577 5.14114 12.2331 5.14114 12.7148V16.1434C5.14114 16.6251 5.51657 17.0006 5.99829 17.0006H11.1411V22.1434C11.1411 22.6251 11.5166 23.0006 11.9983 23.0006H15.4269C15.9086 23.0006 16.284 22.6251 16.284 22.1434V17.0006H21.4269C21.9086 17.0006 22.284 16.6251 22.284 16.1434ZM37.7126 17.8577C37.7126 15.9566 36.1851 14.4291 34.284 14.4291C32.3829 14.4291 30.8554 15.9566 30.8554 17.8577C30.8554 19.7588 32.3829 21.2863 34.284 21.2863C36.1851 21.2863 37.7126 19.7588 37.7126 17.8577ZM44.5697 11.0006C44.5697 9.09941 43.0423 7.57199 41.1411 7.57199C39.24 7.57199 37.7126 9.09941 37.7126 11.0006C37.7126 12.9017 39.24 14.4291 41.1411 14.4291C43.0423 14.4291 44.5697 12.9017 44.5697 11.0006ZM51.4269 14.4291C51.4269 22.0097 45.2931 28.1434 37.7126 28.1434C34.378 28.1416 31.1587 26.9224 28.6594 24.7148H22.7674C20.2681 26.9224 17.0489 28.1416 13.7143 28.1434C6.13371 28.1434 0 22.0097 0 14.4291C0 6.84856 6.13371 0.714844 13.7143 0.714844H37.7143C45.2949 0.714844 51.4286 6.84856 51.4286 14.4291H51.4269Z"
                                fill="#E8BFA7" />
                        </svg>
                        Related Games
                    </view>
                    <view class="related-list">
                        <view class="game-item" v-for="(item, index) in relatedList" :key="index" @click="toGame(item)">
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
        <Footer />
        <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="cates" @close="isLeftMenu = false"
            @onHotGamesClick="onHotGamesClick" @onGamesClick="onGamesClick">
        </leftMenu>
    </view>
</template>

<script>
import leftMenu from '../../components/common/leftMenu/index.vue'
import Footer from '../../components/common/footer.vue'
import { mapGetters } from 'vuex'
export default {
    name: 'GameDetail',
    data() {
        return {
            id: '',
            isLeftMenu: false,
            gameDetail: {},
            gameParam: {
                page: 1,
                limit: 9,
                keyword: '',
                orderBy: '',
                tid: ''
            },
            categoryList: [],
            relatedList: []
        }
    },
    computed: {
        ...mapGetters(["currentTheme", "cates"]),
    },
    components: {
        leftMenu,
        Footer
    },
    onLoad(options) {
        this.id = options.id
        this.getGameDetail()
    },
    methods: {
        openLeftMenu() {
            this.isLeftMenu = true
        },

        async getGameDetail() {
            const res = await this.$api.home.gameDetail({ id: this.id });
            this.gameDetail = res
            this.gameParam.tid = res.tag[0]
            this.getGameList()
        },
        async getGameList() {
            const res = await this.$api.home.getGameList(this.gameParam);
            this.relatedList = res.data
        },
        toGame(game) {
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.id}`
            })
        },
        playGame(game) {
            this.$store.dispatch('setGamePath', game.url)
            uni.navigateTo({
                url: `/pages/webview/index`,
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.game-detail {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: absolute;
    width: 100%;
    background-color: #18253F;

    &__wrapper {
        flex: 1;
        height: 0;

        &__content {
            padding: 0.41rem 1.41rem;

            .ad {
                width: 100%;
                height: 16rem;
                background-color: antiquewhite;
            }

            .game-info {
                .game-img {
                    display: flex;

                    .img {
                        width: 6.1875rem;
                        height: 6.1875rem;
                        border-radius: 0.5rem;

                        image {
                            width: 100%;
                            height: 100%;
                            border-radius: 0.5rem;
                        }
                    }

                    .game-name {

                        margin-top: 0.25rem;
                        margin-left: 1rem;

                        .name {
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: center;
                            color: #E8BFA7;
                            margin-bottom: 0.25rem;
                        }

                        .rate {
                            width: 100%;
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: left;
                            color: #F8AE06;
                            display: flex;
                            align-items: center;
                            padding: 0.25rem 0;
                            border-radius: 0.25rem;

                            text {
                                margin-left: 0.5rem;
                            }
                        }
                    }
                }

                .play-btn {
                    margin-top: 1.28rem;

                    .btn {
                        background: linear-gradient(180deg, #EEDDCE 0%, #E2A383 100%);
                        border-radius: 0.625rem 0 0 0.625rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #433C39;
                        padding: 0.6875rem 0;
                    }
                }

                .desc {
                    margin-top: 1.28rem;
                    background: #0D172C;
                    padding: 0.5rem 1rem;
                    border-radius: 0.625rem;

                    .title {
                        font-family: Inter;
                        font-size: 0.875rem;
                        font-weight: 700;
                        text-align: left;
                        color: #E8BFA7;
                        margin-bottom: 1rem;
                    }

                    .desc-line {
                        background-color: #E8BFA7;
                        height: 1px;
                    }

                    .desc-content {
                        margin-top: 1rem;
                        font-family: Inter;
                        font-size: 0.875rem;
                        font-weight: 400;
                        text-align: left;
                        color: #E8BFA7;
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
    }

}
</style>