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
          <option v-for="(type, index) in types" :key="index">{{type}}</option>
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
      <div class="question-details"> 
        <h3>Material Question</h3>
        <div class="question">
          <label for="question">Question: </label>
          <textarea name="question" id="question" cols="30" rows="5" v-model="selectedQuestion.question"></textarea>
        </div>
        <div class="question-picture-location" v-if="pictureQuestion">
          <input type="text" class="question-picture" placeholder="enter picture url..." />
        </div>
        <div class="question-option-points" v-if="optionedQuestion">
          <input type="text" class="question-option" v-model="newOption.value" placeholder="option..." />
          <input type="number" class="question-points" v-model="newOption.pts" placeholder="points..." />
          <button @click="addOption(newOption)">Add Option</button>
        </div>
        <div class="question-preview">
          <h3>Question Preview</h3>
          <div class="preview-question">{{selectedQuestion.question}}</div>
          <ul>
            <li v-for="(option, index) in selectedQuestion.options" :key="index">
              {{option.value}} ({{option.pts}}) <span class="remove-option" @click.prevent="removeOption(option)">x</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="questions-list">
        <h3>List of Questions</h3>
        <input type="text" class="question-search" placeholder="search for question..."/>
        <ol>
          <li v-for="(question, index) in material.questions" :key="index" @click.prevent="selectQuestion(question)">
            {{question.uid}}
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
import util from "../../../util";
export default {
  props: ["material"],
  data() {
    return {
      types: util.quizTypes,
      selectedQuestion: null,
      newOption: {
        pts: null,
        key: '',
        value: ''
      }
    };
  },
  created() {
    this.selectedQuestion = this.material.questions[0]
  },
  computed: {
    optionedQuestion: function () {
      return this.material.type === 'worship' ||
      this.material.type === 'message' ||
      this.material.type === 'picture'
    },
    typingQuestion: function () {
      return this.material.type === 'bible' || this.material.type === 'book'
    },
    pictureQuestion: function () {
      return this.material.type === 'picture'
    }
  },
  methods: {
    selectQuestion: function(question) {
      this.selectedQuestion = question;
    },
    removeOption: function (option) {
      this.selectedQuestion.options = this.selectedQuestion.options.filter(opt => {
        return opt.key !== option.key
      })
    },
    addOption(newOption) {
      newOption.key = newOption.value.split(' ').join('-').toLowerCase();
      this.selectedQuestion.options.push({
        key: newOption.key,
        value: newOption.value,
        pts: newOption.pts
      });
      this.newOption['key'] = ''
      this.newOption['pts'] = null
      this.newOption['value'] = ''
    }
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
