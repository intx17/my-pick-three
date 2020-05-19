<template>
  <div class="container">
    <LineChart :chartData="chartData" :options="chartOption" :styles="chartStyles" />
  </div>
</template>

<script lang="ts">
import moment from 'moment'

import { Vue, Component } from 'vue-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'

// components
import LineChart from '~/components/organisms/LineChart.vue'

// middlewares
import authenticated from '~/middleware/authenticated'
import { authStore } from '~/store'

@Component({
  layout: 'default',
  head: {
    title: 'my-pick-three: chart'
  },
  middleware: [
    authenticated
  ],
  components: {
    LineChart
  },
  async asyncData (context) {
    try {
      const email = authStore.user?.email
      if (!email) {
        throw new Error('created: 認証情報が不正です')
      }

      const startOfSevenDaysBefore = moment().add(-7, 'day').startOf('day')
      const endOfToday = moment().endOf('day')

      const countMap: Map<string, number> = new Map<string, number>()
      const historiesDocs = await context.app.$db.collection('taskHistories')
        .where('user.email', '==', email)
        .where('done', '==', true)
        .orderBy('date', 'asc')
        .startAt(startOfSevenDaysBefore.toDate())
        .endAt(endOfToday.toDate())
        .get()
      historiesDocs.forEach((doc: any) => {
        console.log(doc.data().date)
        const label = moment(doc.data().date.toDate()).format('MM/DD')
        countMap.has(label)
          ? countMap.set(label, countMap.get(label)! + 1)
          : countMap.set(label, 1)
      })
      const chartData: ChartData = {
        labels: [...countMap.keys()],
        datasets: [
          {
            type: 'line',
            label: '実績数',
            data: [...countMap.values()],
            backgroundColor: 'rgba(213, 184, 255, 0.5)',
            borderColor: 'rgba(155, 89, 182, 0.7)'
          }
        ]
      }
      const chartOption: ChartOptions = {
        // アスペクト比を固定しないように変更
        maintainAspectRatio: false
      }
      const chartStyles = {
        height: '100%',
        width: '100%'
      }
      return {
        chartData,
        chartOption,
        chartStyles
      }
    } catch (err) {
      window.alert(err)
    }
  }
})
export default class Chart extends Vue {}
</script>
