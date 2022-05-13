<template lang='pug'>
.max-w-screen-xl.mx-auto.py-12.px-4.flex.flex-auto.flex-col.items-center.text-center.justify-center(class='sm:px-6 lg:py-16 lg:px-8')
  button.secondary-button.my-5(v-for='choice in this.unchosenOptions' :key='choice.label' type='button' @click='selectChoice(choice)') {{ choice }}
  h2(v-if='choices === undefined || choices.length === 0') Hang tight - shizzle is about to get real.
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useGameStore } from '@/store'

export default {
  name: 'MultipleChoice',
  computed: {
    unchosenOptions () {
      if (this.choices !== undefined) {
        return this.choices.filter(choice => choice !== this.player.controller.value)
      } else {
        return []
      }
    },
    ...mapState(useGameStore, ['player'])
  },
  props: [
    'choices'
  ],
  methods: {
    ...mapActions(useGameStore, ['setPlayerValue']),
    selectChoice (value) {
      this.setPlayerValue(value)
    }
  }
}
</script>
