/* eslint-disable no-unused-vars */
import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import AuthStore from '~/store/auth'
import UserTaskInfoStore from '~/store/user-task-info'
import SelectTaskModalStore from '~/store/select-task-modal'

// eslint-disable-next-line import/no-mutable-exports
let authStore: AuthStore
// eslint-disable-next-line import/no-mutable-exports
let userTaskInfoStore: UserTaskInfoStore
// eslint-disable-next-line import/no-mutable-exports
let selectTaskModalStore: SelectTaskModalStore

function initialiseStores (store: Store<any>): void {
  authStore = getModule(AuthStore, store)
  userTaskInfoStore = getModule(UserTaskInfoStore, store)
  selectTaskModalStore = getModule(SelectTaskModalStore, store)
}

export { initialiseStores, authStore, userTaskInfoStore, selectTaskModalStore }
