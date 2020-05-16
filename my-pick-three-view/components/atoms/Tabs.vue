<template>
  <div class="tabs is-centered">
    <ul>
      <li v-for="(tab, index) in tabs" :key="index">
        <a>{{ tab.tabName }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

// components interface
import { ITab } from '@/src/components/atoms/tabs'

@Component({})
export default class Tabs extends Vue {
  @Prop({ type: Array, required: true })
  private tabs!: ITab[]
}
</script>
