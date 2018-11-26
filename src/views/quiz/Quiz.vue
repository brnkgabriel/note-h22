<template>
  <div id="quiz">
    <h1>Quiz</h1>
    <h2>Update Student Data</h2>
    <form @submit="updateStudent"> 
    <div class="date">
      <input type="date" v-model="studentScore.date" placeholder="Date"/> 
    </div>
    <div class="message">
      <input type="text" v-model="studentScore.message" placeholder="Message"/> 
    </div>
    <div class="preacher">
      <input type="text" v-model="studentScore.preacher" placeholder="Preacher"/> 
    </div>
    <div class="age">
      <input type="text" disabled="true" v-model="studentScore.age" placeholder="Age"/> 
    </div>
    <div class="score">
      <input type="text" v-model="studentScore.score" placeholder="Score"/> 
    </div>
    <div class="aggregate">
      <input type="text" v-model="studentScore.aggregate" placeholder="Aggregate"/> 
    </div>
    <button type="submit">Submit Form</button>
    </form>
  </div>
</template>
<script>
import beforeRouteEnter from './beforeRouteEnter-quiz'
import methods from './methods-quiz'
import util from '../../util'
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
      },
      studentScore: {
        age: null,
        aggregate: null,
        date: null,
        message: null,
        preacher: null,
        score: null
      }
    };
  },
  created() {
    var dbStudent = JSON.parse(localStorage.getItem("student"));
    this.student = util.decodeStudent(dbStudent);
    this.studentScore.date = util.today.year + '-' + util.today.month + '-' + util.today.day;
    this.studentScore.message = util.messages[parseInt(this.student.user_data.completedIndex)].split('|')[0];
    this.studentScore.age = util.getAge(this.student.user_data.birthday, util.today);
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
}
</script>

<style scoped>

</style>
