<template>
  <div class="select">
    <select v-model="syncedSelectedValue">
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, PropSync } from 'vue-property-decorator'

// components interface
import { ISelectOption } from '~/src/components/atoms/select-dropdown'

@Component({})
export default class SelectDropdown extends Vue {
  @PropSync('selectedValue', { type: String, required: true })
  private syncedSelectedValue!: String

  @Prop({ type: Array, required: true })
  private options!: ISelectOption[]
}
</script>
