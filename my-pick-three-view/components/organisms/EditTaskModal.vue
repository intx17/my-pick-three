<template>
  <modal-wrapper :is-active.sync="syncedIsEditModalOpen">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="box">
          <text-input-with-label :label-text="'タスク名'" :value.sync="taskName" />
          <select-dropdown-with-label
            :selected-value.sync="selectedCategory"
            :options="selectOptions"
            :label-text="'カテゴリ'"
          />
          <textarea-with-label :label-text="'タスク詳細'" :text.sync="taskDetail" />
          <div class="field">
            <info-button-outlined :button-text="'Save'" @click.native="save()" />
          </div>
        </div>
      </div>
    </div>
  </modal-wrapper>
</template>

<script lang="ts">
import { Vue, Component, Emit, PropSync } from 'vue-property-decorator'

// components
import TextInputWithLabel from '~/components/atoms/TextInputWithLabel.vue'
import SelectDropdownWithLabel from '~/components/atoms/SelectDropdownWithLabel.vue'
import TextareaWithLabel from '~/components/atoms/TextareaWithLabel.vue'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'

// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

// enums
import { TaskCategoryUtil, TaskCategory } from '~/src/enums/task-category'

// entities
import ITask from '~/src/entities/task'

// store
import { authStore, userTaskInfoStore } from '~/store'

@Component({
  components: {
    TextInputWithLabel,
    SelectDropdownWithLabel,
    TextareaWithLabel,
    InfoButtonOutlined,
    ModalWrapper
  }
})
export default class EditTaskModal extends Vue {
  @PropSync('isEditModalOpen', { type: Boolean, required: true, default: false })
  private syncedIsEditModalOpen!: boolean

  private taskName: string = ''
  private taskDetail: string = ''
  private selectedCategory: String = String(TaskCategory.Eating)
  private selectOptions: ISelectOption[] = TaskCategoryUtil.getSelectOptions()

  private save () {
    const user = authStore.user

    if (!user || !user.email) {
      return false
    }

    const task: ITask = {
      user,
      taskDetail: this.taskDetail,
      taskName: this.taskName,
      categoryId: Number(this.selectedCategory)
    }

    try {
      this.$db.collection('tasks').add(task)
      const newTasks = [...userTaskInfoStore.tasks, task]
      userTaskInfoStore.updateTasks(newTasks)
      alert('タスク保存に成功しました。')
      this.syncedIsEditModalOpen = false
    } catch (err) {
      alert(err.message)
    }
  }
}
</script>
