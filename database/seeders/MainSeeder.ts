import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import UserSeeder from './users/UserSeeder'
import AuthorSeeder from './authors/AuthorSeeder'
import CategorySeeder from './categories/CategorySeeder'
import EditorialSeeder from './editorials/EditorialSeeder'
import BookSeeder from './books/BookSeeder'

// Correr Seeders en orden
// node ace db:seed --files "./database/seeders/MainSeeder.ts"

export default class extends BaseSeeder {
  public async run () {
    await UserSeeder.runSeed()
    await AuthorSeeder.runSeed()
    await CategorySeeder.runSeed()
    await EditorialSeeder.runSeed()
    await BookSeeder.runSeed()
  }
}
