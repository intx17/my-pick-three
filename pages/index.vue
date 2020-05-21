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
import moment from 'moment'

// components
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
import { Category } from '~/src/entities/category'
import { TaskHistory } from '~/src/entities/task-history'
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

      const startOfToday = moment().startOf('day')
      const endOfToday = moment().endOf('day')
      const histories: TaskHistory[] = []

      // get today's taskhistory
      const historiesDocs = await context.app.$db.collection('users')
        .doc(email)
        .collection('taskHistories')
        .orderBy('date', 'asc')
        .startAt(startOfToday.toDate())
        .endAt(endOfToday.toDate())
        .get()

      historiesDocs.forEach((doc: any) => {
        const history: TaskHistory = {
          taskId: doc.data().taskId,
          taskName: doc.data().taskName,
          taskDetail: doc.data().taskDetail,
          historyId: doc.id,
          categoryName: doc.data().categoryName,
          date: doc.data().date.toDate(),
          done: doc.data().done
        }
        histories.push(history)
      })
      userTaskInfoStore.updateTaskHistories(JSON.parse(JSON.stringify(histories)))
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
      const tasks: Task[] = []
      const taskDocs = await this.$db.collection('users')
        .doc(email)
        .collection('tasks')
        .get()

      console.log(taskDocs)

      taskDocs.forEach((doc: any) => {
        const task: Task = {
          categoryId: doc.data().categoryId,
          taskId: doc.id,
          taskName: doc.data().taskName,
          taskDetail: doc.data().taskDetail
        }
        tasks.push(task)
      })
      userTaskInfoStore.updateTasks(JSON.parse(JSON.stringify(tasks)))
    }
  }

  private async updateCategories (email: string) {
    const categories: Category[] = []
    if (!userTaskInfoStore.categories.length) {
      const categoryDocs = await this.$db.collection('users')
        .doc(email)
        .collection('categories')
        .get()
      categoryDocs.forEach((doc: any) => {
        const c: Category = {
          categoryId: doc.id,
          categoryCode: doc.data().categoryCode,
          categoryName: doc.data().categoryName
        }
        categories.push(c)
      })
      userTaskInfoStore.updateCategories(JSON.parse(JSON.stringify(categories)))
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
