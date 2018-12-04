<template>
  <div class="questions">
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
export default {
  components: {
    Question
  },
  data() {
    return {
      selectedQuestion: null,
      questions: [
        {
          serial: 0,
          stage: 0,
          question: "#?",
          options: [],
          option: {
            key: "#",
            value: "#",
            pts: 0
          },
          answer: null,
          type: "#"
        },
        {
          serial: 1,
          img: '',
          stage: 0,
          question: "#?",
          options: [],
          option: {
            key: "#",
            value: "#",
            pts: 0
          },
          answer: null,
          type: "#"
        }
      ]
    };
  },
  created() {
    this.selectedQuestion = this.questions[0];
  },
  methods: {
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    saveQuestions() {
      console.log('questions are', this.questions);
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
