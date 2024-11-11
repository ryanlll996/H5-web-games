<template>
    <view class="policy">
        <view class="policy-box">
            <view class="policy-title">
                Play Free Online Games Anytime, Anywhere
            </view>
            <view class="policy-content">
                Are you looking for a website with a great selection of free online games? Our website offers a huge
                selection of free online games for you to play anytime, anywhere! With our extensive collection of
                games,
                you can find the perfect game to suit your interests.
            </view>
            <view class="policy-title">
                Online Games at Game blivion
            </view>
            <view class="policy-content">
                Free games are our specialty, and we have a great variety to choose from. Our website is updated
                regularly
                with the latest and greatest free online games, so you'll never run out of options. Our games are easy
                to
                access and play without the need for any downloads or installations.
            </view>
            <view class="policy-title">
                Explore by Genre
            </view>
            <view class="show-more" @click="toPolicy">
                Show More
            </view>
        </view>

    </view>
</template>

<script>
export default {
    methods: {
        toPolicy() {
            uni.navigateTo({
                url: '/pages/protocol/index'
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.policy {
    padding: 1.3125rem 1.156rem;

    .policy-box {
        border: 1px solid #767070;
        border-radius: 0.25rem;
        padding: 1.3125rem;

        .policy-title {
            font-family: Inter;
            font-size: 0.9375rem;
            font-weight: 700;
            text-align: left;
            color: #3F3B45;
            margin-bottom: 0.5rem;
        }

        .policy-content {
            font-family: Inter;
            font-size: 0.75rem;
            font-weight: 400;
            text-align: left;
            color: #3F3B45;
            margin-bottom: 0.5rem;
        }

        .show-more {
            font-family: Inter;
            font-size: 0.75rem;
            font-weight: 400;
            text-align: left;
            color: #0376e3;
            margin-bottom: 0.5rem;
        }
    }
}
</style>