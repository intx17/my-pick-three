<template>
  <div class="columns is-mobile is-multiline is-centered">
    <div
      v-for="(task, index) in tasks"
      :key="index"
      class="column is-11"
    >
      <card
        :title="task.taskTitle"
        :detail="task.taskDetail"
        :done="task.done"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// components
import Card from '@/components/atoms/Card.vue'

// components interface
import { ITaskCard } from '@/src/components/molecules/taskCards'

@Component({
  components: {
    Card
  }
})
export default class TaskCards extends Vue {
  @Prop({ type: Array, required: true })
  private tasks!: ITaskCard[]
}
</script>

<style scoped>
</style>
