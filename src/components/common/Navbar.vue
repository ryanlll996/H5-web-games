<template>
    <view class="nav-bar">
        <view class="nav-bar__wrapper">
            <view class="nav-bar__left">
                <view class="nav-bar__left__menu">

                    <svg @click="$emit('openLeftMenu')" width="1.375rem" height="1.125rem" viewBox="0 0 44 36"
                        fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M40.4313 0.792969H3.63438C2.16719 0.792969 0.976562 1.99297 0.976562 3.47891V3.83984C0.976562 5.32109 2.16719 5.54609 3.63438 5.54609H40.4313C41.8984 5.54609 43.0891 5.32578 43.0891 3.83984V3.47891C43.0891 1.99297 41.8984 0.792969 40.4313 0.792969ZM35.5328 15.5539H3.63438C2.16719 15.5539 0.976562 16.7539 0.976562 18.2398V17.6211C0.976562 19.1023 2.16719 20.307 3.63438 20.307H35.5328C37 20.307 38.1906 19.107 38.1906 17.6211V18.2398C38.1906 16.7586 37 15.5539 35.5328 15.5539ZM30.6391 30.3195H3.63906C2.17188 30.3195 0.98125 31.5195 0.98125 33.0055V33.3664C0.98125 34.8477 2.17188 35.0727 3.63906 35.0727H30.6391C32.1063 35.0727 33.2969 34.8523 33.2969 33.3664V33.0008C33.2969 31.5195 32.1063 30.3195 30.6391 30.3195Z"
                            fill="#2565AF" />
                    </svg>
                </view>
                <view class="nav-bar__left__logo">


                </view>
            </view>
            <view class="nav-bar__wrapper__center">
                <view class="logo" @click="toHome">
                    <image mode="heightFix" src="./../../static/image/png/logo.png"></image>
                </view>
            </view>
            <view class="nav-bar__wrapper__right">
                <view class="logo" @click="showSearch">
                    <svg width="1.56rem" height="1.56rem" viewBox="0 0 50 50" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M49.8758 43.7277L41.4108 35.0825C46.9452 26.3959 45.9267 14.7354 38.3419 7.14966C29.5678 -1.6228 15.3495 -1.6228 6.57642 7.14966C-2.19214 15.9202 -2.19214 30.1433 6.57642 38.911C14.3849 46.7187 26.5056 47.57 35.2631 41.4779L43.6037 49.9989L49.8758 43.7277ZM10.863 34.6296C4.45688 28.2248 4.45688 17.8417 10.863 11.4355C17.267 5.03149 27.6535 5.03149 34.0546 11.4355C40.4613 17.8417 40.4613 28.2248 34.0546 34.6296C27.6525 41.0336 17.267 41.0336 10.863 34.6296Z"
                            fill="#2565AF" />
                    </svg>

                </view>
            </view>
        </view>
        <view class="search" v-if="isShow">
            <up-input class="search-input" placeholder="请输入内容" border="surround" v-model="searchValue"
                @change="onTextChange">
                <template #suffix>
                    <view class="search-btn" @click="onSearchClick">
                        <svg width="1.5625rem" height="1.72rem" viewBox="0 0 50 55" fill="none"
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
            searchValue: '',
            isShow: false
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
        onSearchClick() {
            if (this.searchValue) {
                uni.redirectTo({
                    url: `/pages/group/index?searchValue=${this.searchValue}&&search=0`
                })
            }
        },
        onTextChange(value) {
            this.searchValue = value
        },
        showSearch() {
            this.isShow = !this.isShow;
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
    background: #fff;
    width: 100%;
    .search{
        width: 100%;
        background-color: #EBF4FF;
        padding: 0.78rem 0.9375rem;
        .search-input{
            background-color: #fff;
            border: 2px solid #2565AF !important;
            padding: 0 !important;
            padding-left: 6px !important;
            height: 2.56rem;
            border-radius: 0.5rem;
            .search-btn{
                background-color: #2565AF;
                height: 2.56rem;
                border-radius: 0.5rem;
                padding: 0.5rem 1.03rem;
                box-sizing: border-box;
            }
        }
    }
    &__wrapper {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2.75rem;
        padding: 0 0.75rem;

        &__center {
            height: 100%;

            .logo {
                height: 100%;

                image {
                    height: 100%;
                }
            }
        }

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

                .home-icon {
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
                height: 2.66rem;
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