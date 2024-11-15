<template>
    <view class="footer">
        <view class="footer-line">
            © 2024 GameCryp All rights reserved.

        </view>
        <view class="footer-line last">
        <text>Home</text> <text @click="toPolicy">Privacy Policy</text> <text>Terms of Service</text> 

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
.footer {
    height: 5.875rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
    .footer-line {
        font-family: Inter;
        font-size: 0.625rem;
        font-weight: 400;
        text-align: left;
        color: #212227;
        &.last{
            margin-top: 0.625rem;
            text{
                margin-right: 0.5rem;
            }
        }
    }
}   
</style>