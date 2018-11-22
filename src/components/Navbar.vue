<template>
  <div id="navbar">
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/profile">Profile</router-link>
      </li>
      <li>
        <router-link to="/quiz">Quiz</router-link>
      </li>
      <li>
        <router-link to="/rank">Rank</router-link>
      </li> 
      <li>
        <router-link to="/login">Login</router-link>
      </li>
      <li>
        <router-link to="/register">Register</router-link>
      </li>
      <li>
        <router-link to="/about">About</router-link>
      </li>
      <li>
        <button @click="logout">Logout</button>
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: "navbar",
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    }
  }, 
  methods: {
    logout: function () {
      firebase.auth().signOut()
      .then(() => {
        // this.$router.go({path: this.$router.path});
        this.$router.push('/login')
      })
    }
  }
};
</script>

<style scoped>
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
