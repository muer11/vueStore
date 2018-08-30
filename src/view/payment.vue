<template>
    <div class="payment">
        <div class="title">
                您的订单已提交成功，正在等待处理！
        </div>
        <div class="group">
            <div class="item">
                编号: {{orderInfo.sn}}
                <a class="green pull-right" href="/member/order/view?orderSn=20180702000611">查看订单</a>
            </div>
        </div>
        <div class="group">
            <div class="item">
                配送方式
                <span class="pull-right">普通快递</span>
            </div>
            <div class="item">
                支付方式
                <span class="pull-right">网上支付</span>
            </div>
        </div>
        
        <div class="group">
            <div class="item">
                应付金额
                <strong id="amountPayable" class="pull-right red">￥{{orderInfo.price}}</strong>
            </div>
            <div id="feeItem" class="fee-item item">
                支付手续费
                <strong id="fee" class="pull-right red">￥0</strong>
            </div>
            <div class="item">
                <strong class="red alerts">请您在2018-07-04 17:21之前支付订单款项，否则该订单将失效！</strong>
                <strong class="red alerts" style="padding-left: 4%;">订单金额超过1万请前往PC端支付</strong>
            </div>
        </div>
        
        <div class="heading">支付方式</div>
        <form id="paymentForm" target="_blank" action="/payment" method="get">
            <input name="paymentItemList[0].type" type="hidden" value="ORDER_PAYMENT">
            <input name="paymentItemList[0].orderSn" type="hidden" value="20180702000611">
            <input id="paymentPluginId" name="paymentPluginId" type="hidden" value="unionpayPaymentPlugin">	
            <div class="object text-right active" data-payment-plugin-id="unionpayPaymentPlugin">
                <img src="/resources/mobile/shop/images/yinlian.png" alt="银联支付"><em>银联支付<strong class="red alerts">（限额10000元）</strong></em>
                <!-- <input type="checkbox" name="default" receiverid="" class="object_default"> -->
                <span class="active"></span>
            </div>											
            <div class="object text-right" data-payment-plugin-id="weixinPublicPaymentPlugin">
                <img src="/resources/mobile/shop/images/wechat.png" alt="微信支付"><em>微信支付</em>
                <!-- <input type="checkbox" name="default" receiverid="" class="object_default"> -->
                <span></span>
            </div>
        </form>
        
        <footer class="footer-fixed">
            <a id="submit" class="btn btn-f lat btn-block" href="javascript:void(0);">立即支付</a>
        </footer>
    </div>
</template>

<script>
export default {
  name: "payment",
  data() {
    return {
      orderInfo: []
    };
  },
  created: function() {
    this.findOrder();
  },
  methods: {
    findOrder: function() {
      const vm = this;
      const orderId = vm.$route.query.ordersId;
      console.log(orderId);
      vm
        .axios({
          url: "/findOrder",
          params: {
            orderId: orderId
          }
        })
        .then(function(res) {
          console.log(res);
          vm.orderInfo = res.data[0];
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.payment {
  font-size: 0.14rem;
  overflow: hidden;
  .title {
    line-height: 40px;
    text-indent: 0.15rem;
    color: #666;
  }
  .group {
    line-height: 44px;
    background: #fff;
    text-indent: 0.15rem;
    margin-bottom: 10px;
    .green {
      color: #48d2a0;
      font-size: 0.14rem;
    }
    .pull-right {
      margin-right: 0.15rem;
    }
    .alerts {
      display: inline-block;
      line-height: 23px;
      text-indent: 0;
      width: 92%;
      margin-top: 10px;
    }
  }
  .heading {
    text-indent: 0.15rem;
    line-height: 0.28rem;
    color: #666;
  }
  form {
    .object {
      background: #fff;
      padding: 6px 1em;
      line-height: 34px;
      img {
        float: left;
        width: 30px;
        height: 30px;
        margin-left: 2%;
        margin-top: 6px;
        overflow: hidden;
      }
      em {
        float: left;
        display: block;
        margin-left: 26px;
        color: #666;
        margin-top: 4px;
      }
      span {
        display: inline-block;
        width: 0.4rem;
        height: 0.4rem;
        //background: url(../../member/images/noDefault.png);
        background-size: 0.4rem 0.4rem;
        background-repeat: no-repeat;
        margin-left: -0.4rem;
      }
      span.active {
        //background: url(../../member/images/default.png);
        background-size: 0.4rem 0.4rem;
        background-repeat: no-repeat;
      }
    }
  }
  #submit {
    display: block;
    height: 100%;
    color: #fff;
    font-size: 0.16rem;
    line-height: 0.5rem;
    text-align: center;
    background: #48d2a0;
    border-radius: 0;
  }
  .footer-fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
