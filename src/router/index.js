import { createRouter, createWebHistory } from 'vue-router'

import Player from '../components/Player.vue'
import JoinGame from '../components/JoinGame.vue'

const routes = [
  {
    path: '/player',
    name: 'Player',
    component: Player
  },
  {
    path: '/',
    name: 'Join Game',
    component: JoinGame
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { routes }

export default router
