<template>
    <div class="receiverList">
        <main>
		    <div v-for="(receiverlist,i) in receiverlists">
                <div class="panel panel-flat">
                    <div class="panel-body">
                        <div class="list-group list-group-flat">
                            <div class="list-group-item">
                                <div class="media">
                                    <h4 class="media-heading">{{receiverlist.consignee}}<span class="pull-right">{{receiverlist.phone}}</span></h4>
                                    <span :title="receiverlist.areaName+receiverlist.address">{{receiverlist.areaName}}{{receiverlist.address}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="panel-footer text-right">
                        <span class="span_default" @click="setDefault(i)" >
                            <input type="checkbox" :id="'default_'+receiverlist.id" name="default" :receiverid="receiverlist.id">
                            <span :class="{'clicked': receiverlist.isDefault.data[0]}"></span>
                            <!-- receiverlist.isDefault.data[0] -->
                            <label :for="'default_'+receiverlist.id" :class="{'clicked' : receiverlist.isDefault.data[0]}">设为默认</label> 
                        </span>
                        <router-link :to="{path: '/member/receiver/modify', query: {receiverId: receiverlist.id}}" class="btn btn-sm btn-default">编辑</router-link>
                        <a class="delete btn btn-sm btn-default" href="javascript:;" @click="deleteReceiver(receiverlist.id, i)" :data-receiver-id="receiverlist.id">删除</a>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer-fixed">
            <router-link :to="{path: '/member/receiver/add'}" class="btn btn-primary btn-flat btn-block" id="add">添加收货地址</router-link>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'receiverList',
    data(){
        return {
            memberId: 8,
            receiverlists: [],
            isClicked: false,
        }
    },
    created: function(){
        this.showList();
    },
    methods: {
        showList: function(){
            const vm = this;
            vm.axios({
                url: '/selectReceiver',
                params:{
                    member_id: vm.memberId,
                },
                type: 'GET',
            }).then(function(res){
                console.log(res);
                vm.receiverlists = res.data;

            }).catch(function(err){
                console.log(err);
            })
        }, 
        deleteReceiver: function(id, i){
            const vm = this;
            vm.axios({
                url: '/deleteReceiver',
                type: 'GET',
                params: {   
                    id: id,
                    member_id: vm.memberId,
                    isDefault: vm.receiverlists[i].isDefault.data[0],
                }
            }).then(function(res){
                console.log(res);
                if(res.status == 200){
                    vm.showList();
                }
            }).catch(function(err){
                console.log(err);
            })
        },
        setDefault: function(i){
            const vm = this;
            if(!vm.receiverlists[i].isDefault.data[0]){
                const id = vm.receiverlists[i].id;
                vm.axios({
                    url: '/modifyDefault',
                    type: 'GET',
                    params: {   
                        id: id,
                        member_id: vm.memberId,
                        isDefault: true,
                    }
                }).then(function(res){
                    if(res.status == 200){
                        vm.showList();
                    }
                }).catch(function(err){
                    console.log(err);
                })
            }
        },
    }
}
</script>

<style lang="scss">
    .receiverList{
        margin-bottom: 0.8rem;
        font-size: initial;
        .panel{
            background-color: #fff;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 10px;
            color: #666;
            .list-group-item{
                padding: 0.15rem;
                border-bottom: 1px solid #eeeeee;
                font-size: 0.14rem;
                line-height: 0.26rem;
            }
            .panel-footer{
                height: 0.38rem;
                line-height: 0.38rem;
                font-size: 0.14rem;
                padding: 0 0.15rem;
                .span_default{
                    float: left;
                    padding-top: 0.05rem;
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
                        margin-left: -0.2rem;
                    }
                    span.clicked{
                        background: url("../../../assets/images/default.png");
                        background-size: 0.2rem 0.2rem;
                    }
                    label{
                        font-size: 0.14rem;
                        height: 0.2rem;
                        line-height: 0.2rem;
                        color: #666;
                        position: relative;
                        top: -0.04rem;
                    }
                    label.clicked{
                        color: #48d2a0;
                    }
                }
                a{
                    font-size: 0.14rem;
                }
            }
        }
        .footer-fixed{
            width: 100%;
            position: fixed;
            bottom: 0px;
            z-index: 100;
            a{
                display: block;
                width: 100%;
                height: 0.45rem;
                line-height: 0.45rem;
                text-align: center;
                font-size: 0.18rem;
                color: #fff;
                background-color: #48d2a0;

            }
        }
    }
</style>
