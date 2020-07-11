<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: ['trades', 'medianFilteredTrades'],
  data: function () {
    return {
      datasets: [
        {
          label: 'Median filtered prices',
          borderColor: '#3cba9f',
          lineTension: 0,
          data: this.trades.map((el, i) => {
            return { t: new Date(el.date), y: this.medianFilteredTrades[i] }
          })
        },
        {
          label: 'Prices',
          borderColor: '#8e5ea2',
          lineTension: 0,
          data: this.trades.map(el => {
            return { t: new Date(el.date), y: Number(el.price) }
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
    console.log(this.datasets[0].data)
    this.renderChart({ datasets: this.datasets }, this.options)
  }
}
</script>
