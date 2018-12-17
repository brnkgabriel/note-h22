<template>
  <div id="material" v-if="material">
    <div class="material-info"> 
      <h3>Material Info</h3>
      <div class="edit-pane">
        <div class="title">
          <label for="title">Title:</label>
          <input type="text" id="title" v-model="material.title" />
        </div>
        <div class="author">
          <label for="author">Author:</label>
          <input type="text" id="author" v-model="material.author" />
        </div>
        <div class="location">
          <label for="location">Location:</label>
          <input type="text" id="location" v-model="material.location" />
        </div>
        <div class="stage">
          <label for="stage">Stage:</label>
          <input type="text" id="stage" v-model="material.stage" />
        </div>
        <select class="material-type" v-model="material.type">
          <label for="type">Type:</label>
          <option id="type" v-for="(type, index) in types" :key="index">{{type}}</option>
        </select>
      </div>
      <div class="preview-pane">
        <iframe class="preview-iframe" :src="material.location"></iframe>
        <div class="preview-title"><span class="-preview_title">Title: </span> {{material.title}}</div>
        <div class="preview-author"><span class="-preview_author">Author: </span> {{material.author}}</div>
        <div class="preview-stage"><span class="-preview_stage">Stage: </span> {{material.stage}}</div>
        <div class="preview-type"><span class="-preview_type">Type: </span> {{material.type}}</div>
      </div>
    </div>
    <div class="material-questions">
      <question class="question-details" :question="selectedQuestion" :type="material.type" />
      <div class="questions-list">
        <h3>List of Questions</h3>
        <input type="text" class="question-search" placeholder="search for question..."/>
        <ol>
          <li v-for="(question, index) in material.questions" :key="index">
            <span class="question-id" @click.prevent="selectQuestion(question)">{{question.uid}}</span> <span class="remove-question" @click.prevent="removeQuestion(question)">x</span>
          </li>
        </ol>
      </div>
    </div>
    <div class="question-actions">
      <button class="add-question">Add Question</button>
      <button class="save-question">Save Question</button>
    </div>
    <div class="material-actions">
      <button class="add-material">Add Material</button>
      <button class="save-material">Save Material</button>
    </div>
  </div>
</template>

<script>
import util from "../../../util"
import Question from "./question/Question.vue"

export default {
  props: ["material"],
  components: { Question },
  data() {
    return {
      types: util.quizTypes,
      selectedQuestion: null
    };
  },
  watch: {
    material: function (mat) {
      this.selectedQuestion = mat.questions[0];
    }
  },
  created() {
    this.selectedQuestion = this.material.questions[0]
  },
  methods: {
    selectQuestion: function(question) {
      this.selectedQuestion = question;
    },
    removeQuestion: function (question) {
      var originalQuestions = this.material.questions;
      this.material.questions = originalQuestions.filter(que => {
        return que.uid !== question.uid
      });
      this.selectedQuestion = this.material.questions[0];
    },
  }
};
</script>

<style scoped>
.edit-pane,
.preview-pane,
.questions-list,
.question-details {
  display: inline-block;
  vertical-align: top;
}

.edit-pane,
.preview-pane,
.questions-list,
.question-details{
  width: 50%;
}

.preview-iframe {
  width: 95%;
}

.question-option,
.question-points {
  width: 40%;
}

ol {
  padding: 0;
}
</style>
