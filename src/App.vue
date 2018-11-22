<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import firebase from 'firebase/app'
export default {
  components: {
    Navbar
  },
  data() {
    return {
      currentUser: window.student
    }
  },
  created() { 
    this.$store.dispatch('getStudents');
  },
  updated() {
    // console.log('updated notified changes')
  }
}
</script>
