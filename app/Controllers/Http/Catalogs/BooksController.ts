import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
import User from 'App/Models/User'
import Book from 'App/Models/Catalogs/Book'
import StoreBookValidator from 'App/Validators/Catalogs/Book/StoreBookValidator'
import UpdateBookValidator from 'App/Validators/Catalogs/Book/UpdateBookValidator'

import Drive from '@ioc:Adonis/Core/Drive'
import Env from '@ioc:Adonis/Core/Env'
import { schema } from '@ioc:Adonis/Core/Validator'
import Application from '@ioc:Adonis/Core/Application'
import fs from 'fs'
import { cuid } from '@ioc:Adonis/Core/Helpers'

const isPrivate = Env.get('IS_PRIVATE')
const fileDriverPath = `${Env.get('S3_ENDPOINT')}${Env.get('S3_BUCKET')}`

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
    const book = await Book.query()
    .where('id', params.id)
    .preload('postedBy')
    .preload('author')
    .preload('category')
    .preload('editorial')
    .firstOrFail()

    const data = {
      item: book,
      isPrivate: isPrivate,
      role: auth.user?.role,
      spacesPath: fileDriverPath
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

      const imageDataSchema = schema.create({
        image_file: schema.file({
            size: '10mb',
            extnames: ['jpg', 'jpeg' ,'gif', 'png'],
        })
      })
      const imageData = await request.validate({ schema: imageDataSchema })
      const myImage = imageData.image_file;

      const pdfDataSchema = schema.create({
        pdf_file: schema.file({
            size: '50mb',
            extnames: ['pdf'],
        })
      })
      const pdfData = await request.validate({ schema: pdfDataSchema })
      const myPDF = pdfData.pdf_file;
      
      //get Info
      const bookData = request.only(Book.store)
      
      const path = Env.get('NODE_ENV') === 'development' ? 'testing/images/' :  'oficial/images/';
      const filename = cuid()
      const imagePath = `${path}${filename}.${myImage.extname}`
      const pdfPath = `${path}${filename}.${myPDF.extname}`

      await myImage.move(Application.tmpPath('uploads'), {
        name: `${filename}.${myImage.extname}`,
        overwrite: true
      })
      await Drive.putStream(imagePath, fs.createReadStream(Application.tmpPath(`uploads/${filename}.${myImage.extname}`)), {})

      await myPDF.move(Application.tmpPath('uploads'), {
        name: `${filename}.${myPDF.extname}`,
        overwrite: true
      })
      await Drive.putStream(pdfPath, fs.createReadStream(Application.tmpPath(`uploads/${filename}.${myPDF.extname}`)), {})

      // Create

      const dataMerged = {
        ...bookData,
        posted_by: 1,
        book_path: pdfPath,
        cover_path: imagePath
      }

      console.log(dataMerged)
      await Book.create(dataMerged)
      return "Creado"

      // Response
      //session.flash('form', 'Libro guardado correctamente')
      //return response.redirect().back()
    } catch (e) {
      console.log(e)
      return "Error"
      /* session.flash('form', 'Formulario inválido')
      return response.redirect().back() */
    }
  }

  public async update({request, session, response, params, auth}: HttpContextContract) {
    try {
      // Validate
      await request.validate(UpdateBookValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (+auth.user!.role === +User.SUPERVISOR.id || await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const bookData = request.only(Book.store)
        const book = await Book.findOrFail(params.id)
        await book.merge(bookData)
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
