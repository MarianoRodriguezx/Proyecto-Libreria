import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyUser {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.user?.verified) {
      await auth.use('web').logout()
      return response.redirect('/login')
    }
    await next()
  }
}
