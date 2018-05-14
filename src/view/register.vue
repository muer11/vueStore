<template lang="html">
	<main class="register">
		<div class="logo">
			<img src="http://www.joyingbike.com/resources/mobile/member/images/qiwawa.png">
		</div>
		<div class="container-fluid">
			<form id="registerForm">
				<input name="socialUserId" type="hidden" value="">
				<input name="uniqueId" type="hidden" value="">
				<div class="form-group">
					<label for="username">用户名</label>
					<input id="username" name="username" v-model.lazy="username" class="form-control" type="text" maxlength="20" placeholder="请输入用户名" autocomplete="off">
					<span v-if="showNameError">{{errUsnMsg}}</span>
				</div>
				<div class="form-group">
					<label for="mobile">手机</label>
					<input id="mobile" name="mobile" v-model.lazy="mobile" class="form-control" type="text" maxlength="20" placeholder="请输入手机号" autocomplete="off">
					<span v-if="showMobileError">{{errMobileMsg}}</span>
				</div>
				<div class="form-group">
					<label for="password">密 码</label>
					<input id="password" name="password" v-model.lazy="password" class="form-control" type="password" maxlength="20" placeholder="请输入密码" autocomplete="off">
					<span v-if="showPswError">{{errPswMsg}}</span>
				</div>
				<div class="form-group">
					<label for="rePassword">确认密码</label>
					<input id="rePassword" name="rePassword" v-model.lazy="rePassword" class="form-control" type="password" maxlength="20" placeholder="请确认密码" autocomplete="off">
					<span v-if="showRePswError">{{errRePswMsg}}</span>
				</div>
				<div class="form-group">
					<label for="key">验证码</label>
					<input type="button" id="send" value="发送">
					<input id="key" name="key" class="form-control" type="text" maxlength="20" placeholder="请输入手机验证码" autocomplete="off">
				</div>
				<button class="btn btn-lg btn-primary btn-block" type="submit" @click="addUser" v-bind:disabled="isDisabled">注册</button>
			</form>
			<div class="row">
				<router-link to="login">立即登录</router-link>
			</div>
		</div>
	</main>
</template>

<script>
	export default {
		name: 'register',
		data(){
			return {
				username : '',
				mobile: '',
				password: '',
				rePassword: '',
				showNameError: false,
				showMobileError: false,
				showPswError: false,
				showRePswError: false,
				errUsnMsg: '',
				errMobileMsg: '',
				errPswMsg: '',
				errRePswMsg: '',
				isDisabled: true
			}
		},
		watch: {
			
			username: function(username){
				console.log(username);
				if(this.isStandard(username)){
					this.showNameError=true;
					this.errUsnMsg = this.isStandard(username);
					return false;
				}
				this.getUsername(username);
				this.disabled();
			},
			mobile: function(mobile){
				if(this.isMobile(mobile)){
					this.showMobileError = true;
					this.errMobileMsg = this.isMobile(mobile);
					return false;
				}
				this.getMobile(mobile);
				this.disabled();
			},
			password: function(password){
				if(this.isStandard(password)){
					this.showPswError = true;
					this.errPswMsg = this.isStandard(password);
					return false;
				}
				this.showPswError = false;
				this.disabled();
			},
			rePassword: function(rePassword){
				const password1 = password.value;
				if(this.isEqual(password1, rePassword)){
					this.showRePswError = true;
					this.errRePswMsg = this.isEqual(password1, rePassword);
					return false;
				}
				this.showRePswError = false;
				this.disabled();
			},
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
						vm.errUsnMsg = "该用户名已注册";
						vm.showNameError=true;
					}else{
						vm.showNameError=false;
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			//判断手机号是否存在
			getMobile: function(mobile){
				var vm = this;
				vm.axios({
					method: 'GET',
					url: 'http://127.0.0.1:7001/judgeMobile',
					params: {
						mobile: mobile
					}
				}).then(function(res){
					if(res.data == 1){
						vm.errMobileMsg = "该手机号已注册";
						vm.showMobileError=true;
					}else{
						vm.showMobileError=false;
					}
				}).catch(function(err){
					console.log(err);
				})
			},
			// 存储用户
			addUser: function(){
				var vm = this;
				vm.axios({
					method: 'POST',
					url: 'http://127.0.0.1:7001/addUser',
					data: {
						name: username.value,
						password: password.value,
						mobile: mobile.value
					}
				}).then(function(res){
					console.log(res);
					// if(res.data.message == "success"){
					// 	vm.$route.push({path: "/login"});
					// }
				}).catch(function(err){
					console.log(err);
				})
			},
			//控制button是否可点击
			disabled: function(){
				if(!this.showNameError && !this.showMobileError && !this.showPswError && !this.showRePswError && username.value && mobile.value && password.value && rePassword.value){
					this.isDisabled = false;
				}
			}
		}
	}
</script>

<style lang="scss">
	.register{
		padding: 10px;
		margin-top: 40px;
		text-align: center;
	
		.logo{
			margin-bottom: 0.8rem;
			img{
				width: 1.8rem;
				height: 1.8rem;
			}
		}
		.container-fluid{
			margin-right: auto;
			margin-left: auto;
			padding-left: 0;
			padding-right: 0;
			.form-group{
				position: relative;
				margin-bottom: 0.2rem;
				font-size: 0;
				label{
					display: inline-block;
					width: 1.3rem;
					text-align: left;
					line-height: 34px;
					vertical-align: top;
					font-size: 0.32rem;
					font-weight: normal;
					color: #666;
					margin-bottom: 0;
				}
				input{
					width: 4.4rem;
					height: 34px;
					text-align: left;
					vertical-align: top;
					padding-left: 0.2rem;
					color: #333;
					font-size: 0.28rem;
					border: none;
					border-bottom: 1px solid #ccc;
					border-radius: 0;
				}
				span{
					display: block;
					text-align: left;
					width: 4.4rem;
					position: relative;
					left: 1.9rem;
					font-size: 0.24rem;
					color: #f56667;
				}
				#send{
					width: 1rem;
					height: 0.4rem;
					color: #48d2a0;
					line-height: 0.2rem;
					background: transparent;
					border: 1px solid #48d2a0;
					border-radius: 0.2rem;
					outline: none;
					position: absolute;
					right: 0.46rem;
					top: 0.12rem;
				}
			}
			.btn-primary{
				width: 5.1rem;
				height: 0.8rem;
				color: #fff;
				font-size: 0.3rem;
				line-height: 0.8rem;
				padding: 0;
				margin: 0.5rem auto 0;
				background-color: #48d2a0;
				box-shadow: none;
				border-radius: 0.4rem;
				border: none;
			}
			.row{
				width: 5rem;
				text-align: right;
				margin: auto;
			}
			.row a{
				color: #48d2a0;
				font-size: 0.3rem;
				line-height: 50px;
				vertical-align: top;
			}
		}
	}
</style>
