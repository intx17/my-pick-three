<template>
  <div class="columns is-mobile is-multiline is-centered">
    <div
      v-for="(card, index) in taskCards"
      :key="index"
      class="column is-11"
    >
      <card
        :title="card.title"
        :detail="card.detail || ''"
        :done="card.done"
      />
    </div>
  </div>
</template>

<script lang="ts">
import moment from 'moment'
import { Vue, Component } from 'vue-property-decorator'

// components
import Card from '@/components/atoms/Card.vue'

// components interface
import { ITaskCard } from '~/src/components/molecules/task-cards'
import ITaskHistory from '~/src/entities/task-history'

// store
import { userTaskInfoStore } from '~/store'

@Component({
  components: {
    Card
  }
})
export default class TaskCards extends Vue {
  // computed
  get taskCards (): ITaskCard[] {
    const cards: ITaskCard[] = [...Array(3).keys()]
      .map((index) => {
        const num = index + 1
        const card = {
          title: `title${num}`,
          detail: `detail${num}`,
          done: false
        }
        return card
      })
    const tasks = userTaskInfoStore.tasks
    const date = moment().format('YYYY-MM-DD')

    userTaskInfoStore.taskHistories
      .filter(history => history.date === date)
      .slice(0, 3)
      .forEach((history: ITaskHistory, index: number) => {
        const task = tasks.find(t => t.taskId === history.taskId)

        if (task) {
          const card: ITaskCard = {
            title: task.taskName,
            detail: task.taskDetail,
            done: history.done
          }
          cards[index] = card
        }
      })

    return cards
  }
}
</script>
