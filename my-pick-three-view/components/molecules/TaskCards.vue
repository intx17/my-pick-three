<template>
  <div class="columns is-mobile is-multiline is-centered">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="column is-11"
    >
      <card
        :title="task.taskName"
        :detail="task.taskDetail || ''"
        :done="task.done"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import Card from '@/components/atoms/Card.vue'

// components interface
import ITask from '~/src/entities/task'
import { userTaskInfoStore } from '~/store'

@Component({
  components: {
    Card
  }
})
export default class TaskCards extends Vue {
  // computed
  get tasks (): ITask[] {
    const historiesTaskId = userTaskInfoStore.taskHistories
      .map(history => history.taskId)
    return userTaskInfoStore.tasks
      .filter(task => task.taskId && historiesTaskId.includes(task.taskId))
  }
}
</script>
