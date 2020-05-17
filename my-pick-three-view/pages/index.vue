<template>
  <div class="container">
    <task-cards :tasks="tasks"/>
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
import TaskCards from '~/components/molecules/TaskCards.vue'
import TaskButtons from '~/components/molecules/TaskButtons.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'
import SelectTaskModal from '~/components/organisms/selectTaskModal.vue'
import EditTaskModal from '~/components/organisms/EditTaskModal.vue'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'
import { ITaskCard } from '~/src/components/molecules/task-cards'

// middlewares
import authenticated from '~/middleware/authenticated'

// entities
import ICategory from '~/src/entities/category'

// store
import { authStore, selectTaskModalStore } from '~/store'

@Component({
  layout: 'default',
  head: {
    title: 'ホーム'
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

  private tasks: ITaskCard[] = [
    {
      taskTitle: 'Title1',
      taskDetail: 'Detail1'.repeat(3),
      done: true
    },
    {
      taskTitle: 'Title2',
      taskDetail: 'Detail2'.repeat(3),
      done: false
    },
    {
      taskTitle: 'Title3',
      taskDetail: 'Detail3'.repeat(3),
      done: false
    }
  ]

  private panelCategories: ICategory[] = []
  private panelItems: IPanelItem[] = []

  // methods
  private async openSelectModal () {
    try {
      const email = authStore.user!.email
      const panelCategories: ICategory[] = []
      const panelItems: IPanelItem[] = []
      const categories = await this.$db.collection('categories').get()
      categories.forEach((category: any) => {
        const c: ICategory = {
          categoryId: category.data().categoryId,
          categoryName: category.data().categoryName
        }
        panelCategories.push(c)
      })
      selectTaskModalStore.updatePanelCategories(JSON.parse(JSON.stringify(panelCategories)))

      const userTasks = await this.$db.collection('tasks')
        .where('user.email', '==', email).get()
      userTasks.forEach((task: any) => {
        const pi: IPanelItem = {
          category: Number(task.data().categoryId),
          itemId: task.id,
          itemName: task.data().taskName
        }
        panelItems.push(pi)
        console.log(pi)
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
