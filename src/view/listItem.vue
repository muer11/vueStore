<template lang="html">
  <div class="listItem">
    <div id="productCategory">
      <ul class="productCategory">
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
  name: "listItem",
  data() {
    return {
      tabs: [
        "小趣系列",
        "祺娃娃系列",
        "费尼斯系列",
        "大众系列",
        "电动车系列",
        "积分商城"
      ],
      lis: [],
      clicked: false,
      liIndex: 0
    };
  },
  created: function() {
    this.getProducts();
  },
  methods: {
    getProducts: function() {
      var vm = this;
      var productCategory_id = vm.$route.query.productCategory_id;
      vm.liIndex = productCategory_id;
      vm
        .axios({
          method: "GET",
          url: "/findProducts",
          params: {
            productCategory_id: productCategory_id
          }
        })
        .then(function(res) {
          vm.lis = res.data;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.listItem {
  #productCategory {
    width: 100%;
    height: 0.4rem;
    overflow: hidden;
    background: #fff;
    position: relative;
    .productCategory {
      position: absolute;
      margin: 0;
      padding: 0;
      height: 100%;
      li {
        float: left;
        height: 0.4rem;
        line-height: 0.4rem;
        padding: 0 0.1rem;
        background: #fff;
        a {
          display: block;
          color: #666;
          font-size: 14px;
          vertical-align: middle;
        }
        .clicked {
          color: #48d2a0 !important;
        }
      }
    }
  }
  .listAll {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .col-xs-6 {
      display: flex;
      flex-wrap: wrap;
      width: 40%;
      margin: 0.1rem 2% 0;
      padding: 3%;
      background-color: #fff;
      -webkit-box-shadow: 0 1px 3px #ccc;
      -moz-box-shadow: 0 1px 3px #ccc;
      box-shadow: 0 1px 3px #ccc;
      border-radius: 4px;
      // overflow: hidden;
      a {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        img {
          width: 100%;
        }
      }
      h4 {
        color: #333;
        font-size: 14px;
        line-height: 0.16rem;
        margin: 0.04rem 0 0;
        white-space: pre-wrap;
        word-break: break-all;
      }
      strong {
        width: 76%;
        word-break: break-all;
        font-size: 16px;
        font-weight: bold;
        margin-top: 0.04rem;
      }
      .basket {
        width: 0.2rem;
        height: 0.2rem;
        margin: 0.04rem 0.08rem;
        background: url(http://www.joyingbike.com/resources/mobile/shop/images/cartClicked.png)
          center top no-repeat;
        background-size: cover;
      }
    }
    .infinite-scroll-tips {
      width: 100%;
      height: 0.3rem;
      line-height: 0.4rem;
      clear: both;
      color: #cccccc;
      font-size: 12px;
      text-align: center;
      margin-bottom: 0.7rem;
    }
  }
  .noResult {
    width: 100%;
    height: 0.3rem;
    line-height: 0.4rem;
    clear: both;
    color: #cccccc;
    font-size: 12px;
    text-align: center;
    margin-bottom: 0.6rem;
    img {
      width: 36%;
      margin-top: 1.2rem;
    }
    p {
      font-size: 16px;
      color: #999;
    }
    a {
      display: inline-block;
      width: 1.6rem;
      height: 0.4rem;
      line-height: 0.4rem;
      background: #48d2a0;
      border-radius: 21px;
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>
