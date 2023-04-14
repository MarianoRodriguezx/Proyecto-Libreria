import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Catalogs/Category'
import Env from '@ioc:Adonis/Core/Env'
const isPrivate = Env.get('IS_PRIVATE')

export default class CategoriesController {
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

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
