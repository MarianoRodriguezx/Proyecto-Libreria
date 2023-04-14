import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { authors } from './AuthorData'
import Author from 'App/Models/Catalogs/Author'

export default class extends BaseSeeder {
  public async run () {
    for (const author of authors) {
      await Author.create(author)
    }
  }

  public static async runSeed () {
    for (const author of authors) {
      await Author.create(author)
    }
  }
}