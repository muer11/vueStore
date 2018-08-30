<template>
    <div class="cart">
        <!-- <div class="hasNull">
          <img src="http://www.joyingbike.com/resources/shop/images/hasNull.png">
          <p>购物车为空</p>
          <a href="/">去购物</a>
        </div> -->
        <div class="hasSomething">
            <div class="selectBar">
                <div :class="{ clicked: allClicked, selectAll: true}" @click="changeAllClicked"><i></i></div>全选
                <a id="modify" class="pull-right" href="javascript:;" @click="changeStatus"><i v-if=" isEdit ">编辑</i><i v-else>完成</i></a>
            </div>
            <div class="cartlist">
                <template v-for="(proli,index) in prolis">
                    <div class="listContent">
                        <div class="overflow">
                            <div class="list-group-item">
                                <div class="media">
                                    <div :class="{clicked:isClicked[index], selectOne: true}" @click="changeClicked(index)" :data-quantity="prolis[index].quantity" :data-subtotal="prolis[index].price" :data-cartitem="prolis[index].cartitemId"><i></i></div>
                                    <div class="media-left media-middle">
                                        <router-link class="product-image" :to="{path:'/detail?id='+proli.id}" :title="proli.name">
                                            <img class="img-responsive center-block" :src="proli.image" :alt="proli.name">
                                        </router-link>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="media-heading"><a :href="'/detail?id='+proli.id" :title="proli.name">{{ proli.name }}</a></h4>
                                        <div class="loginProducts"><span class="basePrice">零售价: <em>￥{{ proli.price }}</em></span></div>
                                        <div class="specifications"><span class="silver">{{proli.specificationValues}}</span></div>
                                        <div class="spinner" v-if=" !isEdit ">
                                            <span class="decrease" data-spin="down" @click="changeInitQuantity(0, proli.quantity, prolis[index].cartitemId)">-</span>
                                            <input class="form-control" type="text" v-on:blur="changeInitQuantity(2, proli.quantity, prolis[index].cartitemId)" v-model="proli.quantity" maxlength="4" data-sku-id="1854">  
                                            <!-- v-model="quantitys.quantity[index]" -->
                                            <span class="increase" data-spin="up" @click="changeInitQuantity(1, proli.quantity, prolis[index].cartitemId)">+</span>
                                        </div>
                                        <div class="num" v-else>x<i>{{ proli.quantity }}</i></div>
                                    </div>
                                </div>
                            </div>
                            <a class="remove" type="button" data-sku-id="1854">删除</a>
                        </div>					
                    </div>
                </template>
            </div>
            <div class="sumAll">
                <a href="javascript:void(0);" id="deleteSelect" v-if=" !isEdit " :class="{ 'unabled': isUnabled, 'pull-right': true}" @click="deleteCartitem">删除</a>
                <a href="javascript:void(0);" id="submit" v-else :class="{ 'unabled': isUnabled, 'submit': true}" @click="goCheckout">结算</a>
                <span class="total">商品金额: <strong id="effectivePrice">￥{{sumprice}}</strong></span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "cart",
  data() {
    return {
      // memberId: undefined,
      prolis: [],
      isClicked: [],
      allClicked: false,
      sumprice: 0,
      isUnabled: true,
      isEdit: true,
      quantitys: {},
      value: null,
      deleteitems: [],
      cartItems: ""
    };
  },
  created: function() {
    this.showProductList();
  },
  mounted: function() {
    for (let i = 0; i < this.prolis.length; i++) {
      this.isClicked.push(false);
    }
  },
  methods: {
    //展示产品列表
    showProductList: function() {
      let vm = this;
      vm.prolis = [];
      vm.isClicked = [];
      vm.isUnabled = true;
      vm.sumprice = 0;
      vm.quantitys = {};

      vm
        .axios({
          url: "/listProduct",
          type: "GET",
          params: {
            member_id: vm.$store.state.id
          }
        })
        .then(function(res) {
          vm.prolis = res.data;
          for (let m = 0; m < res.data.length; m++) {
            let specs = eval("(" + vm.prolis[m].specificationValues + ")");
            let txt = "[";
            for (let n = 0; n < specs.length; n++) {
              if (n == specs.length - 1) {
                txt += specs[n].value + "]";
              } else {
                txt += specs[n].value + " , ";
              }
            }
            vm.prolis[m].specificationValues = txt;
            //vm.$set(vm.quantitys, 'product[' + m +']', vm.prolis[m].quantity);
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    changeStatus: function() {
      this.isEdit = !this.isEdit;
    },
    // 改变选中状态
    changeClicked: function(index) {
      const vm = this;
      vm.$set(vm.isClicked, index, !vm.isClicked[index]);
      let type = false; //false: 未选中-减少  true：选中-增加
      if (vm.isClicked[index]) {
        type = true;
      }
      vm.sumPrice(type, index);

      //改变'结算'按钮状态
      vm.isUnabled = true;
      for (let i = 0; i < vm.prolis.length; i++) {
        if (vm.isClicked[i]) {
          vm.isUnabled = false;
        }
      }
    },
    //改变全选状态
    changeAllClicked: function() {
      const vm = this;
      let isClick = false;
      if (vm.allClicked) {
        vm.allClicked = false;
      } else {
        vm.allClicked = true;
        isClick = true;
      }
      for (let i = 0; i < vm.prolis.length; i++) {
        vm.isClicked[i] = isClick;
      }
      vm.sumAllPrice();
    },
    //修改商品数量
    changeInitQuantity: function(type, initQuantity, cartitemId) {
      const vm = this;
      let quantity = initQuantity;
      if (type == 0) {
        // type: 0-减少商品 1-增加商品 2-输入数量
        if (quantity == 1) {
          alert("已是最小数量，再减就木有啦~");
          return false;
        } else {
          quantity = quantity - 1;
        }
      } else if (type == 1) {
        quantity = initQuantity + 1;
      } else if (type == 2) {
        quantity = initQuantity;
      }

      vm
        .axios({
          url: "/changeInitQuantity",
          params: {
            quantity: quantity,
            cartitemId: cartitemId
          },
          type: "get"
        })
        .then(function(res) {
          if (res.statusText == "OK") {
            vm.showProductList();
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    // 改变价格
    sumPrice: function(type, index) {
      //type值 false: 未选中-减少  true：选中-增加
      if (type) {
        this.sumprice += this.prolis[index].quantity * this.prolis[index].price;
      } else {
        this.sumprice -= this.prolis[index].quantity * this.prolis[index].price;
      }
    },
    // 计算总价
    sumAllPrice: function() {
      const vm = this;
      vm.sumprice = 0;
      vm.isUnabled = true;

      if (vm.allClicked) {
        vm.isUnabled = false;
        for (let n = 0; n < vm.prolis.length; n++) {
          vm.sumprice += vm.prolis[n].quantity * vm.prolis[n].price;
        }
      }
    },
    // 删除购物车内容
    deleteCartitem: function() {
      const vm = this;
      vm.deleteitems = [];
      for (let i = 0; i < vm.prolis.length; i++) {
        if (vm.isClicked[i]) {
          vm.deleteitems.push(vm.prolis[i].cartitemId);
        }
      }
      if (vm.deleteitems.length > 0) {
        vm
          .axios({
            url: "/deleteItems",
            type: "get",
            params: {
              delItems: JSON.stringify(vm.deleteitems)
            }
          })
          .then(function(res) {
            console.log(res);
            if (res.statusText == "OK") {
              vm.showProductList();
            }
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    },
    goCheckout: function() {
      const vm = this;
      if (!vm.isUnabled) {
        for (let i = 0; i < vm.prolis.length; i++) {
          if (vm.isClicked[i]) {
            if (i != vm.prolis.length - 1) {
              vm.cartItems += vm.prolis[i].cartitemId + ",";
            } else {
              vm.cartItems += vm.prolis[i].cartitemId;
            }
          }
        }
        vm.$router.push({
          path: "/checkout",
          query: { cartItem: vm.cartItems }
        });
      }
    }
  }
};
</script>

<style lang="scss">
.hasSomething {
  .selectBar {
    width: 100%;
    height: 40px;
    background: #fff;
    margin-bottom: 10px;
    line-height: 40px;
    color: #333;
    font-size: 16px;
    position: fixed;
    z-index: 100;
    .selectAll {
      width: 18px;
      height: 18px;
      border-radius: 10px;
      border: 2px solid #eee;
      float: left;
      margin: 10px 10px 0 2%;
      i {
        display: block;
        width: 14px;
        height: 14px;
        margin: 2px;
        border-radius: 8px;
      }
    }
    .selectAll.clicked i {
      background: #48d2a0;
    }
    .pull-right {
      margin-right: 4%;
      float: right !important;
      font-size: 16px;
      color: #333;
    }
  }
  .cartlist {
    padding-top: 40px;
    padding-bottom: 100px;
    .listContent {
      overflow: hidden;
      width: 94%;
      background: #fff;
      border-radius: 0.04rem;
      margin: 10px auto;
      box-shadow: 0 0.01rem 0.09rem #ddd;
      .overflow {
        width: 114%;
        font-size: initial;
        .list-group-item {
          position: relative;
          display: block;
          padding: 8px;
          width: 84%;
          height: 100%;
          border: none;
          float: left;
          border-top-right-radius: 4px;
          border-top-left-radius: 4px;
          margin-bottom: -1px;
          background-color: #fff;
          .media {
            margin-top: 0;
            zoom: 1;
            overflow: hidden;
            .selectOne {
              width: 14px;
              height: 14px;
              border-radius: 10px;
              border: 2px solid #eee;
              float: left;
              margin: 10px 10px 0 2%;
              position: absolute;
              top: 50%;
              margin-top: -10px;
              margin-left: 0px;
              z-index: 10;
              i {
                display: block;
                width: 10px;
                height: 10px;
                margin: 2px;
                border-radius: 6px;
              }
            }
            .selectOne.clicked i {
              background: #48d2a0;
            }
            .media-left {
              margin-left: 20px;
              float: left;
              vertical-align: middle;
              display: table-cell;
              padding-right: 10px;
              .product-image {
                width: 80px;
                height: 80px;
                display: block;
                position: relative;
                left: 10px;
                margin-right: 10px;
                img {
                  display: block;
                  margin-left: auto;
                  margin-right: auto;
                  max-width: 100%;
                  height: auto;
                }
              }
            }
            .media-body {
              display: table-cell;
              width: 10000px;
              vertical-align: top;
              line-height: 20px;
              zoom: 1;
              overflow: hidden;
              font-size: 14px;
              .media-heading {
                margin-bottom: 10px;
                font-weight: normal;
                a {
                  word-break: break-all;
                  color: #48d2a0;
                  font-size: 100%;
                }
              }
              .loginProducts {
                .basePrice {
                  display: block;
                  color: #999;
                  font-size: 11px;
                  em {
                    font-size: 14px;
                    color: #f56767;
                  }
                }
              }
              .specifications {
                .silver {
                  display: block;
                  color: #999;
                  font-size: 11px;
                }
              }
              .spinner {
                display: block;
                width: 74px;
                height: 24px;
                border: 2px solid #ddd;
                border-radius: 13px;
                position: absolute;
                bottom: 10px;
                right: 10px;
                padding: 0;
                .decrease,
                .increase {
                  display: inline-block;
                  width: 15px;
                  text-align: center;
                  font-size: 14px;
                  color: #999;
                  line-height: 24px;
                }
                input {
                  width: 30px;
                  height: 20px;
                  display: inline-block;
                  border: none;
                  box-shadow: none;
                  padding: 0;
                  line-height: 24px;
                  text-align: center;
                  vertical-align: text-top;
                  border-radius: 0;
                  color: #666;
                }
              }
              .num {
                position: absolute;
                bottom: 10px;
                right: 10px;
                color: #666;
                i {
                  margin-left: 3px;
                }
              }
            }
          }
        }
      }
    }
  }
  .sumAll {
    width: 100%;
    height: 44px;
    background: #fff;
    position: fixed;
    bottom: 50px;
    border: 1px solid #dedede;
    border-left: 0;
    border-right: 0;
    z-index: 20;
    #deleteSelect {
      display: block;
      float: right;
      width: 25%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      background: #48d2a0;
    }
    .submit {
      display: block;
      float: right;
      width: 25%;
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 15px;
      color: #fff;
      background: #48d2a0;
    }
    .unabled {
      background: #b0b0b0 !important;
      cursor: not-allowed;
    }
    .total {
      display: block;
      float: right;
      height: 100%;
      line-height: 42px;
      margin-right: 16px;
      color: #666;
      font-size: 12px;
      #effectivePrice {
        font-size: 16px;
        color: #f56767;
      }
    }
  }
}
.hasNull {
  img {
    margin: 100px auto 0;
    display: block;
    width: 30%;
  }
  p {
    line-height: 60px;
    color: #999;
    text-align: center;
    font-size: 18px;
  }
  a {
    width: 140px;
    height: 40px;
    display: block;
    background: #48d2a0;
    border-radius: 20px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-size: 18px;
    margin: 10px auto;
  }
}
</style>
