<template>
  <div>
    <div class="bg-darkgray">
      <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white
            sm:text-4xl sm:leading-10 text-center">
            {{ tokenUri }}
          </h2>
        </div>
      </div>
    </div>
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8
      lg:flex lg:items-center text-center">
      <vue-slider v-model="slider"
                  direction="ttb"
                  :height="400"
                  :min="-3"
                  :max="3"
                  :interval="0.01"
                  style="display: inline-block">
      </vue-slider>
    </div>
    <div class="fixed bottom-0 inset-x-0 pb-2 sm:pb-5">
      <div class="max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="p-2 rounded-lg bg-indigo-600 shadow-lg sm:p-3">
          <div class="flex items-center justify-between flex-wrap">
            <div class="w-0 flex-1 flex items-center">
              <span v-if="error" class="flex p-2 rounded-lg bg-red-500">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                </svg>
              </span>
              <span v-else-if="connected" class="flex p-2 rounded-lg bg-green">
                <svg class="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                </svg>
              </span>
              <span v-else class="flex p-2 rounded-lg bg-orange">
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
import SyncClient from 'twilio-sync'

import axios from 'axios'

import VueSlider from 'vue-slider-component'

export default {
  name: 'Player',
  components: {
    VueSlider
  },
  data: function () {
    return {
      playerName: this.$route.params.playerName,
      tokenUri: process.env.VUE_APP_TOKEN_URI,
      slider: 0,
      connected: false,
      error: false,
      syncClient: undefined,
      token: undefined,
      syncMessage: 'Connecting...',
      syncPlayer: undefined
    }
  },
  mounted () {
    axios.post(this.tokenUri, {
      identity: this.playerName
    })
      .then((response) => {
        this.connectedToSync(response)
      })
      .catch((error) => {
        this.error = true
        this.syncMessage = error
        console.log(error)
      })
  },
  methods: {
    connectedToSync (response) {
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
          map.on('updated', function (event) {
            this.connected = true
            this.syncMessage = 'Connected'
            console.log('New update received: ' + event)
          })

          if (this.playerName) {
            map.update([this.playerName], { slider: this.slider })
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
    }
  }
}
</script>

<style src="../../node_modules/vue-slider-component/theme/material.css"></style>
