<template>
  <div id="quiz" v-if="student">
    <h1>Quiz</h1>
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
      return quiz
    }
  },
  created() {
    this.student = util.localStorage().student;
    this.materials = util.localStorage().materials;
    util.fetchMaterials();
    
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
ul {
  padding: 0;
  list-style: none;
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

/* Content */
.content-wrap {
  position: relative;
}

.content-wrap section {
  display: none;
  margin: 0 none;
  /* padding: 1em; */
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
  text-decoration: none;
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
