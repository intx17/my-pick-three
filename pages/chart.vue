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
import { authStore, userTaskInfoStore } from '~/store'

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
        throw new Error('認証情報が不正です')
      }

      const startOfSevenDaysBefore = moment().add(-7, 'day').startOf('day')
      const endOfToday = moment().endOf('day')

      const countMap: Map<string, number> = new Map<string, number>()
      if (userTaskInfoStore.taskHistories.length) {
        userTaskInfoStore.taskHistories.forEach((history) => {
          const label = moment(history.date).format('MM/DD')
          countMap.has(label)
            ? countMap.set(label, countMap.get(label)! + 1)
            : countMap.set(label, 1)
        })
      } else {
        const historiesDocs = await context.app.$db.collection('users')
          .doc(email)
          .collection('taskHistories')
          .where('done', '==', true)
          .orderBy('date', 'asc')
          .startAt(startOfSevenDaysBefore.toDate())
          .endAt(endOfToday.toDate())
          .get()

        historiesDocs.forEach((doc: any) => {
          const label = moment(doc.data().date.toDate()).format('MM/DD')
          countMap.has(label)
            ? countMap.set(label, countMap.get(label)! + 1)
            : countMap.set(label, 1)
        })
      }
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
        maintainAspectRatio: false,
        scales: { // 軸設定
          yAxes: [{ // y軸設定
            ticks: { // 最大値最小値設定
              stepSize: 1,
              beginAtZero: true,
              min: 0, // 最小値
              max: 3 // 最大値
            }
          }]
        }
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
      console.log(err)
      window.alert(err)
    }
  }
})
export default class Chart extends Vue {}
</script>
