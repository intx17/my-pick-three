<template>
  <div class="field">
    <label class="label">{{ labelText }}</label>
    <div class="control">
      <textarea
        v-model="syncedText"
        class="textarea is-small"
        placeholder="Small textarea"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

@Component({})
export default class SelectDropdownWithLabel extends Vue {
  @PropSync('text', { type: String, required: true })
  private syncedText!: String

  @Prop({ type: String, required: true })
  private labelText!: string
}
</script>
