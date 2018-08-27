<template lang="html">
    <footer class="footer-fixed">
        <router-link :to="{path: '/'}" class="home col-xs-3 text-center">首页</router-link>
        <router-link :to="{path: '/cart'}" class="cart col-xs-3 text-center">购物车<em>{{allQuantitySum}}</em></router-link>
        <span @click="addCart(skuId, quantity, stock, memberId)" class="btn btn-flat btn-block">加入购物车</span>
    </footer>
</template>

<script>
    export default {
        name: 'fixedFooter',
        props: ["skuId", "quantity", "stock"],
        data(){
            return {
                memberId: 8,
                allQuantitySum: 0,
                cartitemId: null,
                exitQuantity: 0,
                //skuId: 0,
                //quantity: 1, //这两条数据不需要再重新声明了，因为在addCart里已经作为prop传递过来
            }
        },
        created: function(){
            this.cartQuantitySum(); //购物车数量
        },
        methods: {
            // 购物车数量
            cartQuantitySum: function(){
                let vm = this;
                vm.axios({
                    type: "GET",
                    url: "http://127.0.0.1:8080/sumQuantity",
                    params: {
                        id: vm.memberId,
                    }
                }).then(function(res){
                    vm.allQuantitySum = res.data;
                }).catch(function(err){
                    console.log(err);
                })
            },
            // 判断是否已加入购物车
            judgeIsAddCart: function(memberId, skuId){
                const vm = this;
                return vm.axios({
                    url: 'http://127.0.0.1:8080/judgeIsAddCart',
                    type: 'get',
                    params: {
                        member_id: memberId,
                        sku_id: skuId,
                    },
                }).then(function(res){
                    if(res.data.length == 0){
                        return false;
                    }else{
                        vm.cartitemId = res.data[0].cartitemId;
                        vm.exitQuantity = res.data[0].quantity;
                        return true;
                    }

                }).catch(function(err){
                    console.log(err);
                    return ;
                })
            },
            // 加入购物车
            addCart: async function(skuId, quantity, stock, memberId){
                const vm = this;

                if(skuId == null){
                    alert("请选择正确的规格");
                    return false;
                }

                if(quantity > stock || stock == 0){
                   alert("库存不足");
                    return false; 
                }
                
                let isAddCart = await vm.judgeIsAddCart(vm.memberId, skuId);
                console.log(isAddCart);
                if(isAddCart == true){
                    vm.axios({
                        url: 'http://127.0.0.1:8080/changeInitQuantity',
                        type: 'get',
                        params:{
                            cartitemId: vm.cartitemId,
                            quantity: (vm.exitQuantity+quantity),
                        },
                    }).then(function(res){
                        if(res.statusText == "OK"){
                            alert("成功加入购物车~");
                            vm.cartQuantitySum();
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }else if(isAddCart == false){
                    vm.axios({
                        url: 'http://127.0.0.1:8080/addCart',
                        type: 'get',
                        params:{
                            member_id: vm.memberId,
                            sku_id: skuId,
                            quantity: quantity,
                        },
                    }).then(function(res){
                        if(res.statusText == "OK"){
                            alert("成功加入购物车~");
                            vm.cartQuantitySum();
                        }
                    }).catch(function(err){
                        console.log(err);
                    })
                }
            },
            
        }
    }
</script>

<style lang="scss">
    .footer-fixed{
        width: 100%;
        font-size: initial;
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
