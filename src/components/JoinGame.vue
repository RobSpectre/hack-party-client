<template lang='pug'>
.bg-gray-800
  .max-w-screen-xl.mx-auto.py-12.px-4(class='sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center')
    div(class='lg:w-0 lg:flex-1')
      h2.text-3xl.leading-9.font-extrabold.tracking-tight.text-white(class='sm:text-4xl sm:leading-10')
        | Join hack.party
      p.mt-3.max-w-3xl.text-lg.leading-6.text-gray-300
        | Hastily coded party games where everyone is welcome and anyone can
        | play.
    .mt-8(class='lg:mt-0 lg:ml-8')
      form(class='sm:flex' @submit.prevent='processForm')
        input.appearance-none.w-full.px-5.py-3.border.border-transparent.text-base.leading-6.rounded-md.text-gray-900.bg-white.placeholder-gray-500.transition.duration-150.ease-in-out(aria-label='Player name' type='text' required='' class='focus:outline-none focus:placeholder-gray-400 sm:max-w-xs' v-model='playerName' placeholder="What's your name?")
        .mt-3.rounded-md.shadow(class='sm:mt-0 sm:ml-3 sm:flex-shrink-0')
          button.w-full.primary-button
            | Join Game
      p.mt-3.text-sm.leading-5.text-gray-300
        | We care about the protection of your data. Read our
        a.text-white.font-medium.underline(href='https://www.youtube.com/watch?v=S112Np_VKKs')
          | Privacy Policy.
</template>

<script>
import { mapActions } from 'pinia'
import { useGameStore } from '@/store'

export default {
  name: 'JoinGame',
  data: function () {
    return {
      playerName: ''
    }
  },
  methods: {
    processForm () {
      if (this.playerName.trim() === '') {
        return
      }

      this.setPlayerName(this.playerName)

      this.$router.push({
        name: 'Player',
        params: {
          playerName: this.playerName
        }
      })
    },
    ...mapActions(useGameStore, ['setPlayerName'])
  }
}
</script>
