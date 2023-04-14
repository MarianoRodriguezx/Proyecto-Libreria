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

  public async store({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
