<template>
  <div class="materials" v-if="selectedMaterial">
    <select v-model="selectedMaterial.title">
      <option v-for="(material, index) in materials" :key="index">{{material.title}}</option>
    </select>
    <question :question="selectedQuestion" />
    <ul class="question-list">
      <li
      v-for="(question, index) in selectedMaterial.questions"
      :key="index"
      @click.prevent="selectQuestion(question)">
        {{question.uid}}: {{question.question}}
      </li>
    </ul>
    <div class="buttons">
      <button @click.prevent="addQuestion">Add Question</button>
      <button @click.prevent="saveMaterial">Save Material</button>
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
      selectedMaterial: null,
      selectedQuestion: null, 
      materials: [],
      questions: [],
    };
  },
  created() {
    util.fetchMaterials();
    bus.$on('incomingMaterials', (materials) => {
      this.materials = materials;
      this.selectedMaterial = this.materials[0];
      this.selectedQuestion = this.selectedMaterial.questions[0];
    })
    // util.fetchQuestions();
    // bus.$on('incomingQuestions', (questions) => {
    //   this.questions = questions;
    //   this.selectedQuestion = this.questions[0];
    // })
  },
  methods: {
    selectQuestion(question) {
      this.selectedQuestion = question;
    },
    saveMaterial() {
      this.$store.dispatch('saveMaterial', this.selectedMaterial)
    },
    saveQuestions() {
      this.$store.dispatch('storeQuestions', this.questions);
    },
    addQuestion() {
      var newQuestion = {
        uid: 'question-' + +new Date,
        img: '',
        question: 'Enter Question...',
        options: [],
      }
      this.selectedQuestion = newQuestion;
      this.selectedMaterial.questions.push(this.selectedQuestion)
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
