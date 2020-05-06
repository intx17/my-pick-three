<template>
  <div>
    <div class="container">
      <h3 class="text-center text-info">Login</h3>
      <form>
        <text-input-with-label
          :label-text="'UserName:'"
          :value.sync="username"
        />
        <text-input-with-label
          :label-text="'Password:'"
          :value.sync="password"
        />
        <div class="form-group row">
          <div class="col-sm-12 text-right">
            <input type="submit" name="submit" class="btn btn-info btn-md" value="submit">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TextInputWithLabel from '@/components/atoms/TextInputWithLabel.vue'

@Component({
  components: {
    TextInputWithLabel
  }
})
export default class Login extends Vue {
  private username: string = ''
  private password: string = ''

  async login () {
    try {
      await this.$auth.loginWith('local', {
        data: {
          username: this.username,
          password: this.password
        }
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  background-color: #17a2b8;
  height: 100vh;
}

.container {
  margin-top: 120px;
  display: flex;
  flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
  justify-content: center; /* 子要素をflexboxにより中央に配置する */
  border: 1px solid #9C9C9C;
  background-color: #EAEAEA;
}

h3 {
  margin-top: 20px;
}
</style>
