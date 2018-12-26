import beforeRouteEnter from '../../util/beforeRouteEnter'
import util from '../../util';
import { bus } from '../../main';
export default {
  data() {
    return {
      materials: [],
      tab: {
        materials: 'tab-current',
        questions: ''
      },
      selectedMaterial: null,
      selectedQuestion: null,
      selectedOption: null
    }
  },
  created() {
    this.materials = util.localStorage().materials;
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.materials = util.localStorage().materials;
      this.selectedMaterial = this.materials[0];
      this.selectedQuestion = this.selectedMaterial.questions[0];
      this.selectedOption = this.selectedQuestion.options[0]
    })
  },
  beforeRouteEnter: beforeRouteEnter,
  methods: {
    setState: function (selected) {
      var tabKeys = Object.keys(this.tab);
      tabKeys.forEach(key => this.tab[key] = '');
      this.tab[selected] = 'tab-current';
    },
    openQuestion: function (material) {
      this.setState('questions');
      this.selectedMaterial = material;
    },
    selectMaterial: function (material) {
      this.selectedMaterial = material;
    },
    addMaterial: function () {
      var newMaterial = {
        title: 'Material title...',
        author: 'Material author...',
        event: 'Material event...',
        time: 'Material time...',
        location: 'Material web location...',
        type: 'Material type...',
        questions: [
          {
            title: 'New Question...',
            options: [
              {
                key: 'New Option',
                value: 'New Value',
                pts: 0
              }
            ],
            uid: 'question-' + +new Date
          }
        ],
        uid: 'material-' + +new Date
      }
      this.materials.unshift(newMaterial);
      this.selectedMaterial = this.materials[0]
    },
    saveMaterials: function () {
      this.$store.dispatch('saveMaterials', this.materials)
    },
    selectQuestion: function (question) {
      this.selectedQuestion = question;
    },
    selectOption: function (option) {
      this.selectedOption = option;
    },
    addOption: function () {
      var newOption = {
        value: 'Enter New Option...',
        pts: 0
      }
      this.selectedQuestion.options.unshift(newOption);
      this.selectedOption = this.selectedQuestion.options[0];
    },
    addQuestion: function () {
      var newQuestion = {
        title: 'Enter New Question',
        uid: 'Question-' + +new Date,
        options: [
          {
            value: 'Enter New Option...',
            pts: 0
          }
        ]
      }
      this.selectedMaterial.questions.unshift(newQuestion);
      this.selectedQuestion = this.selectedMaterial.questions[0]
    }
  }
}