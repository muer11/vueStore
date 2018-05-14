<template lang="html">
    <div class="memberIndexprofile center index">
        <div class="header">
            <div class="headshot">
                <img src="../../assets/images/jiuyishop.png">
            </div>
            <div class="info">
                <p class="text-center">普通会员</p>
                <p class="text-center">muer</p>
            </div>
        </div>
        <main>
            <ul>
                <li>
                    <a href="/member/order/list">
                        <img src="../../assets/images/myOrder.png" alt="我的订单">
                        <span class="lis">我的订单</span>
                        <span class="pull-right">全部订单<i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
                <li>
                    <a href="/member/order/list?status=pendingPayment&amp;hasExpired=false">
                    <img src="../../assets/images/waitPay.png" alt="待付款">
                    <span class="lis">待付款</span>
                    <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
                <li class="li_waitShipping">
                    <a href="/member/order/list?status=pendingShipment&amp;hasExpired=false">
                    <img src="../../assets/images/waitShipping.png" alt="待发货">
                    <span class="lis">待发货</span>
                    <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="/member/point_log/list">
                    <img src="../../assets/images/myPoints.png" alt="我的积分">
                    <span class="lis">我的积分</span>
                    <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href="/member/receiver/list">
                    <img src="../../assets/images/address.png" alt="地址管理">
                    <span class="lis">地址管理</span>
                    <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
            </ul>
            <ul>
                <li class="li_aboutUs">
                    <a href="/contact/company">
                    <img src="../../assets/images/aboutUs.png" alt="关于我们">
                    <span>关于我们</span>
                    <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </a>
                </li>
            </ul>
        </main>
        <div class="footer text-center">
            <a href="/member/logout">退出登录</a>
        </div>
    </div> 
</template>

<script>
export default {
  name : 'memberIndex',
  data(){
      return {

      }
  },
  methods: {

  }
}
</script>

<style lang="scss">
    .memberIndexprofile{
        background: #f1f1f1;
        .header{
            text-align: center;
            height: 3.3rem;
            background: url("../../assets/images/center_bg.png");
            position: relative;
            color: white;
            padding: 0.3rem auto 0.2rem;
            .headshot img{
                width: 1.4rem;
                height: 1.4rem;
                background: #eee;
                border-radius: 50%;
                margin-top: 0.36rem;
            }
            .text-center{
                margin: 0 auto;
                text-align: center;
                font-size: 0.3rem;
            }
        }
        main{
            margin: 0;
            ul{
                margin: 0;
                margin-bottom: 0.1rem;
                background: white;
                padding-left: 0;
                li{
                    height: 1.05rem;
                    border-bottom: 1px solid #f1f1f1;
                    line-height: 1.05rem;
                    padding: 0 0.3rem 0 0.3rem;
                    position: relative;
                    list-style: none;
                    font-size: 0.3rem;
                    a{
                        display: block;
                        color: inherit;
                        text-decoration: none;
                        font-size: 0.3rem;
                        img{
                            width: 0.45rem;
                            margin-right: 0.25rem;
                            vertical-align: middle;
                        }
                        .lis{
                            vertical-align: middle;
                        }
                        .pull-right{
                            position: absolute;
                            right: 0.3rem;
                            color: #999;
                            i{
                                margin-left: 0.25rem;
                            }
                            i:before {
                                content: "\e940";
                            }
                        }
                    }
                }
            }
        }
        .footer{
            text-align: center;
            a{
                display: inline-block;
                width: 3rem;
                height: 0.6rem;
                line-height: 0.6rem;
                font-size: 0.3rem;
                color: #999;
                border-radius: 0.3rem;
                border: 1px solid #999;
                margin-top: 0.6rem;
                margin-bottom: 2rem;
                text-decoration: none;
            }
        }
    }
</style>
