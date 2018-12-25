
import Material from "./material/Material.vue";
import { bus } from "../../main";
import util from "../../util";
export default {
  components: {
    Material
  },
  data() {
    return {
      selectedMaterial: null,
      materials: [],
      checkedMaterials: [],
      searchTerm: '',
      searchTermTimeline: '',
      timeline: util.bibleTimeline
    };
  },
  computed: {
    searched: function () {
      var filtered = this.materials.filter(material => {
        var condition = false;
        if (
          material.title.indexOf(this.searchTerm.toLowerCase()) !== -1 ||
          material.author.indexOf(this.searchTerm.toLowerCase()) !== -1 ||
          material.time.indexOf(this.searchTerm) !== -1 ||
          material.type.indexOf(this.searchTerm.toLowerCase()) !== -1
        ) { condition = true; }
        return condition
      })
      return filtered
    },
    searchedTimeline: function () {
      var filtered = this.timeline.filter(time => {
        var condition = false;
        if (
          time.date.toLowerCase().indexOf(this.searchTermTimeline.toLowerCase()) !== -1 ||
          time.events.join(', ').toLowerCase().indexOf(this.searchTermTimeline.toLowerCase()) !== -1
        ) { condition = true; }
        return condition
      })
      return filtered;
    }
  },
  created() {
    util.fetchMaterials();
    bus.$on("incomingMaterials", () => {
      this.materials = util.localStorage().materials;
      this.selectedMaterial = this.materials[0];
    });
  },
  methods: {
    selectMaterial(material) {
      this.selectedMaterial = material;
    },
    selectTime(time) {
      this.selectedMaterial.time = time.date
      console.log(this.selectedMaterial)
    },
    deleteMaterials() {
      var chkboxes = document.querySelectorAll('.chkbx');
      if (this.checkedMaterials.length > 0) {
        this.$store.dispatch('deleteMaterials', this.checkedMaterials)
      }
      for (var i = 0; i < chkboxes.length; i++) {
        chkboxes[i].checked = false;
      }
    },
    saveMaterials() {
      this.$store.dispatch('saveMaterials', this.materials)
    },
    checkedMaterial(material) {
      var chkbox = document.querySelector('.checkbox-' + material.uid);
      if (chkbox.checked) {
        this.checkedMaterials.push(material.uid)
      } else {
        var index = this.checkedMaterials.indexOf(material.uid)
        this.checkedMaterials.splice(index, 1);
      }
      console.log('checked materials are', this.checkedMaterials)
    },
    addMaterial() {
      var newMaterial = {
        author: "Enter author...",
        location: "",
        questions: [
          {
            uid: "question-" + +new Date(),
            question: "",
            options: []
          }
        ],
        time: "Enter time...",
        title: "Enter title...",
        type: "Enter type...",
        uid: "material-" + +new Date()
      };
      this.materials.unshift(newMaterial)
      this.selectedMaterial = this.materials[0];
    }
  }
};