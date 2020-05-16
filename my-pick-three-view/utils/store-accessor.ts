/* eslint-disable no-unused-vars */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthStore from '~/store/auth'

// eslint-disable-next-line import/no-mutable-exports
let authStore: AuthStore

function initialiseStores (store: Store<any>): void {
  authStore = getModule(AuthStore, store)
}

export { initialiseStores, authStore }
