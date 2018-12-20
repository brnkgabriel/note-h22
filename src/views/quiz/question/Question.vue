<template>
  <div id="question">
    <div v-if="optioned" class="optioned">
      <div :class="question.uid">{{question.question}}</div>
      <div class="options">
        <div :class="'option ' + question.uid + '-' + option.key" v-for="(option, index) in question.options" :key="index" @click.prevent="selectOption(option)">
          <div class="option-value">{{option.value}}</div>
          <div class="option-points">{{option.pts}}</div>
        </div>
      </div>
    </div>
    <div v-if="typed" class="type">
      <div class="given-question">{{question.question}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["question", "type"],
  data() {
    return {
      options: [],
      basket: null
    };
  },
  computed: {
    optioned: function() {
      var optionedTypes = ["worship", "message", "picture"];
      return optionedTypes.find(type => type === this.type);
    },
    typed: function() {
      var typedTypes = ["bible", "book"];
      return typedTypes.find(type => type === this.type);
    }
  },
  methods: {
    optionType: function (option) {
      if (parseInt(option.pts) > 0) { return 'right-opt' }
      return 'wrong-opt'
    },
    selectOption: function (option) {
      var uid = this.question.uid + '-';
      var question = document.querySelector('.' + this.question.uid);

      this.question.options.forEach(option => {
        var optionEl = document.querySelector('.' + uid + option.key);
        optionEl.classList.add('show-score');
        optionEl.classList.add(this.optionType(option))
      })
      
      if (parseInt(option.pts) > 0) { question.classList.add('correct'); }
      else { question.classList.add('wrong') }
    }
  }
};
</script>

<style scoped>
.icon-basket::before {
  font-size: 8em;
  margin: 0;
}

.over.icon-basket::before {
  color: red;
}

.icon-basket {
  display: inline-block;
}

.option {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  max-width: 150px;
  background-color: gray;
  margin: 1%;
  position: relative;
}

.option-value,
.option-points {
  display: inline-block;
  color: white !important;
}

.option-points {
  position: absolute;
  right: 3%;
  opacity: 0;
}

.option.show-score>.option-points {
  opacity: 1;
}

.correct {
  color: green !important;
}

.wrong {
  color: red !important;
}

.right-opt {
  background-color: green;
}

.wrong-opt {
  background-color: red;
}

</style>
