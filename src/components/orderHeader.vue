<template>
    <header class="header-fixed">
		<router-link :to="{path: '/order'}" :class="(orderType=='orderList' ? 'active' : '')" @click="changeType('orderList')">全部订单<i></i></router-link>
		<router-link :to="{path: '/pendingPayment'}" :class="(orderType=='pendingPayment' ? 'active' : '')" @click="changeType('pendingPayment')">待付款<i></i></router-link>
		<router-link :to="{path: '/pendingShipment'}" :class="(orderType=='pendingShipment' ? 'active' : '')" @click="changeType('pendingShipment')">待发货<i></i></router-link>
	</header>
</template>

<script>
export default {
	name:'orderHeader',
	data(){
		return {
			orderType: 'orderList',
		}
	},
	created: function(){

	},
	methods: {
		changeType: function(type){
			console.log(1111);
			console.log(type);
			this.orderType = '';
			this.orderType = type;
		}
	}
}
</script>

<style lang="scss">
	.header-fixed{
		width: 100%;
		display: table;
		padding: 10px 0px;
		position: fixed;
		top: 0px;
		z-index: 100;
		font-size: initial;
		background: #fff;
		a{
			display: table-cell;
			font-size: 0.15rem;
			color: #666;
			text-align: center;
			margin-right: 0.9rem;
			position: relative;
		}
		.active{
			color: #48d2a0;
			i{
				position: absolute;
				bottom: -0.1rem;
				left: 50%;
				margin-left: -0.15rem;
				border-top: 2px solid #48d2a0;
				width: 0.3rem;
			}
		}
	}
</style>
