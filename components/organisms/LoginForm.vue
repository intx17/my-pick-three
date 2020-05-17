<template>
  <div class="container">
    <div class="columns is-centered">
      <div class="column is-5-tablet is-4-desktop is-3-widescreen">
        <div class="box">
          <email-input-with-label :label-text="'email'" :value.sync="email" />
          <password-input-with-label :label-text="'password'" :value.sync="password" />
          <div class="field">
            <info-button-outlined :button-text="'Login'" @click.native="login" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// components
import EmailInputWithLabel from '~/components/atoms/EmailInputWithLabel.vue'
import PasswordInputWithLabel from '~/components/atoms/PasswordInputWithLabel.vue'
import InfoButtonOutlined from '~/components/atoms/InfoButtonOutlined.vue'

// store
import { authStore } from '~/store'

@Component({
  components: {
    EmailInputWithLabel,
    PasswordInputWithLabel,
    InfoButtonOutlined
  }
})
export default class Login extends Vue {
  private email: string = ''
  private password: string = ''

  async login () {
    try {
      const userCredential = await this.$auth
        .signInWithEmailAndPassword(this.email, this.password)

      const user = userCredential.user

      // storeにユーザー格納
      authStore.updateUserByEmail(user?.email)

      // IDトークン（JWT）取得
      const token = await user?.getIdToken()
      // ローカルストレージ, storeに保存
      if (token) {
        localStorage.setItem('token', token)
      }

      // Jump to Home
      this.$router.push('/')
    } catch (err) {
      window.alert(err.message)
    }
  }
}
</script>
