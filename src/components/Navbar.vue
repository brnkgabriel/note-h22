<template>
  <div id="navbar">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/profile">Profile</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/quiz">Quiz</router-link>
      </li>
      <li v-if="isLoggedIn && student.roles_permissions.roles === 'admin'">
        <router-link to="/questions">Questions</router-link>
      </li>
      <li v-if="isLoggedIn">
        <router-link to="/rank">Rank</router-link>
      </li> 
      <li v-if="!isLoggedIn">
        <router-link to="/login">Login</router-link>
      </li>
      <li v-if="!isLoggedIn">
        <router-link to="/signup">Signup</router-link>
      </li>
      <li v-if="isLoggedIn">
        <button @click="logout">Logout</button>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import { bus } from '../main'
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      student: null
    }
  },
  created() {
    this.student = JSON.parse(localStorage.getItem('student'))
    this.isLoggedIn = !!localStorage.getItem('student');
    bus.$on('isLoggedIn', (student) => {
      this.isLoggedIn = !!student;
      this.student = student;
    })
  },
  methods: {
    logout: function () {
      firebase.auth().signOut()
      .then(() => {
        this.$store.commit('removeStudent');
        this.isLoggedIn = false;
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style scoped>
ul {
  padding: 0;
}

li {
  list-style: none;
  display: inline-block;
  margin: 0px 5px;
}

#navbar {
  padding: 30px;
}

#navbar a {
  font-weight: bold;
  color: #2c3e50;
}

#navbar a.router-link-exact-active {
  color: #42b983;
}
</style>
