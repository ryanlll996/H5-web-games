<template>
    <view class="game-types">
        <!-- <view class="ad">

        </view> -->
        <view class="game-types-item">
            <view class="game-types-item-top">
                <view class="title">New Games</view>
                <view class="desc" @click="onNewGamesClick">
                    Show more
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in newGames" :key="game.id" @click="toGame(game)">
                    <image :src="game.img"></image>
                </view>
            </view>
        </view>
        <view class="game-types-item">
            <view class="game-types-item-top">
                <view class="title">Hot Games</view>
                <view class="desc" @click="onHotGamesClick">
                    Show more
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in hotGames" :key="game.id" @click="toGame(game)">
                    <image :src="game.img"></image>
                </view>
            </view>
        </view>
        <view class="game-types-item" v-for="(item, index) in gameTypes" :key="index">
            <view class="game-types-item-top">
                <view class="title">{{ item.name }}</view>
                <view class="desc" @click="toCategory(item)">
                    Show more
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in item.data" :key="game.id" @click="toGame(game)">
                    <image :src="game.img"></image>
                </view>
            </view>
        </view>
        <view class="tags">
            <view class="tag-title">Tags</view>
            <view class="list">
                <view class="tag" v-for="(item, index) in cates" :key="index" @click="toCategory(item)">
                    {{ item.name }}
                </view>
            </view>

        </view>
        <Policy/>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
import Policy from '../../components/common/policy/index.vue'

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
    components: {
        Policy
    },
    data() {
        return {


        }
    },
    mounted() { },
    computed: {
        ...mapGetters(['isLogin', 'currentTheme', 'cates'])
    },
    methods: {
        onNewGamesClick() {
            uni.redirectTo({
                url: `/pages/group/index?isNew=0&&name=New Games`
            })
        },
        onHotGamesClick() {
            uni.redirectTo({
                url: `/pages/group/index?isHot=0&&name=Hot Games`
            })
        },
        toGame(game) {
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.id}`
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

            .title {
                font-family: Inter;
                font-size: 0.9375rem;
                font-weight: 700;
                text-align: left;
                color: #3F3B45;
                padding: 0.5rem 0;
            }

            .desc {
                font-family: Inter;
                font-size: 0.9375rem;
                font-weight: 700;
                text-align: left;
                color: #0076e3;
                padding: 0.5rem 0;
                margin-left: 0.5rem;
            }
        }

        .game-types-item-bottom {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.84rem;

            .game-item {
                width: calc(25% - 0.84rem);
                aspect-ratio: 1/1;
                border-radius: 0.5rem;

                image {
                    width: 100%;
                    height: 100%;
                    border-radius: 0.5rem;
                }
            }
        }
    }

    .tags {
        padding: 1.34rem 0.625rem;

        .tag-title {
            font-family: Inter;
            font-size: 0.8125rem;
            font-weight: 700;
            text-align: left;
            color: #3F3B45;
            margin-bottom: 0.84rem;
        }

        .list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.59rem;

            .tag {
                background-color: #E5F1FC;
                border-radius: 0.25rem;
                font-family: Inter;
                font-size: 0.8125rem;
                font-weight: 400;
                color: #1C85E6;
                width: calc(25% - 0.59rem);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0.375rem;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }
        }

    }
}
</style>