import beforeRouteEnter from '../../util/beforeRouteEnter';
import util from "../../util";
import { bus } from "../../main";
import SideNav from './sidenav';

export default {
  data() {
    return {
      student: null,
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
      state: util.initialQuizState(''),
      nextQuestion: {
        title: '',
        options: [],
        uid: ''
      },
      // totalAggregate: 0
    };
  },
  computed: {
    searched: function () {
      this.timeline = util.searched(this.search, util.bibleTimeline)
      return util.searched(this.search, util.bibleTimeline);
    },
    totalAggregate: function () {
      return (
        util.getAggregate(this.student.scores) / util.getAge(this.student.birthday, util.today)
      ).toFixed(3)
    }
  },
  mounted: function () {
    this.gotoPage('', util.bibleTimeline);
    new SideNav();
    this.modal = document.querySelector('.modal');
  },
  created() {
    this.student = util.localStorage().student; 
    this.materials = util.localStorage().materials;
    
    // this.totalAggregate = (
    //   util.getAggregate(this.student.scores) / util.getAge(this.student.birthday, util.today)
    // ).toFixed(3)
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.student = util.localStorage().student;
      this.materials = util.localStorage().materials;
    });
    console.log(this.student)
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    updateStateAndScores: function (nextQuestion, optionIdx) { 
      var questionIdx = this.loadedMaterial.questions.findIndex(question => {
        return question.uid === nextQuestion.uid
      })
      var response = questionIdx + '|' + optionIdx; 
      this.state.response.push(response); 
      this.state.materialId = this.loadedMaterial.uid;

      this.state['index'] = this.state['index'] + 1;
      this.moveToNextQuestion();

      this.student.state = this.state;

      var scoreIdx = this.student.scores.findIndex(score => {
        return score.materialId === this.state.materialId
      })

      if (scoreIdx === -1) {
        this.student.scores.push(this.state)
      } else {
        this.student.scores[scoreIdx] = this.state
      }
      
      this.$store.dispatch('updateStudent', this.student)
      console.log('this.student is', this.student)
    },
    moveToNextQuestion: function () { 
      var next = this.loadedMaterial.questions[this.state['index']];
      if (next) {
        this.nextQuestion = next;
        this.quizEnded = ''
      } else { this.quizEnded = `You've completed quiz for ${this.loadedMaterial.title}` }
      return next;
    },
    updateState: function () {
      var quizStarted = this.student.scores.find(score => {
        return score.materialId === this.loadedMaterial.uid
      })  
      if (quizStarted) { this.state = quizStarted; }
      else { this.state = util.initialQuizState(this.loadedMaterial.uid); } 
      this.moveToNextQuestion();
    },
    toggleModal: function () {
      if (this.modal.classList.contains('is-visible')) {
        this.loadedMaterial = null;
      }
      this.modal.classList.toggle('is-visible')
    },
    loadMaterial: function (material) {
      this.loadedMaterial = material;
      this.updateState();
      this.toggleModal();
    },
    updateStudent: function (evt) {
      evt.preventDefault();
      this.$store.dispatch("updateStudent", util.encodeStudent(this.student));
    },
    selectTime: function (time) {
      this.selectedTime = time;
      this.eventsClass = 'open';
    },
    gotoPage: function (page) {
      if (page) { page === 'prev' ? this.currentPage-- : this.currentPage++ }
      if (this.currentPage < 1) { this.currentPage = this.numPages(); }
      else if (this.currentPage > this.numPages()) { this.currentPage = 1; }
      return this.changePage(this.currentPage);
    },
    changePage: function (page) {
      this.timeline = util.bibleTimeline.slice(
        util.boundaries(page, this.numPages, this.recordsPerPage).start,
        util.boundaries(page, this.numPages, this.recordsPerPage).end
      )
    },
    numPages: function () {
      return Math.ceil(util.bibleTimeline.length / this.recordsPerPage);
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