<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="/">
        my-pick-three
      </a>
      <a
        :class="burgerClass"
        @click="toggleBurgerActiveness"
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="myPickThreeNavbar"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>
    <div
      id="myPickThreeNavbar"
      :class="menuClass"
      class="navbar-menu"
    >
      <div class="navbar-start">
        <a class="navbar-item">Home</a>
      </div>
      <div class="navbar-end">
        <div class="navbar-item">
          <div
            @click="logout"
            class="buttons"
          >
            <a class="button is-danger">Log out</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// store
import { authStore } from '~/store'

@Component({})
export default class NavBar extends Vue {
  private isBurgerActive: boolean = false

  // computed
  get burgerClass () {
    return {
      'is-active': this.isBurgerActive
    }
  }

  get menuClass () {
    return {
      'is-active': this.isBurgerActive
    }
  }

  // methods
  toggleBurgerActiveness () {
    this.isBurgerActive = !this.isBurgerActive
  }

  async logout () {
    try {
      await this.$auth.signOut()
      authStore.updateUserEmail(null)
      window.localStorage.setItem('token', '')
    } catch (err) {
      window.alert(err.message)
    }
  }
}
</script>
