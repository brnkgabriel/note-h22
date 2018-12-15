<template>
  <div class="materials" v-if="selectedMaterial">
    <div> 
      <!-- Create 6 types of the select box below for the 6 stages of the quiz -->
      <div class="material-table">
        <div class="material">
          <div class="title material-info">Title</div>
          <div class="stage material-info">Stage</div>
          <div class="type material-info">Type</div>
        </div>
        <div class="material">
          <div class="title material-info">In the beginning</div>
          <div class="stage material-info">1</div>
          <div class="type material-info">message</div>
        </div>
      </div>
      <div class="material-panel">
        <material />
      <iframe class="material" :src="selectedMaterial.location" frameborder="0"></iframe>
    <div>
      <question class="question" :question="selectedMaterial.questions[questionIdx]" :type="selectedMaterial.type" />
      <ul class="question-list">
        <li
        v-for="(question, index) in selectedMaterial.questions"
        :key="index"
        @click.prevent="selectQuestion(question)">
          {{question.uid}}: {{question.question}}
        </li>
      </ul>
    </div>
    <div class="buttons">
      <button @click.prevent="addQuestion">Add Question</button>
      <button @click.prevent="saveMaterial">Save Material</button>
    </div>
      </div>
    </div>
  </div>
</template>

<script>
import Question from "./question/Question.vue";
import Material from "./material/Material.vue";
import { bus } from "../../main";
import util from "../../util";
export default {
  components: {
    Question,
    Material
  },
  data() {
    return {
      selectedMaterial: null,
      materialIdx: 0,
      materials: [],
      questionIdx: 0,
      questions: []
    };
  },
  created() {
    util.fetchMaterials();
    bus.$on("incomingMaterials", () => {
      this.materials = util.localStorage().materials;
      this.selectedMaterial = this.materials[this.materialIdx];
    });
  },
  methods: {
    getMaterials(stage) {
      return this.materials.filter(material => material.stage === stage);
    },
    selectMaterial() {
      console.log(this.materials);
      this.materialIdx = this.materials.findIndex(
        mat => mat.uid === this.selectedMaterial.uid
      );
    },
    selectQuestion(question) {
      this.questionIdx = this.selectedMaterial.questions.findIndex(
        que => que.uid === question.uid
      );
    },
    saveMaterial() {
      this.$store.dispatch("saveMaterial", this.selectedMaterial);
    },
    saveQuestions() {
      this.$store.dispatch("storeQuestions", this.questions);
    },
    addQuestion() {
      var newQuestion = {
        uid: "question-" + +new Date(),
        img: "",
        question: "Enter Question...",
        options: []
      };
      this.selectedQuestion = newQuestion;
      this.selectedMaterial.questions.push(this.selectedQuestion);
      this.selectQuestion(this.selectedQuestion);
    }
  }
};
</script>

<style scoped>
.question-list,
.question {
  display: inline-block;
  vertical-align: top;
  max-width: 600px;
}

.material-info {
  display: inline-block;
}

.material-table {
  width: 60%;
  display: inline-block;
  vertical-align: top;
}

.material-panel {
  width: 35%;
  display: inline-block;
  vertical-align: top;
}
</style>
