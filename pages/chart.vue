<template>
  <div class="container">
    <LineChart :chartData="lineChartData" :options="lineChartOption" :styles="lineChartStyles" />
    <PieChart :chartData="pieChartData" :options="pieChartOption" :styles="pieChartStyles" />
  </div>
</template>

<script lang="ts">
import moment from 'moment'

import { Vue, Component } from 'vue-property-decorator'
import { ChartData, ChartOptions } from 'chart.js'

// components
import LineChart from '~/components/organisms/LineChart.vue'
import PieChart from '~/components/organisms/PieChart.vue'

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
    LineChart,
    PieChart
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
      const categoryMap: Map<string, number> = new Map<string, number>()

      if (userTaskInfoStore.taskHistories.length) {
        userTaskInfoStore.taskHistories.forEach((history) => {
          const dayLabel = moment(history.date).format('MM/DD')
          countMap.has(dayLabel)
            ? countMap.set(dayLabel, countMap.get(dayLabel)! + 1)
            : countMap.set(dayLabel, 1)

          categoryMap.has(history.categoryName)
            ? categoryMap.set(history.categoryName, categoryMap.get(history.categoryName)! + 1)
            : categoryMap.set(history.categoryName, 1)
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
          const dayLabel = moment(doc.data().date.toDate()).format('MM/DD')
          countMap.has(dayLabel)
            ? countMap.set(dayLabel, countMap.get(dayLabel)! + 1)
            : countMap.set(dayLabel, 1)

          const categoryName = doc.data().categoryName
          categoryMap.has(categoryName)
            ? categoryMap.set(categoryName, categoryMap.get(categoryName)! + 1)
            : categoryMap.set(categoryName, 1)
        })
      }

      const lineChartData: ChartData = {
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
      const lineChartOption: ChartOptions = {
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
      const lineChartStyles = {
        height: '35vh',
        width: '100%',
        'margin-bottom': '10px'
      }

      const pieChartData: ChartData = {
        labels: [...categoryMap.keys()],
        datasets: [
          {
            type: 'pie',
            data: [...categoryMap.values()],
            backgroundColor: ['#f87979', '#aa4c8f', '#38b48b', '#006e54', '#c1e4e9', '#89c3eb', '#c3d825']
          }
        ]
      }
      const pieChartOption: ChartOptions = {
        // アスペクト比を固定しないように変更
        maintainAspectRatio: false,
        cutoutPercentage: 50,
        legend: {
          position: 'bottom'
        }
      }
      const pieChartStyles = {
        height: '35vh',
        width: '100%'
      }
      return {
        lineChartData,
        lineChartOption,
        lineChartStyles,
        pieChartData,
        pieChartOption,
        pieChartStyles
      }
    } catch (err) {
      window.alert(err)
    }
  }
})
export default class Chart extends Vue {}
</script>
