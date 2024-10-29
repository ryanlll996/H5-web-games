<template>
    <view class="game-types">
        <view class="ad">

        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <svg width="1.625rem" height="0.91rem" viewBox="0 0 52 29" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.284 16.1434V12.7148C22.284 12.2331 21.9086 11.8577 21.4269 11.8577H16.284V6.71484C16.284 6.23313 15.9086 5.8577 15.4269 5.8577H11.9983C11.5166 5.8577 11.1411 6.23313 11.1411 6.71484V11.8577H5.99829C5.51657 11.8577 5.14114 12.2331 5.14114 12.7148V16.1434C5.14114 16.6251 5.51657 17.0006 5.99829 17.0006H11.1411V22.1434C11.1411 22.6251 11.5166 23.0006 11.9983 23.0006H15.4269C15.9086 23.0006 16.284 22.6251 16.284 22.1434V17.0006H21.4269C21.9086 17.0006 22.284 16.6251 22.284 16.1434ZM37.7126 17.8577C37.7126 15.9566 36.1851 14.4291 34.284 14.4291C32.3829 14.4291 30.8554 15.9566 30.8554 17.8577C30.8554 19.7588 32.3829 21.2863 34.284 21.2863C36.1851 21.2863 37.7126 19.7588 37.7126 17.8577ZM44.5697 11.0006C44.5697 9.09941 43.0423 7.57199 41.1411 7.57199C39.24 7.57199 37.7126 9.09941 37.7126 11.0006C37.7126 12.9017 39.24 14.4291 41.1411 14.4291C43.0423 14.4291 44.5697 12.9017 44.5697 11.0006ZM51.4269 14.4291C51.4269 22.0097 45.2931 28.1434 37.7126 28.1434C34.378 28.1416 31.1587 26.9224 28.6594 24.7148H22.7674C20.2681 26.9224 17.0489 28.1416 13.7143 28.1434C6.13371 28.1434 0 22.0097 0 14.4291C0 6.84856 6.13371 0.714844 13.7143 0.714844H37.7143C45.2949 0.714844 51.4286 6.84856 51.4286 14.4291H51.4269Z"
                        fill="#474747" />
                </svg>

                <view class="title">New Games</view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in newGames" :key="game.id" @click="toGame(game)">
                    <image :src="game.img"></image>
                    <view class="game-name">{{ game.name }}</view>
                </view>
            </view>
        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <svg width="1.625rem" height="0.91rem" viewBox="0 0 52 29" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M22.284 16.1434V12.7148C22.284 12.2331 21.9086 11.8577 21.4269 11.8577H16.284V6.71484C16.284 6.23313 15.9086 5.8577 15.4269 5.8577H11.9983C11.5166 5.8577 11.1411 6.23313 11.1411 6.71484V11.8577H5.99829C5.51657 11.8577 5.14114 12.2331 5.14114 12.7148V16.1434C5.14114 16.6251 5.51657 17.0006 5.99829 17.0006H11.1411V22.1434C11.1411 22.6251 11.5166 23.0006 11.9983 23.0006H15.4269C15.9086 23.0006 16.284 22.6251 16.284 22.1434V17.0006H21.4269C21.9086 17.0006 22.284 16.6251 22.284 16.1434ZM37.7126 17.8577C37.7126 15.9566 36.1851 14.4291 34.284 14.4291C32.3829 14.4291 30.8554 15.9566 30.8554 17.8577C30.8554 19.7588 32.3829 21.2863 34.284 21.2863C36.1851 21.2863 37.7126 19.7588 37.7126 17.8577ZM44.5697 11.0006C44.5697 9.09941 43.0423 7.57199 41.1411 7.57199C39.24 7.57199 37.7126 9.09941 37.7126 11.0006C37.7126 12.9017 39.24 14.4291 41.1411 14.4291C43.0423 14.4291 44.5697 12.9017 44.5697 11.0006ZM51.4269 14.4291C51.4269 22.0097 45.2931 28.1434 37.7126 28.1434C34.378 28.1416 31.1587 26.9224 28.6594 24.7148H22.7674C20.2681 26.9224 17.0489 28.1416 13.7143 28.1434C6.13371 28.1434 0 22.0097 0 14.4291C0 6.84856 6.13371 0.714844 13.7143 0.714844H37.7143C45.2949 0.714844 51.4286 6.84856 51.4286 14.4291H51.4269Z"
                        fill="#474747" />
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
            background-color: #E1FF00;
            padding: 0.625rem;
            margin-bottom: 1.25rem;
            .title {
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #342925;
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
                .game-name{
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