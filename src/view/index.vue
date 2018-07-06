<template>
  <div class="index">
    <router-view/>
    <myfooter></myfooter>
  </div>
</template>

<script>
  import myfooter from '../components/myfooter.vue'
  export default{
    name: 'index',
    components: {
      myfooter
    }
  }
</script>
