<template>
  <article class="panel is-info">
    <p class="panel-heading">Info</p>
    <p class="panel-tabs">
      <a class="is-active">All</a>
      <a v-for="(task, index) in tasks" :key="index">
        {{ task.taskName }}
      </a>
    </p>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input class="input is-info" type="text" placeholder="Search">
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true" />
        </span>
      </p>
    </div>
    <a
      v-for="(category, index) in categories"
      :key="index"
      class="panel-block"
    >
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ category }}
    </a>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// components interface
import { IPanel } from '~/src/components/atoms/panel'

@Component({})
export default class Panel extends Vue {
  @Prop({ type: Object, required: true })
  private panelData!: IPanel

  // computed
  get categories () {
    return this.panelData.categories
  }

  get tasks () {
    return this.panelData.tasks
  }
}
</script>
