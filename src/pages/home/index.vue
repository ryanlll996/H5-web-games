<template>
    <view class="game-types">
        <!-- <view class="ad">

        </view> -->
       <view class="game-types-item" v-for="(item, index) in gameTypes" :key="index">
            <view class="game-types-item-top">
                <view class="title">{{ item.name }}</view>
                <view class="desc" @click="toCategory(item)">
                    <svg width="0.875rem" height="1.5rem" viewBox="0 0 28 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.2344 23.8923C27.2344 24.7486 26.9074 25.6049 26.2552 26.2577L5.7112 46.8011C4.40432 48.108 2.28592 48.108 0.97968 46.8011C-0.32656 45.4949 -0.32656 43.3765 0.97968 42.0696L19.1576 23.8923L0.980321 5.71501C-0.325919 4.40813 -0.325919 2.28973 0.980321 0.98349C2.28656 -0.323391 4.40496 -0.323391 5.71184 0.98349L26.2558 21.5268C26.908 22.1796 27.2344 23.036 27.2344 23.8923Z" fill="#DD8400"/>
                    </svg>
                </view>
            </view>
            <view class="game-types-item-bottom">
                <view class="game-item" v-for="(game) in item.data" :key="game.id" @click="toGame(game)">
                    <image :src="game.img"></image>
                </view>
            </view>
       </view>
    </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    props: {
        gameTypes: {
            type: Array,
            default: () => {
                return []
            }
        }
    },
    components: {  },
    data() {
        return {
            
        
        }
    },
    mounted() { },
    computed: {

        ...mapGetters(['isLogin', 'currentTheme'])
    },
    methods: {
        toGame(game){
            console.log(game)
            uni.redirectTo({
                url: `/pages/gameDetail/index?id=${game.id}`
            })
        },
        toCategory(item){
            uni.redirectTo({
                url: `/pages/group/index?id=${item.id}&&name=${item.name}&&isHot=1`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
::v-deep.u-divider__text {
    font-weight: 700;
}

.game-types {
    width: 100%;
    .ad{
        width: 100%;
        height: 16rem;
        background-color: antiquewhite;
    }
    .game-types-item{
        padding: 1.34rem 0.625rem;
        .game-types-item-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .title{
                font-family: Inter;
                font-size: 1.25rem;
                font-weight: 700;
                text-align: left;
                color: #DD8400;
                padding: 0.5rem 0;
            }
        }
        .game-types-item-bottom{
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 0.84rem;
            .game-item{
                width: calc(25% - 0.84rem);
                aspect-ratio: 1/1;
                border-radius: 0.25rem;
                image{
                    width: 100%;
                    height: 100%;
                    border-radius: 0.25rem;
                }
            }
        }
    }
}
</style>