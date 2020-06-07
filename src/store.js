import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  game: {},
  player: {
    name: '',
    color: '',
    score: 0,
    controller: {
      type: undefined,
      value: 0,
      options: []
    }
  },
  sync: {
    message: '',
    token: undefined,
    connected: false,
    error: false
  }
}

const mutations = {
  setPlayerName (state, name) {
    if (name.trim() === '') {
      return
    }

    state.player.name = name
  },
  setPlayerValue (state, value) {
    state.player.controller.value = value
  },
  setPlayerColor (state, color) {
    state.player.color = color
  },
  setPlayerScore (state, score) {
    state.player.score = score
  },
  changePlayerState (state, payload) {
    state.player = Object.assign(state.player, payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState({ key: 'WizePlayer' })]
})
