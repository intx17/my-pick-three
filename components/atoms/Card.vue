<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title has-background-light">
        <span :class="{ 'done-title': done }">{{ title }}</span>
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span v-if="isContentShown" @click="hideContent" class="icon">
          <fa icon="angle-up" area-hidden="true" />
        </span>
        <span v-else @click="showContent" class="icon">
          <fa icon="angle-down" area-hidden="true" />
        </span>
      </a>
    </header>
    <div v-show="isContentShown" class="card-content">
      <div class="content">
        {{ detail }}
      </div>
    </div>
    <footer class="card-footer">
      <a
        :class="{ 'disabled': done }"
        @click="clickDone"
        class="card-footer-item has-background-primary has-text-white"
      >
        <fa v-show="done" icon="check" />
        Done
      </a>
      <a
        @click="clickRemove"
        class="card-footer-item has-background-danger has-text-white"
      >Remove</a>
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator'

// components interface
import { IClickDoneEmitData } from '~/src/components/atoms/card'

@Component({})
export default class Card extends Vue {
  private isContentShown: boolean = false

  @Prop({ type: String, required: true })
  private cardId!: string

  @Prop({ type: String, required: true })
  private title!: string

  @Prop({ type: String, required: true })
  private detail!: string

  @Prop({ type: Boolean, required: true, default: false })
  private done!: boolean

  // computed
  get contentDisplay () {
    return this.isContentShown ? 'normal' : 'none'
  }

  get cardContentAdditionalStyle () {
    return {
      display: this.contentDisplay
    }
  }

  // methods
  private showContent () {
    this.isContentShown = true
  }

  private hideContent () {
    this.isContentShown = false
  }

  @Emit()
  private clickDone (): IClickDoneEmitData {
    return {
      cardId: this.cardId,
      done: this.done
    }
  }

  @Emit()
  private clickRemove (): string {
    return this.cardId
  }
}
</script>

<style scoped>
div.content {
  word-wrap: break-word;
}

span.done-title {
  text-decoration: line-through;
}

a.disabled {
  background: gray !important;
}
</style>
