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
import { ITaskCard } from '~/src/components/molecules/task-cards'

// middlewares
import authenticated from '~/middleware/authenticated'

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

  // methods
  private openSelectModal () {
    this.isSelectModalOpen = true
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
