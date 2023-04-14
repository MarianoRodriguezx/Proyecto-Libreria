import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { categories } from './CategoryData'
import Category from 'App/Models/Catalogs/Category'

export default class extends BaseSeeder {
  public async run () {
    for (const category of categories) {
      await Category.create(category)
    }
  }

  public static async runSeed () {
    for (const category of categories) {
      await Category.create(category)
    }
  }
}