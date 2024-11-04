<template>
    <up-popup :show="isLeftMenu" mode="left" :safeAreaInsetTop="true" :closeOnClickOverlay="true">
        <view class="menus">
            
            <view class="menus-title">
                Menu
                <view class="line"></view>
            </view>
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
    bottom: 0;

}

::v-deep .u-popup__content {
    // height: calc(100% - 2.75rem);

}

.menus {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;
    padding: 0 0.72rem;

    .menus-title {
        padding: 0.72rem 0;
        font-family: Inter;
        font-size: 0.9375rem;
        font-weight: 700;
        text-align: left;
        color: #2565AF;

        .line {
            width: 100%;
            height: 1px;
            background-color: #2565AF;
            margin-top: 0.41rem;
        }
    }

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
        width: 10.125rem;

        .game-types-item {
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 700;
            text-align: center;
            color: #2565AF;
            margin-top: 0.8125rem;
            padding: 0.53rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #DCECFF;
            border-radius: 0.25rem;
        }
    }
}
</style>