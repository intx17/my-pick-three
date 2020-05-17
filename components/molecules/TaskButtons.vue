<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-hal">
      <a
        @click="openSelectModal"
        class="button is-info"
      >
        今日のタスク選択
      </a>
    </div>
    <div class="column is-half">
      <a
        @click="openEditModal"
        class="button is-info"
      >
        タスク新規登録
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
  private openSelectModal () {}

  @Emit()
  private openEditModal () {}
}
</script>
