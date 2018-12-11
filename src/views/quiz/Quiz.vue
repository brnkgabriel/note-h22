<template>
  <div id="quiz" v-if="response">
    <h1>Quiz</h1>
    <div class="tabs">
      <div class="tab">
        <input type="radio" name="checkbox-tabs-group" id="worship" class="checkboxtab" checked>
        <label for="worship">Worship</label>
        <div class="content">Worship Content</div>
      </div>
      <div class="tab">
        <input type="radio" name="checkbox-tabs-group" id="message" class="checkboxtab">
        <label for="message">Message</label>
        <div class="content">Message Content</div>
      </div>
      <div class="tab">
        <input type="radio" name="checkbox-tabs-group" id="bible" class="checkboxtab">
        <label for="bible">Bible</label>
        <div class="content">Bible Content</div>
      </div>
      <div class="tab">
        <input type="radio" name="checkbox-tabs-group" id="book" class="checkboxtab">
        <label for="book">Book</label>
        <div class="content">Book Content</div>
      </div>
      <div class="tab">
        <input type="radio" name="checkbox-tabs-group" id="picture" class="checkboxtab">
        <label for="picture">Picture</label>
        <div class="content">Picture Content</div>
      </div>
    </div>
    <div v-for="(material, index) in materials" :key="index">
      <ul>
        <li v-for="(questionObj, index) in material.questions" :key="index">
          {{questionObj.question}}
        </li>
      </ul>
    </div>
    
    {{student.user_data.quiz_status}}
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
      materials: [],
      response: null
    };
  },
  created() {
    var dbStudent = JSON.parse(localStorage.getItem("student"));
    var dbMaterials = JSON.parse(localStorage.getItem("materials"))
    // this.student = util.decodeStudent(dbStudent, dbMaterials);

    util.fetchMaterials();
    bus.$on('incomingMaterials', (materials) => {
      this.student = util.decodeStudent(dbStudent, materials);
      this.materials = materials;
    })
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
</script>

<style scoped>
.tabs {
  position: relative;
  clear: both;
}

.tabs .tab {
  float: left;
}
.tabs .tab .content {
  position: absolute;
  background-color: white;
  left: 0px;
  width: 100%;
  border: 1px solid black;
}
.checkboxtab {
  display: none;
}
.tab label {
  margin-right: 10px;
}
.checkboxtab:checked ~ label {
  color: #ab70ff;
  border: 1px solid black;
}
.checkboxtab:checked ~ .content {
  z-index: 1;
}
</style>
