<template lang="html">
    <main>
		<div class="container-fluid">
			<div id="orderItems">
		        <div class="infinite-scroll-tips noResult"><img src="../../../assets/images/noOrder.png" alt="暂无订单">		
                	<p>暂无订单...</p>										
                    <a href="/">去下单</a>
                </div>
            </div>
		</div>
	</main>
</template>
<script>
    export default {
        name:'pendingShipment',
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss">
    #orderItems{
        height: 100%;
        margin: 50px 0px; 
    }
</style>