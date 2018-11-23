<template>
  <div id="rank">
    <h1>Rank</h1>
    <ul>
      <li v-for="(student, index) in students" :key="index">
        {{student.first_name}}-{{student.last_name}}
      </li>
    </ul>
  </div>
</template>

<script>
import beforeRouteEnter from './beforeRouteEnter-rank'
import computed from './computed-rank'
export default {
  computed: computed,
  beforeRouteEnter: beforeRouteEnter
};
</script>

<style scoped>
</style>
