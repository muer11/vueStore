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

<style scoped>
  .search{
    padding: 8px 0;
    background: #fff;
  }
  .search input{
    padding: 0px 10px 0 30px;
    color: #999999;
    line-height: 26px;
    border-radius: 13px;
    height: 25px;
    width: 86%;
    margin: 7.5px auto;
    box-shadow: none;
    border: none;
    margin: 0px auto;
    display: block;
    background: url(../assets/images/search.png) 6px center no-repeat;
    background-size: 15px auto;
    background-color: rgba(72,210,160,0.1);
  }
  nav{
    overflow: hidden;
    background: #fff;
    padding-bottom: 10px;
  }
  nav a{
    display: inline-block;
    width: 33.3%;
    float: left;
    font-size: 14px;
    text-decoration: none;
    color: #666;
    text-align: center;
    line-height: 20px;
  }
  nav a img{
    display: block;
    width: 60px;
    height: 60px;
    margin: 15px auto 0px auto;
  }
  .bannerCol{
    margin: 10px 0;
  }
  .bannerCol ul{
    margin: 0;
    padding: 0;
  }
  .bannerCol h1{
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    background: #fff;
    color: #333;
    margin: 0;
  }
  .bannerCol h1 img{
    width: 12px;
    margin-right: 8px;
    margin-left: 8px;
    margin-top: -4px;
  }
  .bannerCol .adImgs img{
    width: 100%;
  }
  .last{
    line-height: 6px;
    margin-bottom: 70px;
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
    }
  }
</script>
