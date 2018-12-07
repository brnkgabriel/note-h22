<template>
  <div id="quiz">
    <h1>Quiz</h1>
    <h2>Update Student Data</h2>
    <form @submit="updateStudent"> 
    <div class="cTab">
      <input type="cTab" v-model="student.user_data.quiz_status.cTab" placeholder="cTab"/> 
    </div>
    <button type="submit">Submit Form</button>
    </form>
    {{student.user_data.quiz_status}}
    <div v-for="(question, index) in questions" :key="index">
      {{ question.question }}
    </div>
  </div>
</template>
<script>
import beforeRouteEnter from "./beforeRouteEnter-quiz";
import methods from "./methods-quiz";
import util from "../../util";
import { bus } from '../../main';
export default {
  data() {
    return {
      student: null,
      questions: [],
    };
  },
  created() {
    var dbStudent = JSON.parse(localStorage.getItem("student"));
    this.student = util.decodeStudent(dbStudent);
    util.fetchQuestions();
    bus.$on('incomingQuestions', (questions) => {
      this.questions = questions;
    })
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
</script>

<style scoped>
</style>
