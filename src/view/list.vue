<template lang="html">
  <div class="list">
    <router-link to="/listItem?productCategory_id=1">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/小趣系列.png" />
    </router-link>
    <router-link to="/listItem?productCategory_id=2">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/祺娃娃系列.png" />
    </router-link>
    <router-link to="/listItem?productCategory_id=3">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/费尼斯系列.png" />
    </router-link>
    <router-link to="/listItem?productCategory_id=4">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/大众系列.png" />
    </router-link>
    <router-link to="/listItem?productCategory_id=5">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/电动车系列.png" />
    </router-link>
    <router-link to="/listItem?productCategory_id=6">
      <img src="http://www.joyingbike.com/resources/mobile/shop/images/积分商城.png" />
    </router-link>
  </div>
</template>

<style lang="scss">
  .list{
    padding-bottom: 0.5rem;
    a{
      display: flex;
      width: 94%;
      margin: 0.12rem auto;
      border-radius: 8px;
      box-shadow: 0 3px 8px #ccc;
      overflow: hidden;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
</style>
