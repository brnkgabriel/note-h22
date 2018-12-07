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
    <div class="buttons">
      <button @click.prevent="addQuestion">Add Question</button>
      <button @click.prevent="saveQuestions">Save Questions</button>
    </div>
  </div>
</template>

<script>
import Question from "./question/Question.vue";
import { bus } from '../../main'
import util from '../../util';
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
    util.fetchQuestions();
    bus.$on('incomingQuestions', (questions) => {
      this.questions = questions;
      this.selectedQuestion = this.questions[0];
    })
  },
  methods: {
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    saveQuestions() {
      this.$store.dispatch('storeQuestions', this.questions);
    },
    addQuestion() {
      var newQuestion = {
        uid: 'question-' + +new Date,
        serial: 0,
        stage: 0,
        img: '',
        question: 'Enter Question...',
        options: [],
        option: {
          key: '',
          value: '',
          pts: 0
        },
        answer: null,
        type: ''
      }
      this.selectedQuestion = newQuestion;
      this.questions.push(this.selectedQuestion)
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
