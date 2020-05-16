<template>
  <div class="columns">
    <div class="column is-one-third is-mobile">
      <a
        @click="openModal"
        class="button is-info"
      >
        Search
      </a>
      <a
        class="button is-info is-one-quarter"
      >
        Button2
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator'

// components
import InfoButton from '@/components/atoms/InfoButton.vue'

// components interface

@Component({
  components: {
    InfoButton
  }
})
export default class TaskButtons extends Vue {
  @Emit()
  private openModal () {}
}
</script>
