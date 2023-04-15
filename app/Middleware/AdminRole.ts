import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AdminRole {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>) {
    if (+auth.user!.role !== User.ADMIN.id) {
      return response.redirect('/dashboard')
    }
    await next()
  }
}
