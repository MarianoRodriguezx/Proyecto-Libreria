import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Author from 'App/Models/Catalogs/Author'
import Env from '@ioc:Adonis/Core/Env'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import StoreAuthorValidator from 'App/Validators/Catalogs/Author/StoreAuthorValidator'
import UpdateAuthorValidator from 'App/Validators/Catalogs/Author/UpdateAuthorValidator'
import User from 'App/Models/User'

const isPrivate = Env.get('IS_PRIVATE')

export default class AuthorsController {
  // Views
  public async index({ auth, view }: HttpContextContract) {
    const authors = await Author.query()
    .orderBy('id', 'asc')

    const data = {
      list: authors,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/authors/index', data)
  }

  public async create({auth, view}: HttpContextContract) {

    const data = {
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/authors/create', data)
  }

  public async show({auth, view, params}: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    const data = {
      item: author,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/authors/show', data)
  }

  public async edit({auth, view, params}: HttpContextContract) {
    const author = await Author.findOrFail(params.id)

    const data = {
      item: author,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/authors/edit', data)
  }

  // API

  public async getActiveAuthors({ auth }: HttpContextContract) {
    const authors = await Author.query()
    .where('status', true)
    .orderBy('id', 'asc')

    const data = {
      list: authors,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return data
  }

  public async store({request, session, response}: HttpContextContract) {
    try {
      // Validate
      await request.validate(StoreAuthorValidator)

      //Create
      const authorData = request.only(Author.store)
      await Author.create(authorData)

      // Response
      session.flash('form', 'Autor editada correctamente')
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
      await request.validate(UpdateAuthorValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (+auth.user!.role === +User.SUPERVISOR.id || await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const authorData = request.only(Author.store)
        const author = await Author.findOrFail(params.id)
        await author.merge(authorData)
        await author.save()

        // Response
        session.flash('form', 'Autor editada correctamente')
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
        const author = await Author.findOrFail(params.id)
        author.status = !author.status
        await author.save()
        // Response
        session.flash('form', 'Autor eliminada correctamente')
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
        generatedToken.linked_table = 'Autores';
        await generatedToken.save()
        return true
      }
    } catch (error) {
      return false
    }
  }
}
