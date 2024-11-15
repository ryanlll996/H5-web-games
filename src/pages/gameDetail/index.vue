<template>
    <view class="game-detail" :class="[currentTheme + '-theme']">
        <c-navbar @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view scroll-y class="game-detail__wrapper">
            <view class="game-detail__wrapper__content">

                <view class="game-content">
                    <view class="game-info">
                        <view class="game-img">
                            <view class="img">
                                <image :src="gameDetail.img"></image>
                            </view>
                            <view class="info">
                                <view class="game-name">
                                    <view class="name">{{ gameDetail.name }}</view>
                                    <view class="rate">
                                        <svg width="0.9375rem" height="0.91rem" viewBox="0 0 30 29" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M15.6605 0.40868L19.8932 9.04464L29.3712 10.4317C29.9712 10.5197 30.2134 11.2573 29.7785 11.6811L22.9149 18.4126L24.5331 27.9127C24.6377 28.5127 24.0047 28.9695 23.4653 28.6833L14.9945 24.203L6.52366 28.6833C5.98426 28.9695 5.35679 28.5127 5.45587 27.9127L7.07408 18.4126L0.221454 11.6756C-0.213371 11.2518 0.0288099 10.5142 0.628758 10.4262L10.1068 9.03913L14.345 0.40868C14.6147 -0.136227 15.3963 -0.136227 15.6605 0.40868Z"
                                                fill="#FE5757" />
                                        </svg>
                                        <view class="num">{{ gameDetail.rate }}</view>
                                    </view>
                                </view>
                                <view class="desc">

                                    <view class="desc-content" v-html="gameDetail.desc">
                                    </view>
                                </view>
                            </view>

                        </view>
                        <view class="play-btn">
                            <view class="btn" @click="play(gameDetail)">
                                Play Game
                            </view>
                        </view>

                    </view>

                    <view class="ad">

                    </view>
                    <view class="related">
                        <view class="related-list">
                            <view class="game-item" v-for="(game) in relatedList" :key="game.id" @click="toGame(game)">
                                <view class="img">
                                    <image :src="game.img"></image>
                                </view>
                            </view>
                        </view>
                    </view>
                </view>

            </view>
        </scroll-view>
        <Footer />
        <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="categoryList" @close="isLeftMenu = false">
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
                limit: 8,
                keyword: '',
                orderBy: '',
                tid: ''
            },
            categoryList: [],
            relatedList: []
        }
    },
    computed: {
        ...mapGetters(["currentTheme", "channelInfo"])
    },
    components: {
        leftMenu,
        Footer
    },
    onLoad(options) {
        this.id = options.id
        this.getGameDetail()
        this.getTags()
    },
    methods: {
        openLeftMenu() {
            this.isLeftMenu = true
        },
        async getTags() {
            const res = await this.$api.home.getTags({ wid: this.channelInfo.wid })
            console.log(res)
            this.categoryList = res
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
        play(game) {
            console.log(game)
            window.location.href = game.url
        },
        toGame(item) {
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${item.id}`
            })
        },
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
    background-color: #EFECEC;

    &__wrapper {
        flex: 1;
        height: 0;

        &__content {
            .ad {
                width: 100%;
                height: 16rem;
                background-color: antiquewhite;
            }

            .game-content {
                margin-top: 0.5rem;
                padding: 1.25rem 1.156rem;
                background-color: #fff;

                .game-info {
                    background: #FFFFFF;
                    display: flex;
                    flex-direction: column;
                    border: 2px solid #FE5757;
                    border-radius: 0.25rem;
                    position: relative;
                    height: 11.125rem;
                    box-sizing: border-box;
                    margin-bottom: 1.25rem;

                    .game-img {
                        display: flex;
                        padding: 0.69rem;

                        .img {
                            width: 6rem;
                            height: 6rem;
                            border-radius: 0.5rem;

                            image {
                                width: 100%;
                                height: 100%;
                                border-radius: 0.5rem;
                            }
                        }

                        .info {
                            display: flex;
                            flex-direction: column;
                            width: calc(100% - 6rem);

                            .game-name {
                                margin-top: 0.5rem;
                                margin-left: 0.5rem;
                                display: flex;
                                justify-content: space-between;

                                .name {
                                    font-family: Inter;
                                    font-size: 0.9375rem;
                                    font-weight: 700;
                                    text-align: left;
                                    color: #212227;
                                    margin-bottom: 0.53rem;
                                }

                                .rate {
                                    font-family: Inter;
                                    font-size: 0.9375rem;
                                    font-weight: 400;
                                    text-align: center;
                                    color: #FE5757;
                                    display: flex;
                                    justify-content: center;

                                    .num {
                                        margin-left: 0.25rem;
                                    }
                                }
                            }

                            .desc {
                                border: 2px solid #FFFFFF;
                                background-color: #fff;
                                border-radius: 0.5rem;
                                padding: 0.5625rem 0.625rem;

                                .title {
                                    font-family: Inter;
                                    font-size: 1.25rem;
                                    font-weight: 700;
                                    text-align: left;
                                    color: #2565AF;
                                }

                                .line {
                                    height: 1px;
                                    width: 100%;
                                    background-color: #2565AF;
                                    margin-top: 0.625rem;
                                    margin-bottom: 0.5rem;
                                }

                                .desc-content {
                                    margin-top: 0.5rem;
                                    font-family: Inter;
                                    font-size: 0.75rem;
                                    font-weight: 400;
                                    text-align: left;
                                    color: #3F3B45;
                                }
                            }
                        }

                    }

                    .play-btn {
                        margin-top: 1.28rem;
                        position: absolute;
                        width: 100%;
                        bottom: 0;

                        .btn {
                            width: 100%;
                            background: #FE5757;
                            border-radius: 0.375rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: Inter;
                            font-size: 1.56rem;
                            font-weight: 700;
                            color: #FFFFFF;
                            border: 2px solid #FE5757;
                            height: 2.78rem;
                        }
                    }
                }



                .related {
                    margin-top: 1.28rem;

                    .related-list {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 0.25rem;

                        .game-item {
                            width: calc(25% - 0.25rem);
                            aspect-ratio: 1/1;
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .img {
                                display: flex;
                                align-items: center;
                                width: 100%;
                                height: 100%;
                                image {
                                    width: 100%;
                                    height: 100%;                                    border-radius: 0.5rem;
                                }
                            }


                        }
                    }
                }
            }

        }
    }

}
</style>