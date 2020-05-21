<template>
  <modal-wrapper :is-active.sync="syncedIsEditModalOpen">
    <div class="box">
      <text-input-with-label :label-text="'タスク名'" :value.sync="taskName" />
      <select-dropdown-with-label
        :selected-value.sync="selectedCategoryId"
        :options="selectOptions"
        :label-text="'カテゴリ'"
      />
      <textarea-with-label :label-text="'タスク詳細'" :text.sync="taskDetail" />
      <div class="field">
        <info-button-outlined :button-text="'Save'" @click.native="save()" />
      </div>
    </div>
  </modal-wrapper>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit } from 'vue-property-decorator'

// components
import { Task } from '../../src/entities/task'
import TextInputWithLabel from '~/components/atoms/TextInputWithLabel.vue'
import SelectDropdownWithLabel from '~/components/atoms/SelectDropdownWithLabel.vue'
import TextareaWithLabel from '~/components/atoms/TextareaWithLabel.vue'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'

// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

// entities
import SaveTaskRequest from '~/src/entities/request/save-task'
import { Category } from '~/src/entities/category'

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
  private selectedCategoryId: string = ''

  // computed
  get selectOptions (): ISelectOption[] {
    return [...userTaskInfoStore.categories]
      .sort((catA, catB) => {
        return catA.categoryCode - catB.categoryCode
      })
      .map((category: Category) => {
        const option: ISelectOption = {
          text: category.categoryName,
          value: String(category.categoryId)
        }
        return option
      })
  }

  @Emit()
  private async save () {
    const email = authStore.userEmail

    if (!email) {
      return false
    }

    const request: SaveTaskRequest = {
      taskDetail: this.taskDetail,
      taskName: this.taskName,
      categoryId: this.selectedCategoryId
    }

    try {
      this.validateSaveRequest(request)

      const addedTaskRef = await this.$db.collection('users').doc(email).collection('tasks').add(request)
      const addedTask: Task = {
        taskId: addedTaskRef.id,
        taskName: request.taskName,
        taskDetail: request.taskDetail,
        categoryId: request.categoryId
      }
      const newTasks: Task[] = JSON.parse(JSON.stringify(userTaskInfoStore.tasks))
      newTasks.push(addedTask)
      userTaskInfoStore.updateTasks(newTasks)

      this.syncedIsEditModalOpen = false
    } catch (err) {
      alert(err.message)
    }
  }

  private validateSaveRequest (request: SaveTaskRequest) {
    if (!request.taskName) {
      throw new Error('タスク名を入力してください')
    }

    if (!request.categoryId) {
      throw new Error('カテゴリを入力してください')
    }
  }
}
</script>

<style scoped>
@media screen and (max-width:768px) {
  .box {
    /* タブレット・スマホで左右にマージンをつける */
    margin: 0px 1rem;
  }
}
</style>
