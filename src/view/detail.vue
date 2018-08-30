<template lang="html">
    <div class="detail">
        <div class="productDetail">
            <swiper :list="detailImage" loop auto dots-position="center"></swiper>
            <div class="info">
                <h1>{{details.name}}</h1>
                <ul>
                    <li class="price">
                        <div class="leftInfo">零售价</div>
                        <div class="rightInfo">
                            <strong id="price">￥{{specificationsInfo.price}}</strong>
                        </div>
                    </li>
                </ul>
                <div class="action">
                    <div id="specification" class="specification clearfix">
                        <ul>
                            <li v-for="(specification,i) in specifications" v-if="show">
                                <div class="leftInfo">
                                    <span :title="specification.name">{{specification.name}}</span>
                                </div>
                                <div class="rightInfo">
                                    <a href="javascript:;" v-for="(entries,index) in specification.entries" ref="entries" :val="entries.id" :class=" entries.isSelected ? 'selected' : ''" v-on:click="alterSpecification(i, index)">{{entries.value}}</a> 
                                </div>
                            </li>
                        </ul>
                    </div>
                    <ul>
                        <li class="quantity">
                            <div class="leftInfo">数量</div>
                            <div class="rightInfo num">
                                <span id="decrease" class="decrease" @click="changeInitQuantity(0, quantity)">-</span>
                                <input type="text" id="quantity" name="quantity" :value="quantity" maxlength="4">
                                <span id="increase" class="increase" @click="changeInitQuantity(1, quantity)">+</span>
                            </div>件
                        </li>
                        <form id="productNotifyForm" action="/product_notify/save" method="post" novalidate="novalidate">
                            <li id="productNotify" class="productNotify hidden" style="display: none;">
                                <div class="leftInfo">您的E-mail
                                    <div class="rightInfo">
                                        <input type="text" name="email" maxlength="200">
                                    </div>
                                </div>
                            </li>
                        </form>
                        <li class="stock">
                            <div class="leftInfo">库存</div>
                            <div class="rightInfo" id="stock"><em>{{specificationsInfo.stock}}</em>件</div>
                        </li>
                        <li class="rewardPoint">
                            <div class="leftInfo">赠送积分</div>
                            <div class="rightInfo" id="rewardPoint">{{specificationsInfo.price}}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="proIntroduct">
            <div class="title">
                <strong>商品介绍</strong>
            </div>
            <div class="imgs" v-html="imgs">
                {{imgs}}
            </div>
        </div>
        <div class="guess">
			<h2>猜你喜欢</h2>
			<ul class="guessLike">
                <li>
                    <a href="/product/detail/408" class="guessImg">
                        <img src="http://www.joyingbike.com:80/upload/image/201711/2c4e2309-1db7-4bb1-a731-a5dae6889c61_source.png">
                    </a>
                    <a href="/product/detail/408" class="guessName">STITCH祺娃娃骑士</a>
                    <span class="guessPrice">￥499.00</span>
                    <a href="/product/detail/408" class="guessJoin"></a>
                </li>
                <li>
                    <a href="/product/detail/405" class="guessImg">
                        <img src="http://www.joyingbike.com:80/upload/image/201711/30ca3f86-218c-4f94-bf89-6ac80f542b41_source.png">
                    </a>
                    <a href="/product/detail/405" class="guessName">STITCH祺娃娃英国女</a>
                    <span class="guessPrice">￥429.00</span>
                    <a href="/product/detail/405" class="guessJoin"></a>
                </li>
                <li>
                    <a href="/product/detail/1365" class="guessImg">
                        <img src="http://www.joyingbike.com/upload/image/201804/5c141685-2106-4ae4-acfd-c649dc1806b6_source.jpg">
                    </a>
                    <a href="/product/detail/1365" class="guessName">雷克斯樱花</a>
                    <span class="guessPrice">￥659.00</span>
                    <a href="/product/detail/1365" class="guessJoin"></a>
                </li>
                <li>
                    <a href="/product/detail/1364" class="guessImg">
                        <img src="http://www.joyingbike.com/upload/image/201804/b7c7b751-af76-40c8-953e-950311612603_source.jpg">
                    </a>
                    <a href="/product/detail/1364" class="guessName">祺娃娃TRU花蝴蝶</a>
                    <span class="guessPrice">￥439.00</span>
                    <a href="/product/detail/1364" class="guessJoin"></a>
                </li>
            </ul>
		</div>
        <fixedFooter :skuId='skuId' :quantity='quantity' :stock='stock'></fixedFooter>
    </div>
</template>

<script>
import { Swiper } from "vux";
import fixedFooter from "../components/fixedFooter.vue";
const detailImage = [
  {
    url: "#",
    img:
      "http://www.joyingbike.com:80/upload/image/201711/e22ab1d5-d804-4c3b-9a63-9d1fd4095fd9_medium.jpg"
  },
  {
    url: "#",
    img:
      "http://www.joyingbike.com:80/upload/image/201711/01791399-8463-4ffb-b4ad-949efac02c67_medium.jpg"
  },
  {
    url: "#",
    img:
      "http://www.joyingbike.com:80/upload/image/201711/429df18d-47ea-46b9-8c8c-d16a3ff072b7_medium.jpg"
  }
];
export default {
  name: "detail",
  data() {
    return {
      id: 0,
      detailImage: detailImage,
      details: [],
      imgs: "",
      specifications: [],
      specificationsInfo: {},
      types: [],
      values: [],
      indexNum: 0,
      selectedVal: [],
      disabledCss: false,
      skuId: null,
      stock: 0,
      quantity: 1,
      show: false
    };
  },
  created: function() {
    this.findDetail(); //查找该商品详情
  },
  components: {
    Swiper,
    fixedFooter
  },
  methods: {
    findDetail: function() {
      const vm = this;
      vm.id = vm.$route.query.id;
      vm
        .axios({
          type: "GET",
          url: "/findDetail",
          params: {
            id: vm.id
          }
        })
        .then(function(res) {
          const data = res.data[0];
          const indexNum = [],
            specIndexNum = [];
          //console.log(data);
          vm.details = data;
          vm.imgs = data.introduction;
          vm.specifications = eval("(" + data.specification + ")");
          const spec = eval("(" + data.specification + ")");

          //console.log(eval('('+data.specification+')'));
          //console.log(vm.specifications.isSelected.val);

          // 获得页面初始加载的选中项
          let selectedVal = [];
          for (let x = 0; x < vm.specifications.length; x++) {
            for (let n = 0; n < vm.specifications[x]["entries"].length; n++) {
              if (vm.specifications[x]["entries"][n].isSelected == true) {
                selectedVal.push(vm.specifications[x]["entries"][n].value);
              }
            }
          }
          vm.findSkuInfo(selectedVal);
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    alterSpecification: function(i, index) {
      for (let m = 0; m < this.specifications[i]["entries"].length; m++) {
        this.specifications[i]["entries"][m].isSelected = false;
      }
      this.specifications[i]["entries"][index].isSelected = true;

      //获得当前选中项
      let selectedVal = [];
      for (let x = 0; x < this.specifications.length; x++) {
        for (let n = 0; n < this.specifications[x]["entries"].length; n++) {
          if (this.specifications[x]["entries"][n].isSelected == true) {
            selectedVal.push(this.specifications[x]["entries"][n].value);
          }
        }
      }
      this.findSkuInfo(selectedVal);
      this.quantity = 1;
    },
    findSkuInfo: function(itemArr) {
      const vm = this;
      const ids = vm.$route.query.id;
      vm
        .axios({
          type: "GET",
          url: "/findSkuInfo",
          params: {
            product_id: ids
          }
        })
        .then(function(res) {
          //console.log(res.data);
          let data = res.data;
          vm.specificationsInfo = {};
          vm.skuId = null;
          //筛选不能选中项
          // for(let y = 0; y < data.length; y++){
          // }

          //获取对应属性下的产品信息
          for (let k = 0; k < data.length; k++) {
            let specificationValues = eval(
              "(" + data[k].specificationValues + ")"
            );
            let specArr = [];

            for (let i = 0; i < specificationValues.length; i++) {
              specArr.push(specificationValues[i].value);
            }
            //判断两个数组是否相等
            if (specArr.toString() == itemArr.toString()) {
              vm.specificationsInfo = data[k];
              vm.skuId = vm.specificationsInfo.id;
              vm.stock = vm.specificationsInfo.stock;
            }
          }
          //console.log(vm.skuId);
          //console.log(vm.specificationsInfo);
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    changeInitQuantity: function(type, initQuantity) {
      const vm = this;

      if (type == 0) {
        // type: 0-减少商品 1-增加商品
        if (initQuantity == 1) {
          alert("已是最小数量，再减就木有啦~");
          return false;
        } else {
          vm.quantity = initQuantity - 1;
        }
      } else if (type == 1) {
        vm.quantity = initQuantity + 1;
      }
    }
  }
};
</script>

<style lang="scss">
.detail {
  .productDetail {
    overflow: hidden;
    width: 94%;
    margin: 0.1rem auto 0;
    background: #fff;
    box-shadow: 0 3px 8px #ccc;
    border-radius: 4px;
    position: relative;
  }
  .vux-slider {
    margin: 0.2rem auto;
    width: 92%;
    height: 3rem;
  }
  .vux-swiper {
    height: 3rem !important;
  }
  .info {
    padding: 0 0.1rem 0.1rem;
    h1 {
      font-size: 18px;
      color: #333;
      margin: 0;
    }
    .price,
    .exchangePoint {
      border-bottom: 1px solid #dedede;
      margin-bottom: 0.1rem;
      line-height: 0.36rem;
      overflow: hidden;
    }
    .leftInfo {
      width: 20%;
      color: #999;
      font-size: 12px;
      font-weight: normal;
      float: left;
    }
    .rightInfo {
      float: right;
      width: 80%;
      font-size: initial;
    }
    .price strong,
    .info .exchangePoint strong {
      color: #f56767;
      font-size: 18px;
    }
    .stock {
      color: #999;
      line-height: 0.4rem;
      overflow: hidden;
    }
    .rewardPoint {
      color: #48d2a0;
      line-height: 0.2rem;
      overflow: hidden;
    }
  }
  .specification ul li {
    margin-bottom: 0.08rem;
    overflow: hidden;
  }
  .specification .leftInfo span {
    line-height: 0.3rem;
  }
  .specification .rightInfo a {
    display: inline-block;
    height: 0.3rem;
    line-height: 0.28rem;
    text-align: center;
    border-radius: 4px;
    border: 2px solid #eee;
    padding: 0 0.1rem;
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    color: #666;
    font-size: 14px;
  }
  .specification .rightInfo .selected {
    border-color: #48d2a0;
    box-shadow: 0 1px 6px rgba(162, 238, 211, 1);
  }
  .specification .rightInfo .disabled {
    border: 2px dotted #eee;
    box-shadow: none;
  }
  .quantity {
    height: 0.28rem;
    overflow: hidden;
    font-size: 12px;
    line-height: 0.28rem;
    .leftInfo {
      float: left;
      line-height: 0.28rem;
    }
    .num {
      float: left;
      width: 0.84rem;
      height: 0.24rem;
      border: 2px solid #eee;
      border-radius: 18px;
      line-height: 0.28rem;
      margin-right: 0.1rem;
    }
    .decrease,
    .increase {
      width: 0.24rem;
      height: 0.24rem;
      line-height: 0.24rem;
      text-align: center;
      display: inline-block;
      float: left;
      color: #999;
      font-size: 18px;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      -o-user-select: none;
      user-select: none;
      cursor: pointer;
      overflow: hidden;
      -webkit-transition: border-color ease-in-out 0.2s;
      -moz-transition: border-color ease-in-out 0.2s;
      transition: border-color ease-in-out 0.2s;
    }
    input {
      float: left;
      width: 0.32rem;
      height: 0.24rem;
      line-height: 0.24rem;
      color: #212121;
      text-align: center;
      ime-mode: disabled;
      border: none;
    }
  }

  .proIntroduct {
    overflow: hidden;
    width: 94%;
    margin: 0.1rem auto 0;
    background: #fff;
    -webkit-box-shadow: 0 3px 8px #ccc;
    box-shadow: 0 3px 8px #ccc;
    border-radius: 4px;
    position: relative;
    .title {
      line-height: 0.35rem;
      padding-left: 0.1rem;
      border-bottom: 1px solid #dedede;
      font-size: 16px;
      color: #333;
    }
    img {
      width: 100% !important;
      vertical-align: top;
    }
  }
  .guess {
    width: 94%;
    margin: 0 auto 0.6rem;
    display: flex;
    flex-wrap: wrap;
    h2 {
      font-size: 16px;
      color: #333;
      line-height: 0.34rem;
      margin-left: 0.06rem;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
      li {
        width: 45%;
        background: #fff;
        margin: 0px 2% 0.1rem 0;
        padding: 0.06rem;
        border-radius: 4px;
        box-shadow: 0 2px 8px #ccc;
        font-size: initial;
        img {
          width: 100%;
        }
        .guessName {
          display: flex;
          color: #333;
          word-break: break-all;
          line-height: 0.2rem;
        }
        .guessPrice {
          display: inline-flex;
          width: 74%;
          color: #f56667;
          font-size: 16px;
          font-weight: bold;
          margin-top: 0.04rem;
          word-break: break-all;
        }
        .guessJoin {
          display: inline-flex;
          width: 0.2rem;
          height: 0.2rem;
          background: url(../assets/images/cartClicked.png) center top no-repeat;
          background-size: cover;
          margin: 0.04rem 0.08rem;
        }
      }
      li:nth-child(even) {
        margin-right: 0;
      }
    }
  }
}
</style>


