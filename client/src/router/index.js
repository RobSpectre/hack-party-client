import Vue from 'vue'
import VueRouter from 'vue-router'

import Ping from '../components/Ping.vue'
import Player from '../components/Player.vue'
import JoinGame from '../components/JoinGame.vue'

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
  },
  {
    path: '/join',
    name: 'Join Game',
    component: JoinGame
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
