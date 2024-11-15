<template>
    <view class="game-types">
        <view class="search">
            <up-input class="search-input" placeholder="Search games" border="surround" v-model="searchValue"
                @change="onTextChange">
                <template #suffix>
                    <view class="search-btn" @click="onSearchClick">
                        <svg width="1.47rem" height="1.47rem" viewBox="0 0 47 47" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.3563 8.73717C15.5135 9.09717 14.7553 9.51223 14.0226 9.99787C13.3055 10.4962 12.6151 11.0638 12.008 11.6878C11.3586 12.3245 10.8066 13.0162 10.3238 13.7376C9.82687 14.4576 9.39911 15.2609 9.06734 16.0642C8.80475 16.6741 9.09558 17.3391 9.68852 17.5875C10.2688 17.8374 10.9577 17.5593 11.2076 16.9776C11.4843 16.3127 11.8429 15.6478 12.2565 15.0379C12.6702 14.4294 13.1262 13.8478 13.6372 13.3494C14.161 12.8228 14.7271 12.3513 15.3356 11.9362C15.9568 11.5212 16.592 11.1739 17.2542 10.8831C17.8626 10.6332 18.1379 9.96823 17.8895 9.35976C17.6396 8.77811 16.9492 8.48729 16.3563 8.73717ZM46.3817 43.4228L37.9746 35.0143C39.3412 33.3654 40.4452 31.5513 41.2739 29.5565C42.3229 27.0351 42.8749 24.292 42.8749 21.4106C42.8749 18.5842 42.3229 15.8694 41.3008 13.3903L41.2725 13.2929C40.2222 10.7306 38.6777 8.43081 36.7718 6.47693L36.6631 6.38234C34.7304 4.42846 32.384 2.85011 29.7878 1.77011C27.2904 0.729639 24.5417 0.162109 21.6843 0.162109C15.8452 0.162109 10.544 2.54517 6.70546 6.38235C4.76005 8.33482 3.17322 10.6896 2.11017 13.2943C1.07393 15.8016 0.507812 18.5306 0.507812 21.412C0.507812 24.2652 1.07393 26.9814 2.06781 29.4463L2.10875 29.5579C3.17181 32.1343 4.75864 34.4892 6.70546 36.4416C8.6664 38.4082 11.0128 39.988 13.5808 41.0553H13.609C16.0937 42.1085 18.8269 42.676 21.6843 42.676C24.5685 42.676 27.289 42.1085 29.7878 41.0553C31.7756 40.252 33.6123 39.1155 35.2273 37.7588L43.6485 46.2096C44.3939 46.9579 45.6363 46.9579 46.3817 46.1814C47.1412 45.4176 47.1271 44.1852 46.3817 43.4228ZM33.9299 33.6845V33.6986L33.9017 33.7268C32.3149 35.3066 30.4231 36.5941 28.3111 37.4525C26.281 38.3108 24.0462 38.7823 21.6843 38.7823C19.3365 38.7823 17.1003 38.3108 15.0716 37.4525C12.9455 36.5941 11.0537 35.291 9.46687 33.6986L9.45275 33.6845H9.46687C7.86452 32.092 6.56711 30.1663 5.68334 28.0459L5.65511 27.9485C4.84334 25.9551 4.38734 23.7386 4.38734 21.412C4.38734 19.0572 4.84334 16.8125 5.68475 14.7767C6.56852 12.6845 7.86593 10.7461 9.46828 9.13811C12.5883 6.00682 16.9224 4.05434 21.6857 4.05434C24.0462 4.05434 26.2824 4.52587 28.3125 5.37011C30.4245 6.22846 32.3304 7.53152 33.9299 9.13811L34.0415 9.2214C35.5732 10.8139 36.8297 12.6845 37.6866 14.7767L37.7417 14.8741C38.5295 16.8689 39.0109 19.0995 39.0109 21.412C39.0109 23.7809 38.528 26.0242 37.6866 28.0473C36.8297 30.1663 35.5323 32.092 33.9299 33.6845ZM34.2335 20.2473C33.5982 20.2473 33.0744 20.7739 33.0744 21.4106C33.0744 22.907 32.7977 24.4021 32.2189 25.7885L32.1906 25.8435C31.6245 27.1452 30.8382 28.4059 29.7328 29.4732C28.6556 30.5814 27.3864 31.4129 26.048 31.9663C24.6673 32.548 23.1906 32.8247 21.6857 32.8247C21.0377 32.8247 20.5393 33.3513 20.5393 34.0021C20.5393 34.6529 21.0363 35.1795 21.6857 35.1795C23.4942 35.1795 25.2617 34.8195 26.9459 34.1263C28.5751 33.4614 30.0928 32.4633 31.3916 31.1334C32.689 29.8318 33.6688 28.3353 34.3464 26.7287V26.6863C35.0636 24.9965 35.4236 23.1823 35.4236 21.4092C35.4208 20.7739 34.8829 20.2473 34.2335 20.2473Z"
                                fill="#FFFFFF" />
                        </svg>
                    </view>
                </template>
            </up-input>
        </view>
        <view class="ad">

        </view>
        <view class="hot-games">
            <view class="hot-list">
                <view class="hot-item" v-for="(item, index) in hotGames" :key="index" @click="toHotGame(item)">
                    <view class="img">
                        <image mode="aspectFill" :src="item.img" />
                    </view>
                    <view class="name">
                        <view class="text">
                            {{ item.name }}
                        </view>
                        <view class="rate">
                            <svg width="0.9375rem" height="0.91rem" viewBox="0 0 30 29" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.6605 0.40868L19.8932 9.04464L29.3712 10.4317C29.9712 10.5197 30.2134 11.2573 29.7785 11.6811L22.9149 18.4126L24.5331 27.9127C24.6377 28.5127 24.0047 28.9695 23.4653 28.6833L14.9945 24.203L6.52366 28.6833C5.98426 28.9695 5.35679 28.5127 5.45587 27.9127L7.07408 18.4126L0.221454 11.6756C-0.213371 11.2518 0.0288099 10.5142 0.628758 10.4262L10.1068 9.03913L14.345 0.40868C14.6147 -0.136227 15.3963 -0.136227 15.6605 0.40868Z"
                                    fill="#FE5757" />
                            </svg>
                            {{ item.rate }}
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        gameTypes: {
            type: Array,
            default: () => {
                return []
            }
        },
        hotGames: {
            type: Array,
            default: () => {
                return []
            }
        },
        newGames: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {},
    data() {
        return {
            searchValue: '',
        }
    },
    mounted() { },
    computed: {

        ...mapGetters(['isLogin', 'currentTheme'])
    },
    methods: {
        toGame(game) {
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.id}`
            })
        },
        toHotGame(game) {
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.gid}`
            })
        },
        toHotGames() {
            uni.redirectTo({
                url: `/pages/group/index?isHot=0`
            })
        },
        toNewGames() {
            uni.redirectTo({
                url: `/pages/group/index?isNew=0`
            })
        },
        toCategory(item) {
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        },
        onSearchClick() {
            if (this.searchValue) {
                uni.redirectTo({
                    url: `/pages/group/index?searchValue=${this.searchValue}&&search=0`
                })
            }
        },
        onTextChange(value) {
            this.searchValue = value
        },
        showSearch() {
            this.isShow = !this.isShow;
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep.u-divider__text {
    font-weight: 700;
}

.game-types {
    width: 100%;
    background-color: #FFFFFF;

    .search {
        width: 100%;
        background-color: #FFFFFF;
        padding: 0.78rem 0.9375rem;
        margin-top: 0.5rem;

        .search-input {
            background-color: #fff;
            border: 2px solid #FE5757 !important;
            padding: 0 !important;
            padding-left: 6px !important;
            height: 2.91rem;
            border-radius: 0.5rem;

            .search-btn {
                background-color: #FE5757;
                height: 2.91rem;
                border-radius: 0.5rem;
                padding: 0.6875rem 1.03rem;
                box-sizing: border-box;
            }
        }
    }

    .ad {
        width: 100%;
        height: 16rem;
        background-color: antiquewhite;
    }

    .hot-games {
        padding: 1.34rem 0.625rem;

        .hot-list {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.84rem;

            .hot-item {
                width: 100%;
                background-color: #FFFFFF;
                border: 2px solid #FE5757;
                border-radius: 0.25rem;

                .img {
                    width: 100%;
                    height: 9.34rem;
                    border-radius: 0.25rem;

                    image {
                        width: 100%;
                        height: 100%;
                        border-radius: 0.25rem;
                    }
                }

                .name {
                    font-family: Inter;
                    font-size: 0.9375rem;
                    font-weight: 400;
                    text-align: center;
                    color: #FE5757;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.53rem;
                }
            }
        }
    }

    .game-types-item {
        padding: 1.34rem 0.625rem;

        .game-types-item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #212227;
                padding: 0.5rem 0;
                display: flex;
                align-items: center;

                svg {
                    margin-right: 0.72rem;
                }
            }
        }

        .game-types-item-bottom {
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
</style>