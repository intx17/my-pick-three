<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-background-light">{{ title }}</p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fas fa-angle-down" aria-hidden="true" />
        </span>
      </a>
    </header>
    <div class="card-content">
      <div class="content">
        {{ detail }}
      </div>
    </div>
    <footer class="card-footer">
      <a
        :disabled="done"
        href="#"
        class="card-footer-item has-background-primary has-text-white"
      >Done</a>
      <a href="#" class="card-footer-item has-background-danger has-text-white">Remove</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class Card extends Vue {
  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: String, required: true })
  private detail!: string

  @Prop({ type: Boolean, required: true, default: false })
  private done!: boolean
}
</script>

<style scoped>
div.content {
  word-wrap: break-word;
}
</style>
