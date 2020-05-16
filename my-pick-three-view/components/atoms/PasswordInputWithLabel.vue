<template>
  <div class="field">
    <label for class="label">{{ labelText }}</label>
    <div class="control has-icons-left">
      <input
        v-model="syncedValue"
        type="password"
        class="input"
        required
      >
      <span class="icon is-small is-left">
        <i class="fa fa-key" />
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'

@Component({})
export default class PasswordInputWithLabel extends Vue {
  @PropSync('value', { type: String, required: true })
  private syncedValue!: string;

  @Prop({ type: String, required: true })
  private labelText!: string;
}
</script>
