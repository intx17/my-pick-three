import { Middleware } from '@nuxt/types'

const authenticated: Middleware = async (context) => {
  const auth = context.app.$auth
  if (context.store.getters['auth/isLoggedIn']) {
    return
  }

  const user = await new Promise<firebase.User | null>((resolve) => {
    auth.onAuthStateChanged((user: firebase.User | null) => {
      if (!user) {
        context.redirect('/login')
      }
      resolve(user)
    })
  })
  context.store.dispatch('auth/updateUserByEmail', user?.email)
}

export default authenticated
