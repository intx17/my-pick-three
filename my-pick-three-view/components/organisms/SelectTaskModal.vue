<template>
  <modal-wrapper :is-active.sync="syncedIsSelectModalOpen">
    <panel
      :title="'タスク候補'"
      :categories="panelCategories"
      :items="panelItems"
      class="has-background-white"
    />
  </modal-wrapper>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

// components
import ModalWrapper from '~/components/organisms/ModalWrapper.vue'
import Panel from '~/components/atoms/Panel.vue'

// components interface
import { IPanelItem } from '~/src/components/atoms/panel'

@Component({
  components: {
    ModalWrapper,
    Panel
  }
})
export default class selectTaskModal extends Vue {
  @PropSync('isSelectModalOpen', { type: Boolean, required: true, default: false })
  private syncedIsSelectModalOpen!: boolean

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
