<template>
  <div class="question">
    <form>
      <div>
        <label for="question">Question</label>
        <textarea id="question" cols="30" rows="10" v-model="question.question"></textarea>
      </div>
      <div v-if="multipleChoice">
        <label for="option">Options</label>
        <input type="text" id="option" v-model="option.value" />
        <input type="number" name="pts" v-model="option.pts" />
        <button @click="storeOption">Store Option</button>
      </div>
      <ul v-if="multipleChoice">
        <li v-for="(option, index) in question.options" :key="index" :class="answer(option)">
          <button @click.prevent="0">{{ option.value }} ({{ option.pts }})</button> <button @click.prevent="deleteOption(option)">x</button>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import util from "../../../util";
export default {
  props: ["question", "type"],
  data() {
    return {
      types: util.quizTypes,
      option: {
        key: "#",
        value: "#",
        pts: 0
      }
    };
  },
  computed: {
    multipleChoice: function () {
      return this.type === 'worship' ||
      this.type === 'message' ||
      this.type === 'picture'
    }
  },
  methods: {
    answer: function (option) {
      return parseInt(option.pts) > 0 ? 'answer' : '';
    },
    storeOption(evt) {
      evt.preventDefault();
      var optionValue = this.option.value.split(" ").join("-");
      console.log(optionValue);
      this.question.options.push({
        key: optionValue.toLowerCase(),
        value: this.option.value,
        pts: this.option.pts
      });
    },
    deleteOption(option) {
      this.question.options = this.question.options.filter(opt => {
        return opt.key != option.key;
      });
    }
  }
};
</script>

<style scoped>
.answer {
  background-color: green;
}
</style>
