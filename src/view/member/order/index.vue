<template>
  <div class="orderIndex">
    <orderHeader></orderHeader>
    <router-view/>
  </div>
</template>

<script>
    import orderHeader from '../../../components/orderHeader.vue'
    export default{
    name: 'orderIndex',
    components: {
        orderHeader
    }
    }
</script>
<style lang="scss">
    .orderIndex{
        height: 100%;
    }
</style>