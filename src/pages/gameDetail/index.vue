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
                            <view class="game-name">
                                <view class="name">{{ gameDetail.name }}</view>
                                <view class="rate">
                                    <svg width="0.9375rem" height="0.91rem" viewBox="0 0 30 29" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M15.6605 0.40868L19.8932 9.04464L29.3712 10.4317C29.9712 10.5197 30.2134 11.2573 29.7785 11.6811L22.9149 18.4126L24.5331 27.9127C24.6377 28.5127 24.0047 28.9695 23.4653 28.6833L14.9945 24.203L6.52366 28.6833C5.98426 28.9695 5.35679 28.5127 5.45587 27.9127L7.07408 18.4126L0.221454 11.6756C-0.213371 11.2518 0.0288099 10.5142 0.628758 10.4262L10.1068 9.03913L14.345 0.40868C14.6147 -0.136227 15.3963 -0.136227 15.6605 0.40868Z"
                                            fill="#212227" />
                                    </svg>
                                    {{ gameDetail.rate }}
                                </view>
                            </view>
                        </view>
                        <view class="play-btn">
                            <view class="btn" @click="play(gameDetail)">
                                Play Game
                            </view>
                        </view>

                    </view>
                    <view class="desc" v-if="gameDetail.pot_desc">

                        <view class="desc-content" v-html="gameDetail.pot_desc">

                        </view>
                    </view>
                    <view class="ad">

                    </view>
                    <view class="related">
                        <view class="title">
                            Related Games
                        </view>
                        <view class="related-list">
                            <view class="game-item" v-for="(game) in relatedList" :key="game.id" @click="toGame(game)">
                                <view class="img">
                                    <image mode="heightFix" :src="game.img"></image>
                                    <view class="info">
                                        <view class="name">{{ game.name }}</view>
                                        <view class="num" v-html="game.en_desc">
                                        </view>
                                    </view>
                                </view>
                                <view class="right">
                                    <view class="play-btn">
                                        Play
                                    </view>
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
    background-color: #EBF4FF;

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
                padding: 0.69rem;

                .game-info {
                    padding: 2.06rem 0 2.81rem 0;
                    background: #FFFFFF;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;

                    .game-img {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;

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

                        .game-name {
                            margin-top: 0.9375rem;

                            .name {
                                font-family: Inter;
                                font-size: 1.56rem;
                                font-weight: 700;
                                text-align: left;
                                color: #3F3B45;
                                margin-bottom: 0.53rem;
                            }

                            .rate {
                                font-family: Inter;
                                font-size: 0.9375rem;
                                font-weight: 400;
                                text-align: center;
                                color: #212227;
                                display: flex;
                                align-items: center;
                                justify-content: center;

                                .num {
                                    margin-left: 0.9375rem;
                                }
                            }
                        }
                    }

                    .play-btn {
                        margin-top: 1.28rem;

                        .btn {
                            background: #FFFFFF;
                            border-radius: 3.125rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            color: #212227;
                            border: 2px solid #212227;
                            padding: 0.8125rem 6.375rem;
                            box-shadow: 0px 4px 4px 0px #00000080;
                        }
                    }


                }

                .desc {
                    margin-top: 1.28rem;
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

                .related {
                    margin-top: 1.28rem;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #2565AF;
                        margin-bottom: 0.5rem;
                    }

                    .related-list {
                        display: flex;
                        flex-direction: column;
                        gap: 0.84rem;

                        .game-item {
                            display: flex;
                            align-items: center;
                            justify-content: space-between;

                            .img {
                                height: 4.06rem;
                                display: flex;
                                align-items: center;
                                width: 70%;

                                image {
                                    height: 100%;
                                    border-radius: 0.5rem;
                                }

                                .info {
                                    margin-left: 1.375rem;
                                    width: 60%;
                                    height: 100%;
                                    padding-top: 0.5rem;
                                    border-bottom: 1px solid #212227;

                                    .name {
                                        font-family: Inter;
                                        font-size: 0.8125rem;
                                        font-weight: 700;
                                        text-align: left;
                                        color: #212227;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        white-space: nowrap;
                                    }

                                    .num {
                                        font-family: Inter;
                                        font-size: 0.8125rem;
                                        font-weight: 400;
                                        text-align: left;
                                        color: #212227;
                                        margin-top: 0.8125rem;
                                        text-overflow: ellipsis;
                                        overflow: hidden;
                                        white-space: nowrap;
                                        width: 100%;
                                    }
                                }
                            }

                            .right {
                                width: 20%;

                                .play-btn {
                                    border: 2px solid #212227;
                                    border-radius: 3.125rem;
                                    font-family: Inter;
                                    font-size: 0.9375rem;
                                    font-weight: 700;
                                    line-height: 1.125rem;
                                    padding: 0.3125rem 0.91rem;
                                    text-align: center;
                                    color: #212227;
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