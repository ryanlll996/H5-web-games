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
                    <svg v-if="!isOpen" @click="openMenu" width="1.72rem" height="1.72rem" viewBox="0 0 55 55"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M46.62 24.6875H8.37834C6.87867 24.6875 5.56641 25.9999 5.56641 27.4994C5.56641 28.999 6.87878 30.3114 8.37834 30.3114H46.62C48.1196 30.3114 49.4319 28.999 49.4319 27.4994C49.4319 25.9999 48.1195 24.6875 46.62 24.6875Z"
                            fill="#E1FF00" />
                        <path
                            d="M46.62 40.998H8.37834C6.87867 40.998 5.56641 42.3104 5.56641 43.81C5.56641 45.3095 6.87878 46.6219 8.37834 46.6219H46.62C48.1196 46.6219 49.4319 45.3095 49.4319 43.81C49.4319 42.3104 48.1195 40.998 46.62 40.998Z"
                            fill="#E1FF00" />
                        <path
                            d="M8.37834 14.0028H46.62C48.1197 14.0028 49.4319 12.6904 49.4319 11.1908C49.4319 9.69128 48.1195 8.37891 46.62 8.37891H8.37834C6.87867 8.37891 5.56641 9.69128 5.56641 11.1908C5.56641 12.6904 6.87878 14.0028 8.37834 14.0028Z"
                            fill="#E1FF00" />
                    </svg>
                    <svg v-else @click="openMenu" width="1.5rem" height="1.5rem" viewBox="0 0 48 48" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M29.8883 23.9925L47.0502 6.83064C47.3032 6.57821 47.5039 6.27837 47.6408 5.94827C47.7778 5.61818 47.8482 5.26432 47.8482 4.90694C47.8482 4.54957 47.7778 4.19571 47.6408 3.86561C47.5039 3.53552 47.3032 3.23567 47.0502 2.98325L45.1265 1.05956C44.8741 0.806581 44.5742 0.605876 44.2441 0.468935C43.914 0.331993 43.5602 0.261505 43.2028 0.261505C42.8454 0.261505 42.4916 0.331993 42.1615 0.468935C41.8314 0.605876 41.5315 0.806581 41.2791 1.05956L24.1173 18.2214L6.95173 1.05587C6.69931 0.802889 6.39946 0.602184 6.06937 0.465242C5.73927 0.328301 5.38541 0.257813 5.02804 0.257812C4.67066 0.257813 4.3168 0.328301 3.98671 0.465242C3.65661 0.602184 3.35677 0.802889 3.10434 1.05587L1.17696 2.98325C0.923982 3.23567 0.723278 3.53552 0.586336 3.86561C0.449395 4.19571 0.378906 4.54957 0.378906 4.90694C0.378906 5.26432 0.449395 5.61818 0.586336 5.94827C0.723278 6.27837 0.923982 6.57821 1.17696 6.83064L18.3388 23.9925L1.17696 41.1543C0.666716 41.6652 0.38012 42.3578 0.38012 43.0799C0.38012 43.8019 0.666716 44.4945 1.17696 45.0054L3.10065 46.9291C3.35308 47.1821 3.65292 47.3828 3.98301 47.5197C4.31311 47.6567 4.66697 47.7271 5.02434 47.7271C5.38172 47.7271 5.73558 47.6567 6.06568 47.5197C6.39577 47.3828 6.69561 47.1821 6.94804 46.9291L24.1099 29.7673L41.2717 46.9291C41.5242 47.1821 41.824 47.3828 42.1541 47.5197C42.4842 47.6567 42.8381 47.7271 43.1954 47.7271C43.5528 47.7271 43.9067 47.6567 44.2368 47.5197C44.5668 47.3828 44.8667 47.1821 45.1191 46.9291L47.0428 45.0054C47.553 44.4945 47.8396 43.8019 47.8396 43.0799C47.8396 42.3578 47.553 41.6652 47.0428 41.1543L29.8883 23.9925Z"
                            fill="#E1FF00" />
                    </svg>

                </view>
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
                                    fill="#433C39" />
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
        ...mapGetters(["isLogin", "userInfo", "channelInfo", "currentTheme", 'scoreInfo'])
    },
    methods: {
        refresh() {
            this.$emit("refresh");
        },
        openMenu() {
            this.isOpen = !this.isOpen
            this.$store.dispatch('setMenuOpen', this.isOpen)
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
    background: #342925;
    width: 100%;

    .search {
        padding: 0.72rem 1.1875rem;

        .search-input {
            border: none;
            background-color: #F9F9F9;
            border-right: 0.25rem;
            width: 100%;
            padding: 0 0 0 0.75rem !important;

            .search-icon {
                background-color: #E1FF00;
                height: 2.44rem;
                padding: 0.375rem 0.59rem;
            }
        }
    }

    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2.75rem;
        padding: 0 0.75rem;

        .nav-bar__left {
            display: flex;
            align-items: center;
            width: 50%;
            text-overflow: ellipsis;
            overflow: hidden;

            .logo {
                margin-left: 0.3125rem;
                height: 2.66rem;
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