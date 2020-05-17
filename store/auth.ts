import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'
import IUser from '~/src/entities/user'

// state's interface
export interface IAuthStore {
  user: IUser | null
  token: string
}

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true
})
export default class AuthStore extends VuexModule implements IAuthStore {
  // state
  user: IUser | null = null
  token: string = window.localStorage.getItem('token') || ''

  // gettes
  get isLoggedIn (): boolean {
    return this.user !== null
  }

  // mutation
  @Mutation
  public setUser (user: IUser | null) {
    this.user = user
  }

  // actions
  @Action
  public updateUserByEmail (email: string | null | undefined) {
    if (!email) {
      this.setUser(null)
      return
    }

    const user: IUser = {
      email
    }
    this.setUser(user)
  }
}
