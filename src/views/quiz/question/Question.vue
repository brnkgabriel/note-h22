<template>
  <div id="question">
    <div v-if="optioned" class="optioned">
      <div class="given-question">{{question.question}}</div>
      <div class="options" data-drop-target="true">
        <div class="option" v-for="(option, index) in question.options" :key="index" draggable="true">
          {{option.value}}
        </div>
      </div>
      <div class="icon icon-basket" data-drop-target="true"></div>
    </div>
    <div v-if="typed" class="type">
      <div class="given-question">{{question.question}}</div>
    </div>
  </div>
</template>

<script>
import DragDiv from "../../../drag-div";
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
  mounted() {
    var draggable = document.querySelectorAll("[draggable]");
    var targets = document.querySelectorAll("[data-drop-target]");
    var dragDiv = new DragDiv();
    

    draggable.forEach(element => {
      element.addEventListener('dragstart', dragDiv.start);
    })

    targets.forEach(element => {
      element.addEventListener("dragover", dragDiv.over);
      element.addEventListener("dragenter", dragDiv.enter);
      element.addEventListener("dragleave", dragDiv.leave);
      element.addEventListener("drop", dragDiv.drop);
    })
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
