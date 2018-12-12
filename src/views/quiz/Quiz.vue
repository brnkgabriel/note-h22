<template>
  <div id="quiz" v-if="student">
    <h1>Quiz</h1>
    <div v-for="(material, index) in materials" :key="index">
      <ul>
        <li v-for="(questionObj, index) in material.questions" :key="index">
          {{questionObj.question}}
        </li>
      </ul>
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
      materials: []
    };
  },
  created() {
    var dbStudent = JSON.parse(localStorage.getItem('student'))
    var dbMaterials = JSON.parse(localStorage.getItem('materials'))
    this.student = util.decodeScoreAndScores(dbStudent, dbMaterials);
    util.fetchMaterials()
    bus.$on('incomingMaterials', (materials) => {
      var dbStud = JSON.parse(localStorage.getItem('student'))
      this.student = util.decodeScoreAndScores(dbStud, materials)
      this.materials = materials 
    }) 
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
</script>

<style scoped>

</style>
