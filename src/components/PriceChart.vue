<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['trades', 'medianFilteredTrades', 'medianFilterLen'],
  data: function () {
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
      ],
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
  },
  mounted () {
    this.renderChart({ datasets: this.datasets }, this.options)
  }
}
</script>
