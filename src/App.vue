<template>
  <div>
    <h4>
      Localbitcoins.com stats, polling every
      {{ UPDATE_INTERVAL / 1000 }} seconds, showing
      {{ TRANSACTION_COUNT }} latest ads
    </h4>
    <h5>Stats (updated {{ statsUpdate }})</h5>
    <p v-if="!errorTrades"><Stats :recent="recentTrades" /></p>
    <p v-else>Data could not be retrieved</p>
    <h5>Buy bitcoins ads (updated {{ this.sellUpdate }})</h5>
    <p v-if="!errorBuys">
      <AdvertisementList :tlist="buys" :transactionCount="TRANSACTION_COUNT" />
    </p>
    <p v-else>Data could not be retrieved</p>
    <h5>Sell bitcoins ads (updated {{ this.sellUpdate }})</h5>
    <p v-if="!errorSells">
    <AdvertisementList :tlist="sells" :transactionCount="TRANSACTION_COUNT" />
    </p>
    <p v-else>Data could not be retrieved</p>
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
      buys: [],
      errorTrades:false,
      errorBuys: false,
      errorSells: false
    }
  },
  methods: {
    getStatistics () {
      // a function that calls 3 REST apis and places the results to
      // data()-variables which are bind to template and thus cause a
      // browser DOM update

      // get 500 latest trades
      lbtcApi.getRecentTrades()
        .then(data => {
          this.recentTrades = data
          this.statsUpdate = new Date().toLocaleString()
          this.errorTrades = false
        })
        .catch(err=>this.errorTrades = true)

      // get sell advertisements
      lbtcApi.getSell()
        .then(data => {
          // sort & place to variable
          this.sells = data.data.ad_list.sort(descendingSorter)
          this.sellUpdate = new Date().toLocaleString()
          this.errorSells = false
        })
        .catch(err=>this.errorSells = true)

      // get buy advertisements
      lbtcApi.getBuy()
        .then(data => {
          // sort & place to variable
          this.buys = data.data.ad_list.sort(ascendingSorter)
          this.buyUpdate = new Date().toLocaleString()
          this.errorBuys = false
        })
        .catch(err=>this.errorBuys = true)
    }
  }
}
</script>

<style>
body {
  font-family: arial;
}
</style>
