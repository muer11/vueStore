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
        name:'pendingPayment',
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss">
    main{
        height: 100%;
        .container-fluid{
            height: 100%;
            #orderItems{
                height: 100%;
                margin: 50px 0px;           
                .noResult{
                    height: inherit;
                    margin-top: 0.1rem;
                    background: white;
                    font-size: 0.14rem;
                    color: #999;
                    padding-top: 1.1rem;
                    img{
                        width: 1.12rem;
                        height: 1.45rem;
                    }
                    a{
                        display: inline-block;
                        width: 1.2rem;
                        height: 0.4rem;
                        border-radius: 0.2rem;
                        background: #48d2a0;
                        color: white;
                        line-height: 0.4rem;
                        margin-top: 0.2rem;
                    }
                }
            }
        }
    }
</style>