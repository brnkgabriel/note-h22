import beforeRouteEnter from "./beforeRouteEnter-quiz";
import util from "../../util";
import { bus } from "../../main";
import Question from './question/Question.vue'

export default {
  components: { Question },
  data() {
    return {
      student: null,
      materials: [],
      quizTypes: util.quizTypes,
      timeline: null,
      currentPage: 1,
      recordsPerPage: 15,
      search: ''
    };
  },
  computed: {
    searched: function () {
      return this.searchBox;
    }
  },
  mounted: function () {
    this.gotoPage('', util.bibleTimeline);
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
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    updateStudent: function (evt) {
      evt.preventDefault();
      this.$store.dispatch("updateStudent", util.encodeStudent(this.student));
    },
    gotoPage: function (page) {
      if (page) { page === 'prev' ? this.prevPage() : this.nextPage(); }
      return this.changePage(this.currentPage);
    },
    changePage: function (page) {
      var numPages = this.numPages(), start, end; 
      if (page === numPages) {
        start = (page - 1) * this.recordsPerPage;
        end = util.bibleTimeline.length - 1;
      } else {
        end = (page * this.recordsPerPage) - 1;
        start = end - this.recordsPerPage + 1;
      }
      this.timeline = util.bibleTimeline.slice(start, end);
    },
    prevPage: function () {
      this.currentPage--;
      if (this.currentPage < 1) { this.currentPage = this.numPages();  }
    },
    nextPage: function () {
      this.currentPage++;
      if (this.currentPage > this.numPages()) { this.currentPage = 1; }
    },
    numPages: function () {
      return Math.ceil(util.bibleTimeline.length / this.recordsPerPage);
    }
  }
};