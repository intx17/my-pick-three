export interface IUser {
  email: string
}

const emailUserDefaultValues = (): IUser => ({
  email: ''
})

export class EmailUser implements IUser {
  email: string

  constructor (init: Partial<EmailUser> = emailUserDefaultValues()) {
    const dv = emailUserDefaultValues()
    this.email = (init.email || dv.email)
  }
}
