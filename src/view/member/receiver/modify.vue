<template>
    <main>
		<div class="modify container-fluid">
			<form id="inputForm">
				<div class="panel panel-flat">
					<div class="panel-body">
						<div class="form-group">
							<label for="consignee">收货人</label>
							<input id="consignee" name="consignee" class="form-control" type="text" placeholder="您的用户名" v-model="consignee" maxlength="20">
						</div>
						<div class="form-group">
							<label for="phone">联系方式</label>
							<input id="phone" name="phone" class="form-control" type="text" placeholder="您的联系方式" v-model="phone" maxlength="20">
						</div>
						<div class="form-group">
							<label for="zipCode">邮政编码</label>
							<input id="zipCode" name="zipCode" class="form-control" type="text" placeholder="邮政编码" v-model="zipCode" maxlength="6">
						</div>
						<div class="form-group">
							<label>所在地区</label>
							<region @selecRregion="selecRregion"></region>
						</div>
						<div class="form-group">
							<label for="address">详细地址</label>
							<input id="address" name="address" class="form-control" type="text" placeholder="您的详细地址" v-model="address" maxlength="200">
						</div>
					</div>
					<div class="form-group div_delete">
						<a href="javascript:;" id="delete" @click="deleteReceiver(receiverInfo.id)">删除</a>
					</div>
					<div class="receiverFooter panel-footer text-center">
						<button class="btn btn-primary" type="button" @click="modify(receiverInfo.id)">保存</button>
					</div>
				</div>
			</form>
		</div>
	</main>
</template>

<script>
import region from '../../../components/region.vue'
export default {
    name: 'receiverModify',
    data(){
        return {
			receiverId: this.$route.query.receiverId,
			receiverInfo: [],
			consignee: '', //收货人
			phone: '', //联系电话
			areaName: '', //地区
			areaId: '', //地区id
			address: '', //详细地址
			zipCode: '', //邮编
			isDefault: 0,
			memberId: 8, //用户编号
        }
	},
	components: {
		region
	},
	created: function(){
		this.show();
	},
	methods: {
		selecRregion: function(...data){
			this.areaName = data[0];
			this.areaId = data[1].toString();
		},
		show: function(){
			const vm = this;
			vm.axios({
				url: 'http://127.0.0.1:8080/showReceiver',
				type: 'GET',
				params: {
					id: vm.receiverId
				}
			}).then(function(res){
				console.log(res);
				vm.receiverInfo = res.data[0];
				vm.consignee = vm.receiverInfo.consignee;
				vm.phone = vm.receiverInfo.phone;
				vm.areaName = vm.receiverInfo.areaName;
				vm.areaId = vm.receiverInfo.area_id;
				vm.address = vm.receiverInfo.address;
				vm.zipCode = vm.receiverInfo.zipCode;
				vm.isDefault = vm.receiverInfo.isDefault.data[0];
			}).catch(function(err){
				console.log(err);
			})
		},
		modify: function(id){
			const vm = this;
            vm.axios({
                url: 'http://127.0.0.1:8080/modifyReceiver',
                type: 'GET',
                params: {   
					id: id,
					consignee: vm.consignee, //收货人
					phone: vm.phone, //联系电话
					areaName: vm.areaName, //地区
					areaId: vm.areaId, //地区id
					address: vm.address, //详细地址
					zipCode: vm.zipCode, //邮编
					isDefault: vm.isDefault, 
                }
            }).then(function(res){
                console.log(res);
                if(res.status == 200){
                }
            }).catch(function(err){
                console.log(err);
            })
		},
		deleteReceiver: function(id){
            const vm = this;
            vm.axios({
                url: 'http://127.0.0.1:8080/deleteReceiver',
                type: 'GET',
                params: {   
					id: id,
					member_id: vm.memberId,
                    isDefault: vm.isDefault,
                }
            }).then(function(res){
                console.log(res);
                if(res.status == 200){
					alert("删除成功~");
					vm.$router.push({path:'/member/receiver/list'});
                }
            }).catch(function(err){
                console.log(err);
            })
        },
	}
}
</script>

<style lang="scss">
	.modify{
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
		.div_delete{
			margin-top: 0.1rem;
			a{
				color: #48d2a0;
				font-size: 0.14rem;
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
				background: url(/images/noDefault.png);
				background-size: 0.2rem 0.2rem;
				background-repeat: no-repeat;
				margin-left: -0.25rem;
				margin-right: 0.15rem;
				margin-top: 0.15rem;
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
