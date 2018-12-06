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
      this.selectedQuestion.uid = 'question-' + (this.questions.length + 1);
      this.$store.dispatch('storeQuestions', this.questions);
    },
    addQuestion() {
      var newQuestion = {
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
      this.questions.push(newQuestion)
      this.selectedQuestion = newQuestion;
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
