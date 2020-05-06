<template>
  <div class="form-group row">
    <label for="username" class="col-sm-2 text-info">{{ labelText }}</label>
    <div class="col-sm-10">
      <input v-model="syncedValue" type="text" class="form-control">
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Prop } from 'vue-property-decorator'

@Component({})
export default class TextInputWithLabel extends Vue {
  @PropSync('value', { type: String, required: true })
  private syncedValue!: string

  @Prop({ type: String, required: true })
  private labelText!: string
}
</script>
