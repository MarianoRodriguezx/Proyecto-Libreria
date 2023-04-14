import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Catalogs/Category'
import Env from '@ioc:Adonis/Core/Env'
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
    
    return view.render('pages/catalogs/categories', data)
  }

  public async getActiveCategories({ auth, view }: HttpContextContract) {
    const categories = await Category.query()
    .where('status', true)
    .orderBy('id', 'asc')

    const data = {
      list: categories,
      isPrivate: isPrivate,
      role: auth.user?.role
    }
    
    return view.render('pages/catalogs/categories', data)
  }

  public async create({}: HttpContextContract) {
    return "Crear categoría"
  }

  public async show({}: HttpContextContract) {
    return "Ver categoría"
  }

  public async edit({}: HttpContextContract) {
    return "Editar categoría"
  }

  // API

  public async store({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
