<template>
  <section class="hero is-info is-fullheight">
    <div class="hero-body">
      <login-form />
    </div>
  </section>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import LoginForm from '@/components/organisms/LoginForm.vue'

import firebase from '~/plugins/firebase'

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {
}
</script>

<style scoped>
</style>
