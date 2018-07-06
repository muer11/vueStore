<template lang='html'>
  <div class="indexMain">
    <div class="search">
      <form id="searchForm" action="/product/search" method="get">
        <input id="keyword" name="keyword" type="text" placeholder="搜索 商品">
      </form>
    </div>
    <swiper :list="bannerList" loop auto dots-position="center"></swiper>
    <nav>
      <!-- <router-link :to="{path: '/listItem', params: { productCategory_id: '1'}}"> -->
      <router-link :to="{path: '/listItem?productCategory_id=1'}">
      	<img src="http://www.joyingbike.com/upload/image/index_nav_1.png" alt="小趣系列">小趣系列
      </router-link>
      <router-link :to="{path: '/listItem?productCategory_id=2'}">
        <img src="http://www.joyingbike.com/upload/image/index_nav_2.png" alt="祺娃娃系列">祺娃娃系列
      </router-link>
      <router-link :to="{path: '/listItem?productCategory_id=3'}">
        <img src="http://www.joyingbike.com/upload/image/index_nav_3.png" alt="费尼斯系列">费尼斯系列
      </router-link>
      <router-link :to="{path: '/listItem?productCategory_id=4'}">
        <img src="http://www.joyingbike.com/upload/image/index_nav_4.png" alt="大众系列">大众系列
      </router-link>
      <router-link :to="{path: '/listItem?productCategory_id=5'}">
        <img src="http://www.joyingbike.com/upload/image/index_nav_5.png" alt="电动车系列">电动车系列
      </router-link>
      <router-link :to="{path: '/listItem?productCategory_id=6'}">
        <img src="http://www.joyingbike.com/upload/image/index_nav_6.png" alt="积分商城">积分商城
      </router-link>
    </nav>
    <div class="bannerCol">
      <ul>
        <li>
          <h1><img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png">经典爆款<img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png"></h1>
          <a href="http://www.joyingbike.com/product/detail/424" class="adImgs"><img src="http://www.joyingbike.com/resources/mobile/shop/images/banner1.png"></a>
        </li>
        <li>
          <h1><img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png">经典爆款<img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png"></h1>
          <a href="http://www.joyingbike.com/product/detail/424" class="adImgs"><img src="http://www.joyingbike.com/resources/mobile/shop/images/banner1.png"></a>
        </li>
        <li>
          <h1><img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png">经典爆款<img src="http://www.joyingbike.com/resources/mobile/shop/images/star.png"></h1>
          <a href="http://www.joyingbike.com/product/detail/424" class="adImgs"><img src="http://www.joyingbike.com/resources/mobile/shop/images/banner1.png"></a>
        </li>
      </ul>
    </div>
    <p class="last">已经到最后了~</p>
  </div>
</template>

<style lang="scss">
  .search{
    padding: 0.08rem 0;
    background: #fff;
    input{
      padding: 0px 0.1rem 0 0.3rem;
      color: #999999;
      line-height: 0.26rem;
      border-radius: 16px;
      height: 0.25rem;
      width: 86%;
      margin: 0.075rem auto;
      box-shadow: none;
      border: none;
      margin: 0px auto;
      display: block;
      background: url(../assets/images/search.png) 0.06rem center no-repeat;
      background-size: 0.15rem auto;
      background-color: rgba(72,210,160,0.1);
    }
  }
  nav{
    overflow: hidden;
    background: #fff;
    padding-bottom: 0.1rem;
    a{
      display: inline-block;
      width: 33.3%;
      float: left;
      font-size: 14px;
      text-decoration: none;
      color: #666;
      text-align: center;
      line-height: 0.2rem;
      img{
        display: block;
        width: 0.6rem;
        height: 0.6rem;
        margin: 0.15rem auto 0;
      }
    }
  }
  .bannerCol{
    margin: 0.1rem 0;
    ul{
      margin: 0;
      padding: 0;
      h1{
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        font-size: 16px;
        background: #fff;
        color: #333;
        margin: 0;
        img{
          width: 0.12rem;
          margin: -0.04rem 0.08rem 0 0.08rem;
        }
      }
      .adImgs{
        display: block;
        img{
          width: 100%;
        }
      }
    }
  }
  .last{
    line-height: 0.06rem;
    margin-bottom: 0.7rem;
    text-align: center;
    color: #666;
    font-size: 14px;
  }
</style>

<script>
  import { Swiper } from 'vux'
  const bannerList = [
    {
      url: '#',
      img: 'http://www.joyingbike.com/upload/image/index_slider1.png'
    },
    {
      url: '#',
      img: 'http://www.joyingbike.com/upload/image/index_slider2.png'
    },
    {
      url: '#',
      img: 'http://www.joyingbike.com/upload/image/index_slider3.png'
    }
  ]
  export default{
    name: 'indexMain',
    data () {
      return {
        bannerList: bannerList
      }
    },
    components: {
      Swiper
    },
    created: function(){
      this.getCookies();
    },
    methods: {
      getCookies: function(){
        //console.log(this.getCookie("username"));
        //console.log(this.cookies.get("username"));
        
      }
    }
  }
</script>
