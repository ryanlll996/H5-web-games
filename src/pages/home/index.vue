<template>
    <view class="game-types">
        <view class="ad">

        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <view class="left">
                    <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                            fill="#D71E3C" />
                    </svg>

                    <view class="title">Hot Games</view>
                </view>

                <view @click="toHotList()">
                    <svg width="1.16rem" height="0.3125rem" viewBox="0 0 37 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.48679 0.501953C3.00025 0.501953 0.988281 2.51608 0.988281 5.00047C0.988281 7.48471 3.00025 9.49898 5.48679 9.49898C7.96887 9.49898 9.9853 7.48471 9.9853 5.00047C9.98526 2.51613 7.96887 0.501953 5.48679 0.501953ZM18.9823 0.501953C16.4958 0.501953 14.4838 2.51608 14.4838 5.00047C14.4838 7.48471 16.4958 9.49898 18.9823 9.49898C21.4644 9.49898 23.4808 7.48471 23.4808 5.00047C23.4808 2.51613 21.4644 0.501953 18.9823 0.501953ZM32.4778 0.501953C29.9913 0.501953 27.9793 2.51608 27.9793 5.00047C27.9793 7.48471 29.9913 9.49898 32.4778 9.49898C34.9598 9.49898 36.9763 7.48471 36.9763 5.00047C36.9763 2.51613 34.9598 0.501953 32.4778 0.501953Z"
                            fill="#D71E3C" />
                    </svg>
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in hotGames" :key="game.id" @click="toGame(game)">
                    <image :src="game.img" mode="widthFix"></image>
                    <view class="game-name">{{ game.name }}</view>
                </view>
            </view>
        </view>
        <view class="game-types-item" v-for="(item, index) in gameCateList" :key="index">
            <view class="game-types-item-top">
                <view class="left">
                    <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                            fill="#D71E3C" />
                    </svg>

                    <view class="title">{{item.name}}</view>
                </view>

                <view @click="toCategory(item)">
                    <svg width="1.16rem" height="0.3125rem" viewBox="0 0 37 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.48679 0.501953C3.00025 0.501953 0.988281 2.51608 0.988281 5.00047C0.988281 7.48471 3.00025 9.49898 5.48679 9.49898C7.96887 9.49898 9.9853 7.48471 9.9853 5.00047C9.98526 2.51613 7.96887 0.501953 5.48679 0.501953ZM18.9823 0.501953C16.4958 0.501953 14.4838 2.51608 14.4838 5.00047C14.4838 7.48471 16.4958 9.49898 18.9823 9.49898C21.4644 9.49898 23.4808 7.48471 23.4808 5.00047C23.4808 2.51613 21.4644 0.501953 18.9823 0.501953ZM32.4778 0.501953C29.9913 0.501953 27.9793 2.51608 27.9793 5.00047C27.9793 7.48471 29.9913 9.49898 32.4778 9.49898C34.9598 9.49898 36.9763 7.48471 36.9763 5.00047C36.9763 2.51613 34.9598 0.501953 32.4778 0.501953Z"
                            fill="#D71E3C" />
                    </svg>
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in item.data" :key="game.id" @click="toGame(game)">
                    <image :src="game.img" mode="widthFix"></image>
                    <view class="game-name">{{ game.name }}</view>
                </view>
            </view>
        </view>
        <view class="ad">

        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <view class="left">
                    <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                            fill="#D71E3C" />
                    </svg>
                    <view class="title">New Games</view>
                </view>
                <view @click="toNewList()">
                    <svg width="1.16rem" height="0.3125rem" viewBox="0 0 37 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.48679 0.501953C3.00025 0.501953 0.988281 2.51608 0.988281 5.00047C0.988281 7.48471 3.00025 9.49898 5.48679 9.49898C7.96887 9.49898 9.9853 7.48471 9.9853 5.00047C9.98526 2.51613 7.96887 0.501953 5.48679 0.501953ZM18.9823 0.501953C16.4958 0.501953 14.4838 2.51608 14.4838 5.00047C14.4838 7.48471 16.4958 9.49898 18.9823 9.49898C21.4644 9.49898 23.4808 7.48471 23.4808 5.00047C23.4808 2.51613 21.4644 0.501953 18.9823 0.501953ZM32.4778 0.501953C29.9913 0.501953 27.9793 2.51608 27.9793 5.00047C27.9793 7.48471 29.9913 9.49898 32.4778 9.49898C34.9598 9.49898 36.9763 7.48471 36.9763 5.00047C36.9763 2.51613 34.9598 0.501953 32.4778 0.501953Z"
                            fill="#D71E3C" />
                    </svg>

                </view>

            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in newGames" :key="game.id" @click="toHotGame(game)">
                    <image :src="game.img" mode="widthFix"></image>
                    <view class="game-name">{{ game.name }}</view>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        newGames: {
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
        gameCateList: {
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
        toHotGame(game){
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.gid}`
            })
        },
        toCategory(item) {
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        },
        toHotList() {
            uni.redirectTo({
                url: `/pages/group/index?isHot=0&&name=Hot Games`
            })
        },
        toNewList() {
            uni.redirectTo({
                url: `/pages/group/index?isNew=0&&name=New Games`
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

    .game-types-item {
        padding: 0 0.625rem 1.34rem 0.625rem;

        .game-types-item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.625rem;
            margin-bottom: 1.25rem;

            .left {
                display: flex;
                align-items: center;
                justify-content: flex-start;

                .title {
                    font-family: Inter;
                    font-size: 1.25rem;
                    font-weight: 700;
                    text-align: left;
                    color: #D71E3C;
                    margin-left: 0.44rem;
                }
            }

        }

        .game-types-item-bottom {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            gap: 0.72rem;

            .game-item {
                width: calc(33.3% - 0.72rem);
                border: 4px solid #D71E3C;
                background-color: #FFFEFE;
                border-radius: 0.25rem;
                box-shadow: 0px 4px 4px 2px #D71E3C4D;

                image {
                    width: 100%;
                }

                .game-name {
                    font-family: Inter;
                    font-size: 0.8125rem;
                    font-weight: 400;
                    text-align: center;
                    color: #D71E3C;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    padding: 0.4375rem 0.22rem;
                }
            }
        }
    }
}
</style>