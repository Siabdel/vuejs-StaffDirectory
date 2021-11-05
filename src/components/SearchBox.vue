<template>
  <div id="">
    <slot name="portee" :filterKey="key_search" ></slot>
    <input type="text"  v-model="key_search" >
    <button type="button" @click="$emit('mysearch', key_search)"> Search</button>
  </div>
</template>

<script>
export default {
  name: "SearchBox",
  props : {},
  data: () => ({
    msg : "mon premiere SearchBox",
    key_search : "",

  }),
}
</script>

<style lang="scss" scoped>
</style>
