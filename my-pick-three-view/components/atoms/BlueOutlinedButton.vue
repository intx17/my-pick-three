<template>
  <div class="field">
    <button class="button is-info is-outlined">{{ buttonText }}</button>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class BlueOutlinedButton extends Vue {
  @Prop({ type: String, required: true })
  private buttonText!: string
}
</script>
