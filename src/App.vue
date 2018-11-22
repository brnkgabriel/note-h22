<template>
  <div id="app">
    <navbar :currentUser="currentUser"></navbar>
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
      currentUser: null
    }
  },
  created() { 
    this.$store.dispatch('getStudents');
  },
  updated() {
    // this sets current user so it can be passed as props
    // to trigger on and off the signout buttons
    this.currentUser = window.student
    console.log('currentUser is', this.currentUser)
  }
}
</script>
