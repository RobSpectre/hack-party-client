<template>
  <div class="bg-gray-800">
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
      <div class="lg:w-0 lg:flex-1">
        <h2 class="text-3xl leading-9 font-extrabold tracking-tight text-white sm:text-4xl sm:leading-10">
          Join Wizdom of Crowdz
        </h2>
        <p class="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
          Get ready for the tastiest economics game ever played over
          teleconference during a global pandemic.
        </p>
      </div>
      <div class="mt-8 lg:mt-0 lg:ml-8">
        <form class="sm:flex" @submit.prevent="processForm">
          <input aria-label="Player name" type="text" required
          class="appearance-none w-full px-5 py-3 border border-transparent
          text-base leading-6 rounded-md text-gray-900 bg-white
          placeholder-gray-500 focus:outline-none focus:placeholder-gray-400
          transition duration-150 ease-in-out sm:max-w-xs"
          v-model="playerName"
          placeholder="What's your name?" />
          <div class="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button class="w-full primary-button">
              Join Game
            </button>
          </div>
        </form>
        <p class="mt-3 text-sm leading-5 text-gray-300">
        We care about the protection of your data. Read our
        <a href="https://www.youtube.com/watch?v=S112Np_VKKs" class="text-white font-medium underline">
          Privacy Policy.
        </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JoinGame',
  data: function () {
    return {
      playerName: ''
    }
  },
  methods: {
    processForm: function () {
      if (this.playerName.trim() === '') {
        return
      }

      localStorage.setItem('playerName', this.playerName)

      this.$router.push({
        name: 'Player',
        params: {
          playerName: this.playerName
        }
      })
    }
  }
}
</script>
