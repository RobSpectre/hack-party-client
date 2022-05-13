<template lang='pug'>
div.player-color
  .max-w-screen-xl.mx-auto.py-12.px-4(class='sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center')
    div(class='lg:w-0 lg:flex-1')
      h2.text-3xl.leading-9.font-extrabold.tracking-tight.text-white.text-center(class='sm:text-4xl sm:leading-10')
        | {{ player.name }}
</template>

<script>
import { mapState } from 'pinia'
import { useGameStore } from '@/store'

export default {
  name: 'PlayerHeader',
  computed: {
    ...mapState(useGameStore, ['player']),
    currentColor () {
      if (this.player.color.length !== 0) {
        return this.player.color
      } else {
        return '#5b6670'
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.player-color {
  background-color: v-bind(currentColor);
}
</style>
