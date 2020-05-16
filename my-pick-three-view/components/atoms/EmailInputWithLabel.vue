<template>
  <div class="field">
    <label class="label">{{ labelText }}</label>
    <div class="control has-icons-left">
      <input
        v-model="syncedValue"
        type="email"
        placeholder="e.g. bobsmith@gmail.com"
        class="input"
        required
      >
      <span class="icon is-small is-left">
        <fa icon="envelope" />
      </span>
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
