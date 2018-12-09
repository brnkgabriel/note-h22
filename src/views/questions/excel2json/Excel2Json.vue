<template>
  <div id="excel">
    <div> 
      <label for="title">title</label>
      <textarea
      name="title"
      id="title"
      cols="30"
      rows="10"
      v-model="title"></textarea>
    </div>
    <div>
      <label for="location">location</label>
      <textarea
      name="location"
      id="location"
      cols="30"
      rows="10"
      v-model="location"></textarea>
    </div>
    <div>
      <label for="author">Author</label>
      <textarea
      name="author"
      id="author"
      cols="30"
      rows="10"
      v-model="author"></textarea>
    </div>
    <div>
      <label for="type">Type</label>
      <textarea
      name="type"
      id="type"
      cols="30"
      rows="10"
      v-model="type"></textarea>
    </div>
    <div>
      <label for="stage">Stage</label>
      <textarea
      name="stage"
      id="stage"
      cols="30"
      rows="10"
      v-model="stage"></textarea>
    </div>
    <button @click="processInputs">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      jsonObjects: [],
      codeRegEx: /\r\n|\n\r|\n|\r/g,
      title: "",
      location: "",
      author: "",
      type: "",
      stage: "",
    };
  },
  methods: {
    processInputs: function() {
      var titleArray = this.title.split(this.codeRegEx);
      var locationArray = this.location.split(this.codeRegEx);
      var authorArray = this.author.split(this.codeRegEx);
      var typeArray = this.type.split(this.codeRegEx);
      var stageArray = this.stage.split(this.codeRegEx);
      console.log('titleArray', titleArray);
      console.log('locationArray', locationArray);
      console.log('authorArray', authorArray);
      console.log('typeArray', typeArray);
      console.log('stageArray', stageArray);

      if (
        titleArray.length === locationArray.length &&
        titleArray.length === authorArray.length &&
        titleArray.length === typeArray.length &&
        titleArray.length === stageArray.length
      ) {
        for (var i = 0; i < titleArray.length; i++) {
          var jsonObject = {
            title: titleArray[i],
            location: locationArray[i],
            author: authorArray[i],
            type: typeArray[i],
            stage: stageArray[i]
          };

          this.jsonObjects.push(jsonObject);
        }
        localStorage.setItem("excel2json", JSON.stringify(this.jsonObjects));
      } else {
        alert("copied inputs are not same length");
      }
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
