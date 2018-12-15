<template>
  <div id="quiz" v-if="student">
    <h1>Quiz</h1>
    <!-- <div v-for="(material, index) in materials" :key="index">
      <ul>
        <li v-for="(questionObj, index) in material.questions" :key="index">
          {{questionObj.question}}
        </li>
      </ul>
    </div> -->
    <div class="tabs tabs-style-underline">
      <nav>
        <ul>
          <li v-for="(quiz, index) in nextQuiz" :key="index">
            <a :href="'#section-' + quiz.type" :class="'icon icon-' + quiz.type">
              <span>{{quiz.type}}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="content-wrap">
        <section v-for="(quiz, index) in nextQuiz" :key="index" :id="'section-' + quiz.type">
          <ul>
            <li v-for="(question, index) in quiz.questions" :key="index">
              <question :question="question" :type="quiz.type"  />  
            </li> 
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import beforeRouteEnter from "./beforeRouteEnter-quiz";
import methods from "./methods-quiz";
import util from "../../util";
import CBPFWTabs from "../../cbpFWTabs";
import { bus } from "../../main";
import Question from './question/Question.vue'
export default {
  components: {
    Question
  },
  data() {
    return {
      student: null,
      materials: []
    };
  },
  computed: {
    nextQuiz: function () {
      var quiz = util.getQuestions(
        this.student.user_data.nextQuiz, this.materials
      );
      console.log('quiz', quiz);
      return quiz
    }
  },
  created() {
    this.student = util.localStorage().student;
    this.materials = util.localStorage().materials;
    util.fetchMaterials();

    console.log(this.student);
    
    bus.$on("incomingMaterials", () => {
      this.student = util.localStorage().student;
      this.materials = util.localStorage().materials;
    });
  },
  mounted() {
    (function () {
      [].slice.call( document.querySelectorAll( '.tabs' ) )
      .forEach(function (el) {
        new CBPFWTabs(el);
      })
    })();
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: methods
};
</script>

<style scoped>
@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "stroke7pixeden";
  src: url("../../assets/fonts/stroke7pixeden/stroke7pixeden.eot?u58ytb");
  src: url("../../assets/fonts/stroke7pixeden/stroke7pixeden.eot?#iefixu58ytb")
      format("embedded-opentype"),
    url("../../assets/fonts/stroke7pixeden/stroke7pixeden.woff?u58ytb")
      format("woff"),
    url("../../assets/fonts/stroke7pixeden/stroke7pixeden.ttf?u58ytb")
      format("truetype"),
    url("../../assets/fonts/stroke7pixeden/stroke7pixeden.svg?u58ytb#stroke7pixeden")
      format("svg");
}
@font-face {
  font-weight: normal;
  font-style: normal;
  font-family: "icomoon";
  src: url("../../assets/fonts/icomoon/icomoon.eot?u59ytb");
  src: url("../../assets/fonts/icomoon/icomoon.eot?#iefixu59ytb")
      format("embedded-opentype"),
    url("../../assets/fonts/icomoon/icomoon.woff?u59ytb")
      format("woff"),
    url("../../assets/fonts/icomoon/icomoon.ttf?u59ytb")
      format("truetype"),
    url("../../assets/fonts/icomoon/icomoon.svg?u59ytb#icomoon")
      format("svg");
}
/* from tabs.css */
.tabs {
  position: relative;
  overflow: hidden;
  margin: 0 auto;
  width: 100%;
  font-weight: 300;
  font-size: 1.25em;
}

/* Nav */
.tabs nav {
  text-align: center;
}

.tabs nav ul {
  margin: 0 auto;
  padding: 0;
  max-width: 1200px;
  list-style: none;
}

.tabs nav ul li {
  display: inline-block;
  align-items: center;
  position: relative;
  z-index: 1;
  margin: 0;
  text-align: center;
}

.tabs nav a {
  position: relative;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 2.5;
}

.tabs nav a span {
  vertical-align: middle;
  font-size: 0.75em;
}

.tabs nav li.tab-current a {
  color: #74777b;
}

.tabs nav a:focus {
  outline: none;
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
  content: "\e60a";
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

.icon-upload::before {
  content: "\e68a";
}

.icon-tools::before {
  content: "\e60a";
}


.icon-plane::before {
  content: "\e625";
}

.icon-joy::before {
  content: "\e6a4";
}

.icon-plug::before {
  content: "\e69a";
}

.icon-home::before {
  content: "\e648";
}

.icon-gift::before {
  content: "\e652";
}

.icon-display::before {
  content: "\e65e";
}

.icon-date::before {
  content: "\e660";
}

.icon-config::before {
  content: "\e666";
}

.icon-coffee::before {
  content: "\e669";
}

.icon-camera::before {
  content: "\e66f";
}

.icon-box::before {
  content: "\e674";
}

/* Content */
.content-wrap {
  position: relative;
}

.content-wrap section {
  display: none;
  margin: 0 none;
  padding: 1em;
  max-width: 1200px;
  text-align: center;
}

.content-wrap section.content-current {
  display: block;
}

.content-wrap section p {
  margin: 0;
  padding: 0.75em 0;
  color: rgba(40, 44, 42, 0.05);
  font-weight: 900;
  font-size: 4em;
  line-height: 1;
}

@media screen and (max-width: 58em) {
  .tabs nav a.icon span {
    display: none;
  }

  .tabs nav a:before {
    margin-right: 0;
  }
}

/* from tabstyles.css */
.tabs-style-underline nav {
  background: #fff;
}

.tabs-style-underline nav a {
  padding: 0 10px;
  border-left: 1px solid #e7ecea;
  -webkit-transition: color 0.2s;
  transition: color 0.2s;
}

.tabs-style-underline nav li:last-child a {
  border-right: 1px solid #e7ecea;
}

.tabs-style-underline nav li a::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: #2cc185;
  content: "";
  -webkit-transition: -webkit-transform 0.3s;
  transition: transform 0.3s;
  -webkit-transform: translate3d(0, 150%, 0);
  transform: translate3d(0, 150%, 0);
}

.tabs-style-underline nav li.tab-current a::after {
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.tabs-style-underline nav a span {
  font-weight: 700;
}
</style>
