<template lang='pug'>
.fixed.bottom-0.inset-x-0.pb-2(class='sm:pb-5')
  .max-w-screen-xl.mx-auto.px-2(class='sm:px-6 lg:px-8')
    .p-2.rounded-lg.bg-indigo-600.shadow-lg(class='sm:p-3')
      .flex.items-center.justify-between.flex-wrap
        .w-0.flex-1.flex.items-center
          span#status.flex.p-2.rounded-lg.bg-red-500(v-if='error')
            svg.h-6.w-6.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          span#status.flex.p-2.rounded-lg.bg-green(v-else-if='connected')
            svg.h-6.w-6.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.46a1 1 0 0 1 1.42-1.42 3 3 0 0 0 4.24 0 1 1 0 0 1 1.42 1.42 5 5 0 0 1-7.08 0zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          span#status.flex.p-2.rounded-lg.bg-orange(v-else='')
            svg.h-6.w-6.text-white(fill='currentColor' viewbox='0 0 24 24' width='24' height='24')
              path(d='M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-3.54-4.54a5 5 0 0 1 7.08 0 1 1 0 0 1-1.42 1.42 3 3 0 0 0-4.24 0 1 1 0 0 1-1.42-1.42zM9 11a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z')
          p.ml-3.font-medium.text-white.truncate
            span.md
              | {{ syncMessage }}
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import SyncClient from 'twilio-sync'

import axios from 'axios'

export default {
  name: 'SyncStatusIndicator',
  data: function () {
    return {
      tokenUri: process.env.VUE_APP_TOKEN_URI,
      connected: false,
      error: false,
      syncClient: undefined,
      token: undefined,
      syncMessage: 'Connecting...',
      syncPlayer: undefined,
      refreshRate: 500
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
    ...mapState(useGameStore, ['player'])
  },
  methods: {
    connectToSync (response) {
      this.sync_message = 'Token retrieved...'
      console.log(response.data.token)
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

            if (event.item.key === this.player.name) {
              this.handleUpdatePlayer(event)
            }
          })

          if (this.player.name) {
            map.update([this.player.name], this.player)
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
    },
    handleValueChanged (value) {
      if (this.syncClient !== undefined) {
        console.log('Sending new change: ' + value)
        this.setPlayerValue(value)

        this.syncClient.map('WizdomOfCrowdzPlayers')
          .then((map) => {
            map.update([this.player.name], this.player)
              .then((updateResult) => {
                console.log('Sending updated player state:')
                console.log(this.player)
              })
              .catch((error) => {
                this.error = true
                this.syncMessage = 'Error updating controller: ' + error
              })
          }).catch((error) => {
            this.error = true
            this.syncMessage = 'Could not get game map: ' + error
          })
      }
    },
    handleUpdatePlayer (event) {
      console.log('Received update for this player:')
      console.log(event.item.value)

      const payload = event.item.value
      this.changePlayerState(payload)
    },
    ...mapActions(useGameStore, ['setPlayerValue', 'changePlayerState'])
  }
}
</script>
