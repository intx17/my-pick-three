<template>
  <div class="container">
    <task-cards :tasks="tasks"/>
    <div class="columns is-mobile is-multiline is-centered">
      <div class="column is-11">
        <panel
          :title="'タスク候補'"
          :categories="panelCategories"
          :items="panelItems"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import TaskCards from '~/components/molecules/TaskCards.vue'
import Panel from '~/components/atoms/Panel.vue'

// components interface
import { ITaskCard } from '~/src/components/molecules/taskCards'
import { IPanelItem } from '~/src/components/atoms/panel'

// middlewares
import authenticated from '~/middleware/authenticated'

@Component({
  layout: 'HOME',
  head: {
    title: 'ホーム'
  },
  middleware: [
    authenticated
  ],
  components: {
    TaskCards,
    Panel
  }
})
export default class Index extends Vue {
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
}
</script>
