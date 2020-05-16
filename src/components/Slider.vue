<template>
  <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8
    lg:flex lg:items-center text-center justify-center">
    <vue-slider v-model="slider"
                direction="ttb"
                :height="400"
                :min="0"
                :max="1"
                :interval="0.01"
                :dot-size="80"
                style="display: inline-block">
    </vue-slider>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component'

export default {
  name: 'Slider',
  components: {
    VueSlider
  },
  data: function () {
    return {
      slider: 0.5,
      lastSlider: 0,
      refresh: parseInt(this.refreshRate)
    }
  },
  props: [
    'refreshRate'
  ],
  mounted () {
    this.iterateClock()
  },
  methods: {
    iterateClock () {
      if (this.lastSlider !== this.slider) {
        this.$emit('change-value', this.slider)
        this.lastSlider = this.slider
      }

      setTimeout(this.iterateClock,
        this.refresh)
    }
  }
}
</script>

<style src="../../node_modules/vue-slider-component/theme/material.css"></style>
