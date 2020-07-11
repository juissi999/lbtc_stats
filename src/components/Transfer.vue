<template>
  <div :v-if="transferObj !== null">
    Latest Transfer {{ new Date(transferObj.date).toLocaleString() }},
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
