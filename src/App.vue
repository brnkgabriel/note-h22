<template>
  <div id="app">
    <navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue' 
export default {
  components: {
    Navbar
  },
  created() {
    this.$store.dispatch('getStudents');
    this.$store.dispatch('getQuestions');
    this.$store.dispatch('getMaterials')
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Montserrat');

@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "icomoon";
  src: url("./assets/fonts/icomoon/icomoon.eot?u59ytb");
  src: url("./assets/fonts/icomoon/icomoon.eot?#iefixu59ytb")
      format("embedded-opentype"),
    url("./assets/fonts/icomoon/icomoon.woff?u59ytb")
      format("woff"),
    url("./assets/fonts/icomoon/icomoon.ttf?u59ytb")
      format("truetype"),
    url("./assets/fonts/icomoon/icomoon.svg?u59ytb#icomoon")
      format("svg");
}
body {
  margin: 0;
  padding: 0;
  background-color: #F1ECFF;
}
#app * {
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  color: #2E3037;
}

h3 {
  margin: 7px 0px 3px 0px;
}
/* Icons */
.icon::before {
  z-index: 10;
  display: inline-block;
  margin: 0 0.4em 0 0;
  vertical-align: middle;
  text-transform: none;
  font-weight: normal;
  font-variant: normal;
  font-size: 1.3em;
  font-family: "icomoon";
  line-height: 1;
  speak-as: none;
  -webkit-backface-visibility: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-worship::before {
  content: "\e60b";
}

.icon-message::before {
  content: "\e60f";
}

.icon-bible::before {
  content: "\e60c";
}

.icon-book::before {
  content: "\e60d";
}

.icon-picture::before {
  content: "\e60e";
}

.icon-edit::before {
  content: "\e60a";
}

.icon-delete::before {
  content: "\e610"
}

.icon-basket::before {
  content: "\e611"
}
</style>
