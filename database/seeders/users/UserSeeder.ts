import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { users } from './UserData'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    for (const user of users) {
      await User.create(user)
    }
  }

  public static async runSeed () {
    for (const user of users) {
      await User.create(user)
    }
  }
}