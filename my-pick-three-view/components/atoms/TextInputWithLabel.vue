<template>
  <div class="field">
    <label class="label">{{ labelText }}</label>
    <div class="control">
      <input
        v-model="syncedValue"
        type="text"
        placeholder="e.g. training"
        class="input"
        required
      >
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'

@Component({})
export default class EmailInputWithLabel extends Vue {
  @PropSync('value', { type: String, required: true })
  private syncedValue!: string;

  @Prop({ type: String, required: true })
  private labelText!: string;
}
</script>
