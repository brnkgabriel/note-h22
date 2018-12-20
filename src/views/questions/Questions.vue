<template>
  <div class="materials" v-if="selectedMaterial">
    <h3>List of Materials</h3>
    <div class="material-table">
      <input id="search-box" v-model="searchTerm" type="text" placeholder="search for material..."/>
      <div class="material">
        <div class="info">
          <span @click.prevent="deleteMaterials()" class="icon icon-delete"></span>
          <div class="title material-info"><strong>Title</strong></div>
          <div class="author material-info"><strong>By</strong></div>
          <div class="type material-info"><strong>Type</strong></div>
          <div class="time material-info"><strong>Time</strong></div>
        </div>
      </div>
      <div class="material" v-for="(material, index) in searched" :key="index">
        <input :class="'checkbox-'+material.uid+' chkbx'" @click="checkedMaterial(material)" type="checkbox" name="material-" />
        <div class="info" @click="selectMaterial(material)">
          <div class="title material-info">{{material.title}}</div>
          <div class="author material-info">{{material.author}}</div>
          <div class="type material-info">{{material.type}}</div>
          <div class="time material-info">{{material.time}}</div>
        </div>
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
      checkedMaterials: [],
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
          material.time.indexOf(this.searchTerm) !== -1 ||
          material.type.indexOf(this.searchTerm) !== -1 
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
      var chkbox = document.querySelector('.checkbox-'+material.uid);
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
  height: 530px;
  overflow: auto;
  margin: 0 0.5%;
  background-color: white;
}

.material-panel {
  width: 40%;
  margin: 0 0.5%;
  height: 530px;
  overflow: auto;
  background-color: white;
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

.time {
  width: 6%
}
.icon-delete,
.checkbox {
  width: 2%;
}
</style>
