<template>
  <div>
    <h4>
      Localbitcoins.com stats, polling every
      {{ UPDATE_INTERVAL / 1000 }} seconds, showing
      {{ TRANSACTION_COUNT }} latest ads
    </h4>
    <h5>Stats (updated {{ statsUpdate }})</h5>
    <Stats :recent="recentTrades" />
    <h5>Buy bitcoins ads: (updated {{ this.sellUpdate }})</h5>
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
import Stats from './components/Stats.vue'
import lbtcApi from './apiGetter'

const ascendingSorter = (a, b) => a.data.temp_price - b.data.temp_price
const descendingSorter = (a, b) => b.data.temp_price - a.data.temp_price

export default {
  name: 'App',
  components: { Stats, AdvertisementList },
  mounted () {
    this.getStatistics()
    setInterval(this.getStatistics, this.UPDATE_INTERVAL)
  },
  data () {
    return {
      UPDATE_INTERVAL: 15000,
      TRANSACTION_COUNT: 5,
      statsUpdate: '',
      sellUpdate: '',
      buyUpdate: '',
      recentTrades: [],
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
        this.recentTrades = data
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
