import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class PrivilegeRole {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if (![User.ADMIN.id, User.SUPERVISOR.id].includes(+auth.user!.role)) {
      return response.redirect('/dashboard')
    }
    await next()
  }
}
