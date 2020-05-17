import { Middleware } from '@nuxt/types'

const authenticated: Middleware = (context) => {
  const auth = context.app.$auth
  if (context.store.getters['auth/isLoggedIn']) {
    return
  }

  auth.onAuthStateChanged((user: firebase.User | null) => {
    if (!user) {
      context.redirect('/login')
      return
    }

    context.store.dispatch('auth/updateUserByEmail', user?.email)
  })
}

export default authenticated
