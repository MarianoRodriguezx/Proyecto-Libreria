import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import User from 'App/Models/User'
import { cuid } from '@ioc:Adonis/Core/Helpers'

export default class GeneratedTokensController {
    public async generateToken({ session, response, auth}: HttpContextContract) {
        try {
            const generatedToken = cuid()
            const tokenData = {
                generated_by: auth.user!.id,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: +auth.user!.role === +User.SUPERVISOR.id ? GeneratedToken.EDIT.id : GeneratedToken.DELETE.id // 1=Edit, 2=Delete
            }
            await GeneratedToken.create(tokenData)
            console.log(generatedToken)
            return true
            /* session.flash('form', 'Categoría editada correctamente')
            return response.redirect().back() */
        } catch (e) {
          console.log(e)
          session.flash('form', 'Formulario inválido')
          return response.redirect().back()
        }
      }
}
