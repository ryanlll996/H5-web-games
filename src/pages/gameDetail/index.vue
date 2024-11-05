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
                                <up-rate count="5" activeColor="#FFE203" inactiveColor="#FFE203" size="1.5rem" v-model="gameDetail.rate"></up-rate>
                            </view>
                        </view>
                    </view>
                    <view class="play-btn">
                        <view class="btn" @click="playGame(gameDetail)">
                            PLAY NOW
                        </view>
                    </view>
                    <view class="desc">
                        <view class="title">
                            {{ gameDetail.name }}
                        </view>
                        <view class="desc-content" v-html="gameDetail.pot_desc">

                        </view>
                    </view>
                    
                </view>
                <view class="related">
                        <view class="title">
                            <svg width="1.625rem" height="0.91rem" viewBox="0 0 52 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.284 16.1434V12.7148C22.284 12.2331 21.9086 11.8577 21.4269 11.8577H16.284V6.71484C16.284 6.23313 15.9086 5.8577 15.4269 5.8577H11.9983C11.5166 5.8577 11.1411 6.23313 11.1411 6.71484V11.8577H5.99829C5.51657 11.8577 5.14114 12.2331 5.14114 12.7148V16.1434C5.14114 16.6251 5.51657 17.0006 5.99829 17.0006H11.1411V22.1434C11.1411 22.6251 11.5166 23.0006 11.9983 23.0006H15.4269C15.9086 23.0006 16.284 22.6251 16.284 22.1434V17.0006H21.4269C21.9086 17.0006 22.284 16.6251 22.284 16.1434ZM37.7126 17.8577C37.7126 15.9566 36.1851 14.4291 34.284 14.4291C32.3829 14.4291 30.8554 15.9566 30.8554 17.8577C30.8554 19.7588 32.3829 21.2863 34.284 21.2863C36.1851 21.2863 37.7126 19.7588 37.7126 17.8577ZM44.5697 11.0006C44.5697 9.09941 43.0423 7.57199 41.1411 7.57199C39.24 7.57199 37.7126 9.09941 37.7126 11.0006C37.7126 12.9017 39.24 14.4291 41.1411 14.4291C43.0423 14.4291 44.5697 12.9017 44.5697 11.0006ZM51.4269 14.4291C51.4269 22.0097 45.2931 28.1434 37.7126 28.1434C34.378 28.1416 31.1587 26.9224 28.6594 24.7148H22.7674C20.2681 26.9224 17.0489 28.1416 13.7143 28.1434C6.13371 28.1434 0 22.0097 0 14.4291C0 6.84856 6.13371 0.714844 13.7143 0.714844H37.7143C45.2949 0.714844 51.4286 6.84856 51.4286 14.4291H51.4269Z" fill="#E1FF00"/>
                            </svg>
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
            categoryList:[],
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
    background-color: #433C39;
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
                padding: 1.53rem 0.97rem;
                background-color: #D9D8D7;
                border-radius: 0.625rem;
                box-shadow: 0px 4px 40px 0px #00000099;
                .game-img {
                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    .img {
                        width: 9.375rem;
                        height: 9.375rem;
                        border-radius: 0.625rem;
                        box-shadow: 0px 0px 40px 1px #000000 inset;
                        image {
                            width: 100%;
                            height: 100%;
                            border-radius: 0.625rem;
                            box-shadow: 0px 0px 40px 1px #000000 inset;
                        }
                    }

                    .game-name {
                        width: 100%;
                        margin-top: 1rem;
                        .name {
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: center;
                            color: #271A19;
                            margin-bottom: 0.53rem;
                        }

                        .rate {
                            width: 100%;
                            background-color: #B5B5B5;
                            font-family: Inter;
                            font-size: 1.25rem;
                            font-weight: 700;
                            text-align: left;
                            color: #F8AE06;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 0.25rem 0;
                            border-radius: 0.25rem;
                        }
                    }
                }

                .play-btn {
                    margin-top: 1.28rem;

                    .btn {
                        background: linear-gradient(180deg, #FFD801 0%, #FD941D 100%);
                        border-radius: 0.3125rem;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-family: Inter;
                        font-size: 1.56rem;
                        font-weight: 700;
                        text-align: left;
                        color: #433C39;
                        border: 9px solid #fff;
                        padding: 0.97rem 0;
                    }
                }

                .desc {
                    margin-top: 1.28rem;
                    background-color: #B5B5B5;
                    padding: 0.72rem 0.5rem;
                    border-radius: 0.25rem;
                    .title {
                        font-family: Inter;
                        font-size: 0.875rem;
                        font-weight: 700;
                        text-align: left;
                        color: #433C39;
                        margin-bottom: 1rem;
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
                        color: #E1FF00;
                        margin-bottom: 2rem;
                    }

                    .related-list {
                        display: grid;
                        gap: 1.25rem;
                        grid-template-columns: repeat(3, 1fr);

                        .game-item {
                            width: 100%;
                            // height: 6.56rem;
                            aspect-ratio: 210/210;
                            border: 8px solid #E1FF00;
                            image {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                }
        }
    }

}
</style>