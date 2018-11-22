<template>
  <div id="quiz">
    <h1>Quiz</h1>
    <h2>Update Student Data</h2>
    <button>Update</button>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  beforeRouteEnter(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!firebase.auth().currentUser) {
        next({ path: '/login' })
      } else { next(); }
    }
  }
}
</script>

<style scoped>

</style>
