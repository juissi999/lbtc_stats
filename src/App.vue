<template>
  <div>
    <div>
      Mean price of last 500 transactions:
      {{ Math.floor(recent * 100) / 100 }} eur
    </div>
    <div>Smallest trade [BTC]: {{ smallest }}</div>
    <div>Biggest trade [BTC]: {{ biggest }}</div>
    <div>[aquired {{ timestamp }}]</div>
  </div>
</template>

<script>
import lbtcApi from './apiGetter'

export default {
  name: 'App',
  components: {},
  mounted() {
    this.getStatistics()
    // setInterval(this.getStatistics, 15000)
  },
  data() {
    return {
      recent: '',
      timestamp: 'none',
      smallest: '',
      biggest: ''
    }
  },
  methods: {
    getStatistics() {
      // get 500 latest trades
      lbtcApi.getRecentTrades().then((data) => {
        // calculate average price from array
        const averagePrice =
          data.reduce(
            (accumulator, currentVal) =>
              accumulator + parseFloat(currentVal.price),
            0
          ) / data.length

        // filter data to get only float prices
        const amounts = data.map((d) => parseFloat(d.amount))

        // get smallest and biggest trades
        this.smallest = amounts.reduce((acc, curVal) => Math.min(acc, curVal))
        this.biggest = amounts.reduce((acc, curVal) => Math.max(acc, curVal))

        this.recent = averagePrice
        this.timestamp = new Date()
      })

      lbtcApi.getSell().then((data) => {
        console.log(data.data.ad_list)
      })
      lbtcApi.getBuy().then((data) => {
        console.log(data.data.ad_list)
      })
    }
  }
}
</script>

<style></style>
