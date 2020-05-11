<template>
  <button type="button" class="btn btn-lg btn-info btn-circle text-center">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class CircleButton extends Vue {
  @Prop({ type: String, required: true })
  private text!: string;
}
</script>

<style scoped>
.btn-circle.btn-lg {
  width: 100px;
  height: 50px;
  padding: 10px 16px;
  font-size: 18px;
  line-height: 1.33;
  border-radius: 25px;
  text-align: center;
}
</style>
