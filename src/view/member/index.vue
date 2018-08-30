<template lang="html">
    <div class="memberIndexprofile center index">
        <div class="header">
            <div class="headshot">
                <img src="../../assets/images/jiuyishop.png">
            </div>
            <div class="info">
                <p class="text-center">普通会员</p>
                <p class="text-center">{{currentUser}}</p>
            </div>
        </div>
        <main>
            <ul>
                <li>
                    <router-link to="/order">
                        <img src="../../assets/images/myOrder.png" alt="我的订单">
                        <span class="lis">我的订单</span>
                        <span class="pull-right">全部订单<i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{path: '/pendingPayment'}">
                        <img src="../../assets/images/waitPay.png" alt="待付款">
                        <span class="lis">待付款</span>
                        <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
                <li class="li_waitShipping">
                    <router-link :to="{path: '/pendingShipment'}">
                        <img src="../../assets/images/waitShipping.png" alt="待发货">
                        <span class="lis">待发货</span>
                        <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li>
                    <router-link :to="{path: '/member/profile'}">
                        <img src="../../assets/images/myPoints.png" alt="我的积分">
                        <span class="lis">我的积分</span>
                        <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li>
                    <router-link :to="{path: '/member/receiver/list'}">
                        <img src="../../assets/images/address.png" alt="地址管理">
                        <span class="lis">地址管理</span>
                        <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
            </ul>
            <ul>
                <li class="li_aboutUs">
                    <router-link :to="{path: '/member/contact'}">
                        <img src="../../assets/images/aboutUs.png" alt="关于我们">
                        <span>关于我们</span>
                        <span class="pull-right"><i class="iconfont icon-xiangyou"></i></span>
                    </router-link>
                </li>
            </ul>
        </main>
        <div class="memberFooter text-center">
            <span class="logout" @click="logout()">退出登录</span>
        </div>
    </div> 
</template>

<script>
export default {
  name : 'memberIndex',
  data(){
      return {
          currentUser: '',
      }
  },
  mounted: function(){
      this.currentUser = this.$store.state.user;
  },
  methods: {
      logout: function(){
        const vm = this;
        vm.cookie.delCookie('session');
        vm.$router.replace({
            name: "login",
            // path: {redirect: decodeURIComponent(vm.$route.query.redirect)} 
        });
        // if(decodeURIComponent(vm.$route.query.redirect)) {
        //     // vm.$router.go(0);
        //     vm.$router.replace({
        //         name: 'login',
        //         path: decodeURIComponent(vm.$route.query.redirect)
        //     });
        //     // router.push({path:decodeURIComponent(url)})
        //   } else {
        //     vm.$router.push('/'); //跳转用户中心页
        //   }
      }
  }
}
</script>

<style lang="scss">
    .memberIndexprofile{
        background: #f1f1f1;
        .header{
            text-align: center;
            height: 1.65rem;
            background: url("../../assets/images/center_bg.png");
            color: white;
            padding: 0.15rem auto 0.1rem;
            .headshot img{
                width: 0.7rem;
                height: 0.7rem;
                background: #eee;
                border-radius: 50%;
                margin-top: 0.18rem;
            }
            .info{
                margin-top: -0.2rem;
            }
            .text-center{
                margin: 0 auto;
                text-align: center;
                font-size: 14px;
            }
        }
        main{
            margin: 0;
            ul{
                margin: 0;
                margin-bottom: 0.05rem;
                background: white;
                padding-left: 0;
                li{
                    height: 0.525rem;
                    border-bottom: 1px solid #f1f1f1;
                    line-height: 0.525rem;
                    padding: 0 0.15rem 0 0.15rem;
                    position: relative;
                    list-style: none;
                    font-size: 14px;
                    a{
                        display: block;
                        color: inherit;
                        text-decoration: none;
                        font-size: 14px;
                        img{
                            width: 0.225rem;
                            margin-right: 0.125rem;
                            vertical-align: middle;
                        }
                        .lis{
                            vertical-align: middle;
                        }
                        .pull-right{
                            position: absolute;
                            right: 0.15rem;
                            color: #999;
                            i{
                                margin-left: 0.125rem;
                            }
                            i:before {
                                content: "\e940";
                            }
                        }
                    }
                }
            }
        }
        .memberFooter{
            text-align: center;
            .logout{
                display: inline-block;
                width: 1.5rem;
                height: 0.3rem;
                line-height: 0.3rem;
                font-size: 0.15rem;
                color: #999;
                border-radius: 0.15rem;
                border: 1px solid #999;
                margin-top: 0.3rem;
                margin-bottom: 1rem;
                text-decoration: none;
                vertical-align: top;
            }
        }
    }
</style>
