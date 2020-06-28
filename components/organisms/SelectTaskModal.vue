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
import { IPanelItem, IClickPanelRowEmitData } from '~/src/components/atoms/panel'

// entities
import { Task } from '~/src/entities/task'
import { Category } from '~/src/entities/category'
import SaveTaskHisotryRequest from '~/src/entities/request/save-task-history'
import { TaskHistory } from '~/src/entities/task-history'
import SaveTaskHistoryResponse from '~/src/entities/response/save-task-history'

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
  get panelCategories (): Category[] {
    return userTaskInfoStore.categories
  }

  get panelItems (): IPanelItem[] {
    return selectTaskModalStore.panelItems
  }

  // methods
  private async saveTaskHistory (data: IClickPanelRowEmitData) {
    const task: Task | undefined = userTaskInfoStore.tasks.find(task => task.taskId === data.itemId)
    const category: Category | undefined = userTaskInfoStore.categories.find(category => category.categoryId === data.categoryId)

    if (!task || !category) {
      return ('タスク情報が不正です')
    }

    const date = moment().startOf('day')
    const duplicateTaskHistory = userTaskInfoStore.taskHistories
      .find(history => history.taskId === task.taskId &&
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
      const email = authStore.userEmail
      if (!email) {
        throw new Error('認証エラー')
      }

      const request: SaveTaskHisotryRequest = {
        email,
        categoryName: category.categoryName,
        taskId: task.taskId,
        taskName: task.taskName,
        taskDetail: task.taskDetail,
        done: false,
        dateStr: date.format('YYYY-MM-DD')
      }

      const response: SaveTaskHistoryResponse = await this.$axios.$put<SaveTaskHistoryResponse>('/api/saveTaskHistory', request)
      if (!response.historyId) {
        // FIXME
        throw new Error('レスポンス不正')
      }

      const addedHistory: TaskHistory = {
        historyId: response.historyId,
        categoryName: request.categoryName,
        taskId: request.taskId,
        taskName: request.taskName,
        taskDetail: request.taskDetail,
        done: request.done,
        date: date.toDate()
      }

      const newTaskHistoriy: TaskHistory[] = JSON.parse(JSON.stringify(userTaskInfoStore.taskHistories))
      newTaskHistoriy.push(addedHistory)
      userTaskInfoStore.updateTaskHistories(newTaskHistoriy)
    } catch (err) {
      console.log(err.message)
    }
  }
}
</script>
