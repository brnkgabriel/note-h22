<template>
  <div class="question">
    <form>
      <div>
        <label for="serial">Serial #</label>
        <input type="number" v-model="question.serial" id="serial"/>
      </div>
      <div>
        <label for="stage">Stage</label>
        <input type="number" v-model="question.stage" id="stage"/>
      </div>
      <div v-if="question.img !== ''">
        <label for="image">Image</label>
        <input type="file" name="image" id="image" accept="image/*">
        <input type="submit">
      </div>
      <div>
        <label for="question">Question</label>
        <textarea id="question" cols="30" rows="10" v-model="question.question"></textarea>
      </div>
      <div>
        <label for="option">Options</label>
        <input type="text" id="option" v-model="option.value" />
        <input type="number" name="pts" v-model="option.pts" />
        <button @click="storeOption">Store Option</button>
      </div>
      <ul>
        <li v-for="(option, index) in question.options" :key="index">
          <button @click.prevent="selectAnswer(option)">{{ option.value }} ({{ option.pts }})</button> <button @click.prevent="deleteOption(option)">x</button>
        </li>
      </ul> 
      <div>
        <label for="answer">Answer is: </label><span>{{question.answer}}</span>
      </div>
      <div>
        <label for="type">Type: </label>
        <select v-model="question.type">
          <option v-for="(type, index) in types" :key="index">{{type}}</option>
        </select>
      </div>
      <div id="preview">
        <h3>Preview Question</h3>
        <p>Id is: {{question.id}}</p>
        <p>Question is: {{question.question}}</p>
        <p>Options:</p>
        <ul>
          <li v-for="(option, index) in question.options" :key="index">{{option}}</li>
        </ul>
        <p>Answer is: {{question.answer}}</p>
        <p>Type is: {{question.type}}</p>
      </div>
    </form>
  </div>
</template>

<script>
import util from "../../../util";
export default {
  props: ["question"],
  data() {
    return {
      types: util.questionTypes,
      option: {
        key: "#",
        value: "#",
        pts: 0
      }
    };
  },
  methods: {
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
    selectAnswer(value) {
      this.question.answer = value;
    },
    deleteOption(option) {
      this.question.options = this.question.options.filter(opt => {
        return opt.key != option.key;
      });
    }
  }
};
</script>
