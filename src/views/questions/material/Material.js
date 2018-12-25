
import util from "../../../util";
import Question from "./question/Question.vue";
import { bus } from "../../../main";

export default {
  props: ["material"],
  components: { Question },
  data() {
    return {
      types: util.quizTypes,
      times: util.bibleTimeline,
      selectedQuestion: null
    };
  },
  watch: {
    material: function(mat) {
      this.selectedQuestion = mat.questions[0];
    }
  },
  created() {
    this.selectedQuestion = this.material.questions[0];
    bus.$on("addQuestion", question => {
      this.material.questions.unshift(question);
      this.selectedQuestion = this.material.questions[0];
    });
  },
  computed: {
    optionedQuestion: function () {
      return this.material.type === 'worship' ||
      this.material.type === 'message' ||
      this.material.type === 'picture'
    },
  },
  methods: {
    selectQuestion: function(question) {
      this.selectedQuestion = question;
    },
    removeQuestion: function(question) {
      var originalQuestions = this.material.questions;
      this.material.questions = originalQuestions.filter(que => {
        return que.uid !== question.uid;
      });
      this.selectedQuestion = this.material.questions[0];
    },
    removeOption: function (option) {
      this.selectedQuestion.options = this.selectedQuestion.options.filter(opt => {
        return opt.key !== option.key
      })
    },
  }
};