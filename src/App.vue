<template>
  <div>{{ recent }}</div>
</template>

<script>
import lbtcApi from './apiGetter'

export default {
  name: 'App',
  components: {},
  mounted() {
    this.getRecent()
  },
  data() {
    return {
      recent: 'hello_world'
    }
  },
  methods: {
    getRecent() {
      lbtcApi.getRecentTrades().then((data) => {
        this.recent = data
      })
    }
  }
}
</script>

<style></style>
