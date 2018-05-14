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
                            <strong id="price">￥{{details.price}}</strong>
                        </div>
                    </li>
                </ul>
                <div class="action">
                    <div id="specification" class="specification clearfix">
                        <ul>
                            <template v-for="(specification,i) in specifications">
                                <li>
                                    <div class="leftInfo">
                                        <span :title="specification.name">{{specification.name}}</span>
                                    </div>
                                    <div class="rightInfo">
                                        <template v-for="(entries,index) in specification.entries">
                                            <a href="javascript:;" v-on:click="alterSpecification" ref="entries" :data-specIndex="i" :data-index="index" :val="entries.id" :class=" (indexNum == index && specIndex == i) || entries.isSelected ? 'selected' : '' ">{{entries.value}}</a>
                                        </template>
                                    </div>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <ul>
                        <li class="quantity">
                            <div class="leftInfo">数量</div>
                            <div class="rightInfo num">
                                <span id="decrease" class="decrease" data-spin="down" onselectstart="return false;">-</span>
                                <input type="text" id="quantity" name="quantity" value="1" maxlength="4" onpaste="return false;">
                                <span id="increase" class="increase" data-spin="up" onselectstart="return false;">+</span>
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
                            <div class="rightInfo" id="stock"><em>{{details.stock}}</em>件</div>
                        </li>
                        <li class="rewardPoint">
                            <div class="leftInfo">赠送积分</div>
                            <div class="rightInfo" id="rewardPoint">{{details.price}}</div>
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
        <fixedFooter></fixedFooter>
    </div>
</template>

<script>
    import { Swiper } from 'vux'
    import fixedFooter from '../components/fixedFooter.vue'
    const detailImage = [
        {
            url : "#",
            img : "http://www.joyingbike.com:80/upload/image/201711/e22ab1d5-d804-4c3b-9a63-9d1fd4095fd9_medium.jpg"
        },
        {
            url : "#",
            img : "http://www.joyingbike.com:80/upload/image/201711/01791399-8463-4ffb-b4ad-949efac02c67_medium.jpg"
        },
        {
            url : "#",
            img : "http://www.joyingbike.com:80/upload/image/201711/429df18d-47ea-46b9-8c8c-d16a3ff072b7_medium.jpg"
        }
    ];
    export default {
        name: 'detail',
        data () {
            return {
                detailImage : detailImage,
                details: [],
                imgs: '',
                specifications: [],
                types: [],
                values: [],
                isSelected: false,
                indexNum: 0,
                specIndex: 0,
                beforeIndex: 0,
                beforeSpecIndex: 0,
            }
        },
        created: function(){
            this.findDetail();
        },
        components: {
            Swiper,
            fixedFooter
        },
        methods: {
            
            findDetail: function(){
                const vm = this;
                const ids = vm.$route.query.id;
                vm.axios({
                    type:'GET',
                    url:'http://127.0.0.1:8080/findDetail',
                    params: {
                        id:ids
                    }
                }).then(function(res){
                    const data = res.data[0];
                    console.log(data);
                    vm.details = data;
                    vm.imgs = data.introduction;
                    vm.specifications = eval('('+data.specification+')');
                    console.log(eval('('+data.specification+')'));
                }).catch(function(err){
                    console.log(err);
                })
            },
            alterSpecification: function(e){
                // console.log(e.target);
                // console.log(e.target.dataset);
                // console.log(this.$refs.entries);
                if(e.target.nodeName.toLowerCase() === 'a'){
                    const i = parseInt(e.target.dataset.index);
                    const s = parseInt(e.target.dataset.specindex);
                    this.specIndex= s;
                    this.indexNum = i;
                    console.log(i);
                    console.log(s);
                    this.beforeIndex
                    //e.target.isSelected = true;
                    //this.$refs.entries.setAttribute("class","");
                    //e.target.setAttribute("class", "selected"); 
                }
            }
        }
    }
</script>

<style lang="scss">
    .productDetail{
        overflow: hidden;
        width: 94%;
        margin: 10px auto 0;
        background: #fff;
        box-shadow: 0 3px 8px #ccc;
        border-radius: 4px;
        position: relative;
    }
    .vux-slider{
        margin: 20px auto;
        width: 92%;
        height: 300px;
    }
    .vux-swiper{
        height: 300px !important;
    }
    .info {
        padding: 0 10px 10px;
        h1 {
            font-size: 18px;
            color: #333;
            margin: 0;
        }
        .price, .exchangePoint {
            border-bottom: 1px solid #dedede;
            margin-bottom: 10px;
            line-height: 36px;
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
            width: 80%;
            float: right;
        }
        .price strong, .info .exchangePoint strong {
            color: #f56767;
            font-size: 18px;
        }
        .stock {
            color: #999;
            line-height: 40px;
            overflow: hidden;
        }
        .rewardPoint {
            color: #48d2a0;
            line-height: 20px;
            overflow: hidden;
        }
    }
    .specification ul li {
        margin-bottom: 8px;
        overflow: hidden;
    }
    .specification .leftInfo span {
        line-height: 30px;
    }
    .specification .rightInfo a {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border-radius: 4px;
        border: 2px solid #eee;
        padding: 0 10px;
        margin-right: 10px;
        margin-bottom: 10px;
        color: #666;
        font-size: 14px;
    }
    .specification .rightInfo .selected {
        border-color: #48d2a0;
        box-shadow: 0 1px 6px rgba(162,238,211,1);
    }
    .quantity {
        height: 28px;
        overflow: hidden;
        font-size: 12px;
        line-height: 29px;
        .leftInfo {
            float: left;
            line-height: 28px;
        }
        .num {
            float: left;
            width: 84px;
            height: 24px;
            border: 2px solid #eee;
            border-radius: 18px;
            line-height: 28px;
            margin-right: 4px;
        }
         .decrease, .increase {
            width: 24px;
            height: 24px;
            line-height: 24px;
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
            width: 32px;
            height: 24px;
            line-height: 24px;
            color: #212121;
            text-align: center;
            ime-mode: disabled;
            border: none;
        }
    }
    
    .proIntroduct{
        overflow: hidden;
        width: 94%;
        margin: 10px auto 0;
        background: #fff;
        -webkit-box-shadow: 0 3px 8px #ccc;
        box-shadow: 0 3px 8px #ccc;
        border-radius: 4px;
        position: relative;
        .title{
            line-height: 35px;
            padding-left: 10px;
            border-bottom: 1px solid #dedede;
            font-size: 16px;
            color: #333;
        }
        img{
            width: 100% !important;
        }
    }
    .guess {
        width: 94%;
        margin: 0 auto 60px;
        overflow: hidden;
        h2 {
            font-size: 16px;
            color: #333;
            line-height: 34px;
            margin-left: 6px;
        }
        
        li {
            float: left;
            width: 45%;
            margin: 0px 2% 10px 0;
            background: #fff;
            padding: 6px;
            border-radius: 4px;
            box-shadow: 0 2px 8px #ccc;
            img {
                width: 100%;
            }
            .guessName {
                display: block;
                color: #333;
                height: 20px;
            }
            .guessPrice {
                display: inline-block;
                color: #f56667;
                font-size: 16px;
                font-weight: bold;
                margin-top: 4px;
            }
            .guessJoin {
                display: inline-block;
                float: right;
                width: 20px;
                height: 20px;
                background: url(../assets/images/cartClicked.png) center top no-repeat;
                background-size: cover;
                margin: 4px 8px;
            }
        }
        li:nth-child(even) {
            margin-right: 0;
        }
    }
</style>


