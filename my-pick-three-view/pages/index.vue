<template>
  <div class="container">
    <task-cards :tasks="tasks"/>
    <task-buttons @open-modal="openModal" />
    <modal-wrapper :is-active.sync="isModalOpen">
      <panel
        :title="'タスク候補'"
        :categories="panelCategories"
        :items="panelItems"
        class="has-background-white"
      />
    </modal-wrapper>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import TaskCards from '~/components/molecules/TaskCards.vue'
import TaskButtons from '~/components/molecules/TaskButtons.vue'
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'
import Panel from '~/components/atoms/Panel.vue'

// components interface
import { ITaskCard } from '~/src/components/molecules/taskCards'
import { IPanelItem } from '~/src/components/atoms/panel'

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
    Panel
  }
})
export default class Index extends Vue {
  private isModalOpen: boolean = false

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

  private panelCategories: string[] = [
    'cat1',
    'cat2'
  ]

  private panelItems: IPanelItem[] = [
    {
      name: 'One'
    },
    {
      name: 'Two'
    },
    {
      name: 'Three'
    },
    {
      name: 'Four'
    }
  ]

  // methods
  private openModal () {
    this.isModalOpen = true
  }
}
</script>
