<template>
  <modal-wrapper :is-active.sync="syncedIsEditModalOpen">
    <div class="columns is-centered">
      <div class="column is-11">
        <div class="box">
          <text-input-with-label :label-text="'タスク名'" :value.sync="taskName" />
          <div class="field">
            <label class="label">カテゴリ</label>
            <div class="control">
              <select-dropdown
                :selected-value.sync="selectedCategory"
                :options="selectOptions"
              />
            </div>
          </div>
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
import SelectDropdown from '~/components/atoms/SelectDropdown.vue'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'

// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

// enums
import { TaskCategoryUtil, TaskCategory } from '~/src/enums/task-category'

// entities
import ITask from '~/src/entities/task'

// store
import { authStore } from '~/store'

@Component({
  components: {
    TextInputWithLabel,
    SelectDropdown,
    InfoButtonOutlined,
    ModalWrapper
  }
})
export default class EditTaskModal extends Vue {
  @PropSync('isEditModalOpen', { type: Boolean, required: true, default: false })
  private syncedIsEditModalOpen!: boolean

  private taskName: string = ''
  private selectedCategory: String = String(TaskCategory.Eating)
  private selectOptions: ISelectOption[] = TaskCategoryUtil.getSelectOptions()

  @Emit()
  private save (): boolean {
    const user = authStore.user

    if (!user || !user.email) {
      return false
    }

    const task: ITask = {
      user,
      taskName: this.taskName,
      categoryId: Number(this.selectedCategory)
    }

    try {
      this.$db.collection('tasks').add(task)
      alert('タスク保存に成功しました。')
      return true
    } catch (err) {
      alert(err.message)
      return false
    }
  }
}
</script>
