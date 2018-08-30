<template>
    <main>
		<div class="add container-fluid">
			<form id="inputForm">
				<div class="panel panel-flat">
					<div class="panel-body">
						<div class="form-group">
							<label for="consignee">收货人</label>
							<input id="consignee" name="consignee" v-model="consignee" class="form-control" placeholder="收货人姓名" type="text" maxlength="20">
						</div>
						<div class="form-group">
							<label for="phone">联系方式</label>
							<input id="phone" name="phone" v-model="phone" class="form-control" placeholder="手机号码" type="text" maxlength="20">
						</div>
						<div class="form-group">
							<label for="zipCode">邮政编码</label>
							<input id="zipCode" name="zipCode" v-model="zipCode" class="form-control" placeholder="邮政编码" type="text" maxlength="6">
						</div>
						<div class="form-group">
							<label>所在地区</label>
							<region @selecRregion="selecRregion"></region>
						</div>
						<div class="form-group">
							<label for="address">详细地址</label>
							<input id="address" name="address" v-model="address" class="form-control" placeholder="详细地址" type="text" maxlength="200">
						</div>
						<div class="form-group div_isDefault text-right clearfix" @click="changeDefault">
							<label class="pull-left" for="isDefault">设为默认地址</label>
							<input name="isDefault" v-model="isDefault" id="isDefault" type="checkbox" :value="isDefault">
							<span :class="{'clicked': isClicked}"></span>
						</div>
					</div>
					<div class="receiverFooter panel-footer text-center">
						<button class="btn btn-primary" type="button" @click="addReceiver">保存</button>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
import region from '../../../components/region.vue'
export default {
	name: 'receiverAdd',
	components: {
		region
	},
    data(){
		return {
			memberId: 8,
			consignee: '', //收货人
			phone: '', //联系电话
			areaName: '', //地区
			areaId: '', //地区id
			address: '', //详细地址
			zipCode: '', //邮编
			isDefault: 0,
			isClicked: false,
        }
	},
	methods: {
		selecRregion: function(...data){
			this.areaName = data[0];
			this.areaId = data[1].toString();
		},
		addReceiver: function(){
			const vm = this;
			vm.axios({
				url: '/addReceivers',
				type: 'GET',
				params: {
					consignee: vm.consignee,
					phone: vm.phone,
					zipCode: vm.zipCode,
					areaName: vm.areaName,
					area_id: vm.areaId,
					address: vm.address,
					isDefault: vm.isDefault,
					member_id: vm.memberId,
				},
			}).then(function(res){
				if(res.data.serverStatus == 2){
					alert("成功添加地址~");
					vm.$router.push({path: "/member/receiver/list"});
				}
			}).catch(function(err){
				console.log(err);
			})
		},
		changeDefault: function(){
			this.isClicked = !this.isClicked;
			this.isDefault = this.isClicked ? true : false;
		},
	}
}
</script>

<style lang="scss">
	.add{
		font-size: initial;
		.form-group{
			border-bottom: 1px solid #f1f1f1;
			height: 0.5rem;
			line-height: 0.5rem;
			margin-bottom: 0;
			padding-left: 0.15rem;
			background: white;
			.region{
				display: inline-block;
			}
			label{
				display: inline-block;
				font-size: 0.14rem;
    			color: #666;
			}
			input{
				display: inline-block;
				height: 34px;
				width: 2.5rem;
				border: none;
				padding: 0;
				color: #333;
				text-align: left;
				font-size: 0.14rem;
				padding-left: 0.1rem;
			}
		}
		.div_isDefault {
			input{
				opacity: 0;
				width: 0.2rem;
				height: 0.2rem;
			}
			span{
				display: inline-block;
				width: 0.2rem;
				height: 0.2rem;
				background: url("../../../assets/images/noDefault.png");
				background-size: 0.2rem 0.2rem;
				background-repeat: no-repeat;
				margin-left: -0.25rem;
				margin-right: 0.15rem;
				margin-top: 0.15rem;
			}
			.clicked{
				background: url("../../../assets/images/default.png");
				background-size: 0.2rem 0.2rem;
				background-repeat: no-repeat;
			}
		}
		.receiverFooter{
			width: 2.5rem;
			border-radius: 0.2rem;
			display: inline-block;
			overflow: hidden;
			margin: auto;
			position: absolute;
			left: 50%;
			margin-left: -1.25rem;
			margin-top: 0.5rem;
			border: none;
			button{
				margin-right: 0;
				font-size: 0.18rem;
				width: 100%;
				border: none;
				height: 0.4rem;
				background-color: #48d2a0;
				border-color: #48d2a0;
				line-height: 0.4rem;
				color: #fff;
			}
		}
	}
</style>
