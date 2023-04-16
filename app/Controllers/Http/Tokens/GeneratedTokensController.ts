import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import User from 'App/Models/User'
import { cuid } from '@ioc:Adonis/Core/Helpers'
import Env from '@ioc:Adonis/Core/Env'
const isPrivate = Env.get('IS_PRIVATE')

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
            //return true
            session.flash('form', `Token: ${generatedToken}`)
            return response.redirect().back()
        } catch (e) {
          console.log(e)
          session.flash('form', 'Formulario inválido')
          return response.redirect().back()
        }
      }


      public async forceTokenEdit({ }: HttpContextContract) {
        try {
            const generatedToken = cuid()
            const tokenData = {
                generated_by: 1,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: GeneratedToken.EDIT.id
            }
            await GeneratedToken.create(tokenData)
            console.log(generatedToken)
            return generatedToken
        } catch (e) {
          console.log(e)
          return false
        }
      }

      public async forceTokenDelete({ }: HttpContextContract) {
        try {
            const generatedToken = cuid()
            const tokenData = {
                generated_by: 1,
                used_email: 'No canjeado',
                token: generatedToken,
                linked_table: 'No canjeado',
                type: GeneratedToken.DELETE.id
            }
            await GeneratedToken.create(tokenData)
            console.log(generatedToken)
            return generatedToken
        } catch (e) {
          console.log(e)
          return false
        }
      }

      public async index({ auth, view }: HttpContextContract) {
        const tokens = await GeneratedToken.query()
        .preload('generatedBy')
        .orderBy('id', 'desc')
    
        const data = {
          list: tokens,
          isPrivate: isPrivate,
          role: auth.user?.role
        }
        
        return view.render('pages/catalogs/tokens/index', data)
      }
}
