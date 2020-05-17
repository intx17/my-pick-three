import { Middleware } from '@nuxt/types'

const authenticated: Middleware = async (context) => {
  if (context.store.getters['auth/isLoggedIn']) {
    return
  }

  const user = context.app.$currentUser

  if (!user) {
    context.redirect('/login')
  }

  context.store.dispatch('auth/updateUserByEmail', user?.email)
}

export default authenticated
