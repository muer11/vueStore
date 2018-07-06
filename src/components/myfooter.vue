 <template>
   <div class="footer">
     <ul class="myfooter">
       <li>
         <a href="#" v-bind:class="(isActive == '/' ? 'active' : '' )" v-on:click="goto('/')">首页</a>
       </li>
       <li>
         <a href="#" v-bind:class="(isActive == 'list' ? 'active' : '' )" v-on:click="goto('list')">分类</a>
       </li>
       <li>
         <a href="#" v-bind:class="(isActive == 'cart' ? 'active' : '' )" v-on:click="goto('cart')">购物车</a>
       </li>
       <li>
         <a href="#" v-bind:class="(isActive == '/login' ? 'active' : '' )" v-on:click="goto('/login')">我的</a>
       </li>
     </ul>
   </div>
 </template>
<script>
export default{
  name: 'myfooter',
  data () {
    return {
      isActive: '/'
    }
  },
  created: function(){
    //console.log(this.$route);
    let urlParams = this.$route.path;
    this.isActive = urlParams.substr(1);
  },
  methods: {
    goto: function(msg){
      this.$router.push(msg);
      this.isActive = msg;
    }
  }
}
</script>

<style lang="scss">
  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    background-color: #ffffff;
    padding: 0.06rem 0 0;
    border-top: 1px solid #eee;
    li{
      list-style: none;
      width: 25%;
      float: left;
      text-align: center;
      font-size: 14px;
      a{
        display: inline-block;
        padding-top: 0.24rem;
        color: #96a7a1;
        font-size: 14px;
        line-height: 0.22rem;
        text-decoration: none;
      }
      a.active{
        color: #48d2a0;
      }
    }
    li:nth-child(1) {
      a{
        background: url(../assets/images/home.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
      a.active {
        background: url(../assets/images/homeClicked.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
    }
    li:nth-child(2){
      a {
        background: url(../assets/images/list.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
      a.active {
        background: url(../assets/images/listClicked.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
    } 
    li:nth-child(3){
      a {
        background: url(../assets/images/cart.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
      a.active {
        background: url(../assets/images/cartClicked.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
    } 
    li:nth-child(4){
      a {
        background: url(../assets/images/user.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
      a.active {
        background: url(../assets/images/userClicked.png) center 0px no-repeat;
        background-size: 0.24rem 0.24rem;
      }
    } 
  }
</style>
