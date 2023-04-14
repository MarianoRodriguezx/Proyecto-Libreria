import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Catalogs/Category'
import Env from '@ioc:Adonis/Core/Env'
import StoreCategoryValidator from 'App/Validators/Catalogs/Category/StoreCategoryValidator'
import TokenValidator from 'App/Validators/Tokens/TokenValidator'
import UpdateCategoryValidator from 'App/Validators/Catalogs/Category/UpdateCategoryValidator'
import GeneratedToken from 'App/Models/Tokens/GeneratedToken'
const isPrivate = Env.get('IS_PRIVATE')

export default class CategoriesController {

  // Views
  public async index({ auth, view }: HttpContextContract) {
    const categories = await Category.query()
    .orderBy('id', 'asc')

    const data = {
      list: categories,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/categories/index', data)
  }

  public async create({auth, view}: HttpContextContract) {

    const data = {
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/categories/create', data)
  }

  public async show({auth, view, params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    const data = {
      item: category,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/categories/show', data)
  }

  public async edit({auth, view, params}: HttpContextContract) {
    const category = await Category.findOrFail(params.id)

    const data = {
      item: category,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/categories/edit', data)
  }

  // API

  public async getActiveCategories({ auth }: HttpContextContract) {
    const categories = await Category.query()
    .where('status', true)
    .orderBy('id', 'asc')

    const data = {
      list: categories,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return data
  }

  public async store({request, session, response}: HttpContextContract) {
    try {
      // Validate
      await request.validate(StoreCategoryValidator)

      //Create
      const categoryData = request.only(Category.store)
      await Category.create(categoryData)

      // Response
      session.flash('form', 'Categoría editada correctamente')
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
      await request.validate(UpdateCategoryValidator)
      const editToken = request.input("edit_token")
      
      // Update
      if (await this.useToken(GeneratedToken.EDIT.id, editToken, auth.user!.email)) {
        const categoryData = request.only(Category.store)
        const category = await Category.findOrFail(params.id)
        await category.merge(categoryData)
        await category.save()

        // Response
        session.flash('form', 'Categoría editada correctamente')
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
      if (await this.useToken(GeneratedToken.DELETE.id, editToken, auth.user!.email)) {
        const category = await Category.findOrFail(params.id)
        category.status = !category.status
        await category.save()
        // Response
        session.flash('form', 'Categoría eliminada correctamente')
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
        generatedToken.linked_table = 'Categorías';
        await generatedToken.save()
        return true
      }
    } catch (error) {
      return false
    }
  }
}
