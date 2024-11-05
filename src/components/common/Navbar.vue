<template>
    <view class="nav-bar">
        <view class="nav-bar__wrapper">
            <view class="nav-bar__left">
                <view class="logo" @click="toHome">
                    <image mode="heightFix" src="./../../static/image/png/logo.png"></image>
                </view>
            </view>
            <view class="nav-bar__wrapper__center">

            </view>
            <view class="nav-bar__wrapper__right">
                <view class="nav-bar__left__menu">
                    <svg @click="openMenu" width="1.72rem" height="1.72rem" viewBox="0 0 55 55"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M46.62 24.6875H8.37834C6.87867 24.6875 5.56641 25.9999 5.56641 27.4994C5.56641 28.999 6.87878 30.3114 8.37834 30.3114H46.62C48.1196 30.3114 49.4319 28.999 49.4319 27.4994C49.4319 25.9999 48.1195 24.6875 46.62 24.6875Z"
                            fill="#E8BFA7" />
                        <path
                            d="M46.62 40.998H8.37834C6.87867 40.998 5.56641 42.3104 5.56641 43.81C5.56641 45.3095 6.87878 46.6219 8.37834 46.6219H46.62C48.1196 46.6219 49.4319 45.3095 49.4319 43.81C49.4319 42.3104 48.1195 40.998 46.62 40.998Z"
                            fill="#E8BFA7" />
                        <path
                            d="M8.37834 14.0028H46.62C48.1197 14.0028 49.4319 12.6904 49.4319 11.1908C49.4319 9.69128 48.1195 8.37891 46.62 8.37891H8.37834C6.87867 8.37891 5.56641 9.69128 5.56641 11.1908C5.56641 12.6904 6.87878 14.0028 8.37834 14.0028Z"
                            fill="#E8BFA7" />
                    </svg>
                    

                </view>
            </view>
        </view>
        <view class="menus" v-if="isOpen">
            <view class="menu-item" @click="onGamesClick(item)" v-for="(item, index) in cates" :key="index">
                {{ item.name }}
            </view>
        </view>
        <view class="search">
            <up-input class="search-input" placeholder="Search Games" border="surround" v-model="searchValue"
                @change="onTextChange">
                <template #suffix>
                    <view class="search-icon">
                        <svg @click="onSearchClick" width="1.5625rem" height="1.72rem" viewBox="0 0 50 55" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_37_79)">
                                <path
                                    d="M49.8758 48.017L41.4108 38.6072C46.9452 29.1525 45.9267 16.4607 38.3419 8.20416C29.5678 -1.3441 15.3495 -1.3441 6.57642 8.20416C-2.19214 17.7503 -2.19214 33.2312 6.57642 42.7744C14.3849 51.2725 26.5056 52.1991 35.2631 45.5683L43.6037 54.8428L49.8758 48.017ZM10.863 38.1143C4.45688 31.1431 4.45688 19.8417 10.863 12.8691C17.267 5.89868 27.6535 5.89868 34.0546 12.8691C40.4613 19.8417 40.4613 31.1431 34.0546 38.1143C27.6525 45.0847 17.267 45.0847 10.863 38.1143Z"
                                    fill="#ffffff" />
                            </g>
                            <defs>
                                <clipPath id="clip0_37_79">
                                    <rect width="50" height="54.4218" fill="white" transform="translate(0 0.421875)" />
                                </clipPath>
                            </defs>
                        </svg>
                    </view>
                </template>
            </up-input>
        </view>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        isRefreshing: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            isOpen: false,
            searchValue: ''
        };
    },
    computed: {
        ...mapGetters(["isLogin", "userInfo", "channelInfo", "currentTheme", 'scoreInfo', 'cates']),
    },
    methods: {
        refresh() {
            this.$emit("refresh");
        },
        openMenu() {
            this.isOpen = !this.isOpen
            // this.$emit('openLeftMenu')
        },
        toCharge() {
            this.isOpen = false;
            this.$emit('toBalance')
        },
        toMyScore() {
            this.$store.dispatch("setTab", 4);
            uni.navigateTo({
                url: '/pages/index/index'
            })
        },
        toHome() {
            uni.redirectTo({
                url: '/pages/index/index'
            })
        },
        onSearchClick() {
            if (this.searchValue) {
                uni.redirectTo({
                    url: `/pages/group/index?searchValue=${this.searchValue}&&search=0`
                })
            }
        },
        onGamesClick(item) {
            this.isOpen = false
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        }
    }

};
</script>

<style lang="scss" scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.nav-bar {
    background: #18253F;
    width: 100%;

    .search {
        padding: 0.72rem 1.1875rem;

        .search-input {
            border: none;
            background-color: #F9F9F9;
            border-right: 0.25rem;
            width: 100%;
            padding: 0 0 0 0.75rem !important;
            border-radius: 0.5rem;

            .search-icon {
                background-color: #957766;
                height: 2.56rem;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
            }
        }
    }

    .menus {
        display: flex;
        flex-wrap: wrap;
        padding: 1.25rem 1.47rem;
        justify-content: space-between;
        gap: 1rem;

        .menu-item {
            width: calc(50% - 1rem);
            border: 2px solid #E8BFA7;
            border-radius: 0.5rem;
            padding: 1.1875rem 0;
            font-family: Microsoft YaHei UI;
            font-size: 0.9375rem;
            font-weight: 400;
            line-height: 1rem;
            text-align: center;
            color: #E8BFA7;
        }
    }

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3.125rem;
        padding: 0 0.75rem;

        .nav-bar__left {
            display: flex;
            align-items: center;
            width: 50%;
            text-overflow: ellipsis;
            overflow: hidden;

            .logo {
                margin-left: 0.3125rem;
                height: 1.94rem;
                display: flex;
                align-items: center;

                image {
                    height: 100%;
                }
            }
        }

        .nav-bar__wrapper__right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            width: 30%;

            .nav-bar__left__menu {
                display: flex;
                align-items: center;
                margin-right: 0.3125rem;

                .home-icon {
                    margin-left: 0.875rem;
                }

                image {
                    width: 1.5rem;
                    height: 1.53rem;
                }
            }
        }
    }
}
</style>