import { defineStore } from 'pinia'

function state () {
  return {
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
    }
  }
}

const getters = {
}

const actions = {
  setPlayerName (name) {
    if (name.trim() === '') {
      return
    }

    this.player.name = name
  },
  setPlayerValue (value) {
    this.player.controller.value = value
  },
  setPlayerColor (color) {
    this.player.color = color
  },
  setPlayerScore (score) {
    this.player.score = score
  },
  changePlayerState (payload) {
    this.player = Object.assign(this.player, payload)
  },
  setPlayerController (type) {
    this.player.controller.type = type
  }
}

export const useGameStore = defineStore({
  id: 'hack.party game client',
  state,
  getters,
  actions,
  persist: true
})
