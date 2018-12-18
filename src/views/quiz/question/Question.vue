<template>
  <div id="question">
    <div v-if="optioned" class="optioned">
      <div class="given-question">{{question.question}}</div>
      <div class="option" v-for="(option, index) in question.options" :key="index">
        {{option.value}}
      </div>
    </div>
    <div v-if="typed" class="type">
      <div class="given-question">{{question.question}}</div>
      <div class="option" v-for="(option, index) in question.options" :key="index">
        {{option.value}}
      </div>
    </div>
    <div class="icon icon-basket"></div>
  </div>
</template>

<script>
export default {
  props: ['question', 'type'],
  computed: {
    optioned: function () {
      console.log('from question type is', this.type)
      var optionedTypes = ['worship', 'message', 'picture'];
      return optionedTypes.find(type => type === this.type)
    },
    typed: function () {
      var typedTypes = ['bible', 'book'];
      return typedTypes.find(type => type === this.type)
    }
  }
}
</script>

<style scoped>

</style>
