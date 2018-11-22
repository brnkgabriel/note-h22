<template>
  <div id="rank">
    <h1>Rank</h1>
    <ul>
      <li v-for="(student, index) in students" :key="index">
        {{student.first_name}}-{{student.last_name}}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  data() {
    return {
      
    };
  },
  computed: {
    students: function () {
      return this.$store.state.students;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!firebase.auth().currentUser) {
        next({
          path: '/login'
        });
      } else {
        next();
      }
    }
  }
};
</script>

<style scoped>
</style>
