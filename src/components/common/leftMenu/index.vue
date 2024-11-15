<template>
    <up-popup :show="isLeftMenu" mode="top" :safeAreaInsetTop="true" :closeOnClickOverlay="true">
        <view class="menus">
            <view class="game-types">
                <view class="game-types-item" @click="onHotGamesClick">
                    Hot Games
                </view>
            </view>

            <view class="game-types">
                <view class="game-types-item" v-if="gameTypes.length > 0" v-for="(item, index) in gameTypes"
                    :key="index" @click="onGamesClick(item)">
                    {{ item.name }}
                </view>
            </view>
        </view>
    </up-popup>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    name: 'leftMenu',
    props: {
        isLeftMenu: {
            type: Boolean,
            default: false
        },
        gameTypes: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    data() {
        return {
            title: 'Hello',
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'currentTab', 'currentTheme', 'channelInfo', 'config'])
    },
    methods: {
        close() {
            this.$emit('close')
        },
        onHotGamesClick() {
            // this.$emit('onHotGamesClick')
            uni.redirectTo({
                url: `/pages/group/index?isHot=0&&name=热门游戏`
            })
        },

        onGamesClick(item) {
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.u-popup {
    flex: 0;
}

::v-deep .u-transition {
    height: calc(100% - 4.25rem);
    margin-top: 4.25rem;
}

::v-deep .u-popup__content {
    // height: calc(100% - 4.25rem);
    // bottom: 0;
    width: 100%;
    position: absolute;
}

.menus {
    box-sizing: border-box;
    width: 100%;
    // height: 100%;
    background-color: #FFFFFF;
    padding: 0.72rem;

    .menus-item {
        margin-top: 0.8125rem;
        font-family: Inter;
        font-size: 0.9375rem;
        font-weight: 700;
        text-align: left;
        color: #FF9E0D;
    }

    .game-types {
        margin-top: 0.8125rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;        
        .game-types-item {
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 700;
            color: #212227;
            margin-top: 0.8125rem;
            padding: 0.5625rem 0.75rem;
            background-color: #EBEBEB;
            border-radius: 0.25rem;
            border: 1px solid #212227;
        }
    }
}
</style>