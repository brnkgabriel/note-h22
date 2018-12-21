<template>
  <div id="quiz" v-if="student">
    <h1>Quiz</h1>
    <div id="wrapper">
      <input type="checkbox" id="menu" name="menu" class="menu-checkbox"/>
      <div class="menu">
        <label for="menu" class="menu-toggle icon icon-menu-toggle"></label>
        <ul>
          <li v-for="(time, index) in timeline" :key="index">
            <label :for="'menu-' + index">{{time.date}} <span class="icon icon-arrow-right"></span></label>
            <input type="checkbox" :id="'menu-' + index" :name="'menu-' + index" class="menu-checkbox"/>
            <div class="menu">
              <label :for="'menu-' + index" class="menu-toggle icon icon-menu-toggle"></label>
              <ul>
                <li v-for="(event, index) in time.events" :key="index"><a href="#">{{event}}</a></li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- <ul class="timeline">
      <li class="time" v-for="(time, index) in timeline" :key="index">
        {{time.date}}
      </li>
    </ul> -->
    <div class="tabs tabs-style-underline">
      <nav>
        <ul>
          <li v-for="(type, index) in quizTypes" :key="index">
            <a :href="'#section-' + type" :class="'icon icon-' + type">
              <span>{{type}}</span>
            </a>
          </li>
        </ul>
      </nav>
      <div class="content-wrap">
        <section v-for="(quiz, index) in quizTypes" :key="index" :id="'section-' + quiz.type">
          <ul>
            <li>
              {{index}}
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
  components: { Question },
  data() {
    return {
      student: null,
      materials: [],
      quizTypes: util.quizTypes,
      timeline: util.bibleTimeline
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
  /* width: 100%; */
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
  background: #2E3037;
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

.timeline {
  height: 530px;
  width: auto;
  overflow-x: hidden;
  overflow-y: scroll;
  margin: 0 auto;
  white-space: nowrap;
}

/* .tabs,
.timeline {
  display: inline-block;
  vertical-align: top;
} */

/* .tabs {
  width: 80%;
}

.timeline {
  width: 10%;
} */

.time {
  /* display: inline-block; */
  margin: 5px;
}

#quiz {
  text-align: center;
  /* position: relative; */
}

/*********************** timeline css *************************/
#wrapper {
  position: absolute;
  width: 30%;
  height: 100%;
  overflow: scroll;
  z-index: 1;
}

label {
  cursor: pointer;
}

label:focus {
  outline: none;
}

.menu {
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  width: 240px;
  height: 100%;
  transform: translate3d(-240px,0,0);
  transition: transform 0.35s;
}

.menu label.menu-toggle {
  position: absolute;
  right: -60px;
  width: 60px;
  height: 60px;
  line-height: 60px;
  display: block;
  padding: 0;
  text-align: center;
  background-color: white;
}

.menu label.menu-toggle * {
  color: black;
}

.menu ul li a,
.menu ul li label {
  display: block;
  text-align: center;
  padding: 0 20px;
  line-height: 60px;
  text-decoration: none;
  color: #000;
}

.menu ul li a:hover,
.menu ul li label:hover {
  color: #666;
}

.menu-checkbox {
  display: none;
}

.menu .menu label.menu-toggle {
  background: none;
}

.menu-checkbox:checked + .menu {
  transform: translate3d(0,0,0);
}
</style>
