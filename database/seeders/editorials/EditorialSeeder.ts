import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Editorial from 'App/Models/Catalogs/Editorial'
import { editorials } from './EditorialData'

export default class extends BaseSeeder {
  public async run () {
    for (const editorial of editorials) {
      await Editorial.create(editorial)
    }
  }

  public static async runSeed () {
    for (const editorial of editorials) {
      await Editorial.create(editorial)
    }
  }
}