import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { books, booksProd } from './BookData'
import Book from 'App/Models/Catalogs/Book'

import Env from '@ioc:Adonis/Core/Env'
const nodeEnv:string = Env.get('NODE_ENV')


export default class extends BaseSeeder {
  public async run () {
    if (nodeEnv === 'development') {
      for (const book of books) {
        await Book.create(book)
      }
    } else {
      for (const book of booksProd) {
        await Book.create(book)
      }
    }
  }

  public static async runSeed () {
    if (nodeEnv === 'development') {
      for (const book of books) {
        await Book.create(book)
      }
    } else {
      for (const book of booksProd) {
        await Book.create(book)
      }
    }
  }
}