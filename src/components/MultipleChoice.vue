<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8
    flex flex-auto flex-col items-center text-center justify-center">
    <button v-for="choice in this.unchosenOptions" :key="choice.label"
              type="button"
              class="secondary-button my-5"
              @click="selectChoice(choice)">{{ choice }}</button>
      <h2 v-if="choices === undefined || choices.length === 0">Hang tight - shit is about to get real.</h2>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MultipleChoice',
  data: function () {
    return {
      value: undefined
    }
  },
  computed: {
    unchosenOptions () {
      if (this.choices !== undefined) {
        return this.choices.filter(choice => choice !== this.player.controller.value)
      } else {
        return []
      }
    },
    ...mapState(['player'])
  },
  props: [
    'choices'
  ],
  methods: {
    selectChoice (value) {
      this.value = value
      this.$emit('change-value', value)
    }
  }
}
</script>
