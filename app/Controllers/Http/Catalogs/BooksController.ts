import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import User from 'App/Models/User'
import Book from 'App/Models/Catalogs/Book'
import StoreBookValidator from 'App/Validators/Catalogs/Book/StoreBookValidator'
import UpdateBookValidator from 'App/Validators/Catalogs/Book/UpdateBookValidator'

const isPrivate = Env.get('IS_PRIVATE')

export default class BooksController {
  // Views
  public async index({ auth, view }: HttpContextContract) {
    const books = await Book.query()
    .orderBy('id', 'asc')

    const data = {
      list: books,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/books/index', data)
  }

  public async create({auth, view}: HttpContextContract) {

    const data = {
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/books/create', data)
  }

  public async show({auth, view, params}: HttpContextContract) {
    const book = await Book.findOrFail(params.id)

    const data = {
      item: book,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/books/show', data)
  }

  public async edit({auth, view, params}: HttpContextContract) {
    const book = await Book.findOrFail(params.id)

    const data = {
      item: book,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/books/edit', data)
  }

  // API

  public async getActiveBooks({ auth }: HttpContextContract) {
    const books = await Book.query()
    .where('status', true)
    .orderBy('id', 'asc')

    const data = {
      list: books,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return data
  }

  public async store({request, session, response}: HttpContextContract) {
    try {
      // Validate
      await request.validate(StoreBookValidator)

      //Create
      const categoryData = request.only(Book.store)
      await Book.create(categoryData)

      // Response
      session.flash('form', 'Libro guardado correctamente')
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
      await request.validate(UpdateBookValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (+auth.user!.role === +User.SUPERVISOR.id || await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const categoryData = request.only(Book.store)
        const book = await Book.findOrFail(params.id)
        await book.merge(categoryData)
        await book.save()

        // Response
        session.flash('form', 'Libro editado correctamente')
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
        const book = await Book.findOrFail(params.id)
        book.status = !book.status
        await book.save()
        // Response
        session.flash('form', 'Libro eliminada correctamente')
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
        generatedToken.linked_table = 'Libros';
        await generatedToken.save()
        return true
      }
    } catch (error) {
      return false
    }
  }
}
