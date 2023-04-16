import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SignedRoute {
  public async handle({request, response }: HttpContextContract, next: () => Promise<void>) {
    if (!request.hasValidSignature()) {
      return response.redirect('/not-found') 
    }
    await next()
  }
}
