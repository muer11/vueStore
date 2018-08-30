<template>
    <div class="checkout">
        <div class="page-body">
            <div id="currentReceiver" class="current-receiver">
                <div class="media-body">
                    <h4 class="media-heading">
                        {{receiverInfo.consignee}}
                        <span class="pull-right">{{receiverInfo.phone}}</span>
                    </h4>
                    <span class="small">{{receiverInfo.areaName}}{{receiverInfo.address}}</span>
                </div>
                <router-link class="media-right" :to="{path: '/checkout/receiver/list'}">
                    <span class="glyphicon">></span>
                </router-link>
            </div>
            
            <div class="list-group list-group-flat">
                <h2>订单信息</h2>
                <div class="order-item list-group-item" v-for="(skuinfo, i) in skuInfo">
                        <div class="media-body media-middle">
                            <h4 class="media-heading">
                                <a href="/product/detail/1379">{{skuinfo.name}}</a>
                            </h4>
                            <span class="price">价格： <em>￥{{skuinfo.price}}</em></span>
                            <span class="silver">{{skuinfo.specificationValues}}</span>
                        </div>
                        <div class="media-right media-middle">
                            <span class="small gray-darker">×{{skuinfo.quantity}}</span>
                        </div>
                </div>
            </div>
            <div class="row div-memo">
                <label for="memo">给商家留言</label>
                <input type="text" name="memo" id="memo" class="memo" placeholder="如您有其他需求请给我们留言" maxlength="200" autocomplete="off">
            </div>
            <p class="contact">如果您需要开发票，请直接拨打我们的客服电话（400-889-1997）</p>	
        </div>
        <div class="footer-fixed">
            <div class="col-xs-8">
                <div>
                    赠送积分: <em id="effectiveRewardPoint" class="green">{{effectiveRewardPoint}}</em>
                </div>
                <div>
                    总计:
                    <strong class="red" data-name="amount" data-type="currency">￥{{amount}}</strong>
                </div>
            </div>
            <div class="col-xs-4">
                <a id="submit" class="btn" @click="payment">订单结算</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'checkout',
    data (){
        return {
            // memberId: 8,
            receiverInfo: [],
            skuInfo: [],
            cartItems: [],
            effectiveRewardPoint: 0,
            amount: 0
        }
    },
    created: function(){
        this.findDefaultReceiver();
    },
    mounted: function(){
        this.cartItems = this.$route.query.cartItem;
        this.selectSku();
    },
    methods: {
        payment: function(){
            const vm = this;
            vm.axios({
                url: "/addOrder",
                type: "GET",
                params: {
                    cartItems: vm.cartItems,
                    receiver_id: 4,
                    memo: '222',
                }
            }).then(function(res){
                const ordersId = res.data;
                vm.$router.push({path: '/payment', query: {"ordersId": ordersId}});
            }).catch(function(err){
                console.log(err);
            })
        },
        findDefaultReceiver: function(){
            const vm = this;
            vm.axios({
                url: "/selectReceiver",
                type: "GET",
                params: {
                    member_id: vm.$store.state.id,
                }
            }).then(function(res){
                const data = res.data;
                data.forEach(function(value,index){
                    if(value.isDefault.data[0]){
                        vm.receiverInfo = value;
                        return ;
                    }
                });
            }).catch(function(err){
                console.log(err);
            })
        },
        selectSku: function(){
            const vm = this;
            vm.axios({
                url: "/selectSkus",
                type: "GET",
                params: {
                    //member_id: vm.memberId,
                    cartitemId: vm.cartItems
                }
            }).then(function(res){
                const data = res.data;
                vm.skuInfo = data;
                for(let m = 0; m < res.data.length; m++){
                    let specs = eval('('+vm.skuInfo[m].specificationValues+')');
                    let txt = '[';
                    for(let n = 0; n < specs.length; n++){
                        if( n == (specs.length - 1)){
                            txt += specs[n].value + ']';
                        }else{
                            txt += specs[n].value + ' , ';
                        }
                    }
                    vm.effectiveRewardPoint += vm.skuInfo[m].rewardPoint * vm.skuInfo[m].quantity;
                    vm.amount += vm.skuInfo[m].price * vm.skuInfo[m].quantity;
                    vm.skuInfo[m].specificationValues = txt;
                }
            }).catch(function(err){
                console.log(err);
            })
        },
    }
}
</script>

<style lang="scss">
    .checkout{
        font-size: initial;
        overflow: hidden;
        .page-body{
            .current-receiver{
                overflow: hidden;
                color: #666;
                font-size: 0.13rem;
                line-height: 0.26rem;
                padding: 10px 12px 10px 16px;
                margin-bottom: 10px;
                background: #f0fef9;
                box-shadow: 0 1px 3px #ccc;
                .media-body{
                    width: 90%;
                    float: left;
                }
                .media-right{
                    float: left;
                    width: 10%;
                    .glyphicon{
                        display: block;
                        width: 100%;
                        height: 0.5rem;
                        line-height: 0.5rem;
                        text-align: center;
                    }
                }
                
            }
            .list-group{
                padding: 0 0 20px 0;
                background-color: #ffffff;
                overflow: hidden;
                h2{
                    font-size: 16px;
                    color: #333;
                    line-height: 35px;
                    padding-left: 10px;
                    margin-bottom: 10px;
                    border-bottom: 1px solid #eee;
                }
                .order-item{
                    border-radius: 0px;
                    border: 1px solid #48d2a0;
                    width: 90%;
                    overflow: hidden;
                    margin: 3% auto 0;
                    padding: 10px;
                    .media-body{
                        float: left;
                        color: #666;
                        width: 84%;
                        a{
                            font-size: 0.14rem;
                        }
                        .price{
                            display: block;
                            color: #999;
                            font-size: 0.11rem;
                            em{
                                font-size: 0.14rem;
                                color: #f56767;
                            }
                        }
                        .silver{
                            color: #999;
                            font-size: 0.11rem;
                        }
                    }
                    .media-right{
                        float: left;
                        width: 10%;
                        margin-top: 20px;
                    }
                }
            }
            .div-memo{
                background: white;
                padding: 0.05rem 0.1rem;
                border-top: 1px solid #f1f1f1;
                width: 100%;
                display: table;
                label{
                    font-size: 0.15rem;
                    color: #666;
                    font-weight: normal;
                    margin-bottom: 0;
                    width: 0.8rem;
                    display: table-cell;
                }
                input{
                    display: inline-block;
                    border: none;
                    background-color: #ffffff;
                    width: 100% !important;
                    outline: none;
                    padding: 0.05rem 0.1rem;
                    height: 0.3rem !important;
                    line-height: 0.3rem;
                    word-break: keep-all;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
            .contact{
                background: #fff;
                border: 1px solid #f1f1f1;
                border-left: none;
                border-right: none;
                padding: 0.04rem 0.1rem;
                color: #666;
                font-size: 0.12rem;
            }
        }
        .footer-fixed{
            width: 100%;
            height: 0.5rem;
            color: #999;
            position: fixed;
            bottom: 0;
            z-index: 100;
            background-color: #ffffff;
            border-top: 1px solid #eee;
            .col-xs-8{
                float: left;
                width: 68%;
                text-align: right;
                padding: 0.03rem 2% 0.03rem 0; 
            }
            .col-xs-4{
                float: left;
                width: 30%;
                height: 100%;
                .btn{
                    display: block;
                    width: 100%;
                    height: 100%;
                    background: #48d2a0;
                    color: #fff;
                    font-size: 0.16rem;
                    line-height: 0.5rem;
                    text-align: center;
                    border-radius: 0;
                    border: none;
                }
            }
        }
    }
</style>
