import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
const isPrivate = Env.get('IS_PRIVATE')

export default class PrivateOnly {
  public async handle({response}: HttpContextContract, next: () => Promise<void>) {
    if (!isPrivate) {
      return response.redirect('/dashboard')
    }
    await next()
  }
}
