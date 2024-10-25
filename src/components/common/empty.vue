<template>
    <view class="empty">
        <view>
            <image mode="widthFix" src="../../static/image/png/empty.png"></image>
        </view>
        <view class="empty-text">Sem dados</view>
    </view>
</template>

<script>
export default {
    name: "Empty"
}
</script>

<style lang="scss" scoped>
.empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    image {
        width: 9.56rem;
        height: 6.25rem;
    }

    .empty-text {
        font-family: Microsoft YaHei UI;
        font-size: 1.25rem;
        font-weight: 400;
        line-height: 1rem;
        text-align: center;

        color: #fff;
        margin-top: 0.625rem;
    }
}
</style>