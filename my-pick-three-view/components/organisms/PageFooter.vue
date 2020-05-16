<template>
  <footer class="footer">
    <tabs :tabs="tabs" />
  </footer>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import Tabs from '@/components/atoms/Tabs.vue'

// components interface
import { ITab } from '@/src/components/atoms/tabs'

@Component({
  components: {
    Tabs
  }
})
export default class PageFooter extends Vue {
  private tabs: ITab[] = [
    {
      tabName: 'Today'
    },
    {
      tabName: 'History'
    }
  ]
}
</script>
