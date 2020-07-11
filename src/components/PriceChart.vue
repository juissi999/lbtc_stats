<template>
  <line-chart :chart-data="datacollection" :options="options"></line-chart>
</template>

<script>
import LineChart from '../components/LineChart.vue'

export default {
  props: ['trades', 'medianFilteredTrades', 'medianFilterLen'],
  components: { LineChart },
  computed: {
    datacollection: function () {
      return {
        datasets: [
          {
            label: 'Trade price',
            fill: false,
            order: 1,
            //borderColor: '#ADD8E6',
            borderColor: '#D8BFD8',
            lineTension: 0,
            data: this.trades.map(el => {
              return { t: new Date(el.date), y: Number(el.price) }
            })
          },
          {
            label: 'Median trade price (winlen:' + this.medianFilterLen + ')',
            fill: false,
            borderColor: '#3cba9f',
            lineTension: 0,
            data: this.trades.map((el, i) => {
              return { t: new Date(el.date), y: this.medianFilteredTrades[i] }
            })
          }
        ]
      }
    }
  },
  data: function () {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 0
        },
        elements: { point: { radius: 0 } },
        title: {
          display: true,
          text: 'Ticks on timeline'
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              distribution: 'linear',
              ticks: {
                source: 'auto'
              }
            }
          ]
        }
      }
    }
  }
}
</script>
