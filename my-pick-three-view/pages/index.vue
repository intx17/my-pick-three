<template>
  <div/>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import PageFooter from '@/components/organisms/PageFooter.vue'

// middlewares
import authenticated from '@/middleware/authenticated'

@Component({
  layout: 'HOME',
  head: {
    title: 'ホーム'
  },
  middleware: [
    authenticated
  ],
  components: {
    PageFooter
  }
})
export default class Index extends Vue {
}
</script>

<style>

</style>
