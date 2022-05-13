<template lang='pug'>
.max-w-screen-xl.mx-auto.py-12.px-4.text-center.justify-center(class='sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center')
  Slider(
    v-model='slider'
    class='player-slider'
    orientation='vertical'
    :height='400'
    :dot-size='80'
    @change='handleSliderEvent')
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

import Slider from '@vueform/slider'

export default {
  name: 'PlayerSlider',
  components: {
    Slider
  },
  computed: {
    ...mapState(useGameStore, ['player']),
    currentColor () {
      if (this.player.color !== '') {
        return this.player.color
      } else {
        return '#5b6670'
      }
    }
  },
  data () {
    return {
      slider: 50
    }
  },
  methods: {
    ...mapActions(useGameStore, ['setPlayerValue']),
    handleSliderEvent (value) {
      this.setPlayerValue(value)
    }
  }
}
</script>

<style lang='scss'>
@import '@vueform/slider/themes/default.css';

.player-slider {
  --slider-connect-bg: v-bind(currentColor);
  --slider-vertical-height: 500px;
  --slider-handle-bg: v-bind(currentColor);
  --slider-handle-width: 80px;
  --slider-handle-height: 80px;
  --slider-tooltip-font-size: 2.5rem;
  --slider-tooltip-py: 15px;
  --slider-tooltip-px: 10px;
}
</style>
