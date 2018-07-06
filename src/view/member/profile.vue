<template>
    <div class="profile">
        <div class="header clearfix text-center">
            <div class=" header-warp text-center">
                <span>0</span>
                <span>可用积分</span>
            </div>
            <span class="used">已用积分: 0</span>
        </div>
        <main>
            <div class="pointLogTitle text-center">积分明细</div>
            <div class="infinite-scroll-tips noResult">
                <img src="/assets/member/images/noPoints.png" alt="暂无积分">
                <p>暂无积分...</p>										
                <a href="/">去赚积分</a>
            </div>
        </main>
    </div>
</template>
<script>
    export default {
        name:'profile',
        data(){
            return {

            }
        }
    }
</script>

<style lang="scss">
    .profile {
        font-size: initial;
        height: 100%;
        .header{
            height: 1.1rem;
            color: white;
            background: url(../../assets/images/point_log_bg.png);
            position: relative;
            .header-warp{
                padding-top: 0.3rem;
                span{
                    display: block;
                }
            }
            .used{
                position: absolute;
                bottom: 0.07rem;
                right: 0.15rem;
            }
        }
        main{
            height: 100%;
            .pointLogTitle{
                height: 0.4rem;
                line-height: 0.4rem;
                background: white;
                margin-bottom: 0.1rem;
                font-size: 0.18rem;
                color: #666;
            }
            .noResult{
                width: 100%;
                height: 100%;
                line-height: 50px;
                clear: both;
                color: #cccccc;
                font-size: 12px;
                text-align: center;
                background: white;
                height: inherit;
                img{
                    width: 0.9rem;
                    margin-top: 0.6rem;
                }
                p{
                    margin-top: 0.18rem;
                    color: #999;
                    font-size: 0.18rem;
                }
                a{
                    margin-top: 1.1rem;
                    font-size: 0.18rem;
                    color: #fff;
                    display: inline-block;
                    width: 1.2rem;
                    height: 0.4rem;
                    line-height: 0.4rem;
                    background: #48d2a0;
                    border-radius: 0.2rem;
                }
            }
        }
    }
</style>