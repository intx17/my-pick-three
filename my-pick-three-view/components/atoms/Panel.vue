<template>
  <article class="panel is-info">
    <p class="panel-heading">{{ title }}</p>
    <p class="panel-tabs">
      <a class="is-active">All</a>
      <a v-for="(category, index) in categories" :key="index">
        {{ category }}
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
      v-for="(item, index) in items"
      :key="index"
      class="panel-block"
    >
      <span class="panel-icon">
        <i class="fas fa-book" aria-hidden="true" />
      </span>
      {{ item.name }}
    </a>
  </article>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'

@Component({})
export default class Panel extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: Array, required: true })
  private categories!: string[]

  @Prop({ type: Array, required: true })
  private items!: IPanelItem[]
}
</script>
