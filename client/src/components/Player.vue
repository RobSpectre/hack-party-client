<template>
  <div>
    <div class="bg-darkgray">
      <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
        <div class="lg:w-0 lg:flex-1">
          <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white
            sm:text-4xl sm:leading-10 text-center">
            {{ playerName }}
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
              <span v-if="connected" class="flex p-2 rounded-lg bg-green">
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
              <span v-if="connected" class="md">
                Connected
              </span>
              <span v-else class="md">
                Disconnected
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
import tokenUri from '../config.local.js'

import VueSlider from 'vue-slider-component'

export default {
  name: 'Player',
  components: {
    VueSlider
  },
  data: function () {
    return {
      playerName: this.$route.params.playerName,
      tokenUri: tokenUri,
      slider: 0,
      connected: false
    }
  }
}
</script>

<style src="../../node_modules/vue-slider-component/theme/material.css"></style>
