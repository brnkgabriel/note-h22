<template>
  <div id="login">
    <form>
      <div>
        <label for="email">Email:</label>
        <input type="text" id="email" v-model="email" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="text" id="password" v-model="password" />
      </div>
      <button @click="login" type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import methods from './methods-login'
export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null,
      delayToCompleteProcessing: null
    };
  },
  methods: methods
};
</script>