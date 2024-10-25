<template>
    <view class="footer">
        <view class="footer-line">
            Privacy Policy | Terms of Service
        </view>
        <view class="footer-line last">
            © 2024 GameCryp All rights reserved.
        </view>
    </view>
</template>
<style lang="scss" scoped>
.footer {
    height: 5.875rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #B25300;
    .footer-line {
        font-family: Inter;
        font-size: 0.625rem;
        font-weight: 400;
        text-align: left;
        color: #fff;
        &.last{
            margin-top: 0.625rem;
        }
    }
}   
</style>