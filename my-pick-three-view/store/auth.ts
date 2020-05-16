import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import User from '~/src/entities/user'

// state's interface
export interface IAuthStore {
  user: User | null
  token: string
}

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true
})
export default class AuthStore extends VuexModule implements IAuthStore {
  // state
  user: User | null = null
  token: string = window.localStorage.getItem('token') || ''

  // gettes
  get isLoggedIn (): boolean {
    return this.user !== null && !!this.token
  }

  // mutation
  @Mutation
  public setUser (user: User | null) {
    this.user = user
  }

  // actions
  @Action
  public updateUserByEmail (email: string | null | undefined) {
    if (!email) {
      this.setUser(null)
      return
    }

    const user: User = {
      email
    }
    this.setUser(user)
  }
}
