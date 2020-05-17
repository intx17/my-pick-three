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
import { selectTaskModalStore } from '~/store'
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
    return selectTaskModalStore.panelCategories
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

    const date: string = moment().format('YYYY-MM-DD')
    const taskHistory: ITaskHistory = {
      taskId: item.itemId,
      done: false,
      date
    }

    try {
      const duplicateTaskHistory = await this.$db.collection('taskHistories')
        .where('taskId', '==', taskHistory.taskId)
        .where('date', '==', date)
        .get()

      if (duplicateTaskHistory.empty) {
        await this.$db.collection('taskHistories').add(taskHistory)
        alert('今日のタスクを追加しました')
        return
      }

      alert('指定のタスクはすでに追加されています')
    } catch (err) {
      console.log(err.message)
    }
  }
}
</script>
