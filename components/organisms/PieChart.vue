<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator'
import Chart from 'chart.js'

import { Pie, mixins } from 'vue-chartjs'

@Component({})
export default class PieChart extends Mixins(Pie, mixins.reactiveProp) {
  @Prop({ type: Object, required: true, default: {} })
  chartData!: Chart.ChartData

  @Prop({ type: Object, required: true, default: {} })
  options!: Chart.ChartOptions

  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
