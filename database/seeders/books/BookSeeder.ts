import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { books } from './BookData'
import Book from 'App/Models/Catalogs/Book'

export default class extends BaseSeeder {
  public async run () {
    for (const book of books) {
      await Book.create(book)
    }
  }

  public static async runSeed () {
    for (const book of books) {
      await Book.create(book)
    }
  }
}