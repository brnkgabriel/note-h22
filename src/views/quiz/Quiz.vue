<template>
  <div id="quiz">
    <h1>Quiz</h1>
    <h2>Update Student Data</h2>
    <form @submit="updateStudent"> 
    <div class="cTab">
      <input type="cTab" v-model="student.user_data.quiz_status.cTab" placeholder="cTab"/> 
    </div>
    <div class="wQAnswered">
      <input type="text" v-model="student.user_data.quiz_status.wQAnswered" placeholder="wQAnswered"/> 
    </div>
    <div class="wQGotten">
      <input type="text" v-model="student.user_data.quiz_status.wQGotten" placeholder="wQGotten"/> 
    </div>
    <div class="wQMissed">
      <input type="text" v-model="student.user_data.quiz_status.wQMissed" placeholder="wQMissed"/> 
    </div>
    <div class="mQAnswered">
      <input type="text" v-model="student.user_data.quiz_status.mQAnswered" placeholder="mQAnswered"/> 
    </div>
    <div class="mQGotten">
      <input type="text" v-model="student.user_data.quiz_status.mQGotten" placeholder="mQGotten"/> 
    </div>
    <div class="mQMissed">
      <input type="text" v-model="student.user_data.quiz_status.mQMissed" placeholder="mQMissed"/> 
    </div>
    <div class="sTyped">
      <input type="text" v-model="student.user_data.quiz_status.sTyped" placeholder="sTyped"/> 
    </div>
    <div class="sWordsTyped">
      <input type="text" v-model="student.user_data.quiz_status.sWordsTyped" placeholder="sWordsTyped"/> 
    </div>
    <div class="sGotten">
      <input type="text" v-model="student.user_data.quiz_status.sGotten" placeholder="sGotten"/> 
    </div>
    <div class="sMissed">
      <input type="text" v-model="student.user_data.quiz_status.sMissed" placeholder="sMissed"/> 
    </div>
    <div class="tPoints">
      <input type="text" v-model="student.user_data.quiz_status.tPoints" placeholder="tPoints"/> 
    </div>
    <div class="aggregate">
      <input type="text" v-model="student.user_data.quiz_status.aggregate" placeholder="aggregate"/> 
    </div>
    <button type="submit">Submit Form</button>
    </form>
    {{student.user_data.quiz_status}}
  </div>
</template>
<script>
import beforeRouteEnter from "./beforeRouteEnter-quiz";
import methods from "./methods-quiz";
import util from "../../util";
export default {
  data() {
    return {
      student: null
    };
  },
  created() {
    var dbStudent = JSON.parse(localStorage.getItem("student"));
    this.student = util.decodeStudent(dbStudent);
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
// TODO: change quiz_status to quiz_status
// TODO: include quiz_status in util.encodeStudent
</script>

<style scoped>
</style>
