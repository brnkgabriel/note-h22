<template>
  <div id="profile">
    <h1>Profile</h1>
    <h2>Update Student Bio</h2>
    <form @submit="updateStudent"> 
    <div class="first-name">
      <input type="text" v-model="student.first_name" placeholder="First Name"/> 
    </div>
    <div class="last-name">
      <input type="text" v-model="student.last_name" placeholder="Last Name"/> 
    </div>
    <div class="email">
      <input type="text" v-model="student.email" placeholder="Email"/> 
    </div>
    <button type="submit">Submit Form</button>
    </form>
  </div>
</template>

<script>
import beforeRouteEnter from "./beforeRouteEnter-profile";
export default {
  data() {
    return {
      student: {
        email: null,
        first_name: null,
        last_name: null,
        roles_permissions: null,
        uid: null,
        user_data: null
      }
    };
  },
  created() {
    var localStorageStudent = JSON.parse(localStorage.getItem('student'));
    this.student = localStorageStudent;
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    updateStudent: function(evt) {
      evt.preventDefault();
      this.$store.dispatch('updateStudent', this.student);
    }
  }
};
</script>

<style scoped>
</style>
