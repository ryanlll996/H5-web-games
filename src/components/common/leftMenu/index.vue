<template>
    <up-popup :show="menuOpen" mode="top" :safeAreaInsetTop="true" :closeOnClickOverlay="true">
        <view class="menus">
            <view class="menus-title">
                <view class="title">Games</view>
                <view class="line"></view>
            </view>
            <view class="game-types">
                <view class="game-types-item" v-if="gameTypes.length > 0" v-for="(item, index) in cates"
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
            searchValue: ''
        }
    },
    computed: {
        ...mapGetters(['isLogin', 'currentTab', 'currentTheme', 'channelInfo', 'config', 'menuOpen', 'cates'])
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
            this.$store.dispatch('setMenuOpen', false);
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        },
        onTextChange(value) {
            this.searchValue = value
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
    height: calc(100% - 2.75rem);
    top: 2.75rem !important;
}

::v-deep .u-popup__content {
    // height: calc(100% - 2.75rem);
}

.menus {
    padding: 0.9375rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #342925;

    // .search {
    //     .search-input {
    //         border: none;
    //         background-color: #FFEDDE;
    //         border-right: 0.25rem;
    //         width: 10.59rem;
    //         height: 2.44rem;
    //     }
    // }
    .menus-title {
        display: flex;
        align-items: center;

        .title {
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 700;
            text-align: left;
            color: #E1FF00;
            margin-right: 0.5rem;
        }
        .line {
            background-color: #E1FF00;
            height: 2px;
            width: 75%;
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
        display: flex;
        flex-wrap: wrap;
        gap: 0.91rem;
        .game-types-item {
            width: calc(50% - 0.91rem);
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 400;
            text-align: center;
            color: #342925;
            padding: 0.53rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #AFB586;
        }
    }
}
</style>