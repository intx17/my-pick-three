<template>
  <div>
    <panel :panel-data="panelData" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import Panel from '~/components/atoms/Panel.vue'

// components interface
import { IPanel } from '~/src/components/atoms/panel'

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
    Panel
  }
})
export default class Index extends Vue {
  private panelData: IPanel = {
    categories: [
      'cat1',
      'cat2'
    ],
    tasks: [
      {
        taskName: 'One'
      },
      {
        taskName: 'Two'
      },
      {
        taskName: 'Three'
      },
      {
        taskName: 'Four'
      }
    ]
  }
}
</script>

<style>

</style>
