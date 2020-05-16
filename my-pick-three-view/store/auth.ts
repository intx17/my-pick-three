import { Mutation, Action, VuexModule, Module } from 'vuex-module-decorators'

// state's interface
export interface IAuthStore {
  userEmail: string | null
  token: string
}

@Module({
  name: 'auth',
  namespaced: true,
  stateFactory: true
})
export default class AuthStore extends VuexModule implements IAuthStore {
  // state
  userEmail: string | null = null
  token: string = window.localStorage.getItem('token') || ''

  // gettes
  get isLoggedIn (): boolean {
    return this.userEmail !== null && !!this.token
  }

  // mutation
  @Mutation
  public setUserEmail (email: string | null) {
    this.userEmail = email
  }

  // actions
  @Action
  public updateUserEmail (email: string | null | undefined) {
    if (!email) {
      email = null
    }
    // console.log(user)
    this.setUserEmail(email)
  }
}
