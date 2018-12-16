<template>
  <div class="materials" v-if="selectedMaterial"> 
    <h3>List of Materials</h3>
    <div class="material-table">
      <input type="text" class="question-search" placeholder="search for material..."/>
      <div class="material">
        <div class="title material-info"><strong>Title</strong></div>
        <div class="stage material-info"><strong>Stage</strong></div>
        <div class="type material-info"><strong>Type</strong></div>
      </div>
      <div class="material" v-for="(material, index) in materials" :key="index" @click="selectMaterial(material)">
        <div class="title material-info">{{material.title}}</div>
        <div class="stage material-info">{{material.stage}}</div>
        <div class="type material-info">{{material.type}}</div>
      </div>
    </div>
    <div class="material-panel">
      <material :material="selectedMaterial" />
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
      console.log(this.selectedMaterial)
    });
  },
  methods: {
    getMaterials(stage) {
      return this.materials.filter(material => material.stage === stage);
    },
    selectMaterial(material) {
      this.selectedMaterial = material;
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
.material-table,
.material-panel,
.material-info {
  display: inline-block;
  vertical-align: top;
}

.material-table {
  width: 60%;
}

.material-panel {
  width: 40%;
}

.title,
.stage,
.type {
  width: 33%;
}
</style>
