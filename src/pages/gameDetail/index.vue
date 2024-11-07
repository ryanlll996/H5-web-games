<template>
    <view class="game-detail" :class="[currentTheme + '-theme']">
        <c-navbar @openLeftMenu="openLeftMenu"></c-navbar>
        <scroll-view scroll-y class="game-detail__wrapper">
            <view class="game-detail__wrapper__content">
                <view class="ad">

                </view>
                <view class="game-content">
                    <view class="game-info">
                        <view class="game-img">
                            <view class="img">
                                <image :src="gameDetail.img"></image>
                            </view>
                            <view class="game-name">
                                <view class="name">{{ gameDetail.name }}</view>
                            </view>
                        </view>
                        <view class="play-btn">
                            <view class="btn" @click="play(gameDetail)">
                                Play Game
                            </view>
                        </view>

                    </view>
                    <view class="desc" v-if="gameDetail.pot_desc">
                        <view class="title">
                            {{ gameDetail.name }}
                        </view>
                        <view class="line"></view>
                        <view class="desc-content" v-html="gameDetail.pot_desc">

                        </view>
                    </view>
                    <view class="related">
                        <view class="title">
                            Related Games
                        </view>
                        <view class="related-list">
                            <view class="game-item" v-for="(item, index) in relatedList" :key="index"
                                @click="toGame(item)">
                                <image mode="widthFix" :src="item.img"></image>
                                <view class="name">{{ item.name }}</view>
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
            const res = await this.$api.home.getTags({wid: this.channelInfo.wid})
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
                    background: linear-gradient(137.97deg, #DE9FF2 14.98%, #656BE0 87.12%);
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
                                font-size: 0.8125rem;
                                font-weight: 700;
                                text-align: left;
                                color: #FFFFFF;
                                margin-bottom: 0.53rem;
                            }

                            .rate {
                                font-family: Inter;
                                font-size: 1.25rem;
                                font-weight: 700;
                                text-align: left;
                                color: #F8AE06;
                                display: flex;
                                align-items: center;

                                .num {
                                    margin-left: 0.9375rem;
                                }
                            }
                        }
                    }

                    .play-btn {
                        margin-top: 1.28rem;

                        .btn {
                            background: linear-gradient(84.29deg, #2565AF 5.63%, #6AB0FF 97.82%);
                            height: 2.84rem;
                            border-radius: 3.125rem;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: left;
                            color: #fff;
                            border: 4px solid #FFFFFF;
                            padding: 0.59rem 2.72rem;
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
                        color: #2565AF;
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
            }

        }
    }

}
</style>