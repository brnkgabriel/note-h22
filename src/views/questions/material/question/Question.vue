<template> 
  <div class="question-details"> 
    <h3>Material Question</h3>
    <div class="question">
      <label for="question">Question: </label>
      <textarea name="question" id="question" cols="30" rows="5" v-model="question.question" placeholder="Enter question..."></textarea>
    </div>
    <div class="question-picture-location" v-if="pictureQuestion">
      <input type="text" class="question-picture" placeholder="Enter picture url..." />
    </div>
    <div class="question-option-points" v-if="optionedQuestion">
      <input type="text" class="question-option" v-model="newOption.value" placeholder="Enter option..." />
      <input type="number" class="question-points" v-model="newOption.pts" placeholder="Enter points..." />
      <button @click="addOption(newOption)" class="add-option">Add Option</button>
    </div>
    <div class="question-actions">
      <button @click.prevent="addQuestion()" class="add-question">Add Question</button>
    </div>
  </div>
</template>

<script>
import { bus } from '../../../../main'
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
      bus.$emit('addQuestion', newQuestion)
    },
    removeOption: function (option) {
      this.question.options = this.question.options.filter(opt => {
        return opt.key !== option.key
      })
    },
    addOption(newOption) {
      newOption.key = newOption.value.split(' ').join('-').toLowerCase();
      this.question.options.push({
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
ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
li  {
  display: inline-block;
  max-width: 100px;
  width: 100%;
  background-color: yellow;
  margin: 5px;
}

.question-option-points {
  text-align: center;
}

.question-option,
.question-picture {
  width: 90%;
  margin: 5px 2%;
}

.question-points {
  width: 20%;
  margin: 5px 1%;
}

.add-option {
  width: 68%;
  margin: 5px 1%
}

</style>
