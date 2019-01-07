import beforeRouteEnter from '../../util/beforeRouteEnter';
import { bus } from "../../main";
import all from '../../all'

export default {
  data() {
    return {
      user: null,
      materials: [],
      quizTypes: all.utilities.quizTypes,
      timeline: null,
      modal: null,
      currentPage: 1,
      recordsPerPage: 15,
      search: '',
      selectedTime: all.utilities.bibleTimeline[0],
      eventsClass: '',
      selectedMaterials: [],
      loadedMaterial: null,
      quizEnded: '',
      state: all.utilities.initialQuizState(''),
      nextQuestion: {
        title: '',
        options: [],
        uid: ''
      }
    };
  },
  computed: {
    searched: function () {
      var keys = ['date-string', 'events-array'];
      this.timeline = all.utilities
      .search(this.search, all.utilities.bibleTimeline, keys)
      return all.utilities
      .search(this.search, all.utilities.bibleTimeline, keys);
    },
    totalAggregate: function () {
      return all.utilities.aggregate(
        this.user.scores, this.materials, this.user.birthday
      );
    }
  },
  mounted: function () {
    this.gotoPage('', all.utilities.bibleTimeline); 
    this.modal = document.querySelector('.modal');
  },
  created() {
    all.utilities.studAndMat.call(this) 
    all.utilities.fetchMaterials();
    bus.$on("incomingMaterials", all.utilities.studAndMat.bind(this));
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    processresponse: function (nextQuestion, optionIdx) {
      all.quiz.processresponse(
        nextQuestion,optionIdx, this.state,
        this.loadedMaterial, this.user
      )
      this.$store.dispatch('updateUser', this.user)
      this.goToNextQuestion();
    },
    goToNextQuestion: function () {
      var next = this.loadedMaterial.questions[this.state['index']];
      if (next) { this.nextQuestion = next; this.quizEnded = '' }
      else { this.quizEnded = `You've completed quiz for ${this.loadedMaterial.title}` }
    },
    initializeState: function () {
      var quizStarted = this.user.scores.find(score => {
        return score.materialId === this.loadedMaterial.uid
      })  
      if (quizStarted) { this.state = quizStarted; }
      else { this.state = all.utilities.initialQuizState(this.loadedMaterial.uid); } 
      this.goToNextQuestion();
    },
    toggleModal: function () {
      all.utilities.toggleModal(this.modal, this.loadedMaterial)
    },
    loadMaterial: function (material) {
      this.loadedMaterial = material;
      this.initializeState();
      this.toggleModal();
    },
    selectTime: function (time) {
      this.selectedTime = time;
      this.eventsClass = 'open';
    },
    gotoPage: function (page) {
      var {timeline, cPage} = all.utilities.gotoPage(
        page, this.currentPage,
        this.recordsPerPage, all.utilities.bibleTimeline
      )
      this.timeline = timeline;
      this.currentPage = cPage;
    },
    selectMaterials: function (event) {
      var sMaterials = this.materials.filter(material => {
        return material.event.toLowerCase() === event.toLowerCase()
      })
      this.selectedMaterials = sMaterials;
      this.loadedMaterial = this.selectMaterials[0];
    }
  }
};