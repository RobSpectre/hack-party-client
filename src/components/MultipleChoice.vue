<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8
    flex flex-auto flex-col items-center text-center justify-center">
    <button v-for="choice in choices" :key="choice.label"
              type="button"
              class="secondary-button my-5"
              @click="selectChoice(choice.label)">{{ choice.label }}</button>
      <h1 v-if="choices === undefined">Hang tight - shit is about to get real.</h1>
  </div>
</template>

<script>

export default {
  name: 'MultipleChoice',
  data: function () {
    return {
      value: undefined
    }
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
