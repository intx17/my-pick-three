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
          <fa icon="search" aria-hidden="true" />
        </span>
      </p>
    </div>
    <a
      v-for="(item, index) in items"
      :key="index"
      class="panel-block"
    >
      <span class="panel-icon">
        <fa icon="tasks" aria-hidden="true" />
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

<style scoped>
.panel {
  /* パネルの下部分が不自然なので修正 */
  padding-bottom: 0.5rem;
}
@media screen and (max-width:768px) {
  .panel {
    /* タブレット・スマホで左右にマージンをつける */
    margin: 0px 1rem;
  }
}
.panel-block:last-child {
    border-bottom: 1px solid #ededed;
}
</style>
