<template>
  <div id="question">
    <div v-if="optioned" class="optioned">
      <div class="given-question">{{question.question}}</div>
      <div class="options">
        <div class="option" v-for="(option, index) in question.options" :key="index">
          {{option.value}}
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
  color: white !important;
}
</style>
