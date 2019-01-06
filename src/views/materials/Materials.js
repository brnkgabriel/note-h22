import beforeRouteEnter from '../../util/beforeRouteEnter'
import util from '../../util'
import { bus } from '../../main'
import InfiniteList from './infinite-list'
import properties from './properties'

export default {
  data() {
    return {
      materials: [],
      timeline: [],
      files: [],
      tab: { materials: 'tab-current', questions: '' },
      selectedMaterial: null,
      selectedQuestion: null,
      selectedOption: null,
      selectedEvents: null,
      interval: null,
      listElm: null,
      count: 0,
      indices: {
        mat: 0,
        que: 0,
        opt: 0
      }
    }
  },
  mounted() {
    this.interval = setInterval(this.checkElement, 10)
  },
  created() {
    this.initializeData();
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.initializeData();
    })
    bus.$on("thumbnail", (thumbnail) => {
      this.selectedMaterial.thumbnail = thumbnail
    })
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    pickFile(evt) {
      var files = evt.target.files;
      var fileReader = new FileReader();
      fileReader.addEventListener('load', () => {
        this.$store.dispatch('uploadThumbnail', files[0])
        this.selectedMaterial.thumbnail = fileReader.result;
      })
      fileReader.readAsDataURL(files[0])
    },
    initializeData: function () {
      this.materials = util.localStorage().materials;
      this.selectedMaterial = this.materials[this.indices.mat];
      this.selectedQuestion = this.selectedMaterial.questions[this.indices.que];
      this.selectedOption = this.selectedQuestion.options[this.indices.opt];
      this.selectedEvents = util.bibleTimeline.find(time => {
        return time.date.toLowerCase() === this.selectedMaterial.time.toLowerCase()
      }).events;
      this.selectedEvents = this.selectedEvents.map(event => event.toLowerCase())
    },
    checkElement: function () {
      this.listElm = document.querySelector('#infinite-list');
      if (this.listElm) {
        this.loadMore();
        this.listElm.addEventListener('scroll', this.handleScroll);
        clearInterval(this.interval)
      }
    },
    handleScroll: function () {
      if (
        this.listElm.scrollTop + this.listElm.clientHeight >= this.listElm.scrollHeight
      ) { this.loadMore(); }
    },
    loadMore: function () {
      var limit = this.count + 20;
      for (var i = this.count; i < limit; i++) {
        if (i === (util.bibleTimeline.length - 1)) { return }
        this.count++;
        this.timeline.push(util.bibleTimeline[i]);
      }
    },
    selectTime: function (time) {
      this.selectedMaterial.time = time.date.toLowerCase()
      this.selectedEvents = time.events.map(event => event.toLowerCase())
      this.selectedMaterial.event = time.events[0].toLowerCase()
    },
    setState: function (selected) {
      var tabKeys = Object.keys(this.tab);
      tabKeys.forEach(key => this.tab[key] = '');
      this.tab[selected] = 'tab-current';
    },
    openQuestion: function (material) {
      this.setState('questions');
      this.indices.mat = this.getIdx(material, this.materials) 
      this.selectedMaterial = material;
      this.selectedQuestion = this.selectedMaterial.questions[0];
      this.selectedOption = this.selectedQuestion.options[0];
    },
    getIdx: function (tofind, collection) {
      var idx = collection.findIndex(item => {
        return item.uid.toLowerCase() === tofind.uid.toLowerCase()
      });
      if (idx > -1) { return idx }
      else { return 0 }
    },
    selectMaterial: function (material) {
      this.indices.mat = this.getIdx(material, this.materials)

      this.selectedMaterial = material;
      var time = util.bibleTimeline.find(time => {
        return time.date.toLowerCase() === this.selectedMaterial.time.toLowerCase()
      });
      this.selectTime(time);
    },
    addMaterial: function () {
      this.materials.push(properties.newMaterial());
      var lastIdx = this.materials.length - 1;
      this.selectedMaterial = this.materials[lastIdx]
      this.indices.mat = lastIdx;
    },
    saveMaterials: function () {
      this.$store.dispatch('saveMaterials', this.materials)
    },
    saveQuestion: function () {
      this.$store.dispatch('saveMaterial', this.selectedMaterial)
    },
    selectQuestion: function (question) { 
      this.indices.que = this.getIdx(question, this.selectedMaterial.questions) 
      this.selectedQuestion = question;
      this.selectedOption = this.selectedQuestion.options[0]
    },
    deleteOption: function (option) {
      this.indices.opt = this.selectedQuestion.options
      .findIndex(opt => opt.value.toLowerCase() === option.value.toLowerCase())
      if (this.selectedQuestion.options.length > 1) {
        var filtered = this.selectedQuestion.options.filter(opt => {
          return opt.value.toLowerCase() !== option.value.toLowerCase()
        })
        this.selectedQuestion.options = filtered;
        var lastIdx = this.selectedQuestion.options.length - 1;
        this.selectedOption = this.selectedQuestion.options[0];
        this.indices.opt = lastIdx;
      }
    },
    deleteQuestion: function (question) {
      this.indices.que = this.getIdx(question, this.selectedMaterial.questions)
      if (this.selectedMaterial.questions.length > 1) { 
        var filtered = this.selectedMaterial.questions.filter(que => {
          return que.uid.toLowerCase() !== question.uid.toLowerCase()
        })
        this.selectedMaterial.questions = filtered;
        var lastIdx = this.selectedMaterial.questions.length - 1;
        this.selectedQuestion = this.selectedMaterial.questions[lastIdx];
        this.selectedOption = this.selectedQuestion.options[0];
        this.indices.que = lastIdx;
      }
    },
    selectOption: function (option) {
      if (queIdx > -1) { this.indices.que = queIdx }
      this.selectedOption = option;
    },
    addOption: function () {
      this.selectedQuestion.options.push(properties.newOption());
      var lastIdx = this.selectedQuestion.options.length - 1;
      this.selectedOption = this.selectedQuestion.options[lastIdx];
    },
    addQuestion: function () {
      this.selectedMaterial.questions.push(properties.newQuestion());
      var lastIdx = this.selectedMaterial.questions.length - 1;
      this.selectedQuestion = this.selectedMaterial.questions[lastIdx]
      this.selectedOption = this.selectedQuestion.options[0];
    }
  }
}