<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue' 
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('getStudents');
    this.$store.dispatch('getQuestions');
    this.$store.dispatch('getMaterials')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');
#app * {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
}

h3 {
  margin: 7px 0px 3px 0px;
}
</style>
