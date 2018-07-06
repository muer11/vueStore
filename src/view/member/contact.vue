<template>
    <div class="aboutUs">
        <div class="listFooter">
            <ul>
                <li>联系我们 <span>888-88588-541</span></li>
                <li>官网地址 <span>www.joying.com</span></li>
            </ul>
        </div>
        <div class="back-top"><span class="fa fa-arrow-up"></span></div>
    </div>
</template>
<script>
    export default {
        name:'contact',
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss">
    .aboutUs{
        font-size: initial;
        .listFooter{
            position: absolute;
            top: 0.25rem;
            width: 100%;
            li{
                height: 0.5rem;
                line-height: 0.5rem;
                padding-left: 0.15rem;
                font-size: 0.16rem;
                color: #666;
                border-bottom: 1px solid #f1f1f1;
                background: white;
                span{
                    margin-left: 0.2rem;
                }
            }
        }
        
    }
</style>