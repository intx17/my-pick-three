<template>
  <div class="columns is-mobile is-multiline is-centered">
    <div
      v-for="(card, index) in taskCards"
      :key="index"
      class="column is-11"
    >
      <card
        :cardId="card.cardId"
        :title="card.title"
        :detail="card.detail || ''"
        :done="card.done"
        @click-done="clickDone"
        @click-remove="clickRemove"
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
import { IClickDoneEmitData } from '~/src/components/atoms/card'

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
    const fillTasks: ITaskCard[] = [...Array(3).keys()]
      .map((index) => {
        const num = index + 1
        const card = {
          cardId: '',
          categoryCode: Number.MAX_VALUE,
          title: `title${num}`,
          detail: `detail${num}`,
          done: false
        }
        return card
      })
    const tasks = userTaskInfoStore.tasks
    const date = moment().startOf('day')

    const cards = userTaskInfoStore.taskHistories
      .filter(history => moment(history.date).isSame(date))
      .slice(0, 3)
      .reduce((cards: ITaskCard[], history: ITaskHistory) => {
        const task = tasks.find(t => t.taskId === history.taskId)

        if (history.historyId && task) {
          const card: ITaskCard = {
            cardId: history.historyId,
            categoryCode: task.categoryCode,
            title: task.taskName,
            detail: task.taskDetail,
            done: history.done
          }
          cards.push(card)
        }

        return cards
      }, [])
      .slice(0, 3)

    return cards
      .concat(fillTasks.slice(cards.length, 3))
      .sort((cardA, cardB) => cardA.categoryCode - cardB.categoryCode)
  }

  // methods
  private clickDone (emitData: IClickDoneEmitData) {
    try {
      if (!emitData.cardId) {
        throw new Error('IDが存在しません')
      }

      this.$db.collection('taskHistories').doc(emitData.cardId)
        .update({ done: !emitData.done })

      const newTaskHistories: ITaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))
      const targetHistoryIndex = newTaskHistories.findIndex(history => history.historyId === emitData.cardId)
      newTaskHistories[targetHistoryIndex].done = !emitData.done

      userTaskInfoStore.updateTaskHistories(newTaskHistories)
    } catch (err) {
      alert(err.message)
    }
  }

  private clickRemove (cardId: string) {
    try {
      if (!cardId) {
        throw new Error('IDが存在しません')
      }

      this.$db.collection('taskHistories').doc(cardId)
        .delete()

      const newTaskHistories: ITaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))

      userTaskInfoStore.updateTaskHistories(newTaskHistories.filter(history => history.historyId !== cardId))
    } catch (err) {
      alert(err.message)
    }
  }
}
</script>
