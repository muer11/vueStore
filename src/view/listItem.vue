<template lang="html">
  <div class="listItem">
    <div id="productCategory">
      <ul class="productCategory" style="width: 504px; left: 0px;">
        <template v-for="(tab,index) in tabs">
          <li :class="index == tabs.length-1 ? 'last' : ''">
            <router-link :to="{path: '/listItem?productCategory_id='+(index+1)}" @click.native="getProducts" :class=" (index+1) == liIndex  ? 'clicked' : '' ">{{tab}}</router-link>
          </li>
        </template>
      </ul>
    </div>
    <div class="listAll">
      <template v-for="li in lis">
         <div class="col-xs-6">
            <router-link :to="{path: 'detail?id='+ li.id}">
              <img class="img-responsive center-block" :src="li.image" :alt="li.name">
              <h4 class="text-overflow">{{li.name}}</h4>
            </router-link>
            <strong class="red">￥{{li.price}}</strong>
            <router-link to="detail" class="basket"></router-link>
        </div>
      </template>
      <div class="infinite-scroll-tips">没有更多记录</div>
    </div>
    <!--<div class="noResult">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/store.png">
      <p>— 商家正在努力上新中 —</p>
      <a href="/">返回首页</a>
    </div>-->
  </div>
</template>

<script>
export default {
  name: 'listItem',
  data(){
    return {
      tabs: ["小趣系列", "祺娃娃系列", "费尼斯系列", "大众系列", "电动车系列", "积分商城"],
      lis:  [],
      clicked: false,
      liIndex: 0,
    }
  },
  created: function(){
    this.getProducts();
  },
  methods: {
    getProducts : function(){
      var vm = this;
      var productCategory_id = vm.$route.query.productCategory_id;
      vm.liIndex = productCategory_id;
      vm.axios({
        method: 'GET',
        url: 'http://127.0.0.1:7001/findProducts',
        params:{
          productCategory_id:productCategory_id
        }
      }).then(function(res){
        vm.lis = res.data;
      }).catch(function(err){
        console.log(err);
      })
    }
  }
}
</script>

<style>
 .red {
    color: #f56667;
 }
 #productCategory {
    width: 100%;
    height: 40px;
    overflow: hidden;
    background: #fff;
    position: relative;
  }
 .productCategory {
    position: absolute;
    margin: 0;
    padding: 0;
    height: 100%;
  }
 .productCategory li {
    float: left;
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #fff;
 }
 .productCategory a {
    display: block;
    color: #666;
    font-size: 14px;
    vertical-align: middle;
 }
 .clicked{
    color: #48d2a0 !important;
 }
 .listAll {
   width: 100%;
   overflow: hidden;
 }
 .listAll .col-xs-6 {
    float: left;
    width: 40%;
    margin: 10px 2% 0;
    padding: 3%;
    background-color: #fff;
    -webkit-box-shadow: 0 1px 3px #ccc;
    -moz-box-shadow: 0 1px 3px #ccc;
    box-shadow: 0 1px 3px #ccc;
    border-radius: 4px;
 }
 .listAll .col-xs-6 h4{
    float: left;
    width: 100%;
    color: #333;
    font-size: 14px;
    line-height: 16px;
    margin: 4px 0 0;
 }
 .listAll .col-xs-6 strong{
    display: inline-block;
    font-size: 16px;
    font-weight: bold;
    margin-top: 4px;
    float: left;
 }
 .listAll .col-xs-6 img{
   width: 100%;
 }
 .listAll .col-xs-6 .basket {
    background: url(http://www.joyingbike.com/resources/mobile/shop/images/cartClicked.png) center top no-repeat;
    width: 20px;
    height: 20px;
    display: inline-block;
    background-size: cover;
    float: right;
    margin: 4px 8px;
 }
 .infinite-scroll-tips {
    width: 100%;
    height: 30px;
    line-height: 40px;
    clear: both;
    color: #cccccc;
    font-size: 12px;
    text-align: center;
    margin-bottom: 70px;
 }
 .noResult{
    width: 100%;
    height: 30px;
    line-height: 40px;
    clear: both;
    color: #cccccc;
    font-size: 12px;
    text-align: center;
    margin-bottom: 60px;
 }
 .noResult img {
    width: 36%;
    margin-top: 120px;
 }
 .noResult p {
    font-size: 16px;
    color: #999;
 }
 .noResult a {
    display: inline-block;
    width: 160px;
    height: 40px;
    line-height: 40px;
    background: #48d2a0;
    border-radius: 21px;
    color: #fff;
    font-size: 16px;
 }
</style>
