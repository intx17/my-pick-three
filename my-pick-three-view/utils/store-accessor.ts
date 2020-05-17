/* eslint-disable no-unused-vars */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import AuthStore from '~/store/auth'
import SelectTaskModalStore from '~/store/select-task-modal'

// eslint-disable-next-line import/no-mutable-exports
let authStore: AuthStore
// eslint-disable-next-line import/no-mutable-exports
let selectTaskModalStore: SelectTaskModalStore

function initialiseStores (store: Store<any>): void {
  authStore = getModule(AuthStore, store)
  selectTaskModalStore = getModule(SelectTaskModalStore, store)
}

export { initialiseStores, authStore, selectTaskModalStore }
