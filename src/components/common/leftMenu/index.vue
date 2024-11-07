<template>
    <up-popup :show="isLeftMenu" mode="left" :safeAreaInsetTop="true" :closeOnClickOverlay="true">
        <view class="menus">
            <view class="search">
                <up-input class="search-input" placeholder="请输入内容" border="surround" v-model="searchValue" @change="onTextChange">
                    <template #suffix>
                        <svg @click="onSearchClick" width="1.5625rem" height="1.72rem" viewBox="0 0 50 55" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_37_79)">
                                <path
                                    d="M49.8758 48.017L41.4108 38.6072C46.9452 29.1525 45.9267 16.4607 38.3419 8.20416C29.5678 -1.3441 15.3495 -1.3441 6.57642 8.20416C-2.19214 17.7503 -2.19214 33.2312 6.57642 42.7744C14.3849 51.2725 26.5056 52.1991 35.2631 45.5683L43.6037 54.8428L49.8758 48.017ZM10.863 38.1143C4.45688 31.1431 4.45688 19.8417 10.863 12.8691C17.267 5.89868 27.6535 5.89868 34.0546 12.8691C40.4613 19.8417 40.4613 31.1431 34.0546 38.1143C27.6525 45.0847 17.267 45.0847 10.863 38.1143Z"
                                    fill="#B25300" />
                            </g>
                            <defs>
                                <clipPath id="clip0_37_79">
                                    <rect width="50" height="54.4218" fill="white" transform="translate(0 0.421875)" />
                                </clipPath>
                            </defs>
                        </svg>

                    </template>
                </up-input>
            </view>

           
            <view class="menus-item">
                <svg width="0.28rem" height="0.84rem" viewBox="0 0 9 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="9" height="27" fill="#FF9E0D" />
                </svg>
                Categories
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
            searchValue: ''
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
        },
        onTextChange(value) {
            this.searchValue = value
        },
        onSearchClick() {
            if (this.searchValue) {
                uni.redirectTo({
                    url: `/pages/group/index?searchValue=${this.searchValue}&&search=0`
                })
            }
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
    padding: 0.9375rem;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #FFFFFF;

    .search {
        .search-input {
            border: none;
            background-color: #FFEDDE;
            border-right: 0.25rem;
            width: 10.59rem;
            height: 2.44rem;
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

        .game-types-item {
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 700;
            text-align: center;
            color: #FF9E0D;
            margin-top: 0.8125rem;
            padding: 0.53rem 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #FFEDDE;
            border-radius: 0.25rem;
        }
    }
}
</style>