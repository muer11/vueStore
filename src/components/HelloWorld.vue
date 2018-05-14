<template>
  <div class="hello">
    <router-view/>
    <myfooter></myfooter>
  </div>
</template>

<script>
import myfooter from './myfooter.vue'
export default {
  name: 'HelloWorld',
  components: {
    myfooter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
