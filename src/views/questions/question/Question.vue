<template>
  <div class="question">
    <form>
      <div>
        <label for="serial-number">Serial #</label>
        <input type="number" id="serial-number"/>
      </div>
      <div>
        <label for="stage">Stage</label>
        <input type="number" id="stage"/>
      </div>
      <div>
        <label for="question">Question</label>
        <textarea id="question" cols="30" rows="10" v-model="question"></textarea>
      </div>
      <div>
        <label for="option">Options</label>
        <input type="text" id="option" v-model="option.value" />
        <input type="number" name="pts" v-model="option.pts" />
        <button @click="storeOption">Store Option</button>
      </div>
      <ul>
        <li v-for="(option, index) in options" :key="index">
          <button @click.prevent="selectAnswer(option)">{{ option.value }} ({{ option.pts }})</button> <button @click.prevent="deleteOption(option)">x</button>
        </li>
      </ul> 
      <div>
        <label for="answer">Answer is: </label><span>{{answer}}</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '#|#',
      question: '#?',
      options: [],
      option: {
        key: '#',
        value: '#',
        pts: 0
      },
      answer: null,
      type: '#',
    }
  },
  methods: {
    storeOption(evt) {
      evt.preventDefault();
      var optionValue = this.option.value.split(' ').join('-')
      console.log(optionValue);
      this.options.push({
        key: optionValue.toLowerCase(),
        value: this.option.value,
        pts: this.option.pts
      })
    },
    selectAnswer(value) {
      this.answer = value;
    },
    deleteOption(option) {
      this.options = this.options.filter(opt => {
        return opt.key != option.key;
      })
    }
  }
}
</script>
