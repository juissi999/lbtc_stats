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
      {{ Math.floor(avgPrice * 100) / 100 }} EUR/BTC
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
      avgPrice: '',
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
      // a function that calls 3 REST apis and places the results to
      // data()-variables which are bind to template and thus cause a
      // browser DOM update

      // get 500 latest trades
      lbtcApi.getRecentTrades().then(data => {
        // calculate average price from array
        const averagePrice =
          data.reduce(
            (accumulator, currentVal) =>
              accumulator + parseFloat(currentVal.price),
            0
          ) / data.length
        this.avgPrice = averagePrice

        // filter data to get only float prices
        const amounts = data.map(d => parseFloat(d.amount))

        // get smallest and biggest trades
        this.smallest = amounts.reduce((acc, curVal) => Math.min(acc, curVal))
        this.biggest = amounts.reduce((acc, curVal) => Math.max(acc, curVal))

        this.statsUpdate = new Date().toLocaleString()
      })

      // get sell advertisements
      lbtcApi.getSell().then(data => {
        // sort & place to variable
        this.sells = data.data.ad_list.sort(descendingSorter)
        this.sellUpdate = new Date().toLocaleString()
      })

      // get buy advertisements
      lbtcApi.getBuy().then(data => {
        // sort & place to variable
        this.buys = data.data.ad_list.sort(ascendingSorter)
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
