<template> 
  <div class="question-details"> 
    <h3>Material Question</h3>
    <div class="question">
      <label for="question">Question: </label>
      <textarea name="question" id="question" cols="30" rows="5" v-model="question.question"></textarea>
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
      <div class="preview-question">{{question.question}}</div>
      <ul v-if="optionedQuestion">
        <li v-for="(option, index) in question.options" :key="index">
          {{option.value}} ({{option.pts}}) <span class="remove-option" @click.prevent="removeOption(option)">x</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['question', 'type'],
  data() {
    return {
      newOption: {
        pts: null,
        key: '',
        value: ''
      },
      compQuestion: ''
    }
  },
  computed: {
    optionedQuestion: function () {
      return this.type === 'worship' ||
      this.type === 'message' ||
      this.type === 'picture'
    },
    typingQuestion: function () {
      return this.type === 'bible' || this.type === 'book'
    },
    pictureQuestion: function () {
      return this.type === 'picture'
    }
  },
  methods: {
    addQuestion() {
      var newQuestion = {
        uid: "question-" + +new Date(),
        question: "Enter Question...",
        options: []
      };
    },
    removeOption: function (option) {
      this.question.options = this.question.options.filter(opt => {
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
</style>
