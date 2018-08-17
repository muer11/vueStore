<template lang="html">
  <div class="login">
    <div class="logo">
      <img src="http://www.joyingbike.com/resources/mobile/member/images/jiuyishop.png" alt="joyingbike">
    </div>
    <main>
        <form id="loginForm">
          <input name="socialUserId" type="hidden" value="">
          <input name="uniqueId" type="hidden" value="">
          <div class="form-group">
            <input id="username" name="username" class="form-control" type="text" maxlength="20" placeholder="请输入手机号/用户名" autocomplete="off" v-model.lazy="username" v-bind:class="isError?'error':''">
            <span class="showError" v-if="showNameError">{{errMsg}}</span>
            <input id="password" name="password" class="form-control" type="password" maxlength="20" placeholder="请输入密码" autocomplete="off" v-model.lazy="password" v-bind:class="isPswError?'error':''">
            <span class="showError" v-if="showPasswordError">{{errPwMsg}}</span>
          </div>
          <div class="text-right">
            <a href="/password/forgot?type=member">忘记密码</a>
          </div>
          <button class="btn btn-lg btn-block btn-primary" type="button" :disabled="isDisabled"  @click="confirmPassword" >登 录</button> 
        </form>
        <div class="row">
          <div class="text-center">供应商用户可直接登录您的账号</div>
          <div class="text-right">
            <router-link to="/register">立即注册</router-link>
          </div>
        </div>
    </main>
    <div class="model" v-if="isShow">登 录 成 功</div>
  </div>
</template>

<script>
export default {
  name : 'login',
  data() {
    return {
      username: '',
      password: '',
      isDisabled: false,
      showNameError: false,
      showPasswordError: false,
      errMsg: '',
      errPwMsg: '',
      isError: false,
      isPswError: false,
      isDisabled: true,
      isShow: false,
    }
  },
  watch: {
    username: function(newUsername){
      if(this.isStandard(newUsername)){
        this.isError = true;
        this.showNameError=true;
        this.errMsg = this.isStandard(newUsername);
        return false;
      }
      this.getUsername(newUsername);
    },
    password: function(newPassword){
      if(this.isRequired(newPassword)){
        this.isPswError = true;
        this.showPasswordError = true;
        this.errPwMsg = this.isRequired(newPassword);
        return false;
      }
    }
  },
  methods: {
    // 判断用户是否已存在
    getUsername: function(username){
      var vm = this;
      vm.axios({ //发送请求
        method: 'GET',
        url: 'http://127.0.0.1:7001/judgeUser',
        params: {
          name: username
        }
      }).then(function(res){
        if(res.data == 1){
          vm.showNameError = false;
          vm.isDisabled = false;
          
        }else{
          vm.errMsg = "此账号不存在，请先注册后再登录";
          vm.isError = true;
          vm.showNameError = true;
        }
      }).catch(function(err){
        console.log(err);
      })
      // this.axios.get('http://127.0.0.1:7001/judgeUser',{
      //   params: {
      //     name: username.value,
      //   }
      // this.axios({
      //   method: 'GET',
      //   url: 'http://127.0.0.1:7001/judgeUser?name='+ username.value
    },
    
    // 判断用户的密码是否正确
    confirmPassword: function(){
      var vm = this;
      vm.axios.get('http://127.0.0.1:7001/confirmPassword',{
        params: {
          name: username.value,
          password: password.value
        }
      }).then(function(response){
        console.log(response);
        if(response.data.errorCode == 1){
          vm.isPswError=false;
          vm.showPasswordError = false;
          vm.isShow = true;
          console.log(vm);
          // console.log(vm.cookie.getCookie('token'));
          // let token = vm.cookie.getCookie('token');
          // let Base64 = require('js-base64').Base64;
          // let str = token.split('.')[1];
          // let user = JSON.parse(Base64.decode(str));
          setTimeout(function(){
            vm.isShow = false;
            vm.$router.push({path:"/"}); // 此处应该改为：返回上一页，若无上一页，则返回首页
          }, 1000);
        }else{
          vm.errPwMsg = "密码错误";
          vm.showPasswordError = true;
          vm.isPswError = true;
        }
      }).catch(function(error){
        console.log(error);
      })
    }
  }
}
</script>

<style lang="scss">
.login{
  background: #fff;
  height: 100%;
  position: relative;
  .model{
    transition:  all 1s ease; 
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    margin-left: -100px;
    margin-top: -80px;
    background: #ccc;
    color: #fff;
    height: 45px;
    text-align: center;
    line-height: 45px;
    font-size: 0.35rem;
    border-radius: 15px;
    opacity: 0.8;
  }
  a{
    font-size: 14px;
    text-decoration: none;
    color: #666;
  }
  .error{
    border-bottom: 1px solid #f56667 !important;
  }
  .text-right{
    display: block;
    width: 70%;
    text-align: right;
    font-size: 14px;
    margin: auto;
    a{
      color: #48d2a0;
    }
  }
  .text-center{
    text-align: center;
    margin-top: 10px;
    margin-bottom: 20px;
    color: #666;
    font-size: 14px;
  }
  .logo img {
      display: block;
      width: 40%;
      margin: 60px auto 40px;
  }
  main {
      padding: 10px;
      text-align: center;
  }
  .form-control {
      width: 70%;
      display: block;
      margin: 0 auto;
      border: none;
      padding: 0;
      color: #333;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      border-radius: 0;
      box-shadow: none;
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      -moz-box-shadow: none;
      -ms-box-shadow: none;
      padding-left: 6px;
      text-align: left;
      line-height: 34px;
  }
  .showError{
      color: #f56667;
      font-size: 14px;
      display: block;
  }
  .btn-primary {
      width: 70%;
      height: 40px;
      line-height: 40px;
      padding: 0;
      border-radius: 20px;
      background-color: #4fcc9e;
      border-color: #48d2a0;
      margin: 20px auto 0;
      border-style: none;
      color: #fff;
      font-size: 18px;
  }
 }
 
</style>
