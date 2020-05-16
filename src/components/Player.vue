<template>
  <div>
    <div class="bg-darkgray">
      <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white
            sm:text-4xl sm:leading-10 text-center">
            {{ player.name }}
          </h2>
        </div>
      </div>
    </div>
    <slider v-if="controller === 'Slider'"
            :refreshRate="refreshRate"
            @change-value="handleValueChanged"></slider>
    <multiple-choice v-if="controller === 'MultipleChoice'"
                     :choices="choices"
                     @change-value="handleValueChanged"></multiple-choice>
    <h1 v-if="!controller" class="mx-auto font-semibold uppercase text-3xl
      mt-12 text-center">Stay tuned for brain-exploding content.</h1>
    <div class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
      <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span v-if="error" class="flex p-2 rounded-lg bg-red-500"
                    id="status">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </span>
              <span v-else-if="connected" class="flex p-2 rounded-lg bg-green"
                    id="status">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </span>
              <span v-else class="flex p-2 rounded-lg bg-orange"
                    id="status">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </span>
              <p class="ml-3 font-medium text-white truncate">
              <span class="md">
                {{ syncMessage }}
              </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

import SyncClient from 'twilio-sync'

import axios from 'axios'

import Slider from './Slider.vue'
import MultipleChoice from './MultipleChoice.vue'

export default {
  name: 'Player',
  components: {
    Slider,
    MultipleChoice
  },
  data: function () {
    return {
      tokenUri: process.env.VUE_APP_TOKEN_URI,
      connected: false,
      error: false,
      syncClient: undefined,
      token: undefined,
      syncMessage: 'Connecting...',
      syncPlayer: undefined,
      controller: undefined,
      value: undefined,
      choices: [],
      refreshRate: 200
    }
  },
  mounted () {
    axios.post(this.tokenUri, {
      identity: this.player.name
    })
      .then((response) => {
        this.connectToSync(response)
      })
      .catch((error) => {
        this.error = true
        this.syncMessage = error
        console.log(error)
      })
  },
  computed: {
    ...mapState(['game', 'player', 'sync'])
  },
  methods: {
    connectToSync (response) {
      this.sync_message = 'Token retrieved...'
      this.syncClient = new SyncClient(response.data.token)
      this.token = response.data.token

      this.setSyncListener()

      this.connectToSyncPlayer()
    },
    setSyncListener () {
      this.syncClient.on('connectionStateChanged', function (state) {
        if (state !== 'connected') {
          this.connected = false
          this.syncMessage = 'Disconnected with error: ' + state
        } else {
          this.connected = true
          this.syncMessage = 'Connected'
        }
      })
    },
    connectToSyncPlayer () {
      this.syncClient.map('WizdomOfCrowdzPlayers')
        .then((map) => {
          map.on('itemUpdated', (event) => {
            this.connected = true
            this.syncMessage = 'Connected'

            console.log('New update received: ')
            console.log(event)
          })

          if (this.player.name) {
            console.log('Firing.')
            map.update([this.player.name], { value: this.player.value })
              .then((updateResult) => {
                this.connected = true
                this.syncMessage = 'Connected.'
              })
              .catch((error) => {
                this.error = true
                this.syncMessage = 'Error: ' + error
              })
          }
        })
        .catch((error) => {
          this.error = true
          this.syncMessage = 'Error updating map. ' + error
        })

      this.syncClient.map('WizdomOfCrowdz')
        .then((map) => {
          map.on('itemUpdated', (event) => {
            this.connected = true
            this.syncMessage = 'Connected'

            if (event.item.key === 'controller') {
              this.changeController(event)
            }

            if (event.item.key === 'choices') {
              this.changeChoices(event)
            }
          })
        })
        .catch((error) => {
          this.error = true
          this.syncMessage = 'Error updating map. ' + error
        })
    },
    handleValueChanged (value) {
      if (this.syncClient !== undefined) {
        console.log('Sending new change: ' + value)
        this.setPlayerValue(value)

        this.syncClient.map('WizdomOfCrowdzPlayers')
          .then((map) => {
            map.update([this.player.name], { value: value })
              .then((updateResult) => {
                console.log('Sending updated player value: ' + value)
              })
              .catch((error) => {
                this.error = true
                this.syncMessage = 'Error updating slider: ' + error
              })
          }).catch((error) => {
            this.error = true
            this.syncMessage = 'Could not get game map: ' + error
          })
      }
    },
    changeController (event) {
      this.controller = event.item.value.value
    },
    changeChoices (event) {
      this.choices = event.item.value.value
    },
    ...mapMutations(['setPlayerValue'])
  }
}
</script>
