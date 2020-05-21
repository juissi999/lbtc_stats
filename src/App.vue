<template>
  <div>
    <h4>
      Localbitcoins.com stats, polling every
      {{ UPDATE_INTERVAL / 1000 }} seconds, showing
      {{ TRANSACTION_COUNT }} latest ads
    </h4>
    <h5>Stats (updated {{ statsUpdate }})</h5>
    <p>
      Mean price of last 500 transactions:
      {{ Math.floor(recent * 100) / 100 }} EUR/BTC
    </p>
    <p>Smallest trade: {{ smallest }} BTC</p>
    <p>Biggest trade: {{ biggest }} BTC</p>
    <h5>Buy bitcoins ads: (updated {{ this.buyUpdate }})</h5>
    <p>
      <AdvertisementList :tlist="buys" :transactionCount="TRANSACTION_COUNT" />
    </p>
    <h5>Sell bitcoins ads: (updated {{ this.sellUpdate }})</h5>
    <p>
      <AdvertisementList :tlist="sells" :transactionCount="TRANSACTION_COUNT" />
    </p>
  </div>
</template>

<script>
import AdvertisementList from './components/AdvertisementList.vue'
import lbtcApi from './apiGetter'

const ascendingSorter = (a, b) => a.data.temp_price - b.data.temp_price
const descendingSorter = (a, b) => b.data.temp_price - a.data.temp_price

export default {
  name: 'App',
  components: { AdvertisementList },
  mounted () {
    this.getStatistics()
    setInterval(this.getStatistics, this.UPDATE_INTERVAL)
  },
  data () {
    return {
      UPDATE_INTERVAL: 15000,
      TRANSACTION_COUNT: 5,
      recent: '',
      statsUpdate: '',
      sellUpdate: '',
      buyUpdate: '',
      smallest: '',
      biggest: '',
      sells: [],
      buys: []
    }
  },
  methods: {
    getStatistics () {
      // get 500 latest trades
      lbtcApi.getRecentTrades().then(data => {
        // calculate average price from array
        const averagePrice =
          data.reduce(
            (accumulator, currentVal) =>
              accumulator + parseFloat(currentVal.price),
            0
          ) / data.length

        // filter data to get only float prices
        const amounts = data.map(d => parseFloat(d.amount))

        // get smallest and biggest trades
        this.smallest = amounts.reduce((acc, curVal) => Math.min(acc, curVal))
        this.biggest = amounts.reduce((acc, curVal) => Math.max(acc, curVal))

        this.recent = averagePrice
        this.statsUpdate = new Date().toLocaleString()
      })

      lbtcApi.getSell().then(data => {
        this.sells = data.data.ad_list.sort(ascendingSorter)
        this.sellUpdate = new Date().toLocaleString()
      })

      lbtcApi.getBuy().then(data => {
        this.buys = data.data.ad_list.sort(descendingSorter)
        this.buyUpdate = new Date().toLocaleString()
      })
    }
  }
}
</script>

<style>
body {
  font-family: arial;
}
</style>
