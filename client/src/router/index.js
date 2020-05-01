import Vue from 'vue'
import VueRouter from 'vue-router'

import Ping from '../components/Ping.vue'
import Player from '../components/Player.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/ping',
    name: 'Ping',
    component: Ping
  },
  {
    path: '/player',
    name: 'Player',
    component: Player
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
