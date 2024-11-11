<template>
    <view class="game-detail" :class="[currentTheme + '-theme']">
        <c-navbar @openLeftMenu="openLeftMenu"></c-navbar>
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

                        </view>
                    </view>
                    <view class="play-btn">
                        <view class="btn" @click="play(gameDetail)">
                            Play Game
                        </view>
                    </view>
                    <view class="desc">
                        <view class="title">
                            {{ gameDetail.name }}
                        </view>
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
                                <view class="img">
                                    <image :src="item.img">

                                    </image>
                                    <view class="rate">
                                        <svg width="0.625rem" height="0.625rem" viewBox="0 0 20 20" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M10.4403 0.272454L13.2621 6.02976L19.5808 6.95445C19.9808 7.01316 20.1422 7.50486 19.8524 7.7874L15.2766 12.2751L16.3554 18.6085C16.4251 19.0085 16.0032 19.313 15.6436 19.1222L9.99633 16.1353L4.34911 19.1222C3.98951 19.313 3.57119 19.0085 3.63724 18.6085L4.71605 12.2751L0.147636 7.78373C-0.142247 7.50119 0.0192066 7.00949 0.419172 6.95078L6.7379 6.02609L9.56334 0.272454C9.74314 -0.0908179 10.2642 -0.0908179 10.4403 0.272454Z"
                                                fill="#F8AE06" />
                                        </svg>
                                        {{ item.rate }}
                                    </view>
                                </view>

                                <view class="name">{{ item.name }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <Policy />
        </scroll-view>
        <Footer />
        <leftMenu :isLeftMenu="isLeftMenu" :gameTypes="categoryList" @close="isLeftMenu = false"
            @onHotGamesClick="onHotGamesClick" @onGamesClick="onGamesClick">
        </leftMenu>
    </view>
</template>

<script>
import leftMenu from '../../components/common/leftMenu/index.vue'
import Footer from '../../components/common/footer.vue'
import { mapGetters } from 'vuex'
import Policy from '../../components/common/policy/index.vue'

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
        ...mapGetters(["currentTheme", "channelInfo"]),
    },
    components: {
        leftMenu,
        Footer,
        Policy
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
            const res = await this.$api.home.getTags({
                wid: this.channelInfo.wid
            })
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

    &__wrapper {
        flex: 1;
        height: 0;

        &__content {
            .ad {
                width: 100%;
                height: 16rem;
                background-color: antiquewhite;
            }

            .game-info {
                padding: 1.53rem 0.97rem;

                .game-img {
                    display: flex;

                    .img {
                        width: 4.84rem;
                        height: 4.84rem;
                        border-radius: 0.25rem;

                        image {
                            width: 100%;
                            height: 100%;
                            border-radius: 0.25rem;
                        }
                    }

                    .game-name {
                        margin-left: 0.9375rem;
                        margin-top: 0.9375rem;

                        .name {
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: left;
                            color: #271A19;
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
                    padding: 0 0.25rem;

                    .btn {
                        box-shadow: 0px 4px 4px 0px #00000040;
                        height: 3.125rem;
                        border-radius: 0.5rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #fff;
                        background-color: #496393;
                    }
                }

                .desc {
                    margin-top: 1.28rem;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #3F3B45;
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
                        color: #3F3B45;
                        margin-bottom: 1.0625rem;
                    }

                    .related-list {


                        .game-item {
                            width: 100%;
                            display: flex;
                            margin-bottom: 1.0625rem;

                            .img {
                                width: 3.75rem;
                                height: 3.75rem;
                                border-radius: 0.5rem;
                                position: relative;
                                margin-right: 0.5rem;

                                image {

                                    width: 100%;
                                    height: 100%;
                                    border-radius: 0.5rem;


                                }

                                .rate {
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    z-index: 1;
                                    background-color: #fff;
                                    box-shadow: 0px 4px 4px 0px #00000040;
                                    font-family: Inter;
                                    font-size: 0.6875rem;
                                    font-weight: 400;
                                    color: #0D3C53;
                                    display: flex;
                                    align-items: center;
                                    justify-content: center;
                                    border-radius: 0.5rem 0 0.25rem 0;
                                    padding:0.16rem 0.22rem;
                                    svg{
                                        margin-right: 0.25rem;
                                    }
                                }
                            }


                            .name {
                                font-family: Inter;
                                font-size: 0.9375rem;
                                font-weight: 700;
                                text-align: left;
                                color: #496393;
                                margin-top: 0.25rem;
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>