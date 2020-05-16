<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import store from './store'

import './main.css'

export default {
  name: 'WizePlayer',
  store
}
</script>

<style>
</style>
