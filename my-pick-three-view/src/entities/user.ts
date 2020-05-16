interface IUser {
  email: string
}

export default class User implements IUser {
  email: string

  constructor (email: string) {
    this.email = email
  }
}
