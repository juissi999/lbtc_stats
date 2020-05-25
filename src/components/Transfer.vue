<template>
  <div :v-if="transferObj !== null">
    Latest Transfer {{ new Date(transferObj.date * 1000).toLocaleString() }},
    {{ transferObj.amount }} BTC / {{ transferObj.price }} EUR
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  props: ['transferObj']
}
</script>

<style></style>
