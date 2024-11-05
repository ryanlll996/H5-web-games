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
                    <svg class="home-icon" @click="toHome" width="1.72rem" height="1.72rem" viewBox="0 0 55 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M31.0197 16.5358L29.8733 15.5314C29.8699 15.5281 29.8633 15.5248 29.8582 15.5214L27.4785 13.4434L24.5914 15.9981L6.82031 31.5521V41.0664V49.3918C6.82031 51.8564 8.83205 53.8551 11.3111 53.8551H21.1922V39.5252C21.1922 38.0474 22.3979 36.8486 23.8864 36.8486H31.0715C32.56 36.8486 33.7666 38.0474 33.7666 39.5252V53.8551H43.6476C46.1275 53.8551 48.1384 51.8564 48.1384 49.3919V41.033V31.517L31.0715 16.5809L31.0197 16.5358Z" fill="white"/>
                    <path d="M53.2094 22.4606L48.1412 18.0241V8.28677C48.1412 6.31479 46.5324 4.71596 44.5482 4.71596C42.564 4.71596 40.9553 6.3148 40.9553 8.28677V11.7349L29.876 2.03688C28.5176 0.849685 26.4833 0.849685 25.1266 2.03688L1.79247 22.4606C0.30306 23.763 0.159544 26.0197 1.47124 27.4991C2.78379 28.9786 5.05334 29.1223 6.54195 27.8181L27.5013 9.47397L48.4616 27.8181C49.1441 28.4159 49.9903 28.7097 50.8347 28.7097C51.831 28.7097 52.8222 28.3006 53.5314 27.4991C54.8431 26.0189 54.6996 23.763 53.2094 22.4606Z" fill="white"/>
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

            </view>
            <view class="nav-bar__wrapper__right">
               <view class="logo">
                   <image mode="heightFix" src="./../../static/image/png/logo.png"></image>
               </view>
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
    background: var(--primary-color);
    width: 100%;

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 3.25rem;
        padding: 0 0.75rem;

        .nav-bar__left {
            display: flex;
            align-items: center;
            width: 50%;
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

                .logo {
                    margin-right: 0.3125rem;
                    display: flex;
                    align-items: center;

                    image {
                        width: 1.625rem;
                        height: 1.625rem;
                    }
                }

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
            width: 30%;
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