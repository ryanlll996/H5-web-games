<template>
    <view class="game-types">
        <view class="ad">

        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                        fill="#D71E3C" />
                </svg>
                <view class="title">New Games</view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in newGames" :key="game.id" @click="toGame(game)">
                    <image :src="game.img" mode="widthFix"></image>
                    <view class="game-name">{{ game.name }}</view>
                </view>
            </view>
        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <svg width="1.25rem" height="1.25rem" viewBox="0 0 40 40" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.68407 0.351562C4.52996 0.351562 0.351562 4.52996 0.351562 9.68407C0.351562 14.8383 4.52996 19.0167 9.68407 19.0167H19.0167V9.68407C19.0167 4.52996 14.8383 0.351562 9.68407 0.351562ZM30.314 20.9813H20.9813V30.314C20.9813 35.4681 25.1597 39.6465 30.314 39.6465C35.4681 39.6465 39.6465 35.4681 39.6465 30.314C39.6465 25.1597 35.4681 20.9813 30.314 20.9813ZM0.351562 30.314C0.351562 35.4683 4.52996 39.6465 9.68407 39.6465C14.8383 39.6465 19.0167 35.4683 19.0167 30.314V20.9813H9.68407C4.52996 20.9813 0.351562 25.1597 0.351562 30.314ZM39.6465 9.68407C39.6465 4.52996 35.4683 0.351562 30.314 0.351562C25.1598 0.351562 20.9813 4.52996 20.9813 9.68407V19.0167H30.314C35.4683 19.0167 39.6465 14.8383 39.6465 9.68407Z"
                        fill="#D71E3C" />
                </svg>

                <view class="title">Trending Games</view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in hotGames" :key="game.id" @click="toGame(game)">
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
                url: `/pages/gameDetail/index?id=${game.gid}`
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

    .game-types-item {
        padding: 1.34rem 0.625rem;

        .game-types-item-top {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0.625rem;
            margin-bottom: 1.25rem;

            .title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #D71E3C;
                margin-left: 0.44rem;
            }
        }

        .game-types-item-bottom {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 1.25rem;

            .game-item {
                width: calc(50% - 1.25rem);

                image {
                    width: 100%;
                    border: 8px solid #E1FF00
                }

                .game-name {
                    font-family: Inter;
                    font-size: 0.875rem;
                    font-weight: 700;
                    text-align: center;
                    color: #E1FF00;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    margin-top: 1rem;
                }
            }
        }
    }
}
</style>