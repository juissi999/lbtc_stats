<template>
  <div v-if="recent.length > 0">
    <p>
      Mean price of last 500 transactions:
      {{ Math.floor(averagePrice(recent) * 100) / 100 }} EUR/BTC
    </p>
    <p>Smallest trade: {{ smallest(amounts(recent)) }} BTC</p>
    <p>Biggest trade: {{ biggest(amounts(recent)) }} BTC</p>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  props: ['recent'],
  methods: {
    // calculate average price from array
    averagePrice: datalist =>
      datalist.reduce(
        (accumulator, currentVal) => accumulator + parseFloat(currentVal.price),
        0
      ) / datalist.length,

    // filter data to get only float prices
    amounts: datalist => datalist.map(d => parseFloat(d.amount)),

    // get smallest and biggest trades
    smallest: datalist =>
      datalist.reduce((acc, curVal) => Math.min(acc, curVal)),
    biggest: datalist => datalist.reduce((acc, curVal) => Math.max(acc, curVal))
  }
}
</script>

<style></style>
