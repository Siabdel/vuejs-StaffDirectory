<template>
  <div id="app">
    <StaffDirectory > </StaffDirectory>
  </div>
</template>


<script>
import StaffDirectory from './components/StaffDirectory.vue'

export default {
  name: "HomePage",
  components: {
    StaffDirectory,
  },

  data: () => ({

  })
}
</script>
<style lang="scss" scoped>
</style>
