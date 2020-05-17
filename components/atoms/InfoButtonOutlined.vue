<template>
  <button class="button is-info is-outlined">{{ buttonText }}</button>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component({})
export default class InfoButtonOutlined extends Vue {
  @Prop({ type: String, required: true })
  private buttonText!: string
}
</script>
