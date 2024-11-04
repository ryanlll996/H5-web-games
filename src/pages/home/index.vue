<template>
    <view class="game-types">
        <view class="ad">

        </view>
        <view class="hot-games">
            <view class="title">
                <view class="title-text">Hot Games</view>
                <view class="desc" @click="toHotGames">
                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M43.3859 15.8398C42.3266 13.3414 40.8172 11.0961 38.8859 9.16953C36.9594 7.24297 34.7141 5.72891 32.2156 4.66953C29.6281 3.57266 26.8812 3.01953 24.0453 3.01953C21.2094 3.01953 18.4625 3.57266 15.875 4.66953C13.3766 5.72891 11.1312 7.23828 9.20469 9.16953C7.27812 11.0961 5.76406 13.3414 4.70469 15.8398C3.60781 18.4273 3.05469 21.1789 3.05469 24.0102C3.05469 26.8414 3.60781 29.593 4.70469 32.1805C5.76406 34.6789 7.27344 36.9242 9.20469 38.8508C11.1312 40.7773 13.3766 42.2914 15.875 43.3508C18.4625 44.4477 21.2141 45.0008 24.0453 45.0008C26.8766 45.0008 29.6281 44.4477 32.2156 43.3508C33.8984 42.6383 35.4641 41.7195 36.8937 40.6086L36.8891 40.6039C37.3156 40.257 37.5828 39.732 37.5828 39.1414C37.5828 38.0961 36.7391 37.2523 35.6937 37.2523C35.2625 37.2523 34.8641 37.3977 34.5453 37.6414L34.5359 37.6273C31.6297 39.8727 27.9875 41.2086 24.0406 41.2086C14.5578 41.2086 6.84219 33.493 6.84219 24.0102C6.84219 14.5273 14.5625 6.81172 24.0453 6.81172C33.5281 6.81172 41.2438 14.5273 41.2438 24.0102C41.2438 27.1133 40.4188 30.0242 38.975 32.5414L38.9938 32.5508C38.7875 32.8555 38.6656 33.2164 38.6656 33.6102C38.6656 34.6555 39.5094 35.4992 40.5547 35.4992C41.3047 35.4992 41.9516 35.0633 42.2562 34.4305L42.2656 34.4352C42.6828 33.7086 43.0531 32.9586 43.3812 32.1805C44.4781 29.593 45.0312 26.8414 45.0312 24.0102C45.0359 21.1789 44.4828 18.4273 43.3859 15.8398Z"
                            fill="#2565AF" />
                        <path
                            d="M19.6844 33.1125C20.425 33.8063 21.6344 33.8063 22.3703 33.1125L30.6813 25.2891C31.4219 24.5953 31.4219 23.4563 30.6813 22.7578L22.3703 14.9344C21.6297 14.2406 20.4203 14.2406 19.6844 14.9344C18.9438 15.6281 18.9438 16.7672 19.6844 17.4656L26.65 24.0234L19.6844 30.5813C18.9438 31.275 18.9438 32.4141 19.6844 33.1125Z"
                            fill="#2565AF" />
                    </svg>
                </view>
            </view>
            <view class="hot-list">
                <view class="hot-item" v-for="(item, index) in hotGames" :key="index" @click="toGame(item)">
                    <view class="img">
                        <image mode="widthFix" :src="item.img" />
                    </view>
                    <view class="name">{{ item.name }}</view>
                </view>
            </view>
        </view>
        <view class="game-types-item" v-for="(item, index) in gameTypes" :key="index">
            <view class="game-types-item-top">
                <view class="title">{{ item.name }}</view>
                <view class="desc" @click="toCategory(item)">

                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M43.3859 15.8398C42.3266 13.3414 40.8172 11.0961 38.8859 9.16953C36.9594 7.24297 34.7141 5.72891 32.2156 4.66953C29.6281 3.57266 26.8812 3.01953 24.0453 3.01953C21.2094 3.01953 18.4625 3.57266 15.875 4.66953C13.3766 5.72891 11.1312 7.23828 9.20469 9.16953C7.27812 11.0961 5.76406 13.3414 4.70469 15.8398C3.60781 18.4273 3.05469 21.1789 3.05469 24.0102C3.05469 26.8414 3.60781 29.593 4.70469 32.1805C5.76406 34.6789 7.27344 36.9242 9.20469 38.8508C11.1312 40.7773 13.3766 42.2914 15.875 43.3508C18.4625 44.4477 21.2141 45.0008 24.0453 45.0008C26.8766 45.0008 29.6281 44.4477 32.2156 43.3508C33.8984 42.6383 35.4641 41.7195 36.8937 40.6086L36.8891 40.6039C37.3156 40.257 37.5828 39.732 37.5828 39.1414C37.5828 38.0961 36.7391 37.2523 35.6937 37.2523C35.2625 37.2523 34.8641 37.3977 34.5453 37.6414L34.5359 37.6273C31.6297 39.8727 27.9875 41.2086 24.0406 41.2086C14.5578 41.2086 6.84219 33.493 6.84219 24.0102C6.84219 14.5273 14.5625 6.81172 24.0453 6.81172C33.5281 6.81172 41.2438 14.5273 41.2438 24.0102C41.2438 27.1133 40.4188 30.0242 38.975 32.5414L38.9938 32.5508C38.7875 32.8555 38.6656 33.2164 38.6656 33.6102C38.6656 34.6555 39.5094 35.4992 40.5547 35.4992C41.3047 35.4992 41.9516 35.0633 42.2562 34.4305L42.2656 34.4352C42.6828 33.7086 43.0531 32.9586 43.3812 32.1805C44.4781 29.593 45.0312 26.8414 45.0312 24.0102C45.0359 21.1789 44.4828 18.4273 43.3859 15.8398Z"
                            fill="#2565AF" />
                        <path
                            d="M19.6844 33.1125C20.425 33.8063 21.6344 33.8063 22.3703 33.1125L30.6813 25.2891C31.4219 24.5953 31.4219 23.4563 30.6813 22.7578L22.3703 14.9344C21.6297 14.2406 20.4203 14.2406 19.6844 14.9344C18.9438 15.6281 18.9438 16.7672 19.6844 17.4656L26.65 24.0234L19.6844 30.5813C18.9438 31.275 18.9438 32.4141 19.6844 33.1125Z"
                            fill="#2565AF" />
                    </svg>

                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in item.data" :key="game.id" @click="toGame(game)">
                    <view class="img">
                        <image mode="heightFix" :src="game.img"></image>
                        <view class="info">
                            <view class="name">{{ game.name }}</view>
                            <view class="num">
                                {{ game.play_num }}
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="play-btn">
                            play
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="ad">

</view>
<view class="game-types-item">
            <view class="game-types-item-top">
                <view class="title">New Games</view>
                <view class="desc" @click="toNewGames">

                    <svg width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M43.3859 15.8398C42.3266 13.3414 40.8172 11.0961 38.8859 9.16953C36.9594 7.24297 34.7141 5.72891 32.2156 4.66953C29.6281 3.57266 26.8812 3.01953 24.0453 3.01953C21.2094 3.01953 18.4625 3.57266 15.875 4.66953C13.3766 5.72891 11.1312 7.23828 9.20469 9.16953C7.27812 11.0961 5.76406 13.3414 4.70469 15.8398C3.60781 18.4273 3.05469 21.1789 3.05469 24.0102C3.05469 26.8414 3.60781 29.593 4.70469 32.1805C5.76406 34.6789 7.27344 36.9242 9.20469 38.8508C11.1312 40.7773 13.3766 42.2914 15.875 43.3508C18.4625 44.4477 21.2141 45.0008 24.0453 45.0008C26.8766 45.0008 29.6281 44.4477 32.2156 43.3508C33.8984 42.6383 35.4641 41.7195 36.8937 40.6086L36.8891 40.6039C37.3156 40.257 37.5828 39.732 37.5828 39.1414C37.5828 38.0961 36.7391 37.2523 35.6937 37.2523C35.2625 37.2523 34.8641 37.3977 34.5453 37.6414L34.5359 37.6273C31.6297 39.8727 27.9875 41.2086 24.0406 41.2086C14.5578 41.2086 6.84219 33.493 6.84219 24.0102C6.84219 14.5273 14.5625 6.81172 24.0453 6.81172C33.5281 6.81172 41.2438 14.5273 41.2438 24.0102C41.2438 27.1133 40.4188 30.0242 38.975 32.5414L38.9938 32.5508C38.7875 32.8555 38.6656 33.2164 38.6656 33.6102C38.6656 34.6555 39.5094 35.4992 40.5547 35.4992C41.3047 35.4992 41.9516 35.0633 42.2562 34.4305L42.2656 34.4352C42.6828 33.7086 43.0531 32.9586 43.3812 32.1805C44.4781 29.593 45.0312 26.8414 45.0312 24.0102C45.0359 21.1789 44.4828 18.4273 43.3859 15.8398Z"
                            fill="#2565AF" />
                        <path
                            d="M19.6844 33.1125C20.425 33.8063 21.6344 33.8063 22.3703 33.1125L30.6813 25.2891C31.4219 24.5953 31.4219 23.4563 30.6813 22.7578L22.3703 14.9344C21.6297 14.2406 20.4203 14.2406 19.6844 14.9344C18.9438 15.6281 18.9438 16.7672 19.6844 17.4656L26.65 24.0234L19.6844 30.5813C18.9438 31.275 18.9438 32.4141 19.6844 33.1125Z"
                            fill="#2565AF" />
                    </svg>

                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in newGames" :key="game.id" @click="toGame(game)">
                    <view class="img">
                        <image mode="heightFix" :src="game.img"></image>
                        <view class="info">
                            <view class="name">{{ game.name }}</view>
                            <view class="num">
                                {{ game.play_num }}
                            </view>
                        </view>
                    </view>
                    <view class="right">
                        <view class="play-btn">
                            play
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

    .ad {
        width: 100%;
        height: 16rem;
        background-color: antiquewhite;
    }

    .hot-games {
        padding: 1.34rem 0.625rem;

        .title {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .title-text {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #2565AF;
                padding: 0.5rem 0;
            }
        }

        .hot-list {
            display: flex;
            align-items: center;
            gap: 0.78rem;

            .hot-item {
                width: calc(25% - 0.78rem);
                aspect-ratio: 1 / 1;

                .img {
                    width: 100%;
                    border-radius: 0.5rem;

                    image {
                        width: 100%;
                        border-radius: 0.5rem;
                    }
                }

                .name {
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
                color: #DD8400;
                padding: 0.5rem 0;
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
                        .name {
                            font-family: Inter;
                            font-size: 0.8125rem;
                            font-weight: 700;
                            text-align: left;
                            color: #2565AF;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            white-space: nowrap;
                        }

                        .num {
                            font-family: Inter;
                            font-size: 0.8125rem;
                            font-weight: 400;
                            text-align: left;
                            color: #2565AF;
                            margin-top: 0.8125rem;
                        }
                    }
                }
                .right{
                    width: 30%;
                    .play-btn{

                        background: linear-gradient(84.29deg, #2565AF 5.63%, #6AB0FF 97.82%);
                        border-radius: 3.125rem;
                        font-family: Inter;
                        font-size: 0.9375rem;
                        font-weight: 700;
                        line-height: 1.125rem;
                        padding: 0.3125rem 1.69rem;
                        text-align: center;
                        color: #FFFFFF;
                    }
                }
            }
        }
    }
}
</style>