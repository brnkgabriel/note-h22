
import { bus } from '../../../../main'
export default {
  props: ['question', 'type'],
  data() {
    return {
      newOption: {
        pts: null,
        key: '',
        value: ''
      },
      compQuestion: ''
    }
  },
  computed: {
    optionedQuestion: function () {
      return this.type === 'worship' ||
      this.type === 'message' ||
      this.type === 'picture'
    },
    typingQuestion: function () {
      return this.type === 'bible' || this.type === 'book'
    },
    pictureQuestion: function () {
      return this.type === 'picture'
    }
  },
  methods: {
    addQuestion() {
      var newQuestion = {
        uid: "question-" + +new Date(),
        question: "Enter Question...",
        options: []
      };
      bus.$emit('addQuestion', newQuestion)
    },
    removeOption: function (option) {
      this.question.options = this.question.options.filter(opt => {
        return opt.key !== option.key
      })
    },
    addOption(newOption) {
      newOption.key = newOption.value.split(' ').join('-').toLowerCase();
      this.question.options.push({
        key: newOption.key,
        value: newOption.value,
        pts: newOption.pts
      });
      this.newOption['key'] = ''
      this.newOption['pts'] = null
      this.newOption['value'] = ''
    }
  }
};