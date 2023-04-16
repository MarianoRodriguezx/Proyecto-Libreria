import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Editorial from 'App/Models/Catalogs/Editorial'
import Env from '@ioc:Adonis/Core/Env'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import StoreEditorialValidator from 'App/Validators/Catalogs/Editorial/StoreEditorialValidator'
import UpdateEditorialValidator from 'App/Validators/Catalogs/Editorial/UpdateEditorialValidator'
import User from 'App/Models/User'

const isPrivate = Env.get('IS_PRIVATE')

export default class EditorialsController {
  // Views
  public async index({ auth, view }: HttpContextContract) {
    const editorials = await Editorial.query()
    .orderBy('id', 'desc')

    const data = {
      list: editorials,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/editorials/index', data)
  }

  public async create({auth, view}: HttpContextContract) {

    const data = {
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/editorials/create', data)
  }

  public async show({auth, view, params}: HttpContextContract) {
    const editorial = await Editorial.findOrFail(params.id)

    const data = {
      item: editorial,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/editorials/show', data)
  }

  public async edit({auth, view, params}: HttpContextContract) {
    const editorial = await Editorial.findOrFail(params.id)

    const data = {
      item: editorial,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/editorials/edit', data)
  }

  // API

  public async getActiveEditorials({ auth }: HttpContextContract) {
    const editorials = await Editorial.query()
    .where('status', true)
    .orderBy('id', 'desc')

    const data = {
      list: editorials,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return data
  }

  public async store({request, session, response}: HttpContextContract) {
    try {
      // Validate
      await request.validate(StoreEditorialValidator)

      //Create
      const authorData = request.only(Editorial.store)
      await Editorial.create(authorData)

      // Response
      session.flash('form', 'Editorial editada correctamente')
      return response.redirect().back()
    } catch (e) {
      console.log(e)
      session.flash('form', 'Formulario inválido')
      return response.redirect().back()
    }
  }

  public async update({request, session, response, params, auth}: HttpContextContract) {
    try {
      // Validate
      await request.validate(UpdateEditorialValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (+auth.user!.role === +User.SUPERVISOR.id || await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const authorData = request.only(Editorial.store)
        const editorial = await Editorial.findOrFail(params.id)
        await editorial.merge(authorData)
        await editorial.save()

        // Response
        session.flash('form', 'Editorial editada correctamente')
        return response.redirect().back()
      } else {
        session.flash('form', 'Token inválido')
        return response.redirect().back()
      }
    } catch (e) {
      console.log(e)
      session.flash('form', 'Formulario inválido')
      return response.redirect().back()
    }
  }

  public async destroy({request, params, session, response, auth}: HttpContextContract) {
    try {
      // Validate
      await request.validate(TokenValidator)
      const editToken = request.input("edit_token")

      // Change Status
      if (+auth.user!.role === +User.ADMIN.id || await this.useToken(GeneratedToken.DELETE.id, editToken, auth.user!.email)) {
        const editorial = await Editorial.findOrFail(params.id)
        editorial.status = !editorial.status
        await editorial.save()
        // Response
        session.flash('form', 'Editorial eliminada correctamente')
        return response.redirect().back()
      } else {
        session.flash('form', 'Token inválido')
        return response.redirect().back()
      }
    } catch (e) {
      console.log(e)
      session.flash('form', 'Formulario inválido')
      return response.redirect().back()
    }
  }

  private async useToken(type:number, token:string, email:string) { 
    try {
      const generatedToken = await GeneratedToken.findByOrFail('token', token)
      if (!generatedToken.status || generatedToken.type !== type) {
        return false
      } else {
        generatedToken.status = false;
        generatedToken.used_email = email;
        generatedToken.linked_table = 'Editoriales';
        await generatedToken.save()
        return true
      }
    } catch (error) {
      return false
    }
  }
}
