import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Profile from './views/profile/Profile.vue'
import Quiz from './views/quiz/Quiz.vue'
import Rank from './views/rank/Rank.vue'
import Questions from './views/questions/Questions.vue'
import Excel2Json from './views/questions/excel2json/Excel2Json.vue'
import Login from './views/login/Login.vue'
import Signup from './views/signup/Signup.vue'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/quiz',
      name: 'quiz',
      component: Quiz,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/questions',
      name: 'questions',
      component: Questions,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/excel2json',
      name: 'excel2json',
      component: Excel2Json,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/rank',
      name: 'rank',
      component: Rank,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '*',
      name: 'others',
      redirect: '/'
    }
  ]
})

export default router;