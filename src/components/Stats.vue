<template>
  <div v-if="recent.length > 0">
    <p>
      Mean price of last 500 transactions:
      {{ Math.floor(averagePrice * 100) / 100 }} EUR/BTC
    </p>
    <p>Smallest trade: {{ smallest }} BTC</p>
    <p>Biggest trade: {{ biggest }} BTC</p>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  props: ['recent'],
  computed: {
    // here define "views" for our data (recent prop)

    // calculate average price from array
    averagePrice: function() {
      return this.recent.reduce(
        (accumulator, currentVal) => accumulator + parseFloat(currentVal.price),
        0
      ) / this.recent.length
    },

    // filter data to get only float prices
    amounts: function() {
      return this.recent.map(d => parseFloat(d.amount))
    },

    // get smallest trades
    smallest: function() {
      return this.amounts.reduce((acc, curVal) => Math.min(acc, curVal))
    },

    // get biggest trades
    biggest: function() {
      return this.amounts.reduce((acc, curVal) => Math.max(acc, curVal))
    }
  }
}
</script>

<style></style>
