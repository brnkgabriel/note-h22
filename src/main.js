import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import firebase from 'firebase/app'

Vue.config.productionTip = false

let app;

firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

// new Vue({
//   router,
//   store,
//   render: h => h(App)
// }).$mount('#app')
