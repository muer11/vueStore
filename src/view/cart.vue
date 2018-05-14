<template>
  <div class="cart">
    <div class="hasNull">
      <img src="http://www.joyingbike.com/resources/shop/images/hasNull.png">
      <p>购物车为空</p>
      <a href="/">去购物</a>
    </div>
  </div>
</template>

<style lang="scss">
 .hasNull{
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
