<template lang='pug'>
PlayerHeader
PlayerController
SyncStatusIndicator
</template>

<script>
import PlayerHeader from '@/components/PlayerHeader.vue'
import PlayerController from '@/components/PlayerController.vue'
import SyncStatusIndicator from '@/components/SyncStatusIndicator.vue'

export default {
  name: 'Player',
  components: {
    PlayerHeader,
    PlayerController,
    SyncStatusIndicator
  }
}
</script>
