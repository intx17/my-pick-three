<template>
  <div class="container">
    <task-cards />
    <task-buttons
      @open-select-modal="openSelectModal"
      @open-edit-modal="openEditModal"
    />
    <select-task-modal
      :is-select-modal-open.sync="isSelectModalOpen"
    />
    <edit-task-modal
      :is-edit-modal-open.sync="isEditModalOpen"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import SearchTaskRequest from '../src/entities/request/search-task'
import SearchTaskResponse from '../src/entities/response/search-task'
import SearchTaskHistoryResponse from '../src/entities/response/search-task-history'
import SearchTaskHistoryRequest from '../src/entities/request/search-task-history'
import SearchCategoryResponse from '../src/entities/response/search-category'
import SearchCategoryRequest from '../src/entities/request/search-category'
import TaskCards from '~/components/molecules/TaskCards.vue'
import TaskButtons from '~/components/molecules/TaskButtons.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'
import SelectTaskModal from '~/components/organisms/SelectTaskModal.vue'
import EditTaskModal from '~/components/organisms/EditTaskModal.vue'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'

// middlewares
import authenticated from '~/middleware/authenticated'

// entities
import { Task } from '~/src/entities/task'

// store
import { authStore, selectTaskModalStore, userTaskInfoStore } from '~/store'

@Component({
  layout: 'default',
  head: {
    title: 'my-pick-three: home'
  },
  middleware: [
    authenticated
  ],
  components: {
    TaskCards,
    TaskButtons,
    ModalWrapper,
    SelectTaskModal,
    EditTaskModal
  },
  async asyncData (context) {
    try {
      const email = authStore.userEmail

      if (email == null) {
        throw new Error('認証情報が不正です')
      }
      const request: SearchTaskHistoryRequest = {
        email
      }
      const response: SearchTaskHistoryResponse = await context.$axios.$post<SearchTaskHistoryResponse>('/api/searchTaskHistory', request)
      userTaskInfoStore.updateTaskHistories(JSON.parse(JSON.stringify(response.taskHistories)))
    } catch (err) {
      window.alert(err)
    }
  }
})
export default class Index extends Vue {
  private isSelectModalOpen: boolean = false

  private isEditModalOpen: boolean = false

  private panelItems: IPanelItem[] = []

  // methods
  private async updateTasks (email: string) {
    if (!userTaskInfoStore.tasks.length) {
      const request: SearchTaskRequest = ({
        email
      })
      const response: SearchTaskResponse = await this.$axios.$post<SearchTaskResponse>('/api/searchTask', request)
      userTaskInfoStore.updateTasks(JSON.parse(JSON.stringify(response.tasks)))
    }
  }

  private async updateCategories (email: string) {
    if (!userTaskInfoStore.categories.length) {
      const request: SearchCategoryRequest = ({
        email
      })
      const response: SearchCategoryResponse = await this.$axios.$post<SearchCategoryResponse>('/api/searchCategory', request)
      userTaskInfoStore.updateCategories(JSON.parse(JSON.stringify(response.categories)))
    }
  }

  private async openSelectModal () {
    try {
      const email = authStore.userEmail
      if (!email) {
        throw new Error('認証情報が不正です')
      }
      await this.updateCategories(email)
      await this.updateTasks(email)

      if (!selectTaskModalStore.updatePanelItems.length) {
        const panelItems: IPanelItem[] = userTaskInfoStore.tasks
          .map((task: Task) => {
            const item: IPanelItem = {
              categoryId: task.categoryId,
              itemId: task.taskId!,
              itemName: task.taskName
            }
            return item
          })
        selectTaskModalStore.updatePanelItems(JSON.parse(JSON.stringify(panelItems)))
      }

      this.isSelectModalOpen = true
    } catch (err) {
      alert(err.message)
    }
  }

  private async openEditModal () {
    try {
      const email = authStore.userEmail
      if (!email) {
        throw new Error('認証情報が不正です')
      }
      await this.updateTasks(email)
      await this.updateCategories(email)
      this.isEditModalOpen = true
    } catch (err) {
      alert(err.message)
    }
  }

  private save (result: boolean) {
    if (result) {
      this.isEditModalOpen = false
    }
  }
}
</script>
