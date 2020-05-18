<template>
  <modal-wrapper :is-active.sync="syncedIsSelectModalOpen">
    <panel
      :title="'タスク候補'"
      :categories="panelCategories"
      :items="panelItems"
      @select-item="saveTaskHistory"
      class="has-background-white"
    />
  </modal-wrapper>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

import moment from 'moment'

// components
import { selectTaskModalStore, userTaskInfoStore, authStore } from '~/store'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'
import Panel from '~/components/atoms/Panel.vue'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'

// entities
import ICategory from '~/src/entities/category'
import ITaskHistory from '~/src/entities/task-history'

@Component({
  components: {
    ModalWrapper,
    Panel
  }
})
export default class selectTaskModal extends Vue {
  @PropSync('isSelectModalOpen', { type: Boolean, required: true, default: false })
  private syncedIsSelectModalOpen!: boolean

  // computed
  get panelCategories (): ICategory[] {
    return userTaskInfoStore.categories
  }

  get panelItems (): IPanelItem[] {
    return selectTaskModalStore.panelItems
  }

  // methods
  private async saveTaskHistory (itemId: string) {
    const item = this.panelItems.find(item => item.itemId === itemId)

    if (!item) {
      return ('タスク情報が不正です')
    }

    const date = moment().startOf('day')
    const duplicateTaskHistory = userTaskInfoStore.taskHistories
      .find(history => history.taskId === item.itemId &&
        moment(history.date).isSame(date))

    if (duplicateTaskHistory) {
      alert('指定のタスクはすでに追加されています')
      return
    }

    const taskHistoryCount = userTaskInfoStore.taskHistories
      .filter(history => moment(history.date).isSame(date))
      .length

    if (taskHistoryCount >= 3) {
      alert('今日のタスク登録可能数を超えています')
      return
    }

    try {
      // TODO: リファクタ
      const user = authStore.user
      if (!user) {
        throw new Error('認証エラー')
      }

      const taskHistory: ITaskHistory = {
        user,
        taskId: item.itemId,
        done: false,
        date: date.toDate()
      }
      const addedHistory = await this.$db.collection('taskHistories').add(taskHistory)

      const newTaskHistoriy: ITaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))
      taskHistory.historyId = addedHistory.id
      newTaskHistoriy.push(taskHistory)
      userTaskInfoStore.updateTaskHistories(newTaskHistoriy)
    } catch (err) {
      console.log(err.message)
    }
  }
}
</script>
