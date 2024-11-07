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
                                <svg width="1.56rem" height="1.5rem" viewBox="0 0 50 48" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.1008 0.681134L33.1553 15.0744L48.9521 17.3861C49.952 17.5329 50.3556 18.7621 49.6309 19.4685L38.1915 30.6877L40.8885 46.5212C41.0628 47.5211 40.0079 48.2825 39.1089 47.8055L24.9908 40.3383L10.8728 47.8055C9.97377 48.2825 8.92799 47.5211 9.09311 46.5212L11.7901 30.6877L0.36909 19.4593C-0.355619 18.753 0.0480164 17.5237 1.04793 17.3769L16.8447 15.0652L23.9083 0.681134C24.3579 -0.227045 25.6605 -0.227045 26.1008 0.681134Z"
                                        fill="#F8AE06" />
                                </svg>
                                <view class="num">
                                    {{ gameDetail.rate }}
                                </view>
                            </view>
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
                                <image :src="item.img"></image>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
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
            categoryList:[],
            relatedList: []
        }
    },
    computed: {
        ...mapGetters(["currentTheme", "channelInfo"]),
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
            const res = await this.$api.home.getTags({
                wid: this.channelInfo.wid})
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
                    align-items: center;

                    .img {
                        width: 4.69rem;
                        height: 4.69rem;
                        border-radius: 0.25rem;

                        image {
                            width: 100%;
                            height: 100%;
                            border-radius: 0.25rem;
                        }
                    }

                    .game-name {
                        margin-left: 0.9375rem;

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
                            .num{
                                margin-left: 0.9375rem;
                            }
                        }
                    }
                }

                .play-btn {
                    margin-top: 1.28rem;

                    .btn {
                        background: linear-gradient(180deg, #FE558F 0%, #FF9818 100%);
                        height: 2.84rem;
                        border-radius: 0.25rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #fff;
                    }
                }

                .desc {
                    margin-top: 1.28rem;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #271A19;
                    }

                    .desc-content {
                        margin-top: 0.5rem;
                        font-family: Inter;
                        font-size: 0.75rem;
                        font-weight: 400;
                        text-align: left;
                        color: #000000;
                    }
                }

                .related {
                    margin-top: 1.28rem;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #DD8400;
                    }

                    .related-list {
                        display: grid;
                        gap: 0.84rem;
                        grid-template-columns: repeat(3, 1fr);

                        .game-item {
                            width: 100%;
                            // height: 6.56rem;
                            aspect-ratio: 210/210;
                            border-radius: 0.25rem;

                            image {
                                width: 100%;
                                height: 100%;
                                border-radius: 0.25rem;
                            }
                        }
                    }
                }
            }
        }
    }

}
</style>