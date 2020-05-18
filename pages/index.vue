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
import moment from 'moment'
import ITaskHistory from '../src/entities/task-history'
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
import ICategory from '~/src/entities/category'

// store
import { authStore, selectTaskModalStore, userTaskInfoStore } from '~/store'
import ITask from '~/src/entities/task'

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
  }
})
export default class Index extends Vue {
  private isSelectModalOpen: boolean = false

  private isEditModalOpen: boolean = false

  private panelCategories: ICategory[] = []
  private panelItems: IPanelItem[] = []

  // methods
  async created () {
    try {
      const email = authStore.user?.email
      if (!email) {
        throw new Error('created: 認証情報が不正です')
      }

      const tasks: ITask[] = []
      const taskDocs = await this.$db.collection('tasks')
        .where('user.email', '==', email)
        .get()

      taskDocs.forEach((doc: any) => {
        const task: ITask = {
          categoryCode: doc.data().categoryCode,
          taskId: doc.id,
          taskName: doc.data().taskName,
          taskDetail: doc.data().taskDetail,
          user: doc.data().user
        }
        tasks.push(task)
      })
      userTaskInfoStore.updateTasks(JSON.parse(JSON.stringify(tasks)))

      if (tasks.length) {
        const taskIds: string[] = tasks.map(task => task.taskId!)
        const histories: ITaskHistory[] = []
        const historiesDocs = await this.$db.collection('taskHistories')
          .where('taskId', 'in', taskIds)
          .get()
        historiesDocs.forEach((doc: any) => {
          const history: ITaskHistory = {
            taskId: doc.data().taskId,
            historyId: doc.id,
            date: doc.data().date.toDate(),
            done: doc.data().done
          }
          histories.push(history)
        })
        userTaskInfoStore.updateTaskHistories(JSON.parse(JSON.stringify(histories)))
      }

      const categories: ICategory[] = []
      const categoryDocs = await this.$db.collection('categories').get()
      categoryDocs.forEach((doc: any) => {
        const c: ICategory = {
          categoryCode: doc.data().categoryCode,
          categoryName: doc.data().categoryName
        }
        categories.push(c)
      })
      userTaskInfoStore.updateCategories(JSON.parse(JSON.stringify(categories)))
    } catch (err) {
      alert(err.message)
    }
  }

  private openSelectModal () {
    try {
      const email = authStore.user?.email
      if (!email) {
        throw new Error('openSelectModal: 認証情報が不正です')
      }

      const panelItems: IPanelItem[] = userTaskInfoStore.tasks
        .map((task: ITask) => {
          const item: IPanelItem = {
            categoryCode: Number(task.categoryCode),
            itemId: task.taskId!,
            itemName: task.taskName
          }
          return item
        })
      selectTaskModalStore.updatePanelItems(JSON.parse(JSON.stringify(panelItems)))

      this.isSelectModalOpen = true
    } catch (err) {
      alert(err.message)
    }
  }

  private openEditModal () {
    this.isEditModalOpen = true
  }

  private save (result: boolean) {
    if (result) {
      this.isEditModalOpen = false
    }
  }
}
</script>
