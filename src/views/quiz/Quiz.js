import beforeRouteEnter from '../../util/beforeRouteEnter';
import util from "../../util";
import { bus } from "../../main";
import SideNav from './sidenav';
import all from '../../all'

export default {
  data() {
    return {
      user: null,
      materials: [],
      quizTypes: util.quizTypes,
      timeline: null,
      modal: null,
      currentPage: 1,
      recordsPerPage: 15,
      search: '',
      selectedTime: util.bibleTimeline[0],
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
      this.timeline = util.searched(this.search, util.bibleTimeline)
      return util.searched(this.search, util.bibleTimeline);
    },
    totalAggregate: function () {
      return all.utilities.aggregate(
        this.user.scores, this.materials, this.user.birthday
      );
    }
  },
  mounted: function () {
    this.gotoPage('', util.bibleTimeline);
    new SideNav();
    this.modal = document.querySelector('.modal');
  },
  created() {
    all.utilities.studAndMat.call(this)
    util.fetchMaterials();
    bus.$on("incomingMaterials", all.utilities.studAndMat.bind(this));
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    processresponse: function (nextQuestion, optionIdx) {
      all.quiz.processresponse(
        nextQuestion,optionIdx, this.state,
        this.loadedMaterial, this.user
      )
      this.$store.dispatch('updateuser', this.user)
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
      if (this.modal.classList.contains('is-visible')) 
      { this.loadedMaterial = null; }
      this.modal.classList.toggle('is-visible')
    },
    loadMaterial: function (material) {
      this.loadedMaterial = material;
      this.initializeState();
      this.toggleModal();
    },
    updateuser: function (evt) {
      evt.preventDefault();
      this.$store.dispatch("updateUser", util.encodeuser(this.user));
    },
    selectTime: function (time) {
      this.selectedTime = time;
      this.eventsClass = 'open';
    },
    gotoPage: function (page) {
      var {timeline, cPage} = all.utilities.gotoPage(
        page, this.currentPage,
        this.recordsPerPage, util.bibleTimeline
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
    },
    getThumbnail: function (embedLink) {
      var videoIdArray = embedLink.split('/');
      var videoId = videoIdArray[videoIdArray.length - 1];
      return 'https://img.youtube.com/vi/' + videoId + '/2.jpg';
    }
  }
};