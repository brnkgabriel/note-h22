<template>
  <div id="profile">
    <h1>Profile</h1>
    <h2>Update Student Bio</h2>
    <button>Update Name</button>
    <button>Update Age</button>
    <button>Update Code Name</button>
    <button>Update Email</button>
    <button>Update Color</button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';
export default {
  data() {
    return {};
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
