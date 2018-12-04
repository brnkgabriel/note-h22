<template>
  <div class="questions" v-if="selectedQuestion">
    <question :question="selectedQuestion" />
    <ul class="question-list">
      <li
      v-for="(question, index) in questions"
      :key="index"
      @click.prevent="selectQuestion(question)">
        {{question.serial}}|{{question.stage}} {{question.question}}
      </li>
    </ul>
    <div class="store">
      <button @click.prevent="saveQuestions">Save Questions</button>
    </div>
  </div>
</template>

<script>
import Question from "./question/Question.vue";
import { bus } from '../../main'
export default {
  components: {
    Question
  },
  data() {
    return {
      selectedQuestion: null,
      questions: [],
      delayToCompleteProcessing: null
    };
  },
  created() {
    bus.$on('incomingQuestions', () => {
      this.questions = JSON.parse(localStorage.getItem('questions'));
    })
    this.delayToCompleteProcessing = setInterval(this.checkQuestions, 10);
  },
  methods: {
    checkQuestions: function() {
      console.log('questions-checking');
      if (this.$store.state.questions) {
        this.questions = JSON.parse(localStorage.getItem('questions'));
        this.selectedQuestion = this.questions[0];
        clearInterval(this.delayToCompleteProcessing);
      }
    },
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    saveQuestions() {
      console.log("questions are", this.questions);
    }
  }
};
</script>

<style scoped>
.question-list,
.question {
  display: inline-block;
  vertical-align: top;
}
</style>
