<template>
  <div class="materials" v-if="selectedMaterial">
    <div> 
      <!-- Create 6 types of the select box below for the 6 stages of the quiz -->
      <div class="stages material">
        <div class="stage">
          <label for="stg-1">Stage 1: </label>
          <select id="stg-1" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('one')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
        <div class="stage">
          <label for="stg-2">Stage 2: </label>
          <select id="stg-2" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('two')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
        <div class="stage">
          <label for="stg-3">Stage 3: </label>
          <select id="stg-3" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('three')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
        <div class="stage">
          <label for="stg-4">Stage 4: </label>
          <select id="stg-4" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('four')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
        <div class="stage">
          <label for="stg-5">Stage 5: </label>
          <select id="stg-5" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('five')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
        <div class="stage">
          <label for="stg-6">Stage 6: </label>
          <select id="stg-6" v-model="selectedMaterial" @change="selectMaterial()">
            <option v-for="(material, index) in getMaterials('six')" :key="index" :value="material">{{material.title}}</option>
          </select>
        </div>
      </div>
      <material class="material" />
      <iframe class="material" :src="selectedMaterial.location" frameborder="0"></iframe>
    </div>
    <div>
      <question class="question" :question="selectedMaterial.questions[questionIdx]" />
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
    bus.$on("incomingMaterials", materials => {
      this.materials = materials;
      this.selectedMaterial = this.materials[this.materialIdx];
    });
  },
  methods: {
    getMaterials(stage) {
      return this.materials.filter(material => material.stage === stage)
    },
    selectMaterial() {
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
.material {
  display: inline-block;
}
</style>
