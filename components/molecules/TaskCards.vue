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
import { TaskHistory } from '~/src/entities/task-history'
import { IClickDoneEmitData } from '~/src/components/atoms/card'

// store
import { userTaskInfoStore, authStore } from '~/store'

@Component({
  components: {
    Card
  }
})
export default class TaskCards extends Vue {
  // computed
  get taskCards (): ITaskCard[] {
    const fillTaskCards: ITaskCard[] = [...Array(3).keys()]
      .map((index) => {
        const num = index + 1
        const card = {
          cardId: '',
          categoryCode: NaN,
          title: `title${num}`,
          detail: `detail${num}`,
          done: false
        }
        return card
      })
    const date = moment().startOf('day')

    userTaskInfoStore.taskHistories
      .filter(history => moment(history.date).isSame(date))
      .forEach((history: TaskHistory, index: number) => {
        const card: ITaskCard = {
          cardId: history.historyId,
          title: history.taskName,
          detail: history.taskDetail,
          done: history.done
        }
        fillTaskCards[index] = card
      })

    return fillTaskCards
  }

  // methods
  private clickDone (emitData: IClickDoneEmitData) {
    try {
      if (!emitData.cardId) {
        throw new Error('IDが存在しません')
      }

      const email = authStore.userEmail

      if (!email) {
        return false
      }

      this.$db.collection('users').doc(email).collection('taskHistories').doc(emitData.cardId)
        .update({ done: !emitData.done })

      const newTaskHistories: TaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))
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

      const newTaskHistories: TaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))

      userTaskInfoStore.updateTaskHistories(newTaskHistories.filter(history => history.historyId !== cardId))
    } catch (err) {
      alert(err.message)
    }
  }
}
</script>
