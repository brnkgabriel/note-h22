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
      }
    }
  },
  created() {
    this.materials = util.localStorage().materials;
    util.fetchMaterials();

    bus.$on("incomingMaterials", () => {
      this.materials = util.localStorage().materials;
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
    }
  }
}