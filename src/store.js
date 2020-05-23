import Vue from 'vue'
import Vuex from 'vuex'

import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const state = {
  game: {},
  player: {},
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
    state.player.value = value
  },
  setPlayerColor (state, color) {
    state.player.color = color
  },
  setPlayerScore (state, score) {
    state.player.score = score
  },
  changePlayerAttribute (state, payload) {
    state.player[payload.attribute] = payload.value
  }
}

export default new Vuex.Store({
  state,
  mutations,
  plugins: [createPersistedState({ key: 'WizePlayer' })]
})
