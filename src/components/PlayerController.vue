<template lang='pug'>
PlayerSlider(v-if="player.controller.type === 'Slider'" :refreshrate='refreshRate' @change-value='handleValueChanged')
MultipleChoice(v-if="player.controller.type === 'MultipleChoice'" :choices='player.controller.options' @change-value='handleValueChanged')
h1.mx-auto.font-semibold.uppercase.text-3xl.mt-12.text-center(v-if='!player.controller.type') Stay tuned for brain-exploding content.
</template>

<script>
import { mapState } from 'pinia'
import { useGameStore } from '@/store'

import PlayerSlider from '@/components/PlayerSlider.vue'
import MultipleChoice from '@/components/MultipleChoice.vue'

export default {
  name: 'PlayerController',
  components: {
    PlayerSlider,
    MultipleChoice
  },
  computed: {
    ...mapState(useGameStore, ['player'])
  }
}
</script>
