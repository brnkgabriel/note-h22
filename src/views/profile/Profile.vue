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
    {{student.email}}
    <table class="scores">
      <thead>
        <tr>
          <th>Date</th>
          <th>Message</th>
          <th>Author</th>
          <th>Score</th>
          <th>Age</th>
          <th>Aggregate</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(score, index) in student.user_data.scores" :key="index">
          <td>{{ score.date }}</td>
          <td>{{ score.message }}</td>
          <td>{{ score.preacher }}</td>
          <td>{{ score.score }}</td>
          <td>{{ score.age }}</td>
          <td>{{ score.aggregate }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import beforeRouteEnter from "./beforeRouteEnter-profile";
import util from "../../util";
import methods from './methods-profile'
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
    var dbStudent = JSON.parse(localStorage.getItem("student"));
    this.student = util.decodeStudent(dbStudent);
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
</script>

<style scoped>
</style>
