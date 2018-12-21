<template>
  <div id="material" v-if="material">
    <div class="material-info"> 
      <h3>Material Info</h3>
      <div class="edit-pane">
        <div class="title">
          <label for="title" class="label">Title:</label>
          <input type="text" class="element" id="title" v-model="material.title" placeholder="Enter title..." />
        </div>
        <div class="author">
          <label for="author" class="label">Author:</label>
          <input type="text" class="element" id="author" v-model="material.author" placeholder="Enter author..." />
        </div>
        <div class="location">
          <label for="location" class="label">Location:</label>
          <input type="text" class="element" id="location" v-model="material.location" placeholder="Enter location..." />
        </div>
        <div class="stage">
          <label for="time" class="label">Time:</label>
          <input type="text" class="element" disabled id="time" v-model="material.time" placeholder="Click left to select time..." />
        </div>
        <div class="type"> 
          <label for="type" class="label">Type:</label>
          <select  class="element" v-model="material.type">
            <option id="type" v-for="(type, index) in types" :key="index">{{type}}</option>
          </select>
        </div>
      </div>
      <div class="preview-pane">
        <iframe class="preview-iframe" :src="material.location"></iframe>
        <div class="preview-title"><span class="-preview_title">Title: </span> {{material.title}}</div>
        <div class="preview-author"><span class="-preview_author">By: </span> {{material.author}}</div>
        <!-- <div class="preview-type"><span class="-preview_type">Category: </span> {{material.type}} | <span class="-preview_stage">Stage: </span> {{material.stage}}</div> -->
        <div class="question-preview">
          <h3>Question Preview</h3>
          <div class="preview-question">{{selectedQuestion.question}}</div>
          <ul v-if="optionedQuestion">
            <li v-for="(option, index) in selectedQuestion.options" :key="index" class="option">
              {{option.value}} ({{option.pts}}) <span class="remove-option" @click.prevent="removeOption(option)">x</span>
            </li>
          </ul>
        </div>
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
  </div>
</template>

<script>
import util from "../../../util";
import Question from "./question/Question.vue";
import { bus } from "../../../main";

export default {
  props: ["material"],
  components: { Question },
  data() {
    return {
      types: util.quizTypes,
      times: util.bibleTimeline,
      selectedQuestion: null
    };
  },
  watch: {
    material: function(mat) {
      this.selectedQuestion = mat.questions[0];
    }
  },
  created() {
    this.selectedQuestion = this.material.questions[0];
    bus.$on("addQuestion", question => {
      this.material.questions.unshift(question);
      this.selectedQuestion = this.material.questions[0];
    });
  },
  computed: {
    optionedQuestion: function () {
      return this.material.type === 'worship' ||
      this.material.type === 'message' ||
      this.material.type === 'picture'
    },
  },
  methods: {
    selectQuestion: function(question) {
      this.selectedQuestion = question;
    },
    removeQuestion: function(question) {
      var originalQuestions = this.material.questions;
      this.material.questions = originalQuestions.filter(que => {
        return que.uid !== question.uid;
      });
      this.selectedQuestion = this.material.questions[0];
    },
    removeOption: function (option) {
      this.selectedQuestion.options = this.selectedQuestion.options.filter(opt => {
        return opt.key !== option.key
      })
    },
  }
};
</script>

<style scoped>

#material {
  text-align: center;
}

.preview-iframe {
  width: 95%;
}

ol {
  padding: 0;
}

.material-info,
.material-questions {
  display: inline-block;
  width: 48%;
  vertical-align: top;
  margin: 0 1%;
  background-color: aqua;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
li.option  {
  display: inline-block;
  max-width: 120px;
  width: 100%;
  background-color: yellow;
  margin: 5px;
}

.label,
.element {
  display: inline-block;
  vertical-align: middle;
}

.label {
  width: 30%;
}

.element {
  width: 65%;
}

.question-option,
.question-points {
  width: 40%;
}


.question-search {
  width: 90%;
}
</style>
