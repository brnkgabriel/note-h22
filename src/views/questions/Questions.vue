<template>
  <div class="materials" v-if="selectedMaterial">
    <h3>List of Materials</h3>
    <div class="material-table">
      <input id="search-box" v-model="searchTerm" type="text" placeholder="search for material..."/>
      <div class="material">
        <div class="info">
          <div class="title material-info"><strong>Title</strong></div>
          <div class="author material-info"><strong>By</strong></div>
          <div class="type material-info"><strong>Type</strong></div>
          <div class="stage material-info"><strong>Stage</strong></div>
        </div>
      </div>
      <div class="material" v-for="(material, index) in searched" :key="index">
        <div class="info" @click="selectMaterial(material)">
          <div class="title material-info">{{material.title}}</div>
          <div class="author material-info">{{material.author}}</div>
          <div class="type material-info">{{material.type}}</div>
          <div class="stage material-info">{{material.stage}}</div>
        </div>
        <span @click.prevent="deleteMaterial(material)" class="icon icon-delete"></span>
      </div>
    </div>
    <div class="material-panel">
      <material :material="selectedMaterial" />
      <div class="save-materials">
        <button @click.prevent="addMaterial()" class="add-material">Add Material</button>
        <button @click.prevent="saveMaterials()">Save Materials</button>
      </div>
    </div>
  </div>
</template>

<script>
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
      searchTerm: ''
    };
  },
  computed: {
    searched: function () {
      var filtered = this.materials.filter(material => {
        var condition = false;
        if (
          material.title.indexOf(this.searchTerm) !== -1 ||
          material.author.indexOf(this.searchTerm) !== -1 ||
          material.type.indexOf(this.searchTerm) !== -1 ||
          material.stage.indexOf(this.searchTerm) !== -1
        ) { condition = true; }
        return condition
      })
      return filtered
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
    deleteMaterial(deletedMat) {
      this.materials = this.materials.filter(material => {
        return material.uid !== deletedMat.uid
      })
      this.selectedMaterial = this.materials[0]
    },
    saveMaterials() {
      this.$store.dispatch('saveMaterials', this.materials)
    },
    addMaterial: function() {
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
        stage: "Enter stage...",
        title: "Enter title...",
        type: "Enter type...",
        uid: "material-" + +new Date()
      };
      this.materials.unshift(newMaterial)
      this.selectedMaterial = this.materials[0];
    }
  }
};
</script>

<style scoped>
.material-table,
.material-panel,
.material-info {
  display: inline-block;
  vertical-align: top;
}

.material-table {
  width: 58%;
  height: 500px;
  overflow: auto;
  margin: 0 1%;
}

.material-panel {
  width: 40%;
}

.info {
  width: 95%;
  display: inline-block;
  margin: 5px 0;
}

.title,
.author,
.type {
  width: 30%;
}

.stage {
  width: 10%
}
.icon-delete {
  width: 2%;
}
</style>
