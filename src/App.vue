<template>
  <div>
    <p>
      Mean price of last 500 transactions:
      {{ Math.floor(recent * 100) / 100 }} EUR
    </p>
    <p>
      Smallest trade:
      {{ smallest }} BTC
    </p>
    <p>Biggest trade [BTC]: {{ biggest }}</p>
    <p>Data updated: {{ timestamp }}</p>
    <p>
      Buy bitcoins:
      <AdvertisementList :tlist="buys" />
    </p>
    <p>
      Sell bitcoins:
      <AdvertisementList :tlist="sells" />
    </p>
  </div>
</template>

<script>
import AdvertisementList from './components/AdvertisementList.vue'
import lbtcApi from './apiGetter'

export default {
  name: 'App',
  components: { AdvertisementList },
  mounted () {
    this.getStatistics()
    // setInterval(this.getStatistics, 15000)
  },
  data() {
    return {
      recent: '',
      timestamp: 'none',
      smallest: '',
      biggest: '',
      sells: [],
      buys: []
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

      lbtcApi.getSell().then((data) => (this.sells = data.data.ad_list))
      lbtcApi.getBuy().then((data) => (this.buys = data.data.ad_list))
    }
  }
}
</script>

<style>
body {
  font-family: arial;
}
</style>
