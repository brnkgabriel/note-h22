<template>
  <div id="material">
    <h3>Add Material</h3>
    <div> 
      <label for="title">title</label>
      <input id="title" v-model="title"/>
    </div>
    <div>
      <label for="location">location</label>
      <input id="location" v-model="location"/>
    </div>
    <div>
      <label for="author">Author</label>
      <input id="author" v-model="author"/>
    </div>
    <div>
      <label for="type">Type</label>
      <select v-model="type">
        <option v-for="(type, index) in types" :key="index" :value="type">{{type}}</option>
      </select>
    </div>
    <div>
      <label for="stage">Stage</label>
      <input id="stage" v-model="stage"/>
    </div>
    <button @click="addMaterial">Add Material</button>
  </div>
</template>

<script>
import util from '../../../util'
export default {
  data() {
    return {
      title: "",
      location: "",
      author: "",
      type: "",
      stage: "",
      types: util.questionTypes
    };
  },
  methods: {
    addMaterial() {
      var material = {
        author: this.author,
        location: this.location,
        questions: [{
          img: 'changeThisFakeImage.png',
          options: [{
            key: 'change-this-fake-key',
            value: 'change this fake key',
            pts: 0
          }],
          question: 'change this fake question',
          uid: 'question-' + +new Date
        }],
        stage: this.stage,
        title: this.title,
        type: this.type,
        uid: 'material-' + +new Date
      }
      this.$store.dispatch('addMaterial', material);
    }
  }
};
</script>

<style scoped>
label,
textarea {
  display: inline-block;
  vertical-align: middle;
}

</style>
