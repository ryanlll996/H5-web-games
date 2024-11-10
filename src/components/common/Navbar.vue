<template>
    <view class="nav-bar">
        <view class="nav-bar__wrapper">
            <view class="nav-bar__left">
                <view class="nav-bar__left__menu" >
                    <svg @click="$emit('openLeftMenu')" width="1.72rem" height="1.72rem" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M46.62 24.6875H8.37834C6.87867 24.6875 5.56641 25.9999 5.56641 27.4994C5.56641 28.999 6.87878 30.3114 8.37834 30.3114H46.62C48.1196 30.3114 49.4319 28.999 49.4319 27.4994C49.4319 25.9999 48.1195 24.6875 46.62 24.6875Z" fill="white"/>
                        <path d="M46.62 40.998H8.37834C6.87867 40.998 5.56641 42.3104 5.56641 43.81C5.56641 45.3095 6.87878 46.6219 8.37834 46.6219H46.62C48.1196 46.6219 49.4319 45.3095 49.4319 43.81C49.4319 42.3104 48.1195 40.998 46.62 40.998Z" fill="white"/>
                        <path d="M8.37834 14.0028H46.62C48.1196 14.0028 49.4319 12.6904 49.4319 11.1908C49.4319 9.69128 48.1195 8.37891 46.62 8.37891H8.37834C6.87867 8.37891 5.56641 9.69128 5.56641 11.1908C5.56641 12.6904 6.87878 14.0028 8.37834 14.0028Z" fill="white"/>
                    </svg>
                </view>
                <view class="nav-bar__left__logo">
                    <!-- <view class="logo">
                        <image :src="channelInfo.logo"></image>
                    </view>
                    <view class="text">
                        {{ channelInfo.name }}
                    </view> -->
                </view>
            </view>
            <view class="nav-bar__wrapper__center">
                <view class="logo"  @click="toHome">
                   <image mode="heightFix" src="./../../static/image/png/logo.png"></image>
               </view>
            </view>
            <view class="nav-bar__wrapper__right">
              
            </view>
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
            isOpen: false
        };
    },
    computed: {
        ...mapGetters(["isLogin", "userInfo", "channelInfo", "currentTheme", 'scoreInfo'])
    },
    methods: {
        refresh() {
            this.$emit("refresh");
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
    background: #6C7FA1;
    width: 100%;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3.25rem;
        padding: 0 0.75rem;
        &__center {
            flex: 1;
            .logo {
                    margin-right: 0.3125rem;
                    display: flex;
                    align-items: center;

                    image {
                        width: 1.625rem;
                        height: 1.625rem;
                    }
                }

        }
        .nav-bar__left {
            display: flex;
            align-items: center;
            flex: 1;
            text-overflow: ellipsis;
            overflow: hidden;

            .nav-bar__left__menu {
                display: flex;
                align-items: center;
                margin-right: 0.3125rem;
                .home-icon{
                    margin-left: 0.875rem;
                }

                image {
                    width: 1.5rem;
                    height: 1.53rem;
                }
            }

            .nav-bar__left__logo {
                display: flex;
                align-items: center;

              
                .text {
                    color: var(--logo-text-color);
                    font-size: 0.875rem;
                    font-weight: bold;
                }
            }
        }

        .nav-bar__wrapper__right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            position: relative;
            flex: 1;
            .logo {
                margin-left: 0.3125rem;
                height: 1.84rem;
                display: flex;
                align-items: center;
                image {
                    height: 100%;
                }
            }
        }
    }
}
</style>