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
                                <svg class="rate-icon" width="1.56rem" height="1.56rem" viewBox="0 0 50 50" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M26.1008 0.710233L33.1553 15.7184L48.9521 18.1289C49.952 18.2819 50.3556 19.5637 49.6309 20.3002L38.1915 31.9987L40.8885 48.5087C41.0628 49.5513 40.0079 50.3452 39.1089 49.8478L24.9908 42.0616L10.8728 49.8478C9.97377 50.3452 8.92799 49.5513 9.09311 48.5087L11.7901 31.9987L0.36909 20.2907C-0.355619 19.5541 0.0480164 18.2724 1.04793 18.1193L16.8447 15.7088L23.9083 0.710233C24.3579 -0.236744 25.6605 -0.236744 26.1008 0.710233Z"
                                        fill="#F8AE06" />
                                </svg>

                                {{ gameDetail.rate }}
                            </view>
                        </view>
                    </view>
                    <view class="play-btn">
                        <view class="btn">
                            PLAY NOW
                        </view>
                    </view>
                    <view class="desc" v-if="gameDetail.pot_desc">
                        <view class="title">
                            Description
                        </view>
                        <view class="line"></view>
                        <view class="desc-content" v-html="gameDetail.pot_desc">

                        </view>
                    </view>

                </view>
                <view class="related">
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
                        <view class="game-item" v-for="(item, index) in relatedList" :key="index" @click="toGame(item)">
                            <image :src="item.img"></image>
                            <view class="desc">
                                <view class="name">{{ item.name }}</view>
                                <view class="text" v-html="item.pot_desc"></view>
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
    background-color: #FFFFFF;

    &__wrapper {
        flex: 1;
        height: 0;

        &__content {
            padding: 1.41rem;



            .game-info {
                .game-img {
                    display: flex;
                    align-items: center;

                    .img {
                        width: 6.19rem;
                        height: 6.19rem;
                        border-radius: 0.625rem;
                        border: 4px solid #D71E3C;
                        image {
                            width: 100%;
                            height: 100%;
                            border-radius: 0.625rem;
                        }
                    }

                    .game-name {
                        padding: 0.34rem 1rem;
                        .name {
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: center;
                            color: #D71E3C;
                            margin-bottom: 0.53rem;
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
                            .rate-icon {
                                margin-right: 0.5rem;
                            }
                        }
                    }
                }

                .play-btn {
                    margin-top: 1.28rem;

                    .btn {
                        background: linear-gradient(180deg, #FF6D85 0%, #D71E7E 100%);
                        border-radius: 3.125rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        color: #FFFFFF;
                        padding: 0.69rem 0;
                    }
                }

                .desc {
                    margin-top: 1.28rem;
                    background-color: #FF6D85;
                    padding: 0.5rem 0.9375rem;
                    border-radius: 0.625rem;

                    .title {
                        font-family: Inter;
                        font-size: 1.25rem;
                        font-weight: 700;
                        text-align: left;
                        color: #FFFFFF;
                        margin-bottom: 1rem;
                    }
                    .line{
                        background-color: #FFFFFF;
                        height: 1px;
                        width: 100%;
                    }
                    .desc-content {
                        margin-top: 1rem;
                        font-family: Inter;
                        font-size: 0.875rem;
                        font-weight: 400;
                        text-align: left;
                        color: #433C39;
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
        }
    }

}
</style>