<template>
  <div
    :class="modalAdditionalClass"
    class="modal"
  >
    <div
      @click="close"
      class="modal-background"
    />
    <div class="modal-content">
      <slot />
    </div>
    <button
      @click="close"
      class="modal-close is-large"
      aria-label="close"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync } from 'vue-property-decorator'

@Component({})
export default class ModalWrapper extends Vue {
  @PropSync('isActive', { type: Boolean, required: true, default: false })
  private syncedIsActive!: boolean

  // computed
  get modalAdditionalClass () {
    return {
      'is-active': this.syncedIsActive
    }
  }

  // methods
  private close () {
    this.syncedIsActive = false
  }
}
</script>
