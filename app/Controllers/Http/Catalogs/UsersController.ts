import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/Catalogs/User/UpdateUserValidator'
import StoreUserValidator from 'App/Validators/Catalogs/User/StoreUserValidator'

const isPrivate = Env.get('IS_PRIVATE')

export default class UsersController {
  // Views
  public async index({ auth, view }: HttpContextContract) {
    const users = await User.query()
    .orderBy('id', 'desc')

    const data = {
      list: users,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/users/index', data)
  }

  public async create({auth, view}: HttpContextContract) {

    const data = {
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/users/create', data)
  }

  public async show({auth, view, params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const data = {
      item: user,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/users/show', data)
  }

  public async edit({auth, view, params}: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    const data = {
      item: user,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/users/edit', data)
  }

  // API

  public async getActiveUsers({ auth }: HttpContextContract) {
    const users = await User.query()
    .where('status', true)
    .orderBy('id', 'desc')

    const data = {
      list: users,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return data
  }

  public async store({request, session, response}: HttpContextContract) {
    try {
      // Validate
      await request.validate(StoreUserValidator)

      //Create
      const authorData = request.only(User.store)
      await User.create(authorData)

      // Response
      session.flash('form', 'User editada correctamente')
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
      await request.validate(UpdateUserValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (+auth.user!.role === +User.SUPERVISOR.id || await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const authorData = request.only(User.store)
        const user = await User.findOrFail(params.id)
        await user.merge(authorData)
        await user.save()

        // Response
        /* session.flash('form', 'User editada correctamente')
        return response.redirect().back() */
        return response.redirect('/users')
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
        const user = await User.findOrFail(params.id)
        user.status = !user.status
        await user.save()
        // Response
        session.flash('form', 'User eliminada correctamente')
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
        generatedToken.linked_table = 'Usuarios';
        await generatedToken.save()
        return true
      }
    } catch (error) {
      return false
    }
  }
}
