<template lang="html">
    <footer class="footer-fixed">
        <router-link :to="{path: '/'}" class="home col-xs-3 text-center">首页</router-link>
        <router-link :to="{path: '/cart'}" class="cart col-xs-3 text-center">购物车<em>0</em></router-link>
        <span @click="addCart" class="btn btn-flat btn-block">加入购物车</span>
    </footer>
</template>

<script>
    export default {
        name: 'fixedFooter',
        data(){
            return {

            }
        },
        methods: {
            addCart: function(){
                
            }
        }
    }
</script>

<style lang="scss">
    .footer-fixed{
        width: 100%;
        position: fixed;
        bottom: 0px;
        z-index: 100;
        background-color: #ffffff;
        border-top: 1px solid #eee;
        .home {
            display: inline-block;
            width: 25%;
            text-align: center;
            background: url(../assets/images/home.png) center 5px no-repeat;
            background-size: 24px 24px;
            padding-top: 29px;
        }
        .cart {
            position: relative;
            display: inline-block;
            width: 25%;
            text-align: center;
            background: url(../assets/images/cart.png) center 5px no-repeat;
            background-size: 24px 24px;
            padding-top: 29px;
            em {
                position: absolute;
                top: 0;
                left: 52px;
                display: block;
                height: 18px;
                color: #fff;
                border-radius: 15px;
                background: #48d2a0;
                font-size: 12px;
                line-height: 18px;
                padding: 0 6px;
            }
        }
        .btn-flat {
            float: right;
            width: 38%;
            color: #fff;
            font-size: 16px;
            line-height: 46px;
            text-align: center;
            background: #48d2a0;
        }
    }
</style>
